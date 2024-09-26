'use client'
import { SignIn } from "@clerk/nextjs";
import Image from 'next/image';

export default function Page(){
    return(
        <div className="bg-primary w-full h-screen relative p-20 items-center text-center align-middle justify-center flex">
            <div className="bg-white absolute left-4 top-4 rounded-full">
                <Image src={'/Icon.png'} width={80} height={20}/>
            </div>
            <div>
                <SignIn/>
            </div>
        </div>
    )
}