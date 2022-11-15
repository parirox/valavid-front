import CollectionGalleryCard from "@/components/CollectionGalleryCard";
import { useState } from "react";
import { IoFolderSharp } from "react-icons/io5";

const data = [
  {
    title: 'مجموعه زیبایی های ایرانی اسلامی',
    media: [
      {
        alt: "natural",
        src: "https://i.picsum.photos/id/229/800/600.jpg?hmac=XBz4BdHCdXDT8GerLNU_gH41Hv6gKY0beR0wprsUesQ"
      },
      {
        alt: "natural",
        src: "https://i.picsum.photos/id/301/400/300.jpg?hmac=L0K7Re58MztPUju15VCl3Jowll_8W-rYtzAP5mKXrjQ"
      }, {
        alt: "natural",
        src: "https://i.picsum.photos/id/92/400/300.jpg?hmac=GjBNpDKuVBGQOlGDMvnHFgLH26rrGnr0xaNvb8z-Izw"
      }, {
        alt: "natural",
        src: "https://placeimg.com/640/480/nature.jpg"
      }
    ]
  },
  {
    title: 'مجموعه زیبایی های ایرانی اسلامی',
    media: [
      {
        alt: "natural",
        src: "https://i.picsum.photos/id/229/800/600.jpg?hmac=XBz4BdHCdXDT8GerLNU_gH41Hv6gKY0beR0wprsUesQ"
      },
      {
        alt: "natural",
        src: "https://i.picsum.photos/id/301/400/300.jpg?hmac=L0K7Re58MztPUju15VCl3Jowll_8W-rYtzAP5mKXrjQ"
      }, {
        alt: "natural",
        src: "https://i.picsum.photos/id/92/400/300.jpg?hmac=GjBNpDKuVBGQOlGDMvnHFgLH26rrGnr0xaNvb8z-Izw"
      }, {
        alt: "natural",
        src: "https://placeimg.com/640/480/nature.jpg"
      }
    ]
  },
  {
    title: 'مجموعه زیبایی های ایرانی اسلامی',
    media: [
      {
        alt: "natural",
        src: "https://i.picsum.photos/id/229/800/600.jpg?hmac=XBz4BdHCdXDT8GerLNU_gH41Hv6gKY0beR0wprsUesQ"
      },
      {
        alt: "natural",
        src: "https://i.picsum.photos/id/301/400/300.jpg?hmac=L0K7Re58MztPUju15VCl3Jowll_8W-rYtzAP5mKXrjQ"
      }, {
        alt: "natural",
        src: "https://i.picsum.photos/id/92/400/300.jpg?hmac=GjBNpDKuVBGQOlGDMvnHFgLH26rrGnr0xaNvb8z-Izw"
      }, {
        alt: "natural",
        src: "https://placeimg.com/640/480/nature.jpg"
      }
    ]
  },
]


const Collections = () => {

  return (
    <div className="container mx-auto px-56">
      <div className="grid grid-cols-3 gap-x-14">
        {data.map((collection, k) => (
          <div className="min-h-6" key={k}>
            <CollectionGalleryCard
              items={collection.media}
              label={collection.title}
              icon={<IoFolderSharp />}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collections;
