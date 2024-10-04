import React from "react";
import isColorDark from "../../../../../../utils/colorDark";

function IncomeItem({budget}){
    

    const textColor = isColorDark(budget.color) ? 'white' : 'black';    
 return (
    <div className="p-5 border rounded-2xl cursor-pointer hover:shadow-md"  style={{ backgroundColor: budget.color }}>
     <h2 className="mt-3 ml-3 text-3xl font-bold" style={{ color: textColor }}>{budget.icon} {budget.name}</h2>
    </div>
 )   
}

export default IncomeItem;