import { DateRangePicker } from "react-date-range";
import { BiHome, BiBadgeCheck } from "react-icons/bi";
import { UserCircleIcon } from "@heroicons/react/solid";
import { AiOutlineClear, AiOutlineCalendar } from "react-icons/ai";
import { RiDoorClosedLine } from "react-icons/ri";
import { useRouter } from "next/router";
import { useState } from "react";
import { format } from "date-fns";
import { FaRegKeyboard } from "react-icons/fa";
import { ChevronRightIcon } from "@heroicons/react/outline";


const RoomsDetailsLeft = ({
  roomsDetails,
  selectDateRange,
  formattedStartDate,
  formattedEndDate,
  handleSelect,
  numberOfNights,
  setEndDate,
  setStartDate,
}) => {
  const router = useRouter();
  const { guestNumber } = router.query;
  const [showMore, setShowMore] = useState(false);
  const [showMoreAminities, setShowMoreAminities] = useState(false);
  const cancelDate = roomsDetails?.offers[0]?.policies?.cancellation?.deadline;
  const formatedCancelDate = cancelDate 
    ? format(new Date(cancelDate), "MMM dd")
    : "";

  const amenities = showMoreAminities
    ? roomsDetails?.hotel?.amenities
    : roomsDetails?.hotel?.amenities?.slice(0, 10);

  return (
    <>
      <div className="flex items-center pb-4 border-b">
        <div className="flex-auto">
          <h2 className="text-xl font-medium">
            Entire rental unit hosted by Vikki
          </h2>
          <p className="font-light">
            <span>{guestNumber} guests</span> ·{" "}
            <span>
              {roomsDetails?.offers[0].room.typeEstimated?.beds} bedroom
            </span>{" "}
            ·{" "}
            <span>{roomsDetails?.offers[0].room.typeEstimated?.beds} bed</span>{" "}
            · 1 batch
          </p>
        </div>
        <UserCircleIcon className="w-16 h-16 text-gray-300" />
      </div>

      <div className="flex flex-col space-y-6 mt-8  pb-6 border-b">
        <div className="flex items-start">
          <BiHome className="h-7 w-7 mr-2 flex-shrink-0" />
          <div>
            <h3 className=" font-medium">Entire home</h3>
            <p className="text-sm font-light text-gray-500 mt-1">
              You’ll have the serviced apartment to yourself.
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <AiOutlineClear className="h-7 w-7 mr-2 flex-shrink-0" />
          <div>
            <h3 className=" font-medium">Enhanced Clean</h3>
            <p className="text-sm font-light text-gray-500 mt-1">
              This host committed to Airbnb's 5-step enhanced cleaning process.
              <span className="text-gray-800 underline cursor-pointer font-medium ml-0.5">
                Show more
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <RiDoorClosedLine className="h-7 w-7 mr-2 flex-shrink-0" />
          <div>
            <h3 className=" font-medium">Self check-in</h3>
            <p className="text-sm font-light text-gray-500 mt-1">
              Check yourself in with the lockbox.
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <AiOutlineCalendar className="h-7 w-7 mr-2 flex-shrink-0" />
          <h3 className=" font-medium">
            Free cancellation before {formatedCancelDate}
          </h3>
        </div>
      </div>

      {/* <ul className="font-light text-gray-900 mt-6 pb-6 border-b">
        <li>- 2 minutes walk to Farringdon Station</li>
        <li>- Single flat</li>
        <li>- Exclusive high speed Wi-Fi router in studio</li>
        <li>- Small private shower room pod</li>
        <li>- Full functional kitchen</li>
        <li>- Desk space</li>
        <li>- Gym, laundry available on site</li>
      </ul> */}
      {roomsDetails?.hotel?.description?.text && (
        <div className="mt-6 pb-6 border-b">
          <p className={`font-light my-3 ${!showMore ? "clamp-3" : ""}`}>
            {roomsDetails?.hotel?.description?.text}
          </p>
          <p
            className="inline-flex underline items-center cursor-pointer"
            onClick={() => setShowMore((prevState) => !prevState)}
          >
            {showMore ? "Show less" : "Show more"}{" "}
            <ChevronRightIcon className="w-5 h-5 ml-1" />
          </p>
        </div>
      )}

      <div className="mt-12 pb-6 border-b">
        <h2 className="text-xl font-medium  mb-6">What this place offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {amenities?.map((item) => (
            <div
              className="capitalize flex items-center font-light text-gray-900 col-span-2 md:col-span-1"
              key={item}
            >
              <BiBadgeCheck className="w-6 h-6 mr-2 flex-shrink-0" />
              <p>{item?.split("_")?.join(" ")?.toLowerCase()}</p>
            </div>
          ))}
          <div className="mt-4 pb-6 col-span-2">
            {roomsDetails?.hotel?.amenities.length && (
              <p
                className="px-4 py-2 rounded-md border border-black  inline cursor-pointer hover:underline"
                onClick={() => setShowMoreAminities((prev) => !prev)}
              >
                {showMoreAminities
                  ? "Show less"
                  : `Show all ${roomsDetails?.hotel?.amenities.length} amenities`}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-12 " id="date-range-picker">
        <h2 className="font-medium text-xl">
          {numberOfNights} nights in Greater London
        </h2>
        <p className="text-sm font-light text-gray-500 mb-6 mt-2">
          {formattedStartDate} - {formattedEndDate}
        </p>
        <DateRangePicker
          ranges={[selectDateRange]}
          minDate={new Date()}
          rangeColors={["#FD5B61"]}
          onChange={handleSelect}
          className="flex md:block  flex-col-reverse md:flex-row w-full"
          //showMonthAndYearPickers={false}
        />
        <div className="mt-4 flex items-center justify-between">
          <div className="hover:rounded-full hover:bg-gray-200 cursor-pointer p-2">
            <FaRegKeyboard className="w-6 h-6" />
          </div>

          <p
            className=" text-center underline cursor-pointer"
            onClick={() => {
              setStartDate(new Date());
              setEndDate(new Date());
            }}
          >
            Clear dates
          </p>
        </div>
      </div>
    </>
  );
};

export default RoomsDetailsLeft;
