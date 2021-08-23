import { format } from "date-fns";
import { ChevronDownIcon,ChevronUpIcon } from "@heroicons/react/outline";
import {GiCutDiamond} from "react-icons/gi"
import {MdFlag} from "react-icons/md"
import { useState } from "react";
import {useRouter} from "next/router"
import GuestModal from "./GuestModal"
import { StarIcon } from "@heroicons/react/solid";

const Reservation=({pricePerNight,startDate,endDate,numberOfNights,weeklyDiscount,total,rating})=>{
  const router=useRouter();
  //const {guestNumber}=router.query;

  const [isButtonFocused,setIsButtonFocused]=useState(false);
  const [showGuestDropDown,setShowGuestDropDown]=useState(false);
  const [adults,setAdults]=useState(1);
  const [childrens,setChildrens]=useState(0);
  const [infants,setInfants]=useState(0);
  return(
    <>
      <div className="shadow-lg border rounded-xl p-6  z-20 ">
               <div className="flex justify-between">
                 <p className="font-light flex-shrink-0">
                   <span className="font-semibold text-lg">
                     ${pricePerNight}
                  </span> / night</p>
                 <p className="inline-flex items-center flex-shrink-0  text-sm"> 
                  <StarIcon className="h-5 w-5 text-red-500 mr-0.5" />
                  {rating}
                  <span className="underline text-gray-600 ml-2">(2 reviews)</span>
                 </p>
               </div>

              <div className="border rounded-md mt-4 border-gray-400 group" >
                <button className={`${isButtonFocused ?"":"border-b" }  group-focus:border-none focus:border-2 focus:border-black focus:rounded-md flex items-center cursor-pointer border-gray-400 w-full`}
                onClick={()=>document?.getElementById('date-range-picker')?.scrollIntoView()}
                >
                  <div className="py-2 px-4 flex-grow  border-r border-gray-400 text-left">
                    <h4 className="uppercase text-xs font-semibold mb-1">Check-in</h4>
                    <p className="text-sm font-light">{startDate ? format(startDate, "dd/MM/yy") : ""}</p>
                  </div>
                  <div className="py-2 px-4 flex-grow text-left">
                    <h4 className="uppercase text-xs font-semibold mb-1">Check-out</h4>
                    <p className="text-sm font-light">{endDate ? format(endDate, "dd/MM/yy") : ""}</p>
                  </div>
                </button>

                <button className="focus:border-2 focus:border-black rounded-md flex items-center cursor-pointer border-gray-400 w-full justify-between relative"
                onClick={()=>setShowGuestDropDown(prevState=>!prevState)}
                onFocus={()=>setIsButtonFocused(true)}
                onBlur={()=>setIsButtonFocused(false)}
                //ref={guestNumberRef}
                >
                  <div className="text-left px-4 py-2">
                  <h4 className="uppercase text-xs font-semibold mb-1">Guest</h4>
                  <p className="font-light text-sm">
                    {adults} guests{childrens>0 && `, ${childrens} children`}{infants>0 && `, ${infants} infant(s)`}
                  </p>
                  </div>
                  {showGuestDropDown
                  ? <ChevronUpIcon className="h-6 w-6 mr-4"/> 
                  :
                  <ChevronDownIcon className="h-6 w-6 mr-4"/>
                  }
                 
                </button>
                <div className="relative -mx-0.5">

                {showGuestDropDown &&  
                <GuestModal
                 setShowGuestDropDown={setShowGuestDropDown}
                 adults={adults}
                 setAdults={setAdults}
                 childrens={childrens}
                 setChildrens={setChildrens}
                 infants={infants}
                 setInfants={setInfants}
                 />}
                </div>
              </div>

             <button className="text-center w-full rounded-lg my-4 py-3 text-white bg-gradient-to-r from-red-500 to-pink-700"     >Reserve</button>
             <p className="pb-4 font-light text-center text-sm">You won't be charged yet</p>

              <div className="flex items-center justify-between font-light pb-2">
                <p className="underline cursor-pointer ">${pricePerNight} x {numberOfNights} nights</p>
                <p>${pricePerNight*numberOfNights}</p>
              </div>

              {numberOfNights > 8 && <div className="flex items-center justify-between font-light pb-2">
                <p className="underline cursor-pointer ">5% weekly price discount</p>
                <p className="text-green-500 font-normal">-${weeklyDiscount}</p>
              </div>}

              <div className="flex items-center justify-between font-light pb-2">
                <p className="underline cursor-pointer ">Cleaning fee</p>
                <p>$0</p>
              </div>

              <div className="flex items-center justify-between font-light pb-2">
                <p className="underline cursor-pointer ">Service fee</p>
                <p>$0</p>
              </div>
              <hr className="py-2 mt-2"/>
              
              <div className="flex items-center justify-between font-semibold">
                  <p>Total</p>
                  <p>${total}</p>
              </div>
              </div>
            <div className="border rounded-xl p-6 my-6 flex items-center">
              <p className="font-light"><span className="font-semibold">This is a rare find.</span>Vikki's place on Airbnb is usually fully booked.</p>
              <GiCutDiamond className="text-green-600 w-9 h-9 flex-shrink-0"/>
            </div>
            <div className="text-gray-500 font-medium flex items-center justify-center mb-2">
             <MdFlag className="w-5 h-5 mr-2"/>
             <p className="underline cursor-pointer text-sm">Report this listing</p>
            </div>
    </>
  )
}

export default Reservation