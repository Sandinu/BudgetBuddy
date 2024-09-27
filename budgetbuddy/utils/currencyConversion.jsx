'use client';

import React, { useState, useEffect, createContext } from "react";

// Create the CurrencyContext
export const CurrencyContext = createContext();

const CurrencyConversion = ({ children }) => {
    const [exchangeRates, setExchangeRates] = useState({} || 1);
    const [selectedCurrency, setSelectedCurrency] = useState('USD');

    // Function to fetch exchange rates
    const fetchExchangeRates = async () => {
        try {
            const response = await fetch(`https://api.exchangeratesapi.io/v1/latest?access_key=${process.env.NEXT_PUBLIC_EXCHANGERATES_API_KEY}&symbols=USD,LKR,AUD`);
            const data = await response.json();
            console.log(data, 'Fetched data');
            const ratesInUSD = {};
            Object.keys(data.rates).forEach(currency => {
                ratesInUSD[currency] = currency === 'USD' ? 1 : (1 / data.rates['USD']) * data.rates[currency];
            });

            setExchangeRates(ratesInUSD);
        } catch (error) {
            console.error('Error fetching exchange rates:', error);
        }
    };

    // Fetch exchange rates when component mounts or when selectedCurrency changes
    useEffect(() => {
        fetchExchangeRates();
    }, [selectedCurrency]); // This ensures fetching rates if the selected currency changes

    // Function to convert amount based on the selected currency
    const convertAmount = (amount) => {
            const conversionRate = exchangeRates[selectedCurrency];
            return conversionRate ? (amount * conversionRate).toFixed(2) : amount;
    };

    return (
        <CurrencyContext.Provider value={{ selectedCurrency, setSelectedCurrency, exchangeRates, convertAmount }}>
            {children}
        </CurrencyContext.Provider>
    );
};

export default CurrencyConversion;
