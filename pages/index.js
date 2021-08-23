import Head from "next/head";
import Banner from "../components/Banner";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Header from "../components/Header";
import {mediumCardsData,largeCardsData} from "../lib/index"
import LargeCard from "../components/LargeCard";
import MediumCard from "../components/MediumCard"
import Inspiration from "../components/Inspiration"

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Airbnb: Vaction Rentals, Cabins, Beach Houses, Unique Homes & Experience</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
        {/* <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" /> */}
      </Head>
      <Header/>
      <Hero/>
      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        
          <section>
          <h2 className="text-3xl font-semibold pt-10 pb-4">
            Live anywhere
          </h2>
          <div className="flex space-x-3 overflow-x-auto scrollbar-hide p-3 -ml-3 ">
            {mediumCardsData.map(({img,title,id})=>(
              <MediumCard
              key={id}
              img={img}
              title={title}
              />
            ))}
          </div>
          </section>
          <section className="pt-12">
            <Banner
             imgPc="/banner_img.jpeg"
             imgMobible="/banner_img_mobile.jpg"
             title="Try hosting"
             description="Earn extra income and unlock new opportunities by sharing your space."
             buttonText="Learn more"
            />
          </section>
          <section className="pt-16">
          <h2 className="text-3xl font-semibold pb-4">
            Discover things to do
          </h2>
          <div className="flex space-x-4 overflow-x-auto scrollbar-hide p-3 -ml-3 ">
            {largeCardsData.map(({img,title,id,subtitle},index)=>(
              <LargeCard
              key={id}
              img={img}
              title={title}
              subtitle={subtitle}
              index={index}
              />
            ))}
          </div>
          </section>
          <section className="pt-16">
          <Inspiration/>
          </section>
       </main>
       <div className="bg-gray-100">
         <Footer/>
       </div>
          
    </div>
  );
}


