'use client'

import React, {useEffect,useState} from "react"
import CreateIncomes from "./CreateIncome"
import { desc, eq, getTableColumns, sql } from "drizzle-orm"
import { Incomes,Expenses } from "../../../../../../utils/schema"
import { useUser } from "@clerk/nextjs"
import IncomeItem from "./IncomeItem"
import { db } from "../../../../../../utils/dbConfig"


function IncomeList(){
    const { user } = useUser();
    const [incomeList, setIncomeList] = useState([])
    useEffect(() => {
        user && getIncomeList();
    }, [user])


    const getIncomeList = async () => {
        const result = await db.select({
            ...getTableColumns(Incomes),
            totalSpend: sql`sum(CAST(${Expenses.amount} AS NUMERIC))`.mapWith(Number),
            totalItem: sql`count(${Expenses.id})`.mapWith(Number)
        })
        .from(Incomes)
        .leftJoin(Expenses, eq(Incomes.id, Expenses.budgetId))
        .where(eq(Incomes.createdBy, user?.primaryEmailAddress?.emailAddress))
        .groupBy(Incomes.id)
        .orderBy(desc(Incomes.id));
        setIncomeList(result);
    };
    
    return(
        <div className="mt-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <CreateIncomes refreshData={()=> getIncomeList()}/>
                    {incomeList?.length > 0 ?
                     incomeList.map((budget,index)=>(
                        <IncomeItem budget={budget} key={index}/>
                    ))
                    : [1,2,3,4,5].map((item,index) =>(
                        <div key={index} className="w-full bg-slate-200 h-[150px] animate-pulse rounded-lg"></div>
                    ))
                    }
            </div>
        </div>
    )
}

export default IncomeList;