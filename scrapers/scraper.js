// Fix 1: Correct ESM import syntax
import * as cheerio from 'cheerio';
import axios from 'axios';
import { promises as fs } from 'fs';
// Function to scrape Kainiche website
async function scrapeKainiche() {
    try {
        const response = await axios.get('https://www.kainichebymehak.com/');
        const $ = cheerio.load(response.data);
        
        const products = [];

        // Updated selectors for Kainiche products
        $('.card-wrapper').each((index, element) => {
            const title = $(element).find('.full-unstyled-link').text().trim();
            const price = $(element).find('.money.buckscc-money').text().trim();
            
            products.push({
                title,
                price
            });
        });

        // Save Kainiche data
        await fs.writeFile('kainiche_data.json', JSON.stringify(products, null, 2));
        console.log('Kainiche data saved successfully');
        
        return products;
    } catch (error) {
        console.error('Error scraping Kainiche:', error.message);
        return [];
    }
}

// Function to scrape Regalia website
async function scrapeRegalia() {
    try {
        const response = await axios.get('https://www.regaliaornaments.com/');
        const $ = cheerio.load(response.data);
        
        const products = [];

        // Scrape product information
        $('.product-card').each((index, element) => {
            const title = $(element).find('.product-title').text().trim();
            const price = $(element).find('.price').text().trim();
            const category = $(element).find('.product-category').text().trim();
            
            products.push({
                title,
                price,
                category
            });
        });

        // Save Regalia data
        await fs.writeFile('regalia_data.json', JSON.stringify(products, null, 2));
        console.log('Regalia data saved successfully');
        
        return products;
    } catch (error) {
        console.error('Error scraping Regalia:', error.message);
        return [];
    }
}

// Main function to run both scrapers
async function main() {
    try {
        console.log('Starting web scraping...');
        
        // Run both scrapers concurrently
        const [kainicheData, regaliaData] = await Promise.all([
            scrapeKainiche(),
            scrapeRegalia()
        ]);

        // Combine all data
        const combinedData = {
            kainiche: kainicheData,
            regalia: regaliaData
        };

        // Save combined data
        await fs.writeFile('combined_data.json', JSON.stringify(combinedData, null, 2));
        console.log('Combined data saved successfully');

    } catch (error) {
        console.error('Error in main function:', error.message);
    }
}

// Error handling for unhandled rejections
process.on('unhandledRejection', (error) => {
    console.error('Unhandled rejection:', error);
    process.exit(1);
});

// Run the scraper
main();