import requests
from bs4 import BeautifulSoup
import json

def scrape_kainiche():
    # Headers to mimic browser request
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
    }

    try:
        # Make the request
        response = requests.get('https://www.kainichebymehak.com/', headers=headers)
        response.raise_for_status()  # Raise an exception for bad status codes
        
        # Parse the HTML content
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Find all product cards with class 'card'
        products = []
        for card in soup.select('.card'):
            try:
                # Extract the title using the class 'full-unstyled-link'
                title_element = card.select_one('.full-unstyled-link')
                
                # Extract the image URL (the src attribute of <img> tag inside card__media)
                image_element = card.select_one('.card__media img')
                if image_element:
                    image_url = image_element['src']
                else:
                    image_url = "No image available"
                
                # Extract the price, if available
                price_element = card.select_one('.price .money')
                
                if price_element:
                    price = price_element.get_text(strip=True)
                else:
                    price = "Price Not Available"
                
                # Extract the title (product name)
                if title_element:
                    title = title_element.get_text(strip=True)
                else:
                    title = "No Title Available"
                
                # Only append products that have a price available
                if price != "Price Not Available":
                    products.append({
                        'title': title,
                        'price': price,
                        'image_url': image_url
                    })

            except AttributeError as e:
                print(f"Error extracting product data: {e}")
                continue  # Skip this product card and continue

        # Check if products with price were found
        if not products:
            print("No products with price found.")
        else:
            # Write the products with prices to a JSON file
            with open('kainiche_products.json', 'w') as f:
                json.dump(products, f, indent=4)

            print(f"Dumped {len(products)} products with prices to 'products_with_prices.json'.")
            
        return products

    except requests.RequestException as e:
        print(f"Error fetching the website: {e}")
        return []
    except Exception as e:
        print(f"Error during scraping: {e}")
        return []

if __name__ == "__main__":
    print("Starting to scrape Kainiche website...")
    scrape_kainiche()
