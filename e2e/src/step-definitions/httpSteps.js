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
        //to do
        // expect(schemaMeta).to.have.keys('@id', '@type', 'schema:name', 'stencila:about', 'stencila:authors', 'stencila:datePublished', 'stencila:title');
        expect(schemaMeta).to.have.any.keys('@id', '@type', 'schema:name', 'stencila:about', 'stencila:authors',
            'stencila:dateAccepted', 'stencila:datePublished', 'stencila:dateReceived', 'stencila:isPartOf', 'stencila:title');
        const aboutMeta = schemaMeta['stencila:about'].map((aboutId) => aboutId['@id'])
        const getAbout = aboutMeta.map((x) => graphMeta.find(i => i['@id'] === x));
        for (let i = 0; i < getAbout.length; i++) {
            expect(getAbout[i]).to.have.nested.property('stencila:name.@value');
            expect(getAbout[i]).to.have.nested.property('stencila:type.@value');

        }
        const authorsMeta = schemaMeta['stencila:authors'].map((aboutId) => aboutId['@id'])
        const getAuthors = authorsMeta.map((x) => graphMeta.find(i => i['@id'] === x));
        console.log(getAuthors)
        for (let i = 0; i < getAuthors.length; i++) {
            expect(getAuthors[i]).to.have.any.keys('@id','stencila:type','stencila:emails','stencila:affiliations','stencila:familyNames','stencila:givenNames');


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


Then(/^article back matter is returned$/, function () {
    const resp = this.data.result.value;
    expect(resp).to.have.status(200);
    const graph = resp.body["@graph"];
    if (graph.length > 0) {
        for (let i = 0; i <= graph[graph.length - 1]; i += 1) {
            expect(graph[i]).to.have.all.keys("@id", "stencila:about", "stencila:author", "stencila:dateAccepted",
                "stencila:datePublished", "stencila:dateReceived", "stencila:isPartOf", "stencila:title", "stencila:name",
                "stencila:type", "stencila:affiliations", "stencila:familyNames", "stencila:givenNames", "stencila:address",
                "stencila:addressCountry");
            expect(graph[i]["stencila:about"]).to.have.keys("@id");
            expect(graph[i]["stencila:author"]).to.have.keys("@id");
            expect(graph[i]["stencila:dateAccepted"]).to.have.keys("@id");
            expect(graph[i]["stencila:datePublished"]).to.have.keys("@id");
            expect(graph[i]["stencila:dateReceived"]).to.have.keys("@id");
            expect(graph[i]["stencila:isPartOf"]).to.have.keys("@id");
            expect(graph[i]["stencila:title"]).to.have.keys("@value", "@id");
            expect(graph[i]["stencila:name"]).to.have.keys("@value");
            expect(graph[i]["stencila:type"]).to.have.keys("@value");
            expect(graph[i]["stencila:affiliations"]).to.have.keys("@id");
            expect(graph[i]["stencila:familyNames"]).to.have.keys("@value");
            expect(graph[i]["stencila:givenNames"]).to.have.keys("@value");
            expect(graph[i]["stencila:address"]).to.have.keys("@id");
            expect(graph[i]["stencila:addressCountry"]).to.have.keys("@value");
            expect(graph[i]["@id"]).to.contain("_:b");
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
Then(/^related materials are downloaded$/, function () {
    const resp = this.data.result.value;
    expect(resp).to.have.status(200);
    const graph = resp.body["@graph"];
    if (graph.length > 0) {
        for (let i = 0; i <= graph[graph.length - 1]; i += 1) {
            expect(graph[i]).to.have.all.keys("@id", "stencila:contentUrl", "hydra:Link", "schema:fileExtension");
            expect(graph[i]["schema:contentUrl"]).to.have.keys("@value");
            expect(graph[i]["hydra:Link"]).to.have.keys("@id");
            expect(graph[i]["'schema:fileExtension"]).to.have.keys("@value");
            expect(graph[i]["@id"]).to.contain("_:b");
        }
    }
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
Then(/^article body is returned$/, function () {
    const resp = this.data.result.value;
    expect(resp).to.have.status(200);
    const graph = resp.body["@graph"];
    if (graph.length > 0) {
        for (let i = 0; i <= graph[graph.length - 1]; i += 1) {
            expect(graph[i]).to.have.all.keys("@id", "stencila:Heading", "stencila:contentUrl", "stencila:description", "stencila:title",
                "stencila:ImageObject", "stencila:Paragraph", "stencila:caption", "stencila:id", "stencila:label", "stencila:text", "stencila:Cite");
            expect(graph[i]["stencila:contentUrl"]).to.have.keys("@value");
            expect(graph[i]["schema:contentUrl"]).to.contain(".tif");
            expect(graph[i]["stencila:Heading"]).to.have.keys("@id");
            expect(graph[i]["stencila:Cite"]).to.have.keys("@id");
            expect(graph[i]["stencila:ImageObject"]).to.have.keys("@id");
            expect(graph[i]["stencila:Paragraph"]).to.have.keys("@id");
            expect(graph[i]["stencila:caption"]).to.have.keys("@id");
            expect(graph[i]["stencila:id"]).to.have.keys("@value");
            expect(graph[i]["stencila:id"]).to.contain("fig");
            expect(graph[i]["stencila:label"]).to.have.keys("@value");
            expect(graph[i]["stencila:label"]).to.contain("Figure");
            expect(graph[i]["stencila:text"]).to.have.keys("@value");
            expect(graph[i]["stencila:description"]).to.have.keys("@value");
            expect(graph[i]["stencila:title"]).to.have.keys("@value");
            expect(graph[i]["@id"]).to.contain("_:b");
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
