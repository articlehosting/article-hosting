const cucumberJson = require ('wdio-cucumberjs-json-reporter').default;
const {Before, After, Status} = require('cucumber');

Before((scenarioResult)=>{
    cucumberJson.attach(browser.takeScreenshot(), 'image/png');

    return scenarioResult.status;
});

After((scenarioResult)=>{
    cucumberJson.attach(browser.takeScreenshot(), 'image/png');

    return scenarioResult.status;
});