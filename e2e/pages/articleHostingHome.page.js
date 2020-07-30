const NativePage = require('./native.page.js');

const articleHomePageData = require('../testData/articles.data');

class articleHostingHomePage extends NativePage {

    openwebdriverIOHomepage() {
       browser.url(articleHomePageData['url']);
    }

    validateArticlesList() {
        //todo: iterate thought test data and check that article list is present using chai
    }
}

module.exports = articleHostingHomePage;