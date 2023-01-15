import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { collectionSelectedFootage, modalCollectionState, setModalCollectionTo } from "@/datasources/config/local/ConfigSlice";
import { addCollection, addOrRemoveFootageInCollection, collectionItems } from "@/datasources/user/local/UserSlice";
import { isEmpty } from '@/utils/general';
import Image from "next/image";
import { useMemo, useState,useEffect } from "react";
import { IoAdd, IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

export default function CollectionModel() {
    const [newCollectionName, setNewCollectionName] = useState("")

    const dispatch = useDispatch();

    const isOpen = useSelector(modalCollectionState);
    const _collectionItems = useSelector(collectionItems);
    const footage_details = useSelector(collectionSelectedFootage);

    const the_collection_ids_has_this_footage = useMemo(() => {
        return !isEmpty(_collectionItems) ? _collectionItems.filter(collection => !isEmpty(collection.items) && collection.items.find(footage => footage.id === footage_details.id)).map(collection => collection.localId) : []
    }, [footage_details, _collectionItems])

    function addNewCollectionHandler() {
        dispatch(addCollection({collection_name: newCollectionName}))
        setNewCollectionName("")
    }

    if(isEmpty(footage_details?.id)) return <></>
    return (
        <Modal isOpen={isOpen ?? false} setIsOpen={(state)=>dispatch(setModalCollectionTo({active:state,footage_details}))}>
            <div className="bg-white w-full flex flex-row gap-7 rounded-3xl text-center p-5">
                <div className="relative basis-2/6 rounded-tr-3xl rounded-br-3xl overflow-hidden">
                    {footage_details?.type === "video" ?
                     (<video autoPlay={false} preload='metadata' className="full object-cover">
                          <source src={footage_details.media.src} type="video/mp4"/>
                    </video>) : (<Image src={footage_details.media.src} fill alt={footage_details.media.alt} className="object-cover"/>)}
                </div>
                <div className="basis-4/6">
                    <div className="flex flex-col gap-8">
                        <div className="flex-initial">
                            <div className="flex justify-between">
                                <span className="text-secondary-300 text-xl">افزودن به مجموعه ها</span>
                                <span className="text-accent text-2xl cursor-pointer"
                                      onClick={() => dispatch(setModalCollectionTo({active:false,footage_details}))}><IoClose/></span>
                            </div>
                        </div>
                        <div className="flex-auto w-full">
                            <ul className="flex flex-col max-h-full h-[40vh] scrollbar overflow-y-auto text-xl divide-y-2 divide-dashed divide-color6 text-accent">
                                {!isEmpty(_collectionItems) ? [..._collectionItems].reverse().map((collection, k) => (
                                    <li key={k} className="py-4 w-full flex justify-between items-center">
                                        <div>
                                            <div className="flex gap-5 items-center">
                                                <span
                                                    className="rounded-2xl bg-color8  w-16 h-16 text-center leading-[4rem]">{_collectionItems.length - k}</span>
                                                <span>{collection.name}</span>
                                            </div>
                                        </div>
                                        <div>
                                            {the_collection_ids_has_this_footage.includes(collection.localId) ? <Button
                                                    onClick={() => {
                                                        dispatch(addOrRemoveFootageInCollection({localId:collection.localId, footage_details,type:'remove'}))
                                                    }}
                                                    className="border-2 flex items-center btn-primary rounded-2xl px-10 py-4 bg-">موجود
                                                    در مجموعه</Button>
                                                : <Button
                                                    onClick={() => {
                                                        dispatch(addOrRemoveFootageInCollection({localId:collection.localId, footage_details,type:'add'}))
                                                    }}
                                                    className="flex items-center btn-outline-primary rounded-2xl px-10 py-4" icon={<IoAdd/>}>افزودن</Button>}
                                        </div>
                                    </li>
                                )) : <li className={"full flex justify-center items-center"}>مجموعه ای یافت نشد!</li>}
                            </ul>
                        </div>
                        <div className="bg-white basis-2/12">
                            <div className="flex gap-5">
                                <div className="relative w-full basis-4/6">
                                    <input type="text" value={newCollectionName}
                                           onChange={(e) => setNewCollectionName(e.target.value)}
                                           className="block full pb-2.5 border border-accent pr-4 rounded-3xl placeholder:text-accent text-accent border-gray-300 appearance-none peer"
                                           placeholder="نام مجموعه را وارد کنید"/>
                                    <label
                                        className="absolute text-lg duration-300 transform -translate-y-4 scale-75 px-2 top-0 z-10 origin-[0] right-2.5 peer-focus:text-gray peer-focus:bg-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">نام
                                        مجموعه</label>
                                </div>
                                <Button className={"btn-accent basis-2/6 rounded-3xl px-10 py-6 text-xl"}
                                        onClick={addNewCollectionHandler}>ایجاد مجموعه</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}