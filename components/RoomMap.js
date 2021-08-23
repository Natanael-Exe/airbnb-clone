import { useState} from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import {
  ChevronRightIcon,
  PlusIcon,MinusIcon
} from "@heroicons/react/outline";
import {
  PlusCircleIcon
} from "@heroicons/react/solid";
import { HiHome } from "react-icons/hi";
import {ImMan} from "react-icons/im";

const RoomMap=({roomsDetails})=> {
    const [isChecked,setIsChecked] = useState(true);
    const [viewport, setViewport] = useState({
    longitude: roomsDetails?.hotel?.longitude,
    latitude: roomsDetails?.hotel?.latitude,
    zoom: 12,
  });

  const onLoaded =(map) =>{
    map.resize();
}


  return (
    <>
       <h2 className="text-xl font-medium ">Where you’ll be</h2>
          <div className="w-full xl:min-w-[600px] md:h-[70vh] h-[50vh] pt-4 pb-8">
            <ReactMapGL
              width="100%"
              height= "100%"
              {...viewport}
              onViewportChange={(nextViewport) => {
                const {width, height, ...etc} = nextViewport
                setViewport(etc)
              }}
              mapStyle={process.env.site_url}
              mapboxApiAccessToken={process.env.mapbox_key}
              className="relative"
              //ref={refTop}
              onStyleLoad={(map)=>onLoaded(map)}
            >
              <div className="absolute p-6 drop-shadow-md top-0 right-0 z-30 flex items-start">
                  <div className="flex py-2 px-4 bg-white rounded-lg items-center text-sm text-light mr-4">
                    <input type="checkbox" 
                    defaultChecked={isChecked}
                    onChange={(e)=>setIsChecked(e.target.value)}
                    className="mr-2 form-checkbox text-gray-900 border border-gray-400 focus:outline-none ring-0 rounded p-1 w-6 h-6 appearance-none"/> Public Transit
                  </div>
                  <div>
                      <div className="rounded-lg bg-white">
                        <PlusIcon 
                        className="h-10 p-2 cursor-pointer"
                        onClick={()=>viewport.zoom < 22 && setViewport(prevState=>({...prevState,zoom:prevState.zoom+1}))}/>
                        <hr className="mx-1"/>
                        <MinusIcon 
                        className="h-10 p-2 cursor-pointer"
                        onClick={()=>viewport.zoom > 3 && setViewport(prevState=>({...prevState,zoom:prevState.zoom-1}))}
                        />
                      </div>
                       <PlusCircleIcon className="h-10 p-2 bg-white rounded-lg cursor-pointer my-4"/>
                       <div className="rounded-lg bg-white">
                         <ImMan className="h-10 w-10 px-2 py-1 cursor-pointer text-yellow-500"/>
                       </div>

                  </div>
                  
              </div>
              <Marker
                longitude={roomsDetails?.hotel?.longitude}
                latitude={roomsDetails?.hotel?.latitude}
                offsetLeft={-20}
                offsetTop={-10}
              >
                <div className="text-white p-3 rounded-full bg-pink-600 flex flex-col items-center justify-center">
                  <HiHome className="w-7 h-7" />
                </div>
              </Marker>
            </ReactMapGL>
          </div>
          <h3 className="truncate cursor-pointer">
            <span className="capitalize">
              {roomsDetails?.hotel?.address?.lines[0]?.toLowerCase()},{" "}
              {roomsDetails?.hotel?.address?.cityName?.toLowerCase()}{" "}
            </span>
          </h3>
          <p className={`font-light my-3 clamp-3`}>
            {roomsDetails?.hotel?.name} is one the best place to live because it is gated, private and very affluent neighborhood to spend you special moment.
          </p>
          <p
            className="inline-flex underline items-center cursor-pointer"
            //onClick={() => setShowMore((prevState) => !prevState)}
          >
            Show more <ChevronRightIcon className="w-5 h-5 ml-1" />
          </p>
    </>
  )
}

export default RoomMap
