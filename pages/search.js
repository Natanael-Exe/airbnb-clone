import {useState,useEffect} from "react"
import Header from "../components/Header";
import Footer from "../components/Footer";
import { format } from "date-fns";
import { useRouter } from "next/router";
import InfoCard from "../components/InfoCard";
import Map from "../components/Map"
import Amadeus from "amadeus"
import cities from "../utils/cities.json"

const Search = ({searchResults,hotelOffers}) => {
  const amadeus = new Amadeus({
    clientId: 'RazDfTnL3iaZOInTUhfkguqecdVhQx3p',
    clientSecret: 'w2bjJZ793VEkWYt6'
  });

console.log(hotelOffers)
  // useEffect(()=>{
  //   const fecthData = async ()=>{
  //     amadeus.shopping.hotelOffers.get({
  //       cityCode : 'new'.toUpperCase()
  //     }).then(result=>console.log("amedeus:",result?.data))
  //   }
  //   fecthData()
  // },[])

  const router = useRouter();
  const { location, startDate, endDate, guestNumber } = router.query;
  const [hoverItem,setHoverItem]= useState("");

  const formattedStartDate = startDate
    ? format(new Date(startDate), "dd MMMM yy")
    : "";

  const formattedEndDate = endDate
    ? format(new Date(endDate), "dd MMMM yy")
    : "";

  const range = `${formattedStartDate} - ${formattedEndDate}`;
  

  return (
    <div className="min-h-screen flex flex-col ">
      <Header
        placeholder={`${location}  |  ${range}  |  ${guestNumber} guests`}
      />
      <main className="flex-auto flex">
        <section className="flex-grow pt-12 px-6">
          <p className="text-sm font-light text-gray-800">
            300+ stays · {range} · {guestNumber} guests{" "}
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
          <div className="flex flex-col  my-6 space-y-6">
            {searchResults.map((item,index)=>
            <InfoCard 
            onMouseOver={()=>setHoverItem(item)}  
            onMouseLeave={()=>setHoverItem("")}
            key={index} 
            item={item}
            />
            )}
          </div>
        </section>
        <section className="hidden lg:inline-flex xl:min-w-[600px] h-[90vh] sticky top-16 transition duration-200">
          <Map searchResults={searchResults} hoverItem={hoverItem}/>
        </section>
      </main>
      <div className="bg-gray-100">
         <Footer/>
       </div>
    </div>
  );
};
export default Search;

export const getServerSideProps  = async ({query})=>{
  const {location}=query
  const amadeus = new Amadeus({
    clientId: 'RazDfTnL3iaZOInTUhfkguqecdVhQx3p',
    clientSecret: 'w2bjJZ793VEkWYt6'
  });

    let city = cities.find(item =>item?.City?.toLowerCase().includes(location?.toLowerCase()));

   const hotelOffers = (await amadeus
    .shopping
    .hotelOffers
    .get({
      cityCode : city.Code
    })
    .then(({data})=>data)
    .catch(err=>console.log(err))) || [];
  //const searchResult = response?.data 
  console.log(hotelOffers)

 const searchResults = await fetch('https://links.papareact.com/isz')
 .then(res=>res.json())||[]

 return{
   props:{
    searchResults,
    hotelOffers:response
   }
 }
}
