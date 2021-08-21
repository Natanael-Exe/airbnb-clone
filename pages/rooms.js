import Amadeus from "amadeus";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { format } from "date-fns";
import Image from "next/image";
import Head from "next/head";
import { FiShare } from "react-icons/fi";
import { BsGrid3X3Gap } from "react-icons/bs";
import Reservation from "../components/Reservation";
import Footer from "../components/Footer";
import { StarIcon } from "@heroicons/react/solid";
import {
  HeartIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { HiHome } from "react-icons/hi";

import Header from "../components/Header";
import RoomsDetailsLeft from "../components/RoomsDetailsLeft";

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

  const [showMore, setShowMore] = useState(false);
  const formattedStartDate = startDate ? format(startDate, "dd MMMM yy") : "";

  const formattedEndDate = endDate ? format(endDate, "dd MMMM yy") : "";

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    longitude: roomsDetails?.hotel?.longitude,
    latitude: roomsDetails?.hotel?.latitude,
    zoom: 12,
  });

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
              <p className="flex items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                <FiShare className="h-4 w-4 mr-1 text-gray-700" />
                <span className="underline text-sm font-medium text-gray-900">
                  Share
                </span>
              </p>
              <p className="flex items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                <HeartIcon className="h-4 w-4 mr-1 text-gray-700" />
                <span className="underline text-sm font-medium text-gray-900">
                  Save
                </span>
              </p>
            </div>
          </div>
        </section>
        {/* gallery section */}
        <section className="mt-5">
          <div className="grid grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-xl relative">
            <div className="rounded-lg border border-black bg-white px-4 py-2 flex items-center absolute bottom-6 right-6 z-20 cursor-pointer">
              <BsGrid3X3Gap className="w-4 h-4 mr-2" />
              <p className="text-sm">Show all photos</p>
            </div>
            {roomsDetails?.hotel?.media.map((item, index) =>
              index == 0 ? (
                <div
                  className={`relative h-[50vh] ${
                    roomsDetails?.hotel?.media.length == 1
                      ? "col-span-4"
                      : "col-span-2"
                  } row-span-2`}
                >
                  <Image
                    layout="fill"
                    objectFit="cover"
                    className="hover:opacity-90 cursor-pointer transition duration-200"
                    src={item?.uri}
                  />
                </div>
              ) : (
                <div className="relative h-[50vh]">
                  <Image
                    layout="fill"
                    objectFit="cover"
                    className=""
                    src={item?.uri}
                  />
                </div>
              )
            )}
          </div>
        </section>
        {/* author and price section */}
        <section className="mt-10">
          <div className="md:flex md:space-x-20">
            <div className="md:w-7/12">
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
            <div className="md:w-5/12  self-start sticky top-24 mt-6 md:mt-0">
              <Reservation
                pricePerNight={pricePerNight}
                startDate={startDate}
                endDate={endDate}
                guestNumber={guestNumber}
                numberOfNights={numberOfNights}
                weeklyDiscount={weeklyDiscount}
                total={total}
              />
            </div>
          </div>
        </section>
        <hr className="my-10 " />
        <section>
          <h2 className="text-xl font-medium inline-flex items-center">
            <StarIcon className="h-5 w-5 text-red-500 mr-1" /> 2 reviews
          </h2>
          <div className="flex flex-col-reverse md:flex-row items-start justify-between mt-4 md:space-x-8">
            <div className="flex-grow-0 w-full mt-6 md:mt-0">
              <div className="flex items-center">
                <img
                  src="/customer1.jpeg"
                  className="w-16 h-16 rounded-full object-cover object-center mr-3"
                />
                <div>
                  <h3 className="font-medium">Rongbing</h3>
                  <p className="text-light text-sm text-gray-500">
                    {format(new Date(), "MMMM yy")}
                  </p>
                </div>
              </div>
              <p className="font-light pt-3 md:w-9/12">
                Location is great, and the overall quality is ok. I do have some
                complaints in 1. Laundry. The self service laundry machine is
                operated by
              </p>
              <p className="inline-flex underline mt-2 items-center cursor-pointer">
                Show more <ChevronRightIcon className="w-5 h-5 ml-1" />
              </p>
            </div>

            <div className="flex-grow-0 w-full ">
              <div className="flex items-center">
                <img
                  src="/customer2.jpeg"
                  className="w-16 h-16 rounded-full object-cover object-center mr-3"
                />
                <div>
                  <h3 className="font-medium">Ashley</h3>
                  <p className="text-light text-sm text-gray-500">
                    {format(new Date(), "MMMM yy")}
                  </p>
                </div>
              </div>
              <p className="font-light pt-3 md:w-9/12">
                Great location and great value. Reminded me of student halls (in
                a good way)
              </p>
            </div>
          </div>
        </section>
        <hr className="my-10 " />
        <section className="mb-8">
          <h2 className="text-xl font-medium ">Where you’ll be</h2>
          <div className="w-full xl:min-w-[600px] h-[70vh] pt-4 pb-8">
            <ReactMapGL
              {...viewport}
              onViewportChange={(nextViewport) => setViewport(nextViewport)}
              mapStyle={process.env.site_url}
              mapboxApiAccessToken={process.env.mapbox_key}
              className="relative"
              //ref={refTop}
            >
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
          <p className={`font-light my-3 ${!showMore ? "clamp-3" : ""}`}>
            {roomsDetails?.hotel?.description?.text}
          </p>
          <p
            className="inline-flex underline items-center cursor-pointer"
            onClick={() => setShowMore((prevState) => !prevState)}
          >
            Show more <ChevronRightIcon className="w-5 h-5 ml-1" />
          </p>
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
