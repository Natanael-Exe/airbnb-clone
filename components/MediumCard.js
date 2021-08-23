import Image from "next/image";
function MediumCard({ img, title }) {
  return (
    <div className="cursor-pointer hover:scale-105 transition duration-300 ease-out">
      <div className="relative h-80 w-80">
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
    </div>
  );
}

export default MediumCard;
