import CollectionGalleryCard from "@/components/CollectionGalleryCard";
import { useState } from "react";
import { IoFolderSharp } from "react-icons/io5";
const Collections = () => {
  const [images, setImages] = useState([]);

  return (
    <div className="container mx-auto px-56">
      <div className="grid grid-cols-3 gap-x-14">
        <div className="min-h-6">
          <CollectionGalleryCard
            items={images}
            label="مجموعه زیبایی های ایرانی اسلامی"
            icon={<IoFolderSharp />}
          />
        </div>
        <div className="min-h-6">
          <CollectionGalleryCard
            items={images}
            label="مجموعه زیبایی های ایرانی اسلامی"
            icon={<IoFolderSharp />}
          />
        </div>
        <div className="min-h-6">
          <CollectionGalleryCard
            items={images}
            label="مجموعه زیبایی های ایرانی اسلامی"
            icon={<IoFolderSharp />}
          />
        </div>
      </div>
    </div>
  );
};

export default Collections;
