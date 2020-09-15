import {Given, Then, When} from 'cucumber';
import {By} from 'selenium-webdriver';

Given(/^Microsim site Home page was loaded$/, {timeout: 60 * 1000}, async function () {
    const buffer = await this.state.driver.takeScreenshot();

    this.attach(buffer, 'image/png');
    await this.microsim.homepage.navigate();
    const buffer2 = await this.state.driver.takeScreenshot();

    this.attach(buffer2, 'image/png');
});

When(/^user click About link$/, async function () {
    const buffer2 = await this.state.driver.takeScreenshot();

    this.attach(buffer2, 'image/png');

    await this.microsim.homepage.clickAboutLink();
    const buffer3 = await this.state.driver.takeScreenshot();

    this.attach(buffer3, 'image/png');
});

Then(/^the About page is loaded$/, async function () {
    const buffer2 = await this.state.driver.takeScreenshot();

    this.attach(buffer2, 'image/png');

    await this.microsim.homepage.waitForTitle();
    const buffer3 = await this.state.driver.takeScreenshot();

    this.attach(buffer3, 'image/png');
});
