import Image from "next/image"
import {HeartIcon} from "@heroicons/react/outline"
import {StarIcon} from "@heroicons/react/solid"
import {useRouter} from "next/router"

const InfoCard =({item,onMouseOver,onMouseLeave})=>{
  const router= useRouter()
  const {guestNumber} = router.query;

return(
  <div 
  onMouseOver={onMouseOver}
  onMouseLeave={onMouseLeave}
  className="flex md:flex-row flex-col border-b pb-6 cursor-pointer hover:opacity-90 md:hover:shadow-lg px-2 md:pr-4 md:hover:rounded-xl transition duration-200 ease-out">
    <div className="relative h-[25vh] w-sm md:h-[12.6rem] md:w-[18.7rem] flex-shrink-0"> 
      <Image 
      src={item?.hotel?.media ? item?.hotel?.media[0]?.uri:"/hotel_img.jpeg"} 
      layout="fill" 
      objectFit="cover" className="rounded-xl"
      />
    </div>

    <div className="flex flex-col flex-grow md:pl-5 mt-2 md:mt-0">
        <div className="flex justify-between items-center md:items-start">
          <p className="font-light text-gray-500 text-sm lowercase">{item?.hotel?.address?.lines[0]}</p>
          <HeartIcon className="md:h-12 h-10 cursor-pointer md:-mt-2 p-2 rounded-full md:hover:bg-gray-100 -mr-2"/>
        </div>
        <h4 className="text-xl font-light">{item?.hotel?.name}</h4>
        <div className="border-b w-9 pt-2"/>
        <p className="text-sm pt-2 text-gray-500 font-light flex-grow">
          <span>{guestNumber} guests</span> ·
          <span>{item?.offers[0].room.typeEstimated?.beds} bedroom</span> · 
          <span>{item?.offers[0].room.typeEstimated?.beds} bed</span> · 1 batch
          {item?.hotel?.amenities?.slice(0,4).map(item=><span className="lowercase" key={item}> · {item}</span>)}...
        </p>
        <div className="flex justify-between items-end md:-mb-1">
          <p className="flex items-center"><StarIcon className="h-5 text-red-400 mr-0.5"/>
           {item.hotel.rating} <span className="ml-1 text-gray-500 text-sm font-light">(25 reviews)</span>
          </p>

          <div>
          <p>${item.offers[0].price.total} /night</p>
          <p className="text-gray-500 font-light text-sm text-right underline cursor-pointer">${item.offers[0].price.total}</p>
        </div>
        </div>
        
    </div>
  </div>
)
}

export default InfoCard