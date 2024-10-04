import React from "react";

function IncomeItem({budget}){
 return (
    <div className="p-5 border rounded-2xl cursor-pointer hover:shadow-md">
     <h2 className="mt-3 ml-3 text-2xl font-bold text-secondary">{budget.icon} {budget.name}</h2>
    </div>
 )   
}

export default IncomeItem;