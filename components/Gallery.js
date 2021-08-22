import { BsGrid3X3Gap } from "react-icons/bs";
import Image from "next/image"

function Gallery({roomsDetails}) {
  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-xl relative">
            <div className="rounded-lg border border-black bg-white px-2 md:px-4 py-1  md:py-2 flex items-center absolute  bottom-6 right-6 z-20 cursor-pointer">
              <BsGrid3X3Gap className="w-4 h-4 mr-2" />
              <p className="text-sm">Show all photos</p>
            </div>
            {roomsDetails?.hotel?.media.map((item, index) =>
              index == 0 ? (
                <div
                  className={`relative md:h-[50vh] h-[30vh] ${
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
  )
}

export default Gallery
