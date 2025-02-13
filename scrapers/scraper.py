import asyncio
import aiohttp
import json
from bs4 import BeautifulSoup

async def scrape_kainiche():
    try:
        async with aiohttp.ClientSession() as session:
            async with session.get('https://www.kainichebymehak.com/') as response:
                if response.status != 200:
                    print(f"Failed to fetch Kainiche website. Status code: {response.status}")
                    return []
                
                html = await response.text()
                soup = BeautifulSoup(html, 'html.parser')

                products = []

                # Updated selectors for Kainiche products
                for card in soup.select('.card-wrapper'):
                    title = card.select_one('.full-unstyled-link')
                    price = card.select_one('.money.buckscc-money')
                    
                    if title and price:
                        products.append({
                            'title': title.text.strip(),
                            'price': price.text.strip()
                        })

                # Save Kainiche data
                with open('kainiche_data.json', 'w', encoding='utf-8') as f:
                    json.dump(products, f, indent=2)
                print('Kainiche data saved successfully')
                
                return products
    except Exception as error:
        print(f'Error scraping Kainiche: {str(error)}')
        return []

async def scrape_regalia():
    try:
        async with aiohttp.ClientSession() as session:
            async with session.get('https://www.regaliaornaments.com/') as response:
                if response.status != 200:
                    print(f"Failed to fetch Regalia website. Status code: {response.status}")
                    return []
                
                html = await response.text()
                soup = BeautifulSoup(html, 'html.parser')
                
                products = []
                
                # Scrape product information
                for card in soup.select('.product-card'):
                    title = card.select_one('.product-title')
                    price = card.select_one('.price')
                    category = card.select_one('.product-category')

                    if title and price and category:
                        products.append({
                            'title': title.text.strip(),
                            'price': price.text.strip(),
                            'category': category.text.strip()
                        })

                # Save Regalia data
                with open('regalia_data.json', 'w', encoding='utf-8') as f:
                    json.dump(products, f, indent=2)
                print('Regalia data saved successfully')
                
                return products
    except Exception as error:
        print(f'Error scraping Regalia: {str(error)}')
        return []

async def main():
    try:
        print('Starting web scraping...')
        
        # Run both scrapers concurrently
        kainiche_data, regalia_data = await asyncio.gather(
            scrape_kainiche(),
            scrape_regalia()
        )

        # Combine all data
        combined_data = {
            'kainiche': kainiche_data,
            'regalia': regalia_data
        }

        # Save combined data
        with open('combined_data.json', 'w', encoding='utf-8') as f:
            json.dump(combined_data, f, indent=2)
        print('Combined data saved successfully')

    except Exception as error:
        print(f'Error in main function: {str(error)}')

if __name__ == '__main__':
    # Run the scraper
    asyncio.run(main())
