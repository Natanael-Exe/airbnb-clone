import Image from "next/image";

function LargeCard({ img, title,subtitle,index }) {
  return (
    <div className="cursor-pointer hover:scale-105 transition duration-300 ease-out relative">
      <div className="relative h-80 w-[23rem]">
        <Image
          src={img}
          blurDataURL={img}
          placeholder="blur"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <h3 className="text-lg font-medium mt-3">{title}</h3>
      <p className="text-sm font-light text-gray-800 ">{subtitle}</p>
      {index==0 && <p className="text-xs font-semibold uppercase px-2 py-1 bg-white rounded absolute top-4 left-4">Featured</p>}
    </div>
  )
}

export default LargeCard
