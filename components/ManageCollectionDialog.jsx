import Button from "@/components/Button";
import SingleCheckBox from "@/components/Form/SingleCheckBox";
import Modal from "@/components/Modal";
import {useEffect, useState} from "react";
import {IoAdd, IoClose, IoTrash} from "react-icons/io5";
import ButtonIcon from "@/components/ButtonIcon";
import {Controller, useForm} from "react-hook-form";
import {
    useAddCollectionMutation,
    useAddProductToCollectionMutation,
    useGetCollectionQuery,
    useRemoveProductFromCollectionMutation
} from "@/datasources/user/remote/UserSliceApi";
import toast from "@/utils/notification/toast";
import {isEmpty} from "@/utils/general";
import {useDispatch, useSelector} from "react-redux";
import {
    collectionSelectedFootage,
    modalCollectionState,
    setModalCollectionTo
} from "@/datasources/config/local/ConfigSlice";
import Image from "next/image";
import {handleApiError} from "@/datasources/errorHandler";

export default function ManageCollectionDialog({...rest}) {
    const dispatch = useDispatch();

    const {id, type, media} = rest

    const [initials, setInitials] = useState(false)

    const footage_details = useSelector(collectionSelectedFootage);
    const show = useSelector(modalCollectionState);

    const {
        data: getData,
        isSuccess: getIsSuccess,
        error: getError,
        isError: getIsError,
        isLoading: getIsLoading
    } = useGetCollectionQuery(undefined, {skip: !initials})

    const [fetchAddProduct, {
        data: addProductData,
        isSuccess: addProductIsSuccess,
        error: addProductError,
        isError: addProductIsError,
        isLoading: addProductIsLoading
    }] = useAddProductToCollectionMutation()
    const [fetchRemoveProduct, {
        data: removeProductData,
        isSuccess: removeProductIsSuccess,
        error: removeProductError,
        isError: removeProductIsError,
        isLoading: removeProductIsLoading
    }] = useRemoveProductFromCollectionMutation()

    const [fetchAdd, {
        data: addData,
        isSuccess: addIsSuccess,
        error: addError,
        isError: addIsError,
        isLoading: addIsLoading
    }] = useAddCollectionMutation()

    const {register, control, reset, handleSubmit, formState: {errors}} = useForm()
    const onSubmit = (data) => {
        if (isEmpty(id)) {
            //->> on edit
            fetchAdd(data).unwrap().then((data) => {
                toast.success("مجموعه جدید با موفقیت ایجاد شد!")
            }).catch((err) => {
                toast.error(err)
            })
        }
    }
    //->> initialize the default form value
    useEffect(() => {
        console.log({show})
        if (show) {
            setInitials(true)
        }
        return ()=>{
            console.log("call reset")
            // dispatch(resetCollectionData())
        }
    }, [show])

    //->> check results and do
    useEffect(() => {
        if (getIsError && show) handleApiError(getError)
    }, [getIsError])

    if (isEmpty(footage_details?.id) || !getIsSuccess || getIsError && getError?.status === 401) return <></>
    return (
    <Modal isOpen={show} setIsOpen={(state) => dispatch(setModalCollectionTo({active: state}))}>
        <form onSubmit={handleSubmit(onSubmit)}
              className="flex w-full gap-8 rounded-3xl bg-white p-4 text-center md:p-10">
            <div className="relative hidden basis-2/6 overflow-hidden rounded-tr-3xl rounded-br-3xl xl:block">
                {footage_details?.type === "video" ?
                (<video autoPlay={false} preload='metadata' className="full">
                    <source src={footage_details.media.src} type="video/mp4"/>
                </video>) : (
                <Image src={footage_details.media.src} fill alt={footage_details.media.alt}/>)}
            </div>
            <div className="basis-full xl:basis-4/6">
                <header className="mb-5 flex justify-between">
                    <span className="text-xl text-secondary-300">افزودن به مجموعه ها</span>
                    <span className="cursor-pointer text-2xl text-accent"
                          onClick={() => dispatch(setModalCollectionTo({active: false}))}><IoClose/></span>
                </header>
                <ul
                className="flex max-h-full flex-col overflow-y-auto text-lg h-[40vh] scrollbar divide-y-2 divide-dashed divide-color6 text-accent md:text-xl">
                    {getIsSuccess ? getData.results.map((collection, k) => (
                    <li key={k} className="flex w-full items-center justify-between py-4">
                        <div>
                            <div className="flex items-center gap-5">
                                <span className="h-16 w-16 rounded-2xl text-center bg-color8 leading-[4rem]">{collection.total_count}</span>
                                <span>{collection.title}</span>
                            </div>
                        </div>
                        <div>
                            {collection.media.some(v => v.src === footage_details.media.src) ?
                            <Button loading={removeProductIsLoading} onClick={() => {
                                if (!removeProductIsLoading) fetchRemoveProduct({
                                    collection_id: collection.id,
                                    product_id: footage_details.id
                                })
                            }} className="flex items-center rounded-2xl border-2 px-10 py-4 btn-primary">
                                موجود در مجموعه
                            </Button>
                            :
                            <Button onClick={() => {
                                if (!addProductIsLoading) fetchAddProduct({
                                    collection_id: collection.id,
                                    product_id: footage_details.id
                                })
                            }}
                                    className="flex items-center rounded-2xl px-10 py-4 btn-outline-primary"
                                    icon={<IoAdd/>}>
                                افزودن
                            </Button>}
                        </div>
                    </li>
                    )) :
                    <li className={"full flex justify-center items-center"}>مجموعه ای یافت نشد!</li>
                    }
                </ul>
                <div className={"flex flex-col border-t border-secondary-300/10"}>
                    <div className="mt-5 flex flex-wrap gap-5 order-2 md:order-1 md:flex-nowrap md:gap-10">
                        <div className="relative w-full basis-full md:basis-4/6">
                            <input {...register('title', {required: true})} type="text"
                                   className={`block full pb-2.5 border border-accent pr-4 h-16 md:h-full rounded-3xl placeholder:text-accent text-accent border-gray-300 appearance-none peer ${errors.title && 'input-error'}`}
                                   placeholder="نام مجموعه را وارد کنید"/>
                            <label
                            className="absolute top-0 right-8 peer-placeholder-shown:translate-y-1/2 -translate-y-1/2 bg-white px-3 peer-placeholder-shown:opacity-0 transition-transform duration-200 text-accent">نام
                                مجموعه</label>
                        </div>
                        <div className="basis-full md:basis-2/6">
                            <div className="flex gap-5">
                                {id ? <>
                                    <Button className={"btn-accent flex-auto rounded-3xl px-10 py-6 text-xl"}
                                            type={"submit"}>ویرایش</Button>
                                    <ButtonIcon className={"bg-gray h-20 w-20 flex-initial rounded-3xl text-3xl"}
                                                onClick={removeCollectionHandler} icon={<IoTrash/>}/>
                                </> :
                                <Button className={"btn-accent w-full rounded-3xl px-10 py-6 text-xl"}
                                        type={"submit"}>ایجاد مجموعه</Button>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 flex gap-5 order-1 md:order-2">
                        <div className="relative w-full basis-4/6">
                            <Controller
                            control={control}
                            name="is_public"
                            render={({
                                         field: {onChange, name, value},
                                         fieldState: {error}, //optional
                                         formState: {errors}, //optional, but necessary if you want to show an error message
                                     }) => {
                                return <>
                                    <SingleCheckBox label='انتشار عمومی' selected={value} selectHandler={onChange}/>
                                </>
                            }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </Modal>
    )
}