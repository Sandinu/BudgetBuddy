'use client'

import React, {useState, useContext} from "react"
import { Dialog,DialogClose,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle,DialogTrigger } from "@/components/ui/dialog"

import EmojiPicker from "emoji-picker-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { db } from "../../../../../../utils/dbConfig"
import { Incomes } from "../../../../../../utils/schema"
import { useUser } from "@clerk/nextjs"
import { toast } from "sonner"
import { CurrencyContext } from "../../../../../../utils/currencyConversion"

function CreateIncomes({refreshData}){
    const [emoji,setEmoji] = useState('😊');
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false)
    const [name, setName] = useState()
    const [amount, setAmount] = useState()
    const {selectedCurrency, setSelectedCurrency, exchangeRates, convertAmount} = useContext(CurrencyContext)
    const [amountInUSD, setAmountInUSD] = useState()
    const [xamonut, setXAmount] = useState()
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const {user} = useUser();



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

    const amountToUSD = (e) => {
        if(selectedCurrency !== 'USD'){
            console.log(exchangeRates[selectedCurrency])
            setAmountInUSD((e.target.value/exchangeRates[selectedCurrency]).toFixed(2))
            setAmount(amountInUSD) 
        }else{
            setAmount(e.target.value)
        }
    }

    const resetFields = () => {
        setEmoji('😊');
        setName('');
        setAmount('');
        setAmountInUSD('');
        setXAmount('');
    };

    return(
        <div>
             <Dialog open={isDialogOpen} onOpenChange={(open) => {
                setIsDialogOpen(open);
                if (!open) {
                    resetFields();
                }
            }}>
                <DialogTrigger asChild>
                    <div className="bg-white p-10 rounded-2xl items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md">
                        <h2>+</h2>
                        <h2>ADD A NEW INCOME SOURCE</h2>
                    </div>
                </DialogTrigger>
                <DialogContent className="bg-white/75 shadow-white/20 shadow-lg">
                    <DialogHeader>
                        <DialogTitle>ADD A NEW INCOME SOURCE</DialogTitle>
                        <DialogDescription>
                            <div className="mt-5">
                                <Button variant="outline" className="text-2xl h-12 border bg-white/40" onClick={() => setOpenEmojiPicker(!openEmojiPicker)}>
                                    {emoji}
                                </Button>
                                <div className="absolute z-20">
                                    <EmojiPicker
                                        open={openEmojiPicker}
                                        onEmojiClick={(e) => {
                                        setEmoji(e.emoji);
                                        setOpenEmojiPicker(false);
                                        }}
                                    />
                                </div>
                                <div className="mt-4">
                                    <h2 className="my-1">Source Name</h2>
                                    <Input placeholder="Ex: Monthly Salary" className="bg-white/40 focus:bg-white" onChange={(e) => setName(e.target.value)}/>
                                </div>
                                <div className="mt-4">
                                    <h2 className="my-1">Amount [ {selectedCurrency} ] {selectedCurrency !== 'USD' && amount && `| USD ${(xamonut/exchangeRates[selectedCurrency]).toFixed(2)}`}</h2>
                                    <Input placeholder="Ex: Monthly Salary" className="bg-white/40 focus:bg-white" onChange={(e) => {amountToUSD(e); setXAmount(e.target.value)}}/>
                                </div>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button disabled={!(name && amount)} className="w-full rounded-full mt-3 bg-secondary hover:bg-primary" onClick={()=> onCreateIncomes()}>Add Income Source</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            incomes
        </div>
    )
}

export default CreateIncomes;