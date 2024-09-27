import React, {useContext, useState} from "react";
import {CurrencyContext} from "../../../../../utils/currencyConversion";

const CurrencySelector = () => {
    const {selectedCurrency, setSelectedCurrency, exchangeRates, convertAmount} = useContext(CurrencyContext)

    return(
        <div className='flex flex-row gap-3 text-sm'>
            <button onClick={() => setSelectedCurrency('USD')} className='bg-gray-200 py-1 px-2 rounded-sm hover:bg-primary/20'>USD</button>
            <button onClick={() => setSelectedCurrency('LKR')} className='bg-gray-200 py-1 px-2 rounded-sm hover:bg-primary/20'>LKR</button>
            <button onClick={() => setSelectedCurrency('EUR')} className='bg-gray-200 py-1 px-2 rounded-sm hover:bg-primary/20'>EUR</button>
            <button onClick={() => setSelectedCurrency('AUD')} className='bg-gray-200 py-1 px-2 rounded-sm hover:bg-primary/20'>AUD</button>
        </div>
    )
}

export default CurrencySelector;