import {Then} from 'cucumber';
import {expect} from 'chai';
import {By} from 'selenium-webdriver';
import * as https from 'https';
import * as fs from 'fs';
import path from 'path';
import axios from 'axios';

import config from '../config';
import xpaths from '../config/xpaths';
import pages from '../config/pages';

const sleep = (time) => {
    return new Promise((resolve) => {
        setTimeout(resolve, time)
    })
}

async function articlePageIsDisplayed() {
    const browserUrl = await this.state.driver.executeScript("return window.top.location.href.toString()");
    expect(browserUrl).to.contains('articles');
    const buffer = await this.state.driver.takeScreenshot();
    this.attach(buffer, 'image/png');
}

async function checkPDFisDownloaded() {
    const downloadBtnUrl = await this.state.driver.findElement(By.xpath(xpaths["Article PDF"])).getAttribute("href");
    const [filename] = path.basename(downloadBtnUrl).split("?", 1);
    await new Promise((resolve, reject) =>
        https.get(downloadBtnUrl, (res) => {
            expect(res.statusCode).to.equal(200);
            const file = fs.createWriteStream(path.join(config.downloadDir, filename));
            res.pipe(file);
            res.on('end', () => resolve());
        })
            .on('error', (err) => reject(err))
    );
}

async function checkSections(articleSections) {
    for (const section of articleSections.rawTable.flat()) {
        console.log("Section: " + section);
        const paragraphNameWebElement = await this.state.driver.findElement(By.xpath("//*[contains (text(),'" + section + "')]"));
        const paragraphNameArray = (await paragraphNameWebElement.getText()).split(".");
        const resultValue = paragraphNameArray[paragraphNameArray.length - 1].toString().trim();
        expect(resultValue).to.equal(section);
        const sectionIsDisplayed = await paragraphNameWebElement.isDisplayed();
        expect(sectionIsDisplayed).to.equal(true);
    }
}

async function checkTitleAndAuthors() {
    const title = await this.state.driver.findElement(By.xpath(xpaths["Title"])).isDisplayed();
    const authors = await this.state.driver.findElement(By.xpath(xpaths["Authors"])).isDisplayed();
    expect(title).to.equal(true);
    expect(authors).to.equal(true);
}

async function imagesAreLoaded() {
    const allImages = await this.state.driver.findElements(By.xpath(xpaths["Images"]));
    for (const image of allImages) {
        const imageURL = await image.getAttribute("src");
        const response = await axios.get(imageURL);
        expect(response.status).to.equal(200);
        const buffer = await this.state.driver.takeScreenshot();
        this.attach(buffer, 'image/png');
    }
}

async function checkTablesAreDisplayed() {
    const allTables = await this.state.driver.findElements(By.xpath(xpaths["Tables"]));
    for (const table of allTables) {
        const tableIsDisplayed = await table.isDisplayed();
        expect(tableIsDisplayed).to.equal(true);
    }
    this.attach(await this.state.driver.takeScreenshot(), 'image/png');
}

//Then section

Then(/^a list of 10 articles is displayed$/, {timeout: 15 * 1000}, async function () {
    const result = await this.state.driver.findElements(By.xpath(xpaths["List of articles"]));
    expect(result.length).to.equal(10);
    const buffer = await this.state.driver.takeScreenshot();
    this.attach(buffer, 'image/png');
});

Then(/^list of articles is displayed$/, {timeout: 15 * 1000}, async function () {
    const result = await this.state.driver.findElements(By.xpath(xpaths["List of articles"]));
    this.data.listOfAticles = result.map((_, index) => index + 1);
    expect(result.length).to.equal(3);
    const buffer = await this.state.driver.takeScreenshot();
    this.attach(buffer, 'image/png');
});

//compare header of the page
Then(/^"([^"]*)" page is displayed$/, {timeout: 15 * 1000}, async function (articleType) {
    const result = await this.state.driver.findElement(By.xpath(xpaths["Page header"])).getText()
    expect(result).to.equal(pages[articleType]);
});

Then(/^the article type is "([^"]*)"$/, {timeout: 15 * 1000}, async function (articleType) {
    const result = await this.state.driver.findElement(By.xpath(xpaths["Article type"])).getText()
    expect(result).to.equal(articleType);
});

Then(/^article preview doesn't contain date$/, async function () {
    const result = await this.state.driver.findElement(By.xpath(xpaths["Article preview footer"])).getId()
    expect(result).not.equal("\\w{3}\\s\\d{2},\\s\\d{4}");
});

Then(/^section "([^"]*)" is displayed$/, async function (sectionName) {
    const result = await this.state.driver.findElement(By.xpath(xpaths["Subjects"])).getText();
    expect(result).to.equal(sectionName);
});

Then(/^the following special type of articles is displayed:$/, async function (articleTypes) {
    const types = articleTypes.rawTable.flat()
    const elements = await this.state.driver.findElement(By.xpath(xpaths["Special article types"])).getText()
    expect(result).to.not.equal(null);
    const parsed = elements.split("\n")
    expect(parsed).to.eql(types)
});

Then(/^a "([^"]*)" file is downloaded$/, async function (type) {
    const elemMap = xpaths.downloadButtons
    const downloadBtnUrl = await this.state.driver.findElement(By.xpath(elemMap[type])).getAttribute("href");
    const [filename] = path.basename(downloadBtnUrl).split("?", 1);
    await new Promise((resolve, reject) =>
        http.get(downloadBtnUrl, (res) => {
            expect(res.statusCode).to.equal(200);
            const file = fs.createWriteStream(path.join(config.downloadDir, filename));
            res.pipe(file);
            res.on('end', () => resolve());
        })
            .on('error', (err) => reject(err))
    );
});

Then(/^article is displayed in Mendeley$/, {timeout: 50 * 1000}, async function () {
    const expectedArticleName = this.data.currentArticle.name;
    const cancel1 = await this.state.driver.findElement(By.xpath(xpaths.mendeley["x"]));
    await cancel1.click();
    const cancel2 = await this.state.driver.findElement(By.xpath(xpaths.mendeley["x1"]));
    await cancel2.click();
    const actualArticleName = await this.state.driver.findElement(By.xpath(xpaths.mendeley["FirstElement"])).getText();
    await expect(expectedArticleName).to.equal(actualArticleName);
});

Then(/^list of issue group is displayed$/, async function () {
    const element = await this.state.driver.findElement(By.xpath(xpaths["Issues Group"]));
    await element.isDisplayed;
});

Then(/^dropdown with list of issues by "([^"]*)" is displayed$/, async function (years) {
    const results = await this.state.driver.findElements(By.xpath(xpaths["Years of issues"]));
    for (const issue of results) {
        const issueText = await issue.getText();
        console.log("Text from issue: " + issueText);
        const period = years.split("-");
        const volumeYear = issueText.split(" ");
        console.log("Volume year: " + volumeYear[3]);
        expect(parseInt(volumeYear[3])).to.be.within(parseInt(period[1]), parseInt(period[0]));
    }
    const buffer = await this.state.driver.takeScreenshot();
    this.attach(buffer, 'image/png');
});

Then(/^user is redirected to the "([^"]*)" page$/, async function (reference) {
    const title = await this.state.driver.getTitle()
    expect(title).to.equal(xpaths["Author name"]);
    return title;
});

Then(/^main content and inner sections are displayed$/, {timeout: 50 * 1000}, async function (articleSections) {
    const list = this.data.listOfAticles;
    for (let i = 1; i <= list.length; i += 1) {
        const articleXpath = `(//*[@class='header title'])[${i}]`;
        await this.state.driver.findElement(By.xpath(articleXpath)).click();
        await articlePageIsDisplayed.call(this);
        await checkTitleAndAuthors.call(this);
        await checkSections.call(this, articleSections);
        await checkTablesAreDisplayed.call(this);
        await imagesAreLoaded.call(this);
        await this.state.driver.findElement(By.xpath('//div/div[1]/p[4]/a')).click();
        await checkPDFisDownloaded.call(this)
        await this.state.driver.get(config.url);
    }
});

//Reusable steps

Then(/^title and author are displayed$/, checkTitleAndAuthors);

Then(/^Article page is displayed$/, {timeout: 30 * 1000}, articlePageIsDisplayed);

Then(/^Images in article are loaded$/, {timeout: 20 * 1000}, imagesAreLoaded);

Then(/^all tables are displayed$/, {timeout: 20 * 1000}, checkTablesAreDisplayed);

Then(/^following sections are displayed:$/, checkSections);

Then(/^Article PDF file is downloaded$/, checkPDFisDownloaded);
