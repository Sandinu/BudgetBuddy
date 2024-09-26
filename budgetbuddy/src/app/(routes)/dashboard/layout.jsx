'use client'
import { FloatingDock } from './../../../components/ui/floating-dock';
import { Home } from 'lucide-react';



function DashboardLayout(){
    const links = [
        {
          title: "Home",
          icon: (
            <Home/>,
          ),
          href : "#"
        }]
    return(
        <div className='fixed bottom-3 mx-auto flex items-center text-center justify-center left-0 right-0'>
            <FloatingDock items={links} />
        </div>
    )
}

export default DashboardLayout;