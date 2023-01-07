import CollectionGalleryCard from "@/components/CollectionGalleryCard";
import {setModalCollectionTo} from "@/datasources/config/local/ConfigSlice";
import {useState} from "react";
import {IoAdd, IoFolderSharp} from "react-icons/io5";
import {useDispatch} from "react-redux";
import Button from "../../Button";
import AddCollection from "@/components/profile/Collection/AddCollection";
import EditCollection from "@/components/profile/Collection/EditCollection";
import {useGetCollectionQuery} from "@/datasources/user/remote/UserSliceApi";


const Collections = () => {
    const {data, isSuccess, isError, isLoading} = useGetCollectionQuery()

    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const [editData, setEditData] = useState({})
    const editHandler = (data) => () => {
        setEditData(data)
        setShow(true)
    }
    if (!isSuccess) return <></>
    return (
        <div className="container">
            {/*<AddCollection />*/}
            <EditCollection show={show} showHandler={setShow} {...editData}/>
            <AddCollection show={show} showHandler={setShow}/>
            <Button className="btn-primary rounded-2xl px-8 py-4 mt-8 mb-16"
                    onClick={() => setShow(true)}>
                <IoAdd className="text-2xl"/>
                <span>ایجاد مجموعه جدید</span>
            </Button>
            <div className="grid grid-cols-3 gap-x-14">
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
