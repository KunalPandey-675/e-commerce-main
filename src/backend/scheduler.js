import cron from 'node-cron';
import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Function to run a scraper
const runScraper = (scraperPath, name) => {
    return new Promise((resolve, reject) => {
        console.log(`Starting ${name} scraper...`);
        
        exec(`node ${scraperPath}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error running ${name} scraper:`, error);
                reject(error);
                return;
            }
            
            if (stderr) {
                console.error(`${name} scraper stderr:`, stderr);
            }
            
            console.log(`${name} scraper output:`, stdout);
            console.log(`${name} scraper completed successfully`);
            resolve();
        });
    });
};

// Schedule both scrapers to run at 10 AM daily
cron.schedule('0 10 * * *', async () => {
    try {
        const scraperPaths = {
            kainiche: path.join(__dirname, '../scrapers/simple_scraper.js'),
            regalia: path.join(__dirname, '../scrapers/regalia_scraper.js')
        };

        console.log('Starting daily scraping at 10 AM...');

        // Run scrapers sequentially to avoid potential conflicts
        await runScraper(scraperPaths.kainiche, 'Kainiche');
        await runScraper(scraperPaths.regalia, 'Regalia');

        console.log('Daily scraping completed successfully');
    } catch (error) {
        console.error('Error during scheduled scraping:', error);
    }
}, {
    timezone: "Asia/Kolkata" // Set to Indian timezone
});

// Initial run when server starts
console.log('Scheduler started. Scrapers will run daily at 10 AM IST'); 