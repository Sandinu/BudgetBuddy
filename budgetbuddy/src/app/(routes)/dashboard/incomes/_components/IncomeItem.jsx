import React,{useContext} from "react";
import isColorDark from "../../../../../../utils/colorDark";
import { CurrencyContext } from "../../../../../../utils/currencyConversion";

function IncomeItem({budget}){
   const {selectedCurrency, setSelectedCurrency, exchangeRates, convertAmount} = useContext(CurrencyContext)


    const textColor = isColorDark(budget.color) ? 'white' : 'black';    
 return (
    <div className="border rounded-2xl cursor-pointer hover:shadow-md items-center flex flex-row h-[150px]"  style={{ backgroundColor: budget.color }}>
     <div className="justify-between items-center flex flex-row w-full px-5">
        <h2 className="text-2xl font-semibold tracking-wide" style={{ color: textColor }}><span className="py-2 px-2 text-3xl rounded-full bg-white/30 mr-2">{budget.icon}</span>   {budget.name}</h2>
        <h2 style={{color:textColor}} className="text-4xl font-bold"><span className="text-base font-normal mr-2">{selectedCurrency}</span>{convertAmount(budget.amount)}</h2>
      </div>
     </div>
 )   
}

export default IncomeItem;