import CollectionGalleryCard from "@/components/CollectionGalleryCard";
import { useState } from "react";
import { IoFolderSharp } from "react-icons/io5";

const data = [
  {
    id: 1,
    title: 'مجموعه زیبایی های ایرانی اسلامی',
    total_count: 25,
    media: [
      {
        alt: "natural",
        src: "https://placeimg.com/640/480/nature/1"
      },
      {
        alt: "natural",
        src: "https://placeimg.com/640/480/nature/2"
      }, {
        alt: "natural",
        src: "https://placeimg.com/640/480/nature/3"
      }, {
        alt: "natural",
        src: "https://placeimg.com/640/480/nature/4"
      }
    ]
  },
  {
    id: 2,
    title: 'مجموعه زیبایی های ایرانی اسلامی',
    total_count: 25,
    media: [
      {
        alt: "natural",
        src: "https://placeimg.com/640/480/nature/5"
      },
      {
        alt: "natural",
        src: "https://placeimg.com/640/480/nature/6"
      }, {
        alt: "natural",
        src: "https://placeimg.com/640/480/nature/7"
      }, {
        alt: "natural",
        src: "https://placeimg.com/640/480/nature/8"
      }
    ]
  },
  {
    id: 3,
    title: 'مجموعه زیبایی های ایرانی اسلامی',
    total_count: 25,
    media: [
      {
        alt: "natural",
        src: "https://placeimg.com/640/480/nature/9"
      },
      {
        alt: "natural",
        src: "https://placeimg.com/640/480/nature/10"
      }, {
        alt: "natural",
        src: "https://placeimg.com/640/480/nature/11"
      }, {
        alt: "natural",
        src: "https://placeimg.com/640/480/nature/12"
      }
    ]
  },
]


const Collections = () => {

  return (
    <div className="container">
      <div className="grid grid-cols-3 gap-x-14">
        {data.map((collection, k) => (
          <div className="min-h-6" key={k}>
            <CollectionGalleryCard
              id={collection.id}
              items={collection.media}
              label={collection.title}
              total_count={collection.total_count}
              icon={<IoFolderSharp />}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collections;
