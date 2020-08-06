const process = require('process');
const puppeteer = require('puppeteer');



process.on('message', message => {
    console.log(`[THEMISTO]Received message from ganymede: ${message}`);
     doWebScraping(message)
});




async function doWebScraping(searchOrder) {
    
    function priceFormatter(price) {
        return price.replace('.', '');
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto('https://www.mercadolibre.com.ar', { waitUntil: 'networkidle2' });
    await page.type('input.nav-search-input', searchOrder.query);
    await page.click('button.nav-search-btn');
    await page.waitForSelector('a[class="figure item-image item__js-link"] > img[src^="https"]');
    await page.waitFor(1000);

   

    const divs = await page.$$('.results-item');
    
    console.log('divs lenght = ' + divs.length);
   
    const products = [];



    for (let div of divs) {
        try {
            //obtaining SKU
            const SKU = await div.$eval(('.rowItem.item.highlighted.item--stack.new'), element => {
                const idAttr = element.getAttribute('id');
                return idAttr;
            });

            //Going into product details
            await page.click(`#${SKU}`);
            await page.waitForSelector('.ui-pdp-container.ui-pdp-container--pdp')

            //Obtaining product details
            const title = await page.$eval(('.ui-pdp-title'), (element) => element.innerText);
            const price = await page.$eval(('.price-tag-fraction'), (element) => element.innerText);
            price = priceFormatter(price);

            const originalPrice = page.$eval(('.price-tag.ui-pdp-price__part.ui-pdp-price__original-value'), (element) => element.innerText);
            originalPrice = priceFormatter(originalPrice);

            const category = page.$eval(('.ui-pdp-breadcrumb__link'), element => element.getAttribute('href'));
            const description = page.$eval(('.ui-pdp-description__content'), element.innerText);

            const imageElements = await page.$$('img.ui-pdp-image > .ui-pdp-thumbnail__picture');
            const images = [];

            for (let img of imageElements) {
                const image = await img.$eval(('img'), (element) => {
                    const srcAttr = element.getAttribute('src') ? 'src' : 'srcset';
                    
                    return element.getAttribute(srcAttr);
                
                });

                images.push(image);

            }

            const product = {
                SKU,
                title,
                price,
                originalPrice,
                category,
                description,
                images,
                relatedSearch
            }
            //console.log(product);
            products.push(product);
        
        } catch (err) {
            
            console.log('error: ', err);
        }
    }
    //console.log(products)

    await browser.close()

    process.send(JSON.stringify(products));
};



module.exports = {
    doWebScraping
}
