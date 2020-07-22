const puppeteer = require('puppeteer');
const fs = require('fs');

const chrome = '/usr/bin/google-chrome-stable'

async function doWebScraping(searchOrder) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto('https://www.mercadolibre.com.ar', { waitUntil: "networkidle2" });
    await page.type('input.nav-search-input', 'impresora');
    await page.click('button.nav-search-btn');
    await page.waitForSelector('a[class="figure item-image item__js-link"] > img[src^="https"]');
    await page.waitFor(5000);

   

    //const imgs = await page.$$('a[class="figure item-image item__js-link"] > img[src^="https"]');
    const divs = await page.$$('.results-item');
    //console.log(imgs);
    console.log("divs lenght = " + divs.length);
   
    
    const articles = [];

    for (const div of divs) {
        try {
            const title = await div.$eval((".main-title"), (element) => element.innerText);
            const imageUrl = await div.$eval(("img"), (element) => {
                const srcAttr = element.getAttribute("src") ? "src" : "data-src";
                
                return element.getAttribute(srcAttr)
            
            });
            let price = await div.$eval((".price__fraction"), (element) => element.innerText);
            price = price.replace('.', '');

            const article = {
                title,
                imageUrl,
                price
            }
            //console.log(article);
            articles.push(article);
        
        } catch (err) {
            
            console.log("error: ", err);
        }
    }
    console.log(articles)

    await browser.close()

    return articles;
}

exports.themisto = {
    doWebScraping
}