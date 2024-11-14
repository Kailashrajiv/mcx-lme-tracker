from bs4 import BeautifulSoup
import requests
from datetime import datetime
import re

def get_mcx_price():
    url = "https://www.moneycontrol.com/commodity/mcx-aluminium-price?type=futures&exp=2024-11-29"
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Connection': 'keep-alive',
    }
    
    try:
        response = requests.get(url, headers=headers, timeout=10)
        soup = BeautifulSoup(response.text, 'html.parser')
        
        price_text = soup.select_one('div.commodity_overview_box span.commodity_overview_value')
        if not price_text:
            price_text = soup.select_one('div.commodity_price')
            
        if price_text:
            price_str = price_text.get_text(strip=True)
            price = float(re.sub(r'[^\d.]', '', price_str))
            
            change_text = soup.select_one('div.commodity_overview_box span.commodity_overview_change')
            if not change_text:
                change_text = soup.select_one('div.commodity_change')
                
            change = 0.0
            if change_text:
                change_str = change_text.get_text(strip=True)
                change_match = re.search(r'(-?\d+\.?\d*)', change_str)
                if change_match:
                    change = float(change_match.group(1))
            
            return {
                "price": price,
                "change": change,
                "timestamp": datetime.now().isoformat()
            }
        
        return None
        
    except Exception as e:
        print(f"Error scraping MCX price: {str(e)}")
        return None

def get_lme_settlements():
    url = "https://www.westmetall.com/en/markdaten.php?action=table&field=LME_Al_cash"
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
    }
    
    try:
        response = requests.get(url, headers=headers, timeout=10)
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Find all table rows
        rows = soup.select('tr')
        settlements = []
        
        # Skip header row and process next 4 rows
        for row in rows[1:5]:
            try:
                # Get all cells in the row
                cells = row.select('td')
                if len(cells) >= 2:
                    # Get date from first cell
                    date_str = cells[0].get_text(strip=True)
                    # Get price from second cell (LME Aluminium Cash-Settlement)
                    price_str = cells[1].get_text(strip=True).replace(',', '')
                    
                    # Convert date string to datetime
                    date = datetime.strptime(date_str, '%d. %B %Y')
                    # Convert price string to float
                    price = float(price_str)
                    
                    settlements.append({
                        "date": date.isoformat(),
                        "price": price
                    })
            except (ValueError, TypeError, IndexError) as e:
                print(f"Error parsing row: {e}")
                continue
        
        return settlements
        
    except Exception as e:
        print(f"Error scraping LME settlements: {str(e)}")
        return None
