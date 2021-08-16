import {StarIcon} from "@heroicons/react/solid"
import {HeartIcon} from "@heroicons/react/outline"
import Image from "next/image"

const ModalCard =({selectedLocation})=>{
  return (
    <div className=" w-60 rounded-lg shadow-xl bg-white z-50">
          
              <div className="relative h-[8rem] w-auto"> 
                <Image 
                src={selectedLocation?.hotel?.media ? selectedLocation?.hotel?.media[0]?.uri:"/hotel_img.jpeg"} 
                layout="fill" 
                objectFit="cover" className="rounded-t-lg"
                />
                <HeartIcon className="h-10 cursor-pointer md:-mt-2 p-2 rounded-full md:hover:bg-black -mr-2 absolute z-20 text-white right-4 top-4 box-shadow-lg md:hover:bg-opacity-10"/>
             </div>
             <div className="p-2 px-4">
                <p className="flex items-center">
                    <StarIcon className="h-4 text-red-400 mr-0.5"/>
                    <span className="text-sm font-light">{selectedLocation?.hotel.rating}</span> 
                   <span className="ml-1 text-gray-500 text-sm font-light">(25)</span>
                </p>
                <h4 className="pt-2 font-light">{selectedLocation?.hotel?.name}</h4>
                <p className="pt-1">${selectedLocation?.offers[0].price.total}</p>
             </div>

          </div>
  )
}

export default ModalCard