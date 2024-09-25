import React from "react";
import { SignedIn, SignInButton, SignedOut } from '@clerk/nextjs';
import { UserButton } from '@clerk/nextjs';
import Link from "next/link";

function Hero(){
    return(
        <div className="items-center text-center align-middle h-screen relative">
            <SignedOut>
                <SignInButton className='bg-neutral-300 py-2 px-3 mt-40'/>
            </SignedOut>
            <SignedIn>
                <UserButton/>
                <Link href='/dashboard'>Dashboard</Link>
            </SignedIn>
        </div>
    )
}

export default Hero;