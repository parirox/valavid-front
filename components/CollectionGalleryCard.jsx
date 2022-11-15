import Image from "next/image";
import Badge from "./Badge";

const CollectionGalleryCard = ({ items, label, icon }) => {
  return (
    <div className="grid grid-cols-3 grid-row-3 h-[250px] rounded-[32px] overflow-hidden gap-3 group/collection cursor-pointer">
      {items.map((image, index) => (
        <div
          key={index}
          className={
            "relative h-full" +
            (index == 0 ? " col-span-3 row-span-2" : "")
          }
        >
          {/* first div */}
          {index === 0 && (
            <div className="absolute inset-x-0 top-0 z-20 p-8 flex justify-between">
              <span className="bg-primary rounded-xl p-2">{label}</span>
              <Badge>{icon}</Badge>
            </div>
          )}
          {/* first div */}
          {index === 3 && (
            <span className="absolute inset-0 flex items-center justify-center text-4xl z-20 ">
              <span className="text-slate-50" dir="ltr">
                +54
              </span>
            </span>
          )}
          <div className="absolute inset-0 z-10 bg-gradient-to-bl from-[#00101c98] to-[#0e1f2c14] group-hover/collection:from-[#534cda81] group-hover/collection:to-transparent"></div>
          <Image
            src={image.src}
            className="object-cover"
            fill
            alt={image.alt}
          />
        </div>
      ))}
    </div>
  );
};

export default CollectionGalleryCard;
