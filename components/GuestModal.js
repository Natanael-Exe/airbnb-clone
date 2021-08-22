import { HeartIcon,ChevronDownIcon,ChevronUpIcon,PlusSmIcon,MinusSmIcon } from "@heroicons/react/outline";


const GuestModal=({adults,setAdults,childrens,setChildrens,infants,setInfants,setShowGuestDropDown})=>{
  return(
    <div className="rounded-md bg-white border shadow-lg p-4 flex flex-col absolute inset-x-0 space-y-6  w-full transiton duration-200 ease-in" 
    onDoubleClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
    }}
    >
                    <div className="flex items-center justify-between">
                      <h4>Adults</h4>
                      <p className="inline-flex items-center ">
                        <MinusSmIcon 
                        onClick={()=>adults >1 && setAdults(prev=>prev-1)}
                        onDoubleClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        className={`rounded-full w-9 h-9 flex-shrink-0 mr-2 p-2 border ${adults ==1? "text-gray-300 cursor-not-allowed":"hover:border-gray-600 text-gray-600"} cursor-pointer hover:border-gray-600 preventDoubleClick`}/>
                        {adults}
                        <PlusSmIcon 
                        onClick={()=>adults <2 && setAdults(prev=>prev+1)}
                        onDoubleClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        className={`rounded-full w-9 h-9 flex-shrink-0 ${adults==2? "text-gray-300 cursor-not-allowed":"hover:border-gray-600 text-gray-600"}  p-2 border ml-2 cursor-pointer preventDoubleClick`}/>
                        </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <h4>Children</h4>
                        <p className="text-xs text-gray-600">Ages 2-12</p> 
                      </div>
                      <p className="inline-flex items-center ">
                        <MinusSmIcon 
                        onClick={()=>childrens>0 && setChildrens(prev=>prev-1)}
                        onDoubleClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        className={`rounded-full w-9 h-9 flex-shrink-0 mr-2 p-2 border ${childrens ==0? "text-gray-300 cursor-not-allowed":"hover:border-gray-600 text-gray-600"} cursor-pointer hover:border-gray-600 preventDoubleClick`}/>
                        {childrens}
                        <PlusSmIcon 
                        onClick={()=>setChildrens(prev=> prev+1)}
                        onDoubleClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        className="rounded-full w-9 h-9 flex-shrink-0 text-gray-600 p-2 border ml-2 cursor-pointer hover:border-gray-600 preventDoubleClick"/>  
                        </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <h4>Infants</h4>
                        <p className="text-xs text-gray-600">Under 2</p> 
                      </div>
                      
                      <p className="inline-flex items-center ">
                        <MinusSmIcon 
                        onClick={()=>infants>0 && setInfants(prev=>prev-1)}
                        onDoubleClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        className={`rounded-full w-9 h-9 flex-shrink-0 mr-2 p-2 border ${infants ==0? "text-gray-300 cursor-not-allowed":"hover:border-gray-600 text-gray-600"} cursor-pointer hover:border-gray-600 preventDoubleClick`}/>
                        {infants}
                        <PlusSmIcon 
                        onClick={()=>setInfants(prev=>prev+1)}
                        onDoubleClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        className="rounded-full w-9 h-9 flex-shrink-0 text-gray-600 p-2 border ml-2 cursor-pointer hover:border-gray-600 preventDoubleClick"/>
                      </p>
                    </div>
                    <p className="text-sm font-light w-10/12 text-left">2 guests maximum. Infants don’t count toward the number of guests.</p>
                    <p className="text-center ml-auto font-semibold underline cursor-pointer p-2 hover:bg-gray-100 hover:rounded-md inline w-16" 
                    onClick={()=>setShowGuestDropDown(false)}
                    >Close</p>
                  </div>
  )
}

export default GuestModal