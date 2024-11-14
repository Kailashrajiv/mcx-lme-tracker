import axios from 'axios';

const MCX_SHEET_ID = '1RZTSOyemZ6ewWWspZVqspeWUXz7I006OqBxyhCR4dOI';
const LME_SHEET_ID = '1RB9Jw843HKk59zx80_L2kj6Pnps8agSDzY02Xevt-ZM';
const EXCHANGE_SHEET_ID = '1RB9Jw843HKk59zx80_L2kj6Pnps8agSDzY02Xevt-ZM';

export const fetchMCXPrice = async () => {
  try {
    const response = await axios.get(
      `https://docs.google.com/spreadsheets/d/${MCX_SHEET_ID}/gviz/tq?tqx=out:json&sheet=Sheet1&range=A1`
    );
    
    const data = response.data.substring(47).slice(0, -2);
    const json = JSON.parse(data);
    const value = json.table.rows[0].c[0].v;
    
    return parseFloat(value);
  } catch (error) {
    console.error('Error fetching MCX price:', error);
    throw error;
  }
};

export const fetchLMESettlements = async () => {
  try {
    const response = await axios.get(
      `https://docs.google.com/spreadsheets/d/${LME_SHEET_ID}/gviz/tq?tqx=out:json&sheet=Sheet1&range=A2:B5`
    );
    
    const data = response.data.substring(47).slice(0, -2);
    const json = JSON.parse(data);
    
    return json.table.rows.map(row => ({
      date: row.c[0].v,
      price: parseFloat(row.c[1].v)
    }));
  } catch (error) {
    console.error('Error fetching LME settlements:', error);
    throw error;
  }
};

export const fetchExchangeRate = async () => {
  try {
    const response = await axios.get(
      `https://docs.google.com/spreadsheets/d/${EXCHANGE_SHEET_ID}/gviz/tq?tqx=out:json&sheet=Sheet2&range=A2:B2`
    );
    
    const data = response.data.substring(47).slice(0, -2);
    const json = JSON.parse(data);
    const row = json.table.rows[0];
    
    return {
      date: row.c[0].v,
      rate: parseFloat(row.c[1].v)
    };
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    throw error;
  }
};
