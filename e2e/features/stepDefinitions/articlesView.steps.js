const { Given, When, Then } = require('cucumber');

const homePage = require('../../pages/articleHostingHome.page');
const home = new homePage();

Given(/^user is not authenticated$/, () => {
    //todo: left for documentation purpose to mention that no authentication is done
});

When(/^homepage is loaded$/, () => {
    home.openwebdriverIOHomepage();
});

Then(/^articles are loaded$/, () => {
    home.validateArticlesList();
});