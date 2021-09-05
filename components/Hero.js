import Image from "next/image";
import imageHero from "../public/hero-img.jpeg"
function Hero() {
  return (
    <div className="relative h-[25rem] md:h-[74vh]">
      <Image
        src={imageHero}
        placeholder="blur"
        layout="fill"
        objectFit="cover"
        className="object-bottom"
      />
      <div className="absolute top-1/2 w-full text-center -mt-6">
        <p className="font-medium text-lg"> Not sure where you go? Perfect.</p>
        <button className=" bg-white px-14 py-4  rounded-full shadow-lg  my-4 hover:shadow-xl active:scale-90 transition duraction-150 
        
        ">
          <span className="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-800 to-pink-700">I'm flexible</span>
          
        </button>
      </div>
    </div>
  );
}

export default Hero;
