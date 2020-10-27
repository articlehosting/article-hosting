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
Then(/^metada of article is returned$/, function () {
    const resp = this.data.result.value;
    expect(resp).to.have.status(200);
    const graph = resp.body["@graph"];
    if (graph.length > 0) {
        for (let i = 0; i <= graph[graph.length - 1]; i += 1) {
            expect(graph[i]).to.have.all.keys("@id", "stencila:title", "stencila:about", "stencila:author",
                "stencila:dateAccepted", "stencila:datePublished", "stencila:dateReceived", "stencila:isPartOf");
            expect(graph[i]["stencila:title"]).to.have.keys("@value");
            expect(graph[i]["stencila:about"]).to.have.keys("@id");
            expect(graph[i]["stencila:author"]).to.have.keys("@id");
            expect(graph[i]["stencila:dateAccepted"]).to.have.keys("@id");
            expect(graph[i]["stencila:datePublished"]).to.have.keys("@id");
            expect(graph[i]["stencila:dateReceived"]).to.have.keys("@id");
            expect(graph[i]["stencila:isPartOf"]).to.have.keys("@id");
            expect(graph[i]["@id"]).to.contain("_:b");
        }
    }
});

Then(/^the list of articles is returned$/, function () {
    const resp = this.data.result.value;
    expect(resp).to.have.status(200);
    const graph = resp.body["@graph"];
    if (graph.length > 0) {
        for (let i = 0; i <= graph[graph.length - 1]; i += 1) {
            expect(graph[i]).to.have.all.keys("@id", "stencila:title", "hydra:Link", "hydra:member");
            expect(graph[i]["stencila:title"]).to.have.keys("@value");
            expect(graph[i]["hydra:Link"]).to.have.keys("@id");
            expect(graph[i]["'hydra:member"]).to.have.keys("@value");
            expect(graph[i]["@id"]).to.contain("_:b");
        }
    }
    const nodeRoute = graph[graph.length - 1];
    expect(nodeRoute).to.have.all.keys("@id", "@type", "schema:Article", "hydra:manages", "schema:name");
    expect(nodeRoute["@id"]).to.contain("http://article.hosting/rdf/articles");
    expect(nodeRoute["@type"]).to.contain("schema:WebAPI");
    expect(nodeRoute["schema:Article"]).to.be.an('array');
    expect(nodeRoute["schema:name"]).to.contain('Article Hosting RDF Graph: List Articles');
    expect(nodeRoute["hydra:manages"]).to.have.keys("@id");
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
