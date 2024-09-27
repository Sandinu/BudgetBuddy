'use client'

import React, {useState} from "react"
import { Dialog,DialogClose,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle,DialogTrigger } from "@/components/ui/dialog"

import EmojiPicker from "emoji-picker-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { db } from "../../../../../../utils/dbConfig"
import { Incomes } from "../../../../../../utils/schema"
import { useUser } from "@clerk/nextjs"
import { toast } from "sonner"

function CreateIncomes({refreshData}){
    const [emoji,setEmoji] = useState('😊');
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false)
    const [name, setName] = useState()
    const [amount, setAmount] = useState()

    const onCreateIncomes = async () => {
        const result = await db.insert(Incomes).values({
            name: name,
            amount: amount,
            icon: emoji,
            createdBy: user.id,
        }).returning({insertedId: Incomes.id})

        if(result){
            refreshData();
            toast('New Income Source Created!')
        }
    }

    return(
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <div className="bg-white p-10 rounded-2xl items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md">
                        <h2>+</h2>
                        <h2>ADD A NEW INCOME SOURCE</h2>
                    </div>
                </DialogTrigger>
            </Dialog>

            incomes
        </div>
    )
}

export default CreateIncomes;