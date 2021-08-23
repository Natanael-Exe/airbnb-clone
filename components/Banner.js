import Image from "next/image";

function Banner({ imgPc,imgMobible, title, description, buttonText }) {
  return (
    <div className="relative mt-6">
      <div className="relative h-96 min-w-[300px] hidden md:block">
        <Image
          src={imgPc}
          blurDataURL={imgPc}
          placeholder="blur"
          layout="fill"
          className="rounded-2xl"
          objectFit="cover"
          quality={100}
        />
      </div>
      <div className="relative h-120 md:min-w-[300px] md:hidden block"> 
        <img
          src={imgMobible}
          layout="fill"
          className="rounded-2xl w-full h-full object-cover"
          objectFit="cover"
          quality={100}
        />
      </div>
      <div className="absolute md:top-24 md:left-20 top-6 xs:inset-x-0 mx-auto text-center md:text-left">
        <h3 className="md:text-5xl text-3xl  md:mb-3 mt-1 md:w-64 text-white">{title}</h3>
        <p className="text-white mt-4 md:text-lg text-base md:w-7/12 font-light w-10/12 mx-auto md:mx-0">{description}</p>
        <button className="font-medium bg-white text-gray-900 md:py-3 py-2 px-4 rounded-lg md:mt-8 mt-6">
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default Banner;
