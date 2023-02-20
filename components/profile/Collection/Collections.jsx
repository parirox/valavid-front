import CollectionGalleryCard from "@/components/CollectionGalleryCard";
import {useState} from "react";
import {IoAdd, IoFolderSharp} from "react-icons/io5";
import ManageCollectionDialog from "@/components/profile/Collection/ManageCollectionDialog";
import {useGetCollectionQuery} from "@/datasources/user/remote/UserSliceApi";
import Button from "@/components/Button";


const Collections = () => {
  const {data, isSuccess, isError, isLoading} = useGetCollectionQuery()

  const [showDialog, setShowDialog] = useState(false)
  const [editData, setEditData] = useState({})
  const editHandler = (data) => () => {
    setEditData(data)
    setShowDialog(true)
  }
  if (!isSuccess) return <></>
  return (
    <div className="container">
      {/*<AddCollection />*/}
      <ManageCollectionDialog show={showDialog} showHandler={setShowDialog} {...editData}/>
      <Button className="btn-primary rounded-2xl px-8 py-4 mt-8 mb-16"
              onClick={() => setShowDialog(true)}>
        <IoAdd className="text-2xl"/>
        <span>ایجاد مجموعه جدید</span>
      </Button>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 gap-x-14">
        {data.results.map((collection, k) => (
          <div className="min-h-6" key={k}>
            <CollectionGalleryCard
              id={collection.id}
              items={collection?.media}
              label={collection.title}
              editHandler={editHandler(collection)}
              is_published={collection.is_published}
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
