from bs4 import BeautifulSoup
import requests

def scrape_mcx_price():
    url = "https://www.moneycontrol.com/commodity/mcx-aluminium-price"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Find the price element (adjust selector based on actual HTML structure)
    price_element = soup.find('div', {'class': 'price'})
    if price_element:
        return price_element.text.strip()
    return None

if __name__ == "__main__":
    price = scrape_mcx_price()
    print(f"Current MCX Aluminium price: {price}")
