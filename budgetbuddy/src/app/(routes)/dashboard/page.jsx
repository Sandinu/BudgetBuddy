'use client'

import { useUser } from "@clerk/nextjs";
import { useState } from "react";

function Dashboard(){
    const { user, isLoaded } = useUser(); 

    const [budgetList,setBudgetList] = useState([])
    const [incomeList, setIncomeList] = useState([])
    const [expenseList, setExpenseList] = useState([])
    const [investList, setInvestList] = useState([])


    if (!isLoaded || !user) {
        return 
    }

    const firstName = user.firstName; 


    
    return(
        <div>
            <div className="text-center mt-5"><h1 className="text-5xl font-bold text-neutral-800 tracking-wide">👋Hi {firstName}!</h1></div>
        </div>
        
    )
}

export default Dashboard;