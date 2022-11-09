import Image from "next/image";
import Badge from "./Badge";

const CollectionGalleryCard = ({ images, label, icon }) => {
  return (
    <div className="grid grid-cols-3 grid-row-3 h-[250px] rounded-xl overflow-hidden gap-3 brightness-[0.8]">
      {[
        "https://i.picsum.photos/id/1037/400/300.jpg?hmac=3LIjPbiOLf6HKaBdsSb92DxIEmounVU888iKk3oi40w",
        "https://i.picsum.photos/id/301/400/300.jpg?hmac=L0K7Re58MztPUju15VCl3Jowll_8W-rYtzAP5mKXrjQ",
        "https://i.picsum.photos/id/92/400/300.jpg?hmac=GjBNpDKuVBGQOlGDMvnHFgLH26rrGnr0xaNvb8z-Izw",
        "https://i.picsum.photos/id/867/400/300.jpg?hmac=PQDTCaFRLohcx052eGAQG_x1U2Ccx8dMShcDkOnrXgo",
      ].map((image, index) => (
        <div
          key={index}
          className={
            "relative h-full" + (index == 0 ? " col-span-3 row-span-2" : "")
          }
        >
          {/* first div */}
          {index === 0 && (
            <div className="absolute inset-x-0 top-0 z-10 p-5 flex justify-between">
              <p className="bg-primary rounded-xl p-2">{label}</p>
              <Badge>{icon}</Badge>
            </div>
          )}
          {/* first div */}
          {index === 3 && (
            <span className="absolute inset-0 flex items-center justify-center text-3xl z-10 ">
                <span className="text-slate-50" dir="ltr">+54</span>
            </span>
          )}
          <Image src={image} className="object-cover brightness-75" fill alt={image} />
        </div>
      ))}
    </div>
  );
};

export default CollectionGalleryCard;
