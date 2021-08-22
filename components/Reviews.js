import { StarIcon } from "@heroicons/react/solid";
import {
  HeartIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";
import { format } from "date-fns";

const Reviews =()=>{
return(
  <>
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
  </>
)
}
export default Reviews