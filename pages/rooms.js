import Amadeus from "amadeus";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { format } from "date-fns";
import Head from "next/head";

import Reservation from "../components/Reservation";
import Footer from "../components/Footer";
import Reviews from "../components/Reviews"
import RoomMap from "../components/RoomMap"
import Gallery from "../components/Gallery"
import Header from "../components/Header";
import RoomsDetailsLeft from "../components/RoomsDetailsLeft";

import { FiShare } from "react-icons/fi";
import {HeartIcon,} from "@heroicons/react/outline";



const Rooms = ({ roomsDetails }) => {
  //const numberOfNights = formatDistance(startDate,endDate)

  const router = useRouter();
  const guestNumberRef = useRef();
  const {
    startDate: userStartDate,
    endDate: userEndDate,
    guestNumber,
  } = router.query;

  const [startDate, setStartDate] = useState(new Date(userStartDate));
  const [endDate, setEndDate] = useState(new Date(userEndDate));

  
  const formattedStartDate = startDate ? format(startDate, "dd MMMM yy") : "";

  const formattedEndDate = endDate ? format(endDate, "dd MMMM yy") : "";



  const selectDateRange = {
    startDate,
    endDate,
    key: "selection",
  };

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection?.startDate);
    setEndDate(ranges.selection?.endDate);
  };

  const Difference_In_Time = endDate.getTime() - startDate.getTime();
  const numberOfNights = Math.round(Difference_In_Time / (1000 * 3600 * 24));

  const pricePerNight = Math.round(roomsDetails?.offers[0]?.price?.total);

  const weeklyDiscount = pricePerNight * numberOfNights * 0.05;

  const total =
    numberOfNights > 8
      ? pricePerNight * numberOfNights - weeklyDiscount
      : pricePerNight * numberOfNights;

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Rooms | Airbnb</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
        {/* <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" /> */}
      </Head>
      <Header />
      <main className="flex-auto max-w-7xl mx-auto px-8 sm:px-16 w-full">
        {/* Title and share,save options */}
        <section className="pt-6">
          <h1 className="text-3xl font-medium pb-1 capitalize">
            {roomsDetails?.hotel?.name?.toLowerCase()}
          </h1>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500 underline truncate cursor-pointer">
              2 reviews,{" "}
              <span className="capitalize">
                {roomsDetails?.hotel?.address?.lines[0]?.toLowerCase()},{" "}
                {roomsDetails?.hotel?.address?.cityName?.toLowerCase()}{" "}
              </span>
            </p>

            <div className="flex items-center">
              <p className="inline-flex underline text-sm font-medium text-gray-900 items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                <FiShare className="h-4 w-4 mr-1 text-gray-700" /> Share
              </p>
              <p className="inline-flex underline text-sm font-medium text-gray-900 items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                <HeartIcon className="h-4 w-4 mr-1 text-gray-700" />Save
              </p>
            </div>
          </div>
        </section>
        {/* gallery section */}
        <section className="mt-5">
          <Gallery roomsDetails={roomsDetails}/>
        </section>
        {/* author and price section */}
        <section className="mt-10">
          <div className="md:flex md:space-x-20">
            <div className="lg:w-7/12 md:w-6/12">
              <RoomsDetailsLeft
                selectDateRange={selectDateRange}
                formattedStartDate={formattedStartDate}
                formattedEndDate={formattedEndDate}
                handleSelect={handleSelect}
                numberOfNights={numberOfNights}
                roomsDetails={roomsDetails}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
              />
            </div>
            <div className="lg:w-5/12 md:w-6/12  self-start sticky top-24 mt-6 md:mt-0">
              <Reservation
                pricePerNight={pricePerNight}
                startDate={startDate}
                endDate={endDate}
                guestNumber={guestNumber}
                numberOfNights={numberOfNights}
                weeklyDiscount={weeklyDiscount}
                rating={roomsDetails?.hotel?.rating}
                total={total}
              />
            </div>
          </div>
        </section>
        <hr className="my-10 " />
        <section>
          <Reviews/>
        </section>
        <hr className="my-10 " />
        <section className="mb-8">
           <RoomMap
           roomsDetails={roomsDetails}
           />
          </section>
        {/* <hr className="my-10 " /> */}
      </main>
      <div className="bg-gray-100">
        <Footer />
      </div>
    </div>
  );
};

export default Rooms;

export const getServerSideProps = async ({ query }) => {
  const { hotelId } = query;

  let roomsDetails;

  const amadeus = new Amadeus({
    clientId: process.env.API_KEY,
    clientSecret: process.env.API_SECRET,
    hostname: "production",
  });

  await amadeus.shopping.hotelOffersByHotel
    .get({
      hotelId,
    })
    .then((response) => {
      roomsDetails = response.data;
      //return amadeus.next(response);
    })
    // .then(function(nextResponse){
    //  console.log(nextResponse.data); // second page
    // })
    .catch((err) => console.log(err));

  return {
    props: {
      roomsDetails: roomsDetails || [],
    },
  };
};
