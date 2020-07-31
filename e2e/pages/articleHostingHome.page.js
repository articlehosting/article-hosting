const NativePage = require('./native.page.js');
const articleHomePageData = require('../testData/articles.data');
const cucumberJson = require ('wdio-cucumberjs-json-reporter').default;

class articleHostingHomePage extends NativePage {

    dataStore = {
        "currentArticle": {
            "name":""
        }
    };

    openwebdriverIOHomepage() {
        this.screenshot("");
        cucumberJson.attach(browser.takeScreenshot(), 'image/png');
        browser.url(articleHomePageData['url']);
        const articleHeaderElement = $('h1.ui');
        articleHeaderElement.waitForDisplayed({timeout: 3000});
        const articleHeaderText = articleHeaderElement.getText();
        this.dataStore.currentArticle.name = articleHeaderText;
        console.log("currentArticleName: " + articleHeaderText);
        cucumberJson.attach(browser.takeScreenshot(), 'image/png');
        cucumberJson.attach("test: " + articleHeaderText,'text');
        this.screenshot("");
    }

    validateArticlesList() {
        this.screenshot("");
        cucumberJson.attach(browser.takeScreenshot(), 'image/png');
        //todo: iterate thought test data and check that article list is present using
        console.log("expectedArticleName: " + this.dataStore.currentArticle.name);
        cucumberJson.attach(browser.takeScreenshot(), 'image/png');
        this.screenshot("");
    }
}

module.exports = articleHostingHomePage;