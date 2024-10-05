'use client'

import React, {useEffect,useState} from "react"
import { desc, eq, getTableColumns, sql } from "drizzle-orm"
import { Budgets,Expenses } from "../../../../../../utils/schema"
import { useUser } from "@clerk/nextjs"
import BudgetItem from "./BudgetItem"
import { db } from "../../../../../../utils/dbConfig"
import CreateBudget from "./CreateBudget"


function BudgetList(){
    const { user } = useUser();
    const [budgetList, setBudgetList] = useState([])
    useEffect(() => {
        user && getBudgetList();
    }, [user])


    const getBudgetList = async () => {
        const result = await db.select({
            ...getTableColumns(Budgets),
            totalSpend: sql`sum(CAST(${Expenses.amount} AS NUMERIC))`.mapWith(Number),
            totalItem: sql`count(${Expenses.id})`.mapWith(Number)
        })
        .from(Budgets)
        .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
        .groupBy(Budgets.id)
        .orderBy(desc(Budgets.id));
        setBudgetList(result);
    };
    
    return(
        <div className="mt-5 ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
                <CreateBudget refreshData={()=> getIncomeList()}/>
                    {budgetList?.length > 0 ?
                     budgetList.map((budget,index)=>(
                        <BudgetItem budget={budget} key={index}/>
                    ))
                    : [1,2,3,4,5].map((item,index) =>(
                        <div key={index} className="w-full bg-slate-200 h-[150px] animate-pulse rounded-lg"></div>
                    ))
                    }
            </div>
        </div>
    )
}

export default BudgetList;