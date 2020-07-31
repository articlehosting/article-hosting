const PageFactory = require('./page.factory.js');

const unixTime = Math.floor(Date.now() / 1000);

class NativePage {

  constructor() {
    this.page = {};
  }

  getPage(name) {
    if (!(name in this.page)) {
      this.page.name = PageFactory.getNativePage(name);
    }
    return this.page.name;
  }

  #getEpochTime() {
    return unixTime;
  }

  screenshot(message) {
    browser.saveScreenshot('./reports/html/screenshot' + this.#getEpochTime() + '.png');
  }
}

module.exports = NativePage;
