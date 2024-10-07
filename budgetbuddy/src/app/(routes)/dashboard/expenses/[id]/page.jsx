"use client"

import React,{ useEffect, useState }  from "react"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation";
import { eq, getTableColumns, sql, desc } from "drizzle-orm";
import { Budgets, Expenses } from "../../../../../../utils/schema";
import { ArrowLeft,Trash } from "lucide-react";
import { db } from "../../../../../../utils/dbConfig";
import EditBudget from './_components/EditBudget';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";
import {Button} from "@/components/ui/button";
import BudgetItem from "../../budgets/_components/BudgetItem";

function ExpenseScreen({params}){
    const {user} = useUser();
    const [budgetInfo, setBudgetInfo] = useState();
    const [expensesList, setExpensesList] = useState([]);
    const route = useRouter();
    useEffect(() => {
        user && getBudgetInfo();
    }, [user]);

    const getExpensesList = async () => {
        const result = await db.select().from(Expenses).where(eq(Expenses.budgetId, params.id))
                .orderBy(desc(Expenses.id));
            setExpensesList(result); 
    }

    const getBudgetInfo = async () => {
        const result = await db.select({
                ...getTableColumns(Budgets),
                totalSpend: sql`sum(cast(${Expenses.amount}as numeric))`.mapWith(Number),
                totalItem : sql`count(${Expenses.id})`.mapWith(Number)
            }).from(Budgets)
            .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
            .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
            .where(eq(Budgets.id, params.id))
            .groupBy(Budgets.id);
        
        setBudgetInfo(result[0]);
        getExpensesList();


        
    }

    return (
        <div className="mt-5 px-3">
            <h2 className="flex justify-between items-center">
                <span><ArrowLeft onClick={() => route.back()}  className="bg-slate-200 px-2 py-2 rounded-full w-10 h-10 cursor-pointer hover:bg-primary/20"/></span>
            
            <div className="items-center flex gap-2">
                <EditBudget budgetInfo={budgetInfo}
            refreshData={() => getBudgetInfo()}/>

            <AlertDialog>
                <AlertDialogTrigger asChild>
                <Button className="flex gap-2 rounded-full" variant="destructive">
                    <Trash className="w-4" /> Delete
                </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your current budget along with expenses and remove your data
                    from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => deleteBudget()} className="bg-red-700 hover:bg-red-600">
                    Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            </div>
            </h2>

            <div className="grid grid-col-1 md:grid-cols-2 mt-6 gap-5">
                {budgetInfo? (
                    <BudgetItem budget={budgetInfo} />
                ) : (
                    <div className="h-[150px] bg-slate-200 animate-pulse rounded-lg w-full"></div>
                )}
            </div>
        </div>
    )
}

export default ExpenseScreen;