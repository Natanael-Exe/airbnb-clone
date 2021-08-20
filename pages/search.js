import {useState,useEffect,useRef} from "react"
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { format } from "date-fns";
import { useRouter } from "next/router";
import InfoCard from "../components/InfoCard";
import Map from "../components/Map"
import Amadeus from "amadeus"
//import cities from "../utils/cities.json"
import {MapIcon} from "@heroicons/react/solid";

const Search = ({searchResults}) => {
  const [reloadMap,setReloadMap] = useState(false);
  const [showList,setShowList] = useState(true);
  const router = useRouter();
  const { location, startDate, endDate, guestNumber } = router.query;
  const [hoverItem,setHoverItem]= useState("");
  const [windowPostion,setWindowPosition]= useState("")

  const infoCardRef=useRef(false);
  const formattedStartDate = startDate
    ? format(new Date(startDate), "dd MMMM yy")
    : "";

  const formattedEndDate = endDate
    ? format(new Date(endDate), "dd MMMM yy")
    : "";

  const range = `${formattedStartDate} - ${formattedEndDate}`;

  const numberOfPage = Math.floor(searchResults.length / 20);
  const [active, setActive] = useState(1);
  const refTop = useRef(false);

  const slicedData = searchResults.length > 20 ? searchResults?.slice(20 * active - 20, 20 * active):searchResults;
  
 useEffect(()=>{
  setReloadMap(true);
  setTimeout(() => {
    setReloadMap(false);
  }, 50);
 },[location,showList])

 useEffect(()=>{

 },[])


  return (
    <div className="min-h-screen flex flex-col ">
      <Head>
        <title>Search | Airbnb</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
        {/* <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" /> */}
      </Head>
      <Header
        placeholder={`${location}  |  ${range}  |  ${guestNumber} guests`}
      />
      {searchResults.length ? <main className="flex-auto flex">
        {showList && <section className="flex-grow pt-12 px-6 relative">
          <p className="text-sm font-light text-gray-800">
            {searchResults?.length} stays · {range} · {guestNumber} guests{" "}
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in {location}
          </h1>
          <div className="hidden lg:inline-flex mb-5 space-x-2 text-gray-800 whitespace-nowrap ">
            <p className="btn">Cancellation flexibility</p>
            <p className="btn">Type of place</p>
            <p className="btn">Price</p>
            <p className="btn">Rooms and beds</p>
            <p className="btn md:hidden xl:block">More filters</p>
          </div>
          <h2 className="font-light text-sm mt-2 text-gray-900 border-b pb-4">
            Review COVID-19 travel restrictions before you book.{" "}
            <span className="cursor-pointer underline">Learn more</span>
          </h2>
          <div className="flex flex-col  my-6 space-y-6" ref={refTop}>
            {slicedData.map((item,index)=>
            <div ref={infoCardRef}>
              <InfoCard 
            onMouseOver={()=>setHoverItem(item)}  
            onMouseLeave={()=>setHoverItem("")}
            key={index} 
            item={item}

            />
            </div>
            )}
          </div>
          {/* Pagination section */}
          <div className="flex items-center gap-x-4 gap-y-4 flex-wrap w-full py-10 mx-auto justify-center">
          {Array(numberOfPage)
            .fill()
            .map((_, index) => (
              <button
                onClick={() => {
                  setActive(index + 1);
                  window.scrollTo({ top: 200, behavior: "smooth" });
                }}
                className={` shadow-sm px-4 py-2 block hover:bg-gray-900 hover:text-white  rounded-full focus:outline-none ${
                  active == index + 1
                    ? "bg-gray-900 text-white"
                    : "text-gray-900 bg-gray-100"
                }`}
              >
                {index + 1}
              </button>
            ))}
        </div>
        {/* Button to Show map on mobile  */}
        <div className="flex items-center sticky inset-x-0 bottom-10 bg-gray-900 px-4 py-3 text-white rounded-full w-24 justify-center mx-auto cursor-pointer md:hidden"
        onClick={()=>{setShowList(!showList);window.scrollTo({ top:0, behavior: "smooth" });}}
        >
            <p className="text-sm font-light">Map</p> <MapIcon className="h-5 ml-1"/>
        </div>
        </section>}
        <section className={` lg:inline-flex ${!showList ?"w-full flex-1":"xl:min-w-[600px] hidden"}  h-[90vh] sticky top-16 transition duration-200`}>
          { !reloadMap && <Map 
          setShowList={setShowList}
           showList={showList}
          searchResults={slicedData}
             hoverItem={hoverItem}
             setWindowPosition={setWindowPosition}
             windowPostion={windowPostion}
             />}
        </section>
      </main>:
      <div className="flex items-center justify-center h-[70vh]">
          <p className="px-4 text-center">No stay found for this location please verify your location.</p>
      </div>
      }
      
      <div className="bg-gray-100">
         <Footer/>
       </div>
    </div>
  );
};
export default Search;

export const getServerSideProps  = async ({query})=>{
  const {location}=query;

  const coordonates = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.GOOGLE_PLACE_GOCODING_API_KEY}`).then(response => response.json()).catch(err => console.log(err))

  //console.log(coordonates?.results[0]?.geometry?.location)
  let hotelOffers;

   if(coordonates?.results.length){
        const amadeus = new Amadeus({
        clientId: process.env.API_KEY,
        clientSecret: process.env.API_SECRET,
        hostname:"production"
        });
        
        await amadeus
        .shopping
        .hotelOffers
        .get({
          latitude:coordonates?.results[0]?.geometry?.location.lat,
          longitude:coordonates?.results[0]?.geometry?.location.lng
        })
        .then((response)=>{
          hotelOffers = response.data 
          //return amadeus.next(response);
        })
        // .then(function(nextResponse){
        //  console.log(nextResponse.data); // second page
        // })
        .catch(err=>console.log(err));

   }else{
    let hotelOffers=[]
   }
  

    // let city = cities.find(item =>item?.City?.toLowerCase().includes(location?.toLowerCase()));

   
  //const searchResult = response?.data 
  //console.log(hotelOffers)

//  const searchResults = await fetch('https://links.papareact.com/isz')
//  .then(res=>res.json())||[]

 return{
   props:{
    searchResults:hotelOffers||[],
   }
 }
}
