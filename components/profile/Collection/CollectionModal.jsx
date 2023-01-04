import Button from "@/components/Button";
import RadioButton from "@/components/Form/RadioButton";
import SingleCheckBox from "@/components/Form/SingleCheckBox";
import Modal from "@/components/Modal";
import { collectionSelectedFootage, modalCollectionState, setModalCollectionTo } from "@/datasources/config/local/ConfigSlice";
import { addCollection, addOrRemoveFootageInCollection, collectionItems } from "@/datasources/user/local/UserSlice";
import { isEmpty } from '@/utils/general';
import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import { IoAdd, IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

export default function CollectionModel() {
    const [newCollectionName, setNewCollectionName] = useState("")

    const dispatch = useDispatch();

    const isOpen = useSelector(modalCollectionState);
    const _collectionItems = useSelector(collectionItems);


    function addNewCollectionHandler() {
        dispatch(addCollection({ collection_name: newCollectionName }))
        setNewCollectionName("")
    }
    const [isPublishedState, setIsPublishedState] = useState()
  

    return (
        <Modal small isOpen={isOpen ?? false === true} setIsOpen={(state) => dispatch(setModalCollectionTo({ active: state }))}>
            <div className="bg-white w-full flex flex-col gap-8 rounded-3xl text-center p-10">
                <div className="flex justify-between mb-5">
                    <span className="text-secondary-300 text-xl">افزودن به مجموعه ها</span>
                    <span className="text-accent text-2xl cursor-pointer"
                        onClick={() => dispatch(setModalCollectionTo({ active: false, footage_details }))}><IoClose /></span>
                </div>
                <div className="flex gap-5">
                    <div className="relative w-full basis-4/6">
                        <input type="text" value={newCollectionName}
                            onChange={(e) => setNewCollectionName(e.target.value)}
                            className="block full pb-2.5 border border-accent pr-4 rounded-3xl placeholder:text-accent text-accent border-gray-300 appearance-none peer"
                            placeholder="نام مجموعه را وارد کنید" />
                        <label className="absolute top-0 right-8 -translate-y-1/2 bg-white text-accent px-3 duration-200 transition-transform peer-placeholder-shown:opacity-0 peer-placeholder-shown:translate-y-1/2">نام  مجموعه</label> 
                    </div>
                    <Button className={"btn-accent basis-2/6 rounded-3xl px-10 py-6 text-xl"}
                        onClick={addNewCollectionHandler}>ایجاد مجموعه</Button>
                </div>
                <div className="flex gap-5 mb-5">
                    <div className="relative w-full basis-4/6">
                        <SingleCheckBox data={[{ label: 'انتشار عمومی', value: 'is_published' }]} options={isPublishedState} setOptions={setIsPublishedState} />
                    </div>
                </div>
            </div>
        </Modal>
    )
}