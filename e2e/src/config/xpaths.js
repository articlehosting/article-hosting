export default {
    "First article": "(//div/div/div/div/a)[1]",
    "List of articles": "//div[@class='item']",
    "Page header": "//div[1]/h1",
    "Download": "//a[@href='#downloads']",
    "Images": "//*[contains(@id,'fig')]//img",
    "Tables": "//table",
    "Authors references": "//div[contains(@class,'ui segment left aligned')]/div/div[1]//a[1]",
    "Author name": "\"author:A Alesina\" - Google Academic",
    "Article PDF": "//div/div[1]/p[4]/a",
    "Title": "//*[@id='title']",
    "Authors": "//*[@id='authors']",
    "Figures and data":"//strong[contains(text(),'Figures and data')]",
    "Article button":"//div[2]/div[1]/div/div[1]",
    "Cite as":"//div[1]/p[3]/span/span",
    downloadButtons: {
        "Article PDF": "",
        "BibTeX": "",
        "RIS": "",
        "Mendeley": "",
    },
    articleSections: {
        "Abstract": "//h2[contains (text(),'Abstract')]",
        "Introduction": "//h2[contains (text(),'Introduction')]",
        "Conclusions": "//h2[contains (text(),'Conclusions')]",
        "Appendix": "//h2[contains (text(),'Appendix')]",
        "References": "//h2[contains (text(),'References')]",
        "Article and author information": "//h2[contains (text(),'Article and author information')]"
    },
    researchCategories: {
        "Consumption, savings and wealth": "//input[@value='consumption-savings-wealth']",
    },
    mendeley: {
        "Email": "//*[@id='bdd-email']",
        "Continue": "//*[@id='bdd-elsPrimaryBtn']",
        "Password": "//*[@id='bdd-password']",
        "Import": "//*[@id='main-content']/div[1]/div[1]/div[2]/button",
        "Library": "//a[@href='/library/']",
        "x": "//*[@id='wj-step-1']/span",
        "x1": "//*[@id='wj-step-2']/span",
        "FirstElement": "//*[@id='document-list']//li[1]/h2"
    }
}
