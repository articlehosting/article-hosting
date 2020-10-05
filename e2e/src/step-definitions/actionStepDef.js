import {Given, When} from 'cucumber';
import {expect} from 'chai';
import {By} from 'selenium-webdriver';

import config from '../config';
import xpaths from '../config/xpaths';

const sleep = (time) => {
    return new Promise((resolve) => {
        setTimeout(resolve, time)
    })
}
 async function clickOnAuthorName() {
    try {
        const authors = await this.state.driver.findElements(By.xpath(xpaths["Authors references"]));
        for (const author of authors) {
            author.click();
            const buffer = await this.state.driver.takeScreenshot();
            this.attach(buffer, 'image/png');
        }
    } catch (e) {
        console.log("Authors :" + e);
    }
}

 async function clickOn(element) {
    const result = await this.state.driver.findElement(By.xpath(xpaths[element]));
    await result.click();
    const buffer = await this.state.driver.takeScreenshot();
    this.attach(buffer, 'image/png');
}

Given(/^user navigates to "([^"]*)" page$/, {timeout: 50 * 1000}, async function (pageName) {
    try {
        if (pageName === "Home") {
            await this.state.driver.get(config.url)
        } else {
            await this.state.driver.get(`${config.url}/${pageName}`);
        }
        const buffer = await this.state.driver.takeScreenshot();

        this.attach(buffer, 'image/png');
    } catch (e) {
        console.log(e);
    }
});

//When section

When(/^list of articles is displayed$/, {timeout: 15 * 1000}, async function () {
    const result = await this.state.driver.findElements(By.xpath(xpaths["List of articles"]));
    this.data.listOfAticles = result.map((_, index) => index + 1);
    expect(result.length).not.equal(0);
    const buffer = await this.state.driver.takeScreenshot();
    this.attach(buffer, 'image/png');
});

When(/^user is on the Home page$/, async function () {
    const title = await this.state.driver.getTitle()
    expect(title).to.equal("Hive Articles");
    return title;
});

When(/^user clicks on "([^"]*)" from the list$/, {timeout: 30 * 1000}, async function (article) {
    try {
        const articleElement = await this.state.driver.findElement(By.xpath(xpaths[article]))
        const articleName = (await articleElement.getText());
        console.log("articleName: " + articleName);
        this.data.currentArticle.name = articleName;
        await articleElement.click();
        const buffer = await this.state.driver.takeScreenshot();
        this.attach(buffer, 'image/png');
    } catch (e) {
        console.log(e);
    }
});

When(/^user navigates to "([^"]*)"$/, {timeout: 30 * 1000}, async function (articleNumber) {
    await this.state.driver.get(`${config.url}articles/${articleNumber}`);
    const buffer = await this.state.driver.takeScreenshot();
    this.attach(buffer, 'image/png');
});

When(/^user navigates to subject "([^"]*)"$/, async function (subjectNumber) {
    await this.state.driver.get(`${config.url}subjects/${subjectNumber}`);
    const buffer = await this.state.driver.takeScreenshot();
    this.attach(buffer, 'image/png');
});

When(/^user clicks on 'Linked volume' of the random article$/, async function () {
    try {
        const volumeElement = await this.state.driver.findElement(By.xpath(xpaths["Random issue link"]));
        const volumeName = (await volumeElement.getText());
        console.log("volumeName: " + volumeName);
        this.data.currentVolume.name = volumeName;
        console.log("datastore: " + JSON.stringify(this.data, null, '\t'));
        await volumeElement.click();
        const buffer = await this.state.driver.takeScreenshot();
        this.attach(buffer, 'image/png');
    } catch (e) {
        console.log(e);
    }
});

When(/^user selects "([^"]*)"$/, {timeout: 15 * 1000}, async function (extraRef) {
    const elemMap = xpaths.downloadButtons
    expect(elemMap[extraRef]).to.be.a('string');
    const result = await this.state.driver.findElement(By.xpath(elemMap[extraRef]));
    await result.click();
});

When(/^user clicks on "([^"]*)" subject$/, async function (subject) {
    try {
        const result = await this.state.driver.findElement(By.linkText(subject));
        await result.click();
        const buffer = await this.state.driver.takeScreenshot();
        this.attach(buffer, 'image/png');
    } catch (e) {
        console.log(e);
    }
});

When(/^user searches for "([^"]*)"$/, async function (keys) {
    const result = await this.state.driver.findElement(By.xpath(xpaths["Search input"]))
    result.sendKeys(keys);
    const submit = await this.state.driver.findElement(By.xpath(xpaths["Search submit"]))
    await submit.click();
    const buffer = await this.state.driver.takeScreenshot();
    this.attach(buffer, 'image/png');
});

When(/^user selects "([^"]*)" checkbox$/, async function (element) {
    const result = await this.state.driver.findElement(By.xpath(xpaths.researchCategories[element]));
    await result.click();
    const buffer = await this.state.driver.takeScreenshot();
    this.attach(buffer, 'image/png');
});

When(/^user logs in to Mendeley$/, {timeout: 101 * 1000}, async function () {
    const username = await this.state.driver.findElement(By.xpath(xpaths.mendeley["Email"]));
    const continueButton = await this.state.driver.findElement(By.xpath(xpaths.mendeley["Continue"]));
    await username.sendKeys(process.env.mendeley_username);
    await continueButton.click();
    const password = await this.state.driver.findElement(By.xpath(xpaths.mendeley["Password"]));
    const submit = await this.state.driver.findElement(By.xpath(xpaths.mendeley["Continue"]));
    await password.sendKeys(process.env.mendeley_password);
    await submit.click();
});

When(/^user clicks on "([^"]*)" (button|menu item)$/, {timeout: 50 * 1000}, async function (elementName, type) {
    const result = await this.state.driver.findElement(By.xpath(xpaths.mendeley[elementName]));
    await result.click();
});

When(/^user clicks on issue group "([^"]*)"$/, async function (groupName) {
    const element = await this.state.driver.findElement(By.xpath("//h2[contains (text(),'" + groupName + "')]"));
    await element.click();
    const buffer = await this.state.driver.takeScreenshot();
    this.attach(buffer, 'image/png');

});

When(/^user clicks on author name$/, {timeout: 30 * 1000}, clickOnAuthorName);

When(/^user clicks on "([^"]*)"$/, {timeout: 15 * 1000}, clickOn);




