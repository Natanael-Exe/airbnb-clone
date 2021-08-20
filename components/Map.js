import { useState,useEffect,useRef } from 'react';
import {useRouter} from "next/router"
import ReactMapGL,{Marker,Popup} from 'react-map-gl';
import getCenter from "geolib/es/getCenter"
import ModalCard from "./ModalCard"
import {ChevronLeftIcon,ChevronRightIcon,PlusIcon,MinusIcon} from "@heroicons/react/solid"

function Map({searchResults,hoverItem,setShowList,showList,windowPostion,setWindowPosition}) {

  const coords = searchResults?.map(item=>({
    longitude:item?.hotel?.longitude,
    latitude:item?.hotel?.latitude
    }));
  const [selectedLocation,setSelectedLocation] = useState("")
  const [isChecked,setIsChecked] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const center = getCenter(coords);
  const router = useRouter();
  const refTop = useRef(false);
  

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    longitude:  center.longitude,
    latitude: center.latitude,
    zoom: 12
  });

  
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setShowModal);


  // useEffect(()=>{
  //   if(!showList && refTop.current){
  //     refTop.current.windOffset=window.scrollY;
  //     document.body.setAttribute("style",`position:fixed;top:-${refTop.current.windOffset}px;left:0;right:0`)
   
  //   }
  // },[showList,refTop])
  //console.log("offset:",refTop.current);
  return (
   
    <ReactMapGL
    {...viewport}
    onViewportChange={nextViewport => setViewport(nextViewport)}
    mapStyle={process.env.site_url}
    mapboxApiAccessToken={process.env.mapbox_key}
    className="relative"
    ref={refTop}
   >
    <div className="absolute flex justify-between items-start p-6 drop-shadow-md w-full z-30">
      {showList ?
        <ChevronLeftIcon 
        className="h-10 p-2 bg-white rounded-lg cursor-pointer"
        onClick={()=>{
          //setWindowPosition(window.scrollY);
          setShowList(!showList);
          // refTop.current.windOffset = window.scrollY;
          
          // document.body
          // .setAttribute(
          //   "style",
          //   `position:fixed;top:-${refTop.current.windOffset}px;left:0;right:0`
          // )
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        />
        :
        <div className="flex items-center bg-white rounded-lg cursor-pointer p-2 "
        onClick={()=>{
          // document.body.setAttribute("style","");
          // window.scrollTo(0,refTop?.current?.windOffset);
          setShowList(!showList)
          //window.scrollTo({ top: windowPostion, behavior: "smooth" });     
        }}
        >
        <ChevronRightIcon className="h-6"/> <p className="mr-1 text-sm text-light">Show list</p>
        </div>
        
      }
      <div className="md:flex py-2 px-4 bg-white rounded-lg items-center hidden text-sm text-light">
        <input type="checkbox" 
        defaultChecked={isChecked}
        onChange={(e)=>setIsChecked(e.target.value)}
        className="mr-2 form-checkbox text-gray-900 border border-gray-400 focus:outline-none ring-0 rounded p-1 w-6 h-6 appearance-none"/> Search as I move the map
      </div>
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
    </div> 
   {searchResults?.map(item=>
   <div key={item?.hotel?.name}>
     <Marker
     longitude={item?.hotel?.longitude}
     latitude={item?.hotel?.latitude}
     offsetLeft={-20}
     offsetTop={-10}
     
     > 
       <p 
       role="img"
       aria-label="push-pin"
       onClick={()=>{setSelectedLocation(item);setShowModal(true)}} 
       className={`py-1 px-2 ${item?.hotel?.name === hoverItem?.hotel?.name ?"bg-gray-900 text-white scale-105 duration-100":"bg-white text-gray-800 duration-200"}  font-semibold rounded-full shadow-md cursor-pointer hover:scale-105 transition  z-10 hover:z-50`}
       >
         $ {Math.floor(item.offers[0].price.total)}
       </p>
     </Marker>
      <div ref={wrapperRef}>
      { 
       showModal 
       && selectedLocation?.hotel?.name === item?.hotel?.name
       && (
          <Popup
          //onClose={()=>{setSelectedLocation("");setShowModal(false)}}
          //closeOnClick={true}
          className="relative"
          closeButton={false}
          sortByDepth={false}
          longitude={item?.hotel?.longitude}
          latitude={item?.hotel?.latitude}
          >
          <ModalCard 
          setSelectedLocation={setSelectedLocation}
          selectedLocation={selectedLocation}
          />
        </Popup>
        )
      }
      </div>
     </div>)}
   </ReactMapGL>
  )
}

export default Map


function useOutsideAlerter(ref, toggle) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        toggle(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
