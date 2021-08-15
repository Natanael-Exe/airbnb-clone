import Image from "next/image"
import {HeartIcon} from "@heroicons/react/outline"
import {StarIcon} from "@heroicons/react/solid"

const InfoCard =({item,onMouseOver,onMouseLeave})=>{
return(
  <div 
  onMouseOver={onMouseOver}
  onMouseLeave={onMouseLeave}
  className="flex md:flex-row flex-col border-b pb-6 cursor-pointer hover:opacity-90 md:hover:shadow-lg px-2 md:pr-4 md:hover:rounded-xl transition duration-200 ease-out">
    <div className="relative h-[25vh] w-sm md:h-[12.6rem] md:w-[18.7rem] flex-shrink-0"> 
      <Image 
      src={item.img} 
      layout="fill" 
      objectFit="cover" className="rounded-xl"
      />
    </div>

    <div className="flex flex-col flex-grow md:pl-5 mt-2 md:mt-0">
        <div className="flex justify-between items-center md:items-start">
          <p className="font-light text-gray-500 text-sm">{item.location}</p>
          <HeartIcon className="md:h-12 h-10 cursor-pointer md:-mt-2 p-2 rounded-full md:hover:bg-gray-100 -mr-2"/>
        </div>
        <h4 className="text-xl font-light">{item.title}</h4>
        <div className="border-b w-9 pt-2"/>
        <p className="text-sm pt-2 text-gray-500 font-light flex-grow">{item.description}</p>
        <div className="flex justify-between items-end -mb-1">
          <p className="flex items-center"><StarIcon className="h-5 text-red-400 mr-0.5"/>{item.star} <span className="ml-1 text-gray-500 text-sm font-light">(25 reviews)</span></p>

          <div>
          <p>{item.price}</p>
          <p className="text-gray-500 font-light text-sm text-right underline cursor-pointer">{item.total}</p>
        </div>
        </div>
        
    </div>
  </div>
)
}

export default InfoCard