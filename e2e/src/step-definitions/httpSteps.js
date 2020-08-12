import {Given, When, Then} from 'cucumber';
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
