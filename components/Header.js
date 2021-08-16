import Image from "next/image";
import {
  SearchIcon,
  MenuIcon,
  UserCircleIcon,
  GlobeAltIcon,
} from "@heroicons/react/solid";
import {useRouter} from "next/router"
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import { useState } from "react";

function Header({placeholder}) {
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [guestNumber, setGustNumber] = useState(1);

  const router = useRouter();
  const {location} = router.query
  const selectDateRange = {
    startDate,
    endDate,
    key: "selection",
  };

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection?.startDate);
    setEndDate(ranges.selection?.endDate);
  };

  const resetInput=()=>{
    setSearchInput("");
    setStartDate(new Date());
    setEndDate(new Date());
    setGustNumber(1)
  }
  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-4 md:px-16">
      {/* left */}
      <div className="relative flex items-center h-10 cursor-pointer my-auto" onClick={()=>router.push("/")}>
        <Image
          src="https://links.papareact.com/qd3"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>
      {/* middle -search */}
      <div className="rounded-full flex items-center md:border  py-2 md:shadow-sm cursor-pointer hover:shadow-md">
        <input
          type="text"
          placeholder={placeholder||"Search by city name"}
          className="md:pl-5 pl-2 bg-transparent outline-none flex-grow text-sm text-gray-600 placeholder-black"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <SearchIcon
          className="hidden md:inline-flex
      text-white rounded-full h-8 p-2 bg-red-400 cursor-pointer md:mx-2"
        />
      </div>
      {/* right */}
      <div
        className="flex md:space-x-4
      space-x-2 items-center justify-end text-gray-900"
      >
        <p className="hidden md:inline text-sm font-medium px-4 hover:bg-gray-100 py-2 rounded-full cursor-pointer">Become a host</p>
        <GlobeAltIcon className="h-9 flex-shrink-0 font-light text-gray-700 hover:bg-gray-100 p-2 rounded-full cursor-pointer" />
        <div className="flex items-center border rounded-full py-0.5 px-0.5 hover:shadow-md">
          <MenuIcon className="h-5 ml-2 mr-1 cursor-pointer text-gray-500" />
          <UserCircleIcon className="h-9 cursor-pointer ml-1 text-gray-500" />
        </div>
      </div>
      {searchInput && (
        <div className="flex flex-col col-span-3 mx-auto mt-2 border rounded-2xl md:p-3 p-2">
          <DateRangePicker
            ranges={[selectDateRange]}
            minDate={new Date()}
            rangeColors={["#FD5B61"]}
            onChange={handleSelect}
            className="flex md:block flex-wrap flex-col-reverse md:flex-row"
            //showMonthAndYearPickers={false}
          />
          <div className="flex items-center mt-2 border-b mb-4">
            <h2 className="text-xl font-semibold flex-grow">
              Number of guest
            </h2>
            <UserCircleIcon className="h-5 flex-shrink-0" />
            <input
              type="number"
              defaultValue={guestNumber}
              onChange={(e) => setGustNumber(e.target.value)}
              min={1}
              className="outline-none pl-2 bg-transparent w-12 text-red-400"
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="text-gray-500 hover:text-gray-700 py-2 px-4 flex-grow" onClick={resetInput}>Cancel</button>
            <button className="bg-red-400 text-white hover:bg-red-500 rounded-full py-2 px-4 flex-grow" onClick={()=>{router.push({
              pathname:"/search",
              query:{
                location:searchInput,
                startDate:startDate.toISOString(),
                endDate:endDate.toISOString(),
                guestNumber
              }
            });setSearchInput("");}}>Search</button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
