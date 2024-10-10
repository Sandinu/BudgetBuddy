import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Budgets, Expenses } from "../../../../../../../utils/schema";
import { Loader } from "lucide-react";
import moment from "moment";
import react,{useState} from "react";
import { toast } from "sonner";
import { db } from "../../../../../../../utils/dbConfig";


function AddExpense({ budgetId, user, refreshData }){
    const [name,setName] = useState();
    const [amount, setAmount] = useState();
    const [loading, setLoading] = useState(false);

    const addNewExpense = async () => {
        setLoading(true);

        const result = await db.insert(Expenses)
            .values({
                name: name,
                amount: amount,
                budgetId : parseInt(budgetId),
                createdAt : moment().format('DD/MM/YYYY'),
                createdBy: user?.primaryEmailAddress?.emailAddress,
            }).returning({insertedId : Budgets.id})

        setAmount("")
        setName("")
        if (result){
            setLoading(false)
            refreshData()
            toast('New Expense Added!')
        }
        setLoading(false)
    }
    
    return (
        <div className="border p-3 rounded-xl">
            <div className="flex  justify-between items-center align-middle">
                <h2 className="text-sm">Add Expense :</h2>
                <Button disabled={!(name && amount) || loading} className="h-8 rounded-full" onClick={()=> addNewExpense()}>
                    {loading ? <Loader className="animate-spin"/> : "+"}
                </Button>
            </div>
        
            <div className="space-y-2 mt-3">
                <Input placeholder="Expense Name" value={name} onChange={(e) => setName(e.target.value)}/>
                <Input placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)}/>
            </div>
        </div>
    )
}

export default AddExpense;