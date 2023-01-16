import CollectionGalleryCard from "@/components/CollectionGalleryCard";
import {IoFolderSharp} from "react-icons/io5";

const Collections = ({data}) => {

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
