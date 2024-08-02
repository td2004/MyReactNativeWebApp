import axios from 'axios';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwL0e751SnTBglcuFobMzLFDEtkahUWgw",
  authDomain: "mywebsite-571e4.firebaseapp.com",
  projectId: "mywebsite-571e4",
  storageBucket: "mywebsite-571e4",
  messagingSenderId: "807353633627",
  appId: "1:807353633627:web:37e34becc7769c11b7287e"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const storage = firebaseApp.storage();

const YAHOO_FINANCE_API_BASE_URL = 'https://query1.finance.yahoo.com';

// Function to get the top stock symbols
const getTopSymbols = async () => {
  try {
    const response = await axios.get(`${YAHOO_FINANCE_API_BASE_URL}/v1/finance/search`, {
      params: {
        q: 'ASX',
        quotesCount: 20
      }
    });
    console.log('Full response from Yahoo Finance API:', response.data); // Log the full response

    if (response.data.quotes && response.data.quotes.length > 0) {
      console.log(`Number of stocks returned: ${response.data.quotes.length}`);
      return response.data.quotes.map(quote => quote.symbol);
    } else {
      console.log('No quotes found in the response.');
      return [];
    }
  } catch (error) {
    console.error('Error fetching top symbols:', error);
    throw error;
  }
};

// Function to get stock data for a given symbol
const getStockData = async (symbol) => {
  try {
    const response = await axios.get(`${YAHOO_FINANCE_API_BASE_URL}/v8/finance/chart/${symbol}`, {
      params: {
        interval: '1d',
        range: '1y'
      }
    });
    const result = response.data.chart.result[0];
    const { timestamp, indicators: { quote } } = result;
    const prices = timestamp.map((time, index) => ({
      date: new Date(time * 1000).toLocaleDateString(),
      open: quote[0].open[index],
      close: quote[0].close[index]
    }));
    return {
      symbol: result.meta.symbol,
      prices
    };
  } catch (error) {
    console.error(`Error fetching stock data for ${symbol}:`, error);
    throw error;
  }
};

// Function to get all stock data
const getAllStockData = async () => {
  try {
    const topSymbols = await getTopSymbols();
    const stockDataPromises = topSymbols.map(symbol => getStockData(symbol));
    const stockData = await Promise.all(stockDataPromises);

    // Extracting only the latest opening and closing prices for simplicity
    const simplifiedStockData = stockData.map(stock => ({
      symbol: stock.symbol,
      latestOpen: stock.prices[0].open,
      latestClose: stock.prices[0].close
    }));

    return simplifiedStockData;
  } catch (error) {
    console.error('Error fetching all stock data:', error);
    throw error;
  }
};

// Test the function to check the data returned
getAllStockData().then(data => {
  console.log(data);
}).catch(error => {
  console.error('Error in getAllStockData:', error);
});

export { db, storage, getAllStockData };
