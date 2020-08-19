export default {
    "Linked volume": "//*[@id='maincontent']/header/div[5]/div/a",
    "First article": "//*[@id='listing']/li[1]/div/header/h4/a",
    "Second article": "//*[@id='listing']/li[2]/div/header/h4/a",
    "List of articles": "//*[@id='listing']/li",
    "Page header": "//*[@id='maincontent']//h1",
    "Article type": "//*[@id='maincontent']/header/div[4]/div/a",
    "Article preview footer": "//*[@id='listing']/li[2]/div/footer/div[1]/a",
    "Subjects": "//*[@id='subjects']//p",
    "Special article types": "//*[@id='section-listing--types']",
    "Random issue link": "//*[@id='listing']/li[2]/div/div/div/a",
    "Download": "//a[@href='#downloads']",
    "Volume from category": "//*[@id='listing']/li[1]/div/div/div/a",
    "Search button": "//*[@id='siteHeader']/div[2]/nav[2]/ul/li[3]/a/picture/img",
    "Search input": "//*[@id='search']/fieldset/label/input",
    "Search submit": "//*[@id='search']/fieldset/button[2]",
    "Images": "//*[contains(@id,'fig')]//img",
    "Tables":"//table",
    "Issues Group":"//div[contains(@class,'--four-twelfths grid-secondary-column')]",
    "Years of issues":"//section[@class='article-section article-section--js']",
    "Authors references":"//div[contains(@class,'ui segment left aligned')]/div/div[1]//a[1]",
    "Author name":"\"author:A Alesina\" - Google Academic",

    downloadButtons: {
        "Article PDF": "//*[@id='downloads']/ul[1]/li/a",
        "BibTeX": "//*[@id='downloads']/ul[2]/li[1]/a",
        "RIS": "//*[@id='downloads']/ul[2]/li[2]/a",
        "Mendeley": "//*[@id='downloads']/ul[3]/li[1]/a",
        "ReadCube": "//*[@id='downloads']/ul[3]/li[2]/a",
        "Papers": "//*[@id='downloads']/ul[3]/li[3]/a"
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
        "Demography": "//input[@value='demography']",
        "Dynamic microsimulation": "//input[@value='dynamic-microsimulation']",
        "Education": "//input[@value='education']",
        "Environment": "//input[@value='environment']",
        "Finance": "//input[@value='finance']",
        "Firm behaviour": "//input[@value='firm-behaviour']",
        "Health": "//input[@value='health']",
        "Housing": "//input[@value='housing']",
        "Innovation": "//input[@value='innovation']",
        "Labour supply and demand": "//input[@value='labour-supply-demand']",
        "Methodology": "//input[@value='methodology']",
        "Micro-macro linkage": "//input[@value='micro-macro-linkage']",
        "Miscellaneous": "//input[@value='miscellaneous']",
        "Pensions and retirement": "//input[@value='pensions-retirement']",
        "Spatial microsimulation": "//input[@value='spatial-microsimulation']",
        "Taxes and benefits": "//input[@value='taxes-benefits']",
        "Trade": "//input[@value='trade']",
        "Transport": "//input[@value='transport']",
        "Institutions and incentives": "//input[@value='institutions-incentives']"
    },
    mendeley: {
        "Email": "//*[@id='bdd-email']",
        "Continue": "//*[@id='bdd-elsPrimaryBtn']",
        "Password": "//*[@id='bdd-password']",
        "Import": "//*[@id='main-content']/div[1]/div[1]/div[2]/button",
        "Library": "//a[@href='/library/']",
        "x":"//*[@id='wj-step-1']/span",
        "x1":"//*[@id='wj-step-2']/span",
        "FirstElement":"//*[@id='document-list']//li[1]/h2"
    }
}
