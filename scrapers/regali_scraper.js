import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';

async function scrapeRegaliaOrnaments() {
    const url = 'https://www.regaliaornaments.com/';
    
    // Headers to mimic browser request
    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
    };

    try {
        // Make the request to the website
        const response = await axios.get(url, { headers });
        
        // Parse the HTML content
        const $ = cheerio.load(response.data);
        
        // Find all product cards with class 'card card--standard'
        const products = [];
        $('.card.card--standard').each((index, card) => {
            try {
                // Extract the title of the product
                const title = $(card).find('.card__heading .full-unstyled-link').text().trim();
                
                // Extract the image URL (the src attribute of <img> tag inside card__media)
                const image_url = $(card).find('.card__media img').attr('src') || 'No image available';
                
                // Extract the price (e.g., "From Rs. 90.00")
                const price = $(card).find('.price .price-item--regular').text().trim() || 'Price Not Available';
                
                // Only append products that have a price available
                if (price !== 'Price Not Available') {
                    products.push({
                        title: title || 'No Title Available',
                        price: price,
                        image_url: image_url
                    });
                }
            } catch (error) {
                console.log(`Error extracting product data: ${error}`);
            }
        });

        // Check if products with price were found
        if (products.length === 0) {
            console.log("No products with price found.");
        } else {
            // Write the products with prices to a JSON file
            fs.writeFileSync('regalia_ornaments_products.json', JSON.stringify(products, null, 4));
            console.log(`Dumped ${products.length} products with prices to 'regalia_ornaments_products.json'.`);
        }

        return products;

    } catch (error) {
        console.log(`Error fetching the website: ${error}`);
        return [];
    }
}

// Run the scrape function
scrapeRegaliaOrnaments();
