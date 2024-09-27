'use client'
import { FloatingDock } from './../../../components/ui/floating-dock';
import { Home } from 'lucide-react';
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';



function DashboardLayout({children}){
    const links = [
        {
          title: "Home",
          icon: (
            <Home/>,
          ),
          href : "#"
        }]
    return(
        <div className='p-4'>
            <div className='top-0 flex w-full justify-between items-center align-middle'>
                <div>
                    <Image src={'/Logo long.png'} width={150} height={50}/>
                </div>
                <div>
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