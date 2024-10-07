import React,{useContext} from "react";
import isColorDark from "../../../../../../utils/colorDark";
import { CurrencyContext } from "../../../../../../utils/currencyConversion";
import Link from "next/link";

function BudgetItem({budget}){
   const {selectedCurrency, setSelectedCurrency, exchangeRates, convertAmount} = useContext(CurrencyContext)

   const calculateProgress = () =>{
        const perc = (budget.totalSpend/budget.amount)*100;
        return perc > 100? 100 : perc.toFixed(2);
   }

    const textColor = isColorDark(budget.color) ? 'white' : 'black';    
 return (
    <Link href={"/dashboard/expenses/" + budget?.id}>
      <div className="border rounded-2xl cursor-pointer hover:shadow-md py-5 px-5  h-[150px]"  style={{ backgroundColor: budget.color }}>
      <div className="items-center flex flex-row">
          <div className="justify-between items-center flex flex-row w-full">
              <h2 className="text-2xl font-semibold tracking-wide" style={{ color: textColor }}><span className="py-2 px-2 text-3xl rounded-full bg-white/30 mr-2">{budget.icon}</span>   {budget.name}</h2>
              <h2 style={{color:textColor}} className="text-4xl font-bold"><span className="text-base font-normal mr-2">{selectedCurrency}</span>{convertAmount(budget.amount)}</h2>
            </div>
      </div>

        <div className="mt-5">
          <div className="flex items-center justify-between mb-3">
              <h2>{selectedCurrency} {budget.totalSpend ? budget.totalSpend : 0}</h2>
              <h2>{selectedCurrency} {budget.amount - budget.totalSpend}</h2>
          </div>
          <div className="w-full bg-slate-300 h-2 rounded-full">
              <div className="bg-primary h-2 rounded-full" style={{width:`${calculateProgress()}%`}}></div>
          </div>
        </div>

      </div>
     </Link>
 )   
}

export default BudgetItem;