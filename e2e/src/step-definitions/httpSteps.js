import {Given, Then, When} from 'cucumber';
import chaiHttp from 'chai-http';
import chai, {expect} from 'chai';
import fs from "fs";
import path from "path";
import config from "../config";

chai.use(chaiHttp);

Given(/^following XML file "([^"]*)"$/, async function (fileName) {
    const file = await new Promise((resolve, reject) =>
        fs.readFile(
            path.join(config.filesDir, 'xml', fileName),
            (err, data) => err ? reject(err) : resolve(data)
        )
    );
    this.data = {
        fileXML: {
            name: file
        }
    };

});

Given(/^endpoint "([^"]*)"$/, async function (endpoint) {
    this.data = {
        endpoint: {
            name: endpoint
        }
    };
});

Given(/^endpoint "([^"]*)" with parameters$/, async function (entrypoint, params) {
    for (const param of params.rawTable.flat()) {
        const id = param;

        const endpoint = `rdf/articles/${id}${entrypoint}`
        this.data = {
            endpoint: {
                name: endpoint
            }
        };
    }
    ;

});

When(/^the request is send$/, async function () {
    const endpoint = this.data.endpoint.name;
    const res = await chai.request(config.url)
        .get(`/${endpoint}`)
        .set('content-type', 'application/xml')
    this.data = {
        result: {
            value: res
        }
    }

});

When(/^user calls the endpoint$/, async function () {
    const res = await chai.request('http://article.hosting')
        .post('/convert')
        .set('content-type', 'application/xml')
        .send(this.data.fileXML.name.toString());
    this.data = {
        result: {
            value: res
        }
    }
});

Then(/^json is generated$/, function () {
    const resp = this.data.result.value;
    expect(resp).to.have.status(200);
    expect(resp).to.be.json;
    expect(resp.body).to.have.all.keys('title', 'authors', 'description', 'content', 'datePublished', 'isPartOf',
        'identifiers', 'keywords', 'licenses', 'references', 'meta', 'type');
});

Then(/^json is not generated$/, function () {
    const resp = this.data.result.value;
    expect(resp).to.have.status(400);
});
Then(/^metada of article is returned$/, {timeout: 15 * 1000}, async function () {
    const resp = this.data.result.value;
    expect(resp).to.have.status(200);
    const graph = resp.body["@graph"];
    const schemaArticles = graph.find(i => i['@type'] === 'schema:Articles')['stencila:Article']
        .map((idArt) => graph.find(e => e['@id'] === idArt['@id']));
    const hydraMember = schemaArticles.map((h) => h['hydra:member']['@value']);

    for (const idMember of hydraMember) {
        const respMetadata = await chai.request(config.url)
            .get(`rdf/articles/${idMember}/metadata`)
            .set('content-type', 'application/xml')
        const graphMeta = respMetadata.body["@graph"];
        const schemaMeta = graphMeta.find(i => i['@type'] === 'schema:ArticleMetadata');
        expect(schemaMeta).to.have.any.keys('@id', '@type', 'schema:name', 'stencila:about', 'stencila:authors',
            'stencila:dateAccepted', 'stencila:datePublished', 'stencila:dateReceived', 'stencila:isPartOf', 'stencila:title');
        expect(schemaMeta).to.have.nested.property('stencila:title.@value');
        expect(schemaMeta['schema:name']).to.be.equal('Article Metadata RDF Endpoint');
        const aboutMeta = schemaMeta['stencila:about'].map((aboutId) => aboutId['@id'])
        const getAbout = aboutMeta.map((x) => graphMeta.find(i => i['@id'] === x));
        for (let i = 0; i < getAbout.length; i++) {
            expect(getAbout[i]).to.have.nested.property('stencila:name.@value');
            expect(getAbout[i]).to.have.nested.property('stencila:type.@value');
        }
        const authorsMeta = schemaMeta['stencila:authors'].map((aboutId) => aboutId['@id']);
        const getAuthors = authorsMeta.map((x) => graphMeta.find(i => i['@id'] === x));
        for (let i = 0; i < getAuthors.length; i++) {
            expect(getAuthors[i]).to.have.any.keys('@id', 'stencila:type', 'stencila:emails', 'stencila:affiliations', 'stencila:familyNames', 'stencila:givenNames');
        }
    }

});

Then(/^the list of articles is returned$/, function () {
    const resp = this.data.result.value;
    expect(resp).to.have.status(200);
    const graph = resp.body["@graph"];
    const schemaArticles = graph.find(i => i['@type'] === 'schema:Articles');
    expect(schemaArticles).to.have.all.keys('@id', '@type', 'schema:name', 'hydra:manages', 'stencila:Article');
    const hydraCollection = [];
    const hydraMember = [];
    for (const article of schemaArticles['stencila:Article']) {
        const articleById = graph.find(i => i['@id'] === article['@id']);
        hydraCollection.push(articleById['hydra:collection']);
        hydraMember.push(articleById['hydra:member']['@value']);
        expect(articleById).to.have.all.keys('@id', 'hydra:collection', 'hydra:member', 'stencila:title');
        expect(articleById).to.have.nested.property('hydra:member.@value');
        expect(articleById).to.have.nested.property('stencila:title.@value');
    }
    for (let i = 0; i < hydraCollection.length; i++) {
        const bodyLink = hydraCollection[i].find(i => i['@id'].includes('body'));
        const metadataLink = hydraCollection[i].find(i => i['@id'].includes('metadata'));
        const backMatterLink = hydraCollection[i].find(i => i['@id'].includes('back-matter'));
        const filesLink = hydraCollection[i].find(i => i['@id'].includes('files'));

        expect(bodyLink['@id']).to.include(`${hydraMember[i]}/body`);
        expect(metadataLink['@id']).to.include(`${hydraMember[i]}/metadata`);
        expect(backMatterLink['@id']).to.include(`${hydraMember[i]}/back-matter`);
        expect(filesLink['@id']).to.include(`${hydraMember[i]}/files`);
    }
});


Then(/^article back matter is returned$/, {timeout: 30 * 1000}, async function () {
    const resp = this.data.result.value;
    expect(resp).to.have.status(200);
    const graph = resp.body["@graph"];
    const schemaArticles = graph.find(i => i['@type'] === 'schema:Articles')['stencila:Article']
        .map((idArt) => graph.find(e => e['@id'] === idArt['@id']));
    const hydraMember = schemaArticles.map((h) => h['hydra:member']['@value']);
    for (const idMember of hydraMember) {
        const respBackMatter = await chai.request(config.url)
            .get(`rdf/articles/${idMember}/back-matter`)
            .set('content-type', 'application/xml')
        const graphBackmatter = respBackMatter.body["@graph"];
        const schemaBmatter = graphBackmatter.find(i => i['@type'] === 'schema:ArticleBackMatter');
        expect(schemaBmatter).to.have.any.keys('@id', '@type', 'schema:name', 'stencila:licenses', 'stencila:references', 'stencila:authors',
            'stencila:keywords', 'stencila:datePublished', 'stencila:identifiers', 'stencila:about', 'stencila:title');
        expect(schemaBmatter).to.have.nested.property('stencila:title.@value');
        expect(schemaBmatter['schema:name']).to.be.equal('Article Back Matter RDF Endpoint');
        const aboutBmatter = schemaBmatter['stencila:about'].map((aboutId) => aboutId['@id'])
        const getAbout = aboutBmatter.map((x) => graphBackmatter.find(i => i['@id'] === x));
        for (let i = 0; i < getAbout.length; i++) {
            expect(getAbout[i]).to.have.nested.property('stencila:name.@value');
            expect(getAbout[i]).to.have.nested.property('stencila:type.@value');
        }
        const authorsBmatter = schemaBmatter['stencila:authors'].map((aboutId) => aboutId['@id']);
        const getAuthors = authorsBmatter.map((x) => graphBackmatter.find(i => i['@id'] === x));
        for (let i = 0; i < getAuthors.length; i++) {
            expect(getAuthors[i]).to.have.any.keys('@id', 'stencila:type', 'stencila:emails', 'stencila:affiliations', 'stencila:familyNames', 'stencila:givenNames');
        }
        const references = schemaBmatter['stencila:references'].map((parId) => parId['@id'])
        const getReferences = references.map((x) => graphBackmatter.find(i => i['@id'] === x));
        for (let i = 0; i < getReferences.length; i++) {
            expect(getReferences[i]).to.have.any.keys('@id', 'stencila:authors', 'stencila:datePublished', 'stencila:isPartOf',
                'stencila:type','stencila:title','stencila:id','stencila:pageStart','stencila:pageEnd');
        }
    }


});

Then(/^the context is returned$/, function () {
    const resp = this.data.result.value;
    expect(resp).to.have.status(200);
    const graph = resp.body["@graph"];
    console.log("Response", graph);
    const endpoint = graph[0]["@id"];
    expect(endpoint).to.be.equal("http://article.hosting/rdf");
    expect(graph[1]["@id"]).to.be.equal("http://article.hosting/rdf/articles");
});

Then(/^related materials are downloaded$/,{timeout: 15 * 1000}, async function () {
    const resp = this.data.result.value;
    expect(resp).to.have.status(200);
    const graph = resp.body["@graph"];
    const schemaArticles = graph.find(i => i['@type'] === 'schema:Articles')['stencila:Article']
        .map((idArt) => graph.find(e => e['@id'] === idArt['@id']));
    const hydraMember = schemaArticles.map((h) => h['hydra:member']['@value']);
    for (const idMember of hydraMember) {
        const respFiles = await chai.request(config.url)
            .get(`rdf/articles/${idMember}/files`)
            .set('content-type', 'application/xml')
        const graphFiles = respFiles.body["@graph"];
        const schemaFiles = graphFiles.find(i => i['@type'] === 'schema:ArticleFiles');
        expect(schemaFiles).to.have.any.keys('@id', '@type', 'schema:name', 'stencila:file', 'stencila:title');
        expect(schemaFiles).to.have.nested.property('stencila:title.@value');
        expect(schemaFiles['@type']).to.be.equal('schema:ArticleFiles');
        expect(schemaFiles['schema:name']).to.be.equal('Article Files RDF Endpoint: List article files');
        for (const file of schemaFiles['schema:file']) {
            const fileById = graphFiles.find(i => i['@id'] === file['@id']);
            expect(fileById).to.have.all.keys('@id','@type', 'schema:contentUrl', 'schema:fileExtension', 'schema:name','hydra:Link');
            expect(fileById).to.have.nested.property('schema:contentUrl.@value');
            expect(fileById).to.have.nested.property('schema:fileExtension.@value');
            expect(fileById).to.have.nested.property('hydra:Link.@id');

        }}
});
Then(/^list of images is returned$/, function () {
    const resp = this.data.result.value;
    expect(resp).to.have.status(200);
    const graph = resp.body["@graph"];
    if (graph.length > 0) {
        for (let i = 0; i <= graph[graph.length - 1]; i += 1) {
            expect(graph[i]).to.have.all.keys("@id", "schema:contentUrl", "schema:fileExtension", "schema:name", "hydra:Link");
            expect(graph[i]["schema:contentUrl"]).to.have.keys("@value");
            expect(graph[i]["schema:contentUrl"]).to.contain(".tif");
            expect(graph[i]["schema:name"]).to.have.keys("@value");
            expect(graph[i]["hydra:Link"]).to.have.keys("@id");
            expect(graph[i]["hydra:Link"]).to.contain("http://article.hosting/download");
            expect(graph[i]["schema:fileExtension"]).to.have.keys("@value");
            expect(graph[i]["schema:fileExtension"]).to.contain("tif");
            expect(graph[i]["@id"]).to.contain("_:b");
        }
    }
});
Then(/^article body is returned$/, {timeout: 30 * 1000}, async function () {
    const resp = this.data.result.value;
    expect(resp).to.have.status(200);
    const graph = resp.body["@graph"];
    const schemaArticles = graph.find(i => i['@type'] === 'schema:Articles')['stencila:Article']
        .map((idArt) => graph.find(e => e['@id'] === idArt['@id']));
    const hydraMember = schemaArticles.map((h) => h['hydra:member']['@value']);
    for (const idMember of hydraMember) {
        const respBodydata = await chai.request(config.url)
            .get(`rdf/articles/${idMember}/body`)
            .set('content-type', 'application/xml')
        const graphBody = respBodydata.body["@graph"];
        const schemaBody = graphBody.find(i => i['@type'] === 'schema:ArticleBody');
        expect(schemaBody).to.have.any.keys('@id', '@type', 'schema:name', 'stencila:text', 'stencila:label',
            'stencila:Paragraph', 'stencila:MediaObject', 'stencila:caption', 'stencila:description', 'stencila:id',
            'stencila:ImageObject', 'stencila:title');
        expect(schemaBody).to.have.nested.property('stencila:title.@value');
        expect(schemaBody).to.have.nested.property('stencila:description.@value');
        expect(schemaBody['schema:name']).to.be.equal('Article Content RDF Endpoint');
        const paragraphs = schemaBody['stencila:Paragraph'].map((parId) => parId['@id'])
        const getParagraph = paragraphs.map((x) => graphBody.find(i => i['@id'] === x));
        for (let i = 0; i < getParagraph.length; i++) {
            expect(getParagraph[i]).to.have.any.keys('@id', 'stencila:Emphasis', 'stencila:target', 'stencila:text');
        }
    }
});
Then(/^list of tables is returned$/, function () {
    const resp = this.data.result.value;
    expect(resp).to.have.status(200);
    const graph = resp.body["@graph"];
    if (graph.length > 0) {
        for (let i = 0; i <= graph[graph.length - 1]; i += 1) {
            expect(graph[i]).to.have.all.keys("stencila:text", "stencila:id", "stencila:label", "stencila:Table",
                "stencila:rows", "stencila:rowspan", "stencila:cells", "stencila:colspan", "stencila:TableCell");
            expect(graph[i]["stencila:text"]).to.have.keys("@value");
            expect(graph[i]["stencila:text"]).to.contain("Table");
            expect(graph[i]["stencila:id"]).to.have.keys("@value");
            expect(graph[i]["stencila:id"]).to.contain("tbl");
            expect(graph[i]["stencila:label"]).to.have.keys("@value");
            expect(graph[i]["stencila:label"]).to.contain("Table");
            expect(graph[i]["stencila:Table"]).to.have.keys("@id");
            expect(graph[i]["stencila:rows"]).to.have.keys("@id");
            expect(graph[i]["stencila:rowspan"]).to.have.keys("@type", "@value");
            expect(graph[i]["stencila:colspan"]).to.have.keys("@type", "@value");
            expect(graph[i]["stencila:cells"]).to.have.keys("@id");
            expect(graph[i]["stencila:TableCell"]).to.have.keys("@id");
            expect(graph[i]["@id"]).to.contain("_:b");
        }
    }
});

Then(/^the error is returned$/, function () {
    const resp = this.data.result.value;
    expect(resp).to.have.status(404);
    const graph = resp.body;
    expect(graph['hydra:title']).to.be.equal('Article not found');
    expect(graph['hydra:description']).to.be.equal('Article not found');
    expect(graph['@type']).to.be.equal('hydra:Status');
    expect(graph['hydra:statusCode']['@value']).to.be.equal('404');
});
