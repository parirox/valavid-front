import CollectionGalleryCard from "@/components/CollectionGalleryCard";
import {IoFolderSharp} from "react-icons/io5";

const Collections = ({data}) => {

  return (
    <div className="container">
      <div className="flex gap-8 md:grid grid-cols-3 md:gap-x-4 lg:gap-x-14 overflow-auto hide-scrollbar px-6 md:px-0">
        {data.map((collection, k) => (
          <div className="min-h-6 min-w-[350px] md:min-w-[auto]" key={k}>
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
