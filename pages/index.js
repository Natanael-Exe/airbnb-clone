import Head from "next/head";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LargeCard from "../components/LargeCard";
import MediumCard from "../components/MediumCard";
import SmallCard from "../components/SmallCard";

export default function Home({exploreData,cardsData}) {
  return (
    <div className="">
      <Head>
        <title>Home | Airbnb</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
        {/* <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" /> */}
      </Head>
      <Header/>
      <Banner/>
      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">
            Explore Nearby
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
             {exploreData?.map(item=>(
            <SmallCard 
            key={item.img}
            img={item.img}
            location={item.location}
            distance={item.distance}/>
          ))}
          </div>
         
          </section>
          <section>
          <h2 className="text-4xl font-semibold py-5">
            Live Anywhere
          </h2>
          <div className="flex space-x-3 overflow-x-auto scrollbar-hide p-3 -ml-3 ">
            {cardsData.map(({img,title})=>(
              <MediumCard
              key={img}
              img={img}
              title={title}
              />
            ))}
          </div>
          </section>
          <section>
            <LargeCard
             img="https://links.papareact.com/4cj"
             title="The Greatest Outdoors"
             description="Wishlists curated by Airbnb"
             buttonText="Get inspired"
            />
          </section>
       </main>
       <div className="bg-gray-100">
         <Footer/>
       </div>
          
    </div>
  );
}

export const getStaticProps = async()=>{
  const exploreData = await fetch('https://links.papareact.com/pyp').then(res=>res.json()) || [];
  
  const cardsData = await fetch('https://links.papareact.com/zp1').then(res=>res.json()) || [];

  return{
    props:{
      exploreData,
      cardsData
    }
  }
}
