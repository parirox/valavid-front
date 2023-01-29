import CollectionGalleryCard from "@/components/CollectionGalleryCard";
import {IoFolderSharp} from "react-icons/io5";
import {useGetPublisherCollectionQuery,} from "@/datasources/user/remote/UserSliceApi";
import NoContent from "@/components/NoContent";

const Collections = (query) => {
  const {data, isSuccess} = useGetPublisherCollectionQuery(query)

  if (!isSuccess) return <></>
  return (
    <div className="container">
      {data.count === 0 && <NoContent/>}
      <div className="grid grid-cols-3 gap-10 gap-x-14">
        {data.results.map((collection, k) => (
          <div className="min-h-6" key={k}>
            <CollectionGalleryCard
              id={collection.id}
              items={collection?.media}
              label={collection.title}
              total_count={collection.total_count}
              icon={<IoFolderSharp/>}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collections;
