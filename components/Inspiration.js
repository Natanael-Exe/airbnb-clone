import { inpirationTitleData, inpirationData } from "../lib/index";
import { ChevronRightIcon } from "@heroicons/react/solid";

const Inspiration = () => {
  return (
    <>
      <h2 className="text-3xl font-semibold pb-4">
        Inspiration for future getaways
      </h2>
      <div className="relative">
        <div className="flex items-center space-x-4  overflow-x-auto md:scrollbar-hide ">
          {inpirationTitleData.map((item) => (
            <div className="last:border-b-2 last:text-black border-black text-gray-500 flex-shrink-0">
              <p
                key={item}
                className="p-2 hover:bg-gray-100 hover:rounded-md cursor-pointer hover:border-0 mb-1  text-sm font-medium"
              >
                {item}
              </p>
            </div>
          ))}
        </div>
        <ChevronRightIcon className="w-6 h-6 absolute -right-3  top-2 md:hidden block" />
      </div>

      <hr />
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6 mt-4">
        {inpirationData.map((item) => (
          <div key={item.title}>
            <h4 className="text-sm text-gray-800 font-light">{item.title}</h4>
            <p className="text-gray-500 font-light mt-1">{item.location}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Inspiration;
