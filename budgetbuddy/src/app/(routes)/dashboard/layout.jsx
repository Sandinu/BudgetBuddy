'use client'
import { FloatingDock } from './../../../components/ui/floating-dock';
import { CircleDollarSign, LayoutGrid, PiggyBank, ChartCandlestick } from 'lucide-react';
import Image from 'next/image';
import { UserButton, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { db } from '../../../../utils/dbConfig';
import { Budgets } from '../../../../utils/schema';
import { eq } from 'drizzle-orm';
import { useEffect } from 'react';
import CurrencySelector from './_components/CurrencySelector';



function DashboardLayout({children}){

    const {user} = useUser();
    const router = useRouter();

    useEffect(() => {
        user && checkUserBudgets()
        }, [user]
    )

    const checkUserBudgets = async () => {
        const result = await db.select().from(Budgets).where(eq(Budgets.createdBy, user?.primaryEmailAddress.emailAddress))
        if(result.length === 0){
            router.replace('/dashboard/')
        }
    }

    const links = [
        {
          title: "Dashboard",
          icon: (
            <LayoutGrid/>,
          ),
          href : "/dashboard"
        },
        {
            title: "Incomes",
            icon: (
              <CircleDollarSign/>,
            ),
            href : "/dashboard/incomes"
          },
          {
            title: "Budgets",
            icon: (
              <PiggyBank/>,
            ),
            href : "/dashboard/budgets"
          },
          {
            title: "Investments",
            icon: (
              <ChartCandlestick/>,
            ),
            href : "#"
          },]
    return(
        <div className='p-4'>
            <div className='top-0 flex w-full justify-between items-center align-middle'>
                <div>
                    <Image src={'/Logo long.png'} width={150} height={50}/>
                </div>
                <div className='flex flex-row gap-3'>
                   <CurrencySelector/>
                    <UserButton/>
                </div>
            </div>
            {children}
            <div className='fixed bottom-3 mx-auto flex items-center text-center justify-center left-0 right-0'>
                <FloatingDock items={links}/>
            </div>
        </div>
    )
}

export default DashboardLayout;