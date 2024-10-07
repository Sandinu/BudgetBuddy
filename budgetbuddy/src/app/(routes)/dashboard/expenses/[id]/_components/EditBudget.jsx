"use client"

import React, {useState, useEffect} from "react"
import { Button } from "@/components/ui/button"
import { PenBox } from "lucide-react"
import EmojiPicker from "emoji-picker-react"
import { useUser } from "@clerk/nextjs"
import { Input } from "@/components/ui/input"
import { Budgets } from "../../../../../../../utils/schema"
import { eq } from "drizzle-orm"
import { toast } from "sonner"
import { db } from "../../../../../../../utils/dbConfig"
import { 
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger } from "@radix-ui/react-dialog"

function EditBudget({budgetInfo, refreshData}){
    const {user} = useUser();
    const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon);
    const [name,setName] = useState();
    const [amount,setAmount] = useState();
    
    useEffect(() => {
        setName(budgetInfo?.name);
        setAmount(budgetInfo?.amount);
        setEmojiIcon(budgetInfo?.icon);
    }, [budgetInfo])

    const onUpdateBudget = async () => {
        const result = await db
        .update(Budgets)
        .set({
            name: name,
            amount: amount,
            icon: emojiIcon,
        })
        .where(eq(Budgets.id, budgetInfo.id))
        .returning();

        if (result){
            refreshData();
            toast("Budget Updated!");
        }
    }


    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="flex space-x-2 gap-2 rounded-full bg-secondary hover:bg-secondary/80">
                        {" "}
                        <PenBox className="w-4"/>Edit Budget
                    </Button>
                </DialogTrigger>
            </Dialog>
        </div>
    )
}


export default EditBudget;