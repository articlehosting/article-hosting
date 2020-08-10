import {Given} from 'cucumber';
import chaiHttp from 'chai-http';
import chai,{expect} from 'chai';
import fs from "fs";
import path from "path";
import config from "../config";

var {Then} = require('cucumber');

var {When} = require('cucumber');

chai.use(chaiHttp);

Given(/^the conversion endpoint$/, async function () {
    const file = await new Promise((resolve, reject) =>
        fs.readFile(
            path.join(config.filesDir, 'xml', 'ijm-00202.xml'),
            (err, data) => err ? reject(err) : resolve(data)
        )
    );

    const res = await chai.request('http://localhost:8000')
        .post('/convert')
        .set('content-type', 'application/xml')
        .send(file.toString());

    expect(res).to.have.status(200);
    expect(res).to.be.json;
});
When(/^user calls the endpoint$/, function () {

});
Then(/^json is generated$/, function () {

});
