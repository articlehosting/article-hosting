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
import {clickOn, clickOnAuthorName} from './actionStepDef'

const sleep = (time) => {
    return new Promise((resolve) => {
        setTimeout(resolve, time)
    })
}

async function pageIsDisplayed(page) {
    const browserUrl = await this.state.driver.executeScript("return window.top.location.href.toString()");
    expect(browserUrl).to.contains(pages[page]);
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


async function fileIsDownloaded(type) {
    const downloadBtnUrl = await this.state.driver.findElement(By.xpath(xpaths[type])).getAttribute("href");
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

async function checkMetadataOfArticle() {
    const authorsList = await this.state.driver.findElement(By.xpath(xpaths["Authors List"]));
    console.log(authorsList.getText());
    const authorListDisplayed = await authorsList.isDisplayed();
    expect(authorListDisplayed).to.equal(true);
    const doi = await this.state.driver.findElement(By.xpath(xpaths["DOI"])).getText();
    expect(doi).to.match(/\d{2}\.\d{4}\/\d{2,}/);
    const posted = await this.state.driver.findElement(By.xpath(xpaths["Posted Date"])).getText();
    expect(posted).to.match(/\w{3}\s\d{2},\s\d{4}/);

}

//Then section

Then(/^a list of 10 articles is displayed$/, {timeout: 15 * 1000}, async function () {
    const result = await this.state.driver.findElements(By.xpath(xpaths["List of articles"]));
    expect(result.length).to.equal(10);
    const buffer = await this.state.driver.takeScreenshot();
    this.attach(buffer, 'image/png');
});

Then(/^images are loaded in the article$/, {timeout: 150 * 1000}, async function () {
    const list = this.data.listOfAticles;
    for (let i = 1; i <= list.length; i += 1) {
        const articleXpath = `(//*[@class='header title'])[${i}]`;
        await this.state.driver.findElement(By.xpath(articleXpath)).click();
        const result = await this.state.driver.findElement(By.xpath(xpaths["Page header"])).getText();
        console.log("Page header: ", result)
        await imagesAreLoaded.call(this);
        await this.state.driver.get(config.url);
    }
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

Then(/^user is redirected to the "([^"]*)" page$/, {timeout: 50 * 1000}, async function (reference) {
    const list = this.data.listOfAticles;
    for (let i = 1; i <= list.length; i += 1) {
        const articleXpath = `(//*[@class='header title'])[${i}]`;
        await this.state.driver.findElement(By.xpath(articleXpath)).click();
        const author = await this.state.driver.findElement(By.xpath(xpaths["Authors references"])).getAttribute("href");
        https.get(author, (res) => {
            expect(res.statusCode).to.equal(200);
        })
        await this.state.driver.get(config.url);
    }
});

Then(/^user download article in:$/, {timeout: 90 * 1000}, async function (downloadTypes) {
    const list = this.data.listOfAticles;
    for (let i = 1; i <= list.length; i += 1) {
        const articleXpath = `(//*[@class='header title'])[${i}]`;
        await this.state.driver.findElement(By.xpath(articleXpath)).click();
        await pageIsDisplayed.call(this, "Article");
        for (const type of downloadTypes.rawTable.flat()) {
            await clickOn.call(this, type);
            await fileIsDownloaded.call(this, type);
        }
        await this.state.driver.get(config.url);
    }
});

Then(/^main content and inner sections are displayed$/, {timeout: 200 * 1000}, async function (articleSections) {
    const list = this.data.listOfAticles;
    for (let i = 1; i <= list.length; i += 1) {
        const articleXpath = `(//*[@class='header title'])[${i}]`;
        await this.state.driver.findElement(By.xpath(articleXpath)).click();
        await pageIsDisplayed.call(this, "Article");
        await checkTitleAndAuthors.call(this);
        await checkSections.call(this, articleSections);
        await checkTablesAreDisplayed.call(this);
        await imagesAreLoaded.call(this);
        await this.state.driver.findElement(By.xpath('//div[4]/a/strong')).click();
        await checkPDFisDownloaded.call(this)
        await this.state.driver.get(config.url);
    }
});

Then(/^"([^"]*)" with required elements is displayed$/, {timeout: 150 * 1000}, async function (buttonName) {
    const list = this.data.listOfAticles;
    for (let i = 1; i <= list.length; i += 1) {
        const articleXpath = `(//*[@class='header title'])[${i}]`;
        await this.state.driver.findElement(By.xpath(articleXpath)).click();
        await pageIsDisplayed.call(this, "Article");
        await clickOn.call(this, buttonName)
        await pageIsDisplayed.call(this, "Figures");
        await imagesAreLoaded.call(this);
        await clickOn.call(this, "Article button")
        await pageIsDisplayed.call(this, "Article");
        await this.state.driver.get(config.url);
    }
});

Then(/^user check Download and View buttons for image$/,{timeout: 150 * 1000}, async function () {
    const list = this.data.listOfAticles;
    for (let i = 1; i <= list.length; i += 1) {
        const articleXpath = `(//*[@class='header title'])[${i}]`;
        await this.state.driver.findElement(By.xpath(articleXpath)).click();
        await pageIsDisplayed.call(this, "Article");
        await clickOn.call(this, "Figures and data" )
        await pageIsDisplayed.call(this, "Figures");
        await clickOn.call(this, "Download img");
        await fileIsDownloaded.call(this, "Download img");
        await clickOn.call(this, "View");
        await pageIsDisplayed.call(this, "View Page");
        await this.state.driver.get(config.url);
    }
});

Then(/^user downloads article form "([^"]*)" page$/, {timeout: 150 * 1000}, async function (pageName) {
    const list = this.data.listOfAticles;
    for (let i = 1; i <= list.length; i += 1) {
        const articleXpath = `(//*[@class='header title'])[${i}]`;
        await this.state.driver.findElement(By.xpath(articleXpath)).click();
        await pageIsDisplayed.call(this, "Article");
        await clickOn.call(this, "Figures and data")
        await pageIsDisplayed.call(this, pageName);
        await clickOn.call(this, "Article PDF");
        await checkPDFisDownloaded.call(this);
        await this.state.driver.get(config.url);
    }
});
Then(/^user check the citation on "([^"]*)" page$/, {timeout: 50 * 1000},async function (pageName) {
    const list = this.data.listOfAticles;
    for (let i = 1; i <= list.length; i += 1) {
        const articleXpath = `(//*[@class='header title'])[${i}]`;
        await this.state.driver.findElement(By.xpath(articleXpath)).click();
        await pageIsDisplayed.call(this, "Article");
        await clickOn.call(this, "Figures and data")
        await pageIsDisplayed.call(this, pageName);
        await checkMetadataOfArticle.call(this);
        await this.state.driver.get(config.url);
    }
});

Then(/^all required elements of article are displayed$/, async function () {
    const list = this.data.listOfAticles;
    for (const item of list) {
        const title = await this.state.driver.findElement(By.xpath(xpaths["Article Title"]));
        const titleDisplayed = await title.isDisplayed();
        expect(titleDisplayed).to.equal(true);
        const authorsList = await this.state.driver.findElement(By.xpath(xpaths["Authors List"]));
        console.log(authorsList.getText());
        const authorListDisplayed = await authorsList.isDisplayed();
        expect(authorListDisplayed).to.equal(true);
        const doi = await this.state.driver.findElement(By.xpath(xpaths["DOI home"])).getText();
        expect(doi).to.match(/\d{2}\.\d{4}\/\d{2,}/);
        const posted = await this.state.driver.findElement(By.xpath(xpaths["Posted Date home"])).getText();
        expect(posted).to.match(/\w{3}\s\d{2},\s\d{4}/);
        const preview = await this.state.driver.findElement(By.xpath(xpaths["Preview"])).isDisplayed();
        expect(preview).to.equal(true);
        const subject = await this.state.driver.findElement(By.xpath(xpaths["Subjects List"])).isDisplayed();
        expect(subject).to.equal(true);
    }
});

Then(/^"([^"]*)" are downloaded$/, {timeout: 150 * 1000}, async function (file) {
    const list = this.data.listOfAticles;
    for (let i = 1; i <= list.length; i += 1) {
        const articleXpath = `(//*[@class='header title'])[${i}]`;
        await this.state.driver.findElement(By.xpath(articleXpath)).click();
        await pageIsDisplayed.call(this, "Article");
        const files = await this.state.driver.findElements(By.xpath(xpaths[file]));
        for (let i = 1; i <= files.length / 2; i += 1) {
            files[i].click();
        }
        for (let i = 1; i <= files.length; i += 1) {
            const downloadUrl = await this.state.driver.findElement(By.xpath(`(//div[@class='ui list']/div//div[2]/a)[${i}]`)).getAttribute("href");

            https.get(downloadUrl, (res) => {
                expect(res.statusCode).to.equal(200);
            })
        }
        await this.state.driver.get(config.url);
    }
})
;

Then(/^citation has the correct format$/, async function () {
    const citation = await this.state.driver.findElement(By.xpath(xpaths["Cite as"])).getText();
    console.log(citation);
    const elements = citation.split(';')
    expect(elements.length).to.equal(5);
    expect(elements[0]).to.match(/\w/);
    expect(elements[1]).to.match(/\d{4}/);
    console.log("Year", elements[1]);
    expect(elements[2]).to.match(/\w/);
    expect(elements[3]).to.match(/\d{2} (\(\d)\)/);
    expect(elements[4]).to.match(/\d\-\d/);
    const doi = citation.split('DOI:');
    console.log("DOI", doi);
    expect(doi[1]).to.not.equal(null);
    expect(doi[1]).to.not.equal(" ");
});

//Reusable steps

Then(/^title and author are displayed$/, checkTitleAndAuthors);

Then(/^"([^"]*)" page is displayed$/, {timeout: 30 * 1000}, pageIsDisplayed);

Then(/^Images are loaded$/, {timeout: 20 * 1000}, imagesAreLoaded);

Then(/^all tables are displayed$/, {timeout: 20 * 1000}, checkTablesAreDisplayed);

Then(/^following sections are displayed:$/, checkSections);

Then(/^Article PDF file is downloaded$/, {timeout: 10 * 1000}, checkPDFisDownloaded);

Then(/^a "([^"]*)" file is downloaded$/, fileIsDownloaded);

Then(/^article metadata has the correct format$/,checkMetadataOfArticle);
