"use client"
import React from "react";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import StatisticsChart from "../../components/ecommerce/StatisticsChart";
import { Cookies } from "react-cookie";
import Link from "next/link";
import Button from "../../components/ui/button/Button";
import Image from "next/image";

export default function Ecommerce() {
  const [isClient, setIsClient] = React.useState(false);
  const cookies = new Cookies()
  const role = cookies.get("role")
  const restaurantId = cookies.get("restaurant")
  React.useEffect(() => {
    setIsClient(true)
  }, [])
  return (
    <>
      {
        isClient && (
          <>
            {
              restaurantId && role === "restaurant" || role === "admin" ?
                <div className="grid grid-cols-12 gap-4 md:gap-6">
                  <div className="col-span-12">
                    <StatisticsChart />
                  </div>
                  <div className="col-span-12 xl:col-span-5">
                    <MonthlySalesChart />
                  </div>


                  <div className="col-span-12 xl:col-span-5">
                  </div>
                </div>
                :
                <div className='flex justify-center flex-col items-center w-full'>
                  <Image
                    src={"/images/spicejnctnbg.png"}
                    alt="Background"
                    fill
                    sizes="100vw"
                    className="object-cover object-right -z-1 w-full h-auto"
                  />
                  <h2 className='text-gray-800 text-[30px] text-white/90 text-center font-semibold'>Welcome to <span className='text-brand-500'>Spice Junction</span></h2>
                  <h4 className='text-gray-800 text-lg text-white/90 mt-8 text-center font-semibold text-[20px]'>Let’s put your restaurant on the map</h4>
                  <Link href={"/restaurant"}>
                    <Button size="sm" variant="primary" className='mt-4'>
                      Get Started
                    </Button>
                  </Link>
                </div>
            }
          </>
        )
      }
    </>

  );
}
