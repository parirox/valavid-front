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
  useEditCollectionMutation,
  useGetCollectionQuery,
  useRemoveCollectionMutation,
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
import {AiOutlineLoading} from "react-icons/ai";

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
  } = useGetCollectionQuery({skip: !initials})

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
  const [fetchEdit, {
    data: editData,
    isSuccess: editIsSuccess,
    error: editError,
    isError: editIsError,
    isLoading: editIsLoading
  }] = useEditCollectionMutation()
  const [fetchRemove, {
    data: removeData,
    isSuccess: removeIsSuccess,
    error: removeError,
    isError: removeIsError,
    isLoading: removeIsLoading
  }] = useRemoveCollectionMutation()

  const {register, control, reset, handleSubmit, formState: {errors}} = useForm()
  const onSubmit = (data) => {
    if (isEmpty(id)) {
      //->> on edit
      fetchAdd(data).unwrap().then((data) => {
        successResult("مجموعه جدید با موفقیت ایجاد شد!")
      }).catch((err) => {
        toast.error(err)
      })
    } else {
      //->> on create a new
      // fetchEdit([{id}, data]).unwrap().then((data) => {
      //   successResult("ویرایش مجموعه با موفقیت انجام شد!")
      // }).catch((err) => {
      //   toast.error(err)
      // })
    }
  }

  const removeCollectionHandler = () => {
    // fetchRemove({id}).unwrap().then((data) => {
    //   successResult("حذف مجموعه با موفقیت انجام شد!")
    // }).catch((err) => {
    //   toast.error(err)
    // })
  };
  const successResult = (message) => {
    toast.success(message)
    // dispatch(setModalCollectionTo({active: false}))
  }

  //->> initialize the default form value
  useEffect(() => {
    if (show) setInitials(true)
    // reset({
    //   title: title,
    //   is_public: is_published
    // })
  }, [show])

  if (isEmpty(footage_details?.id)) return <></>
  return (
    <Modal isOpen={show} setIsOpen={(state) => dispatch(setModalCollectionTo({active: state}))}>
      <form onSubmit={handleSubmit(onSubmit)}
            className="bg-white w-full flex gap-8 rounded-3xl text-center p-10">
        <div className="relative basis-2/6 rounded-tr-3xl rounded-br-3xl overflow-hidden">
          {footage_details?.type === "video" ?
            (<video autoPlay={false} preload='metadata' className="full object-cover">
              <source src={footage_details.media.src} type="video/mp4"/>
            </video>) : (
              <Image src={footage_details.media.src} fill alt={footage_details.media.alt} className="object-cover"/>)}
        </div>
        <div className="basis-4/6">
          <header className="flex justify-between mb-5">
            <span className="text-secondary-300 text-xl">ویرایش مجموعه</span>
            <span className="text-accent text-2xl cursor-pointer"
                  onClick={() => dispatch(setModalCollectionTo({active: false}))}><IoClose/></span>
          </header>
          <ul className="flex flex-col max-h-full h-[40vh] scrollbar overflow-y-auto text-xl divide-y-2 divide-dashed divide-color6 text-accent">
            {getIsSuccess ? getData.results.map((collection, k) => (
                <li key={k} className="py-4 w-full flex justify-between items-center">
                  <div>
                    <div className="flex gap-5 items-center">
                      <span
                        className="rounded-2xl bg-color8  w-16 h-16 text-center leading-[4rem]">{collection.total_count}</span>
                      <span>{collection.title}</span>
                    </div>
                  </div>
                  <div>
                    {collection.media.some(v=> v.src === footage_details.media.src) ?
                      <Button loading={removeProductIsLoading} onClick={() => {
                        if(!removeProductIsLoading) fetchRemoveProduct({collection_id: collection.id,product_id: footage_details.id})
                      }} className="border-2 flex items-center btn-primary rounded-2xl px-10 py-4">
                        موجود در مجموعه
                      </Button>
                      :
                      <Button onClick={() => {
                          if(!addProductIsLoading) fetchAddProduct({collection_id: collection.id,product_id: footage_details.id})
                        }}
                        className="flex items-center btn-outline-primary rounded-2xl px-10 py-4" icon={<IoAdd/>}>
                        افزودن
                      </Button>}
                  </div>
                </li>
              )) :
              <li className={"full flex justify-center items-center"}>مجموعه ای یافت نشد!</li>
            }
          </ul>
          <div className="flex gap-14 mt-5">
            <div className="relative w-full basis-4/6">
              <input {...register('title', {required: true})} type="text"
                     className={`block full pb-2.5 border border-accent pr-4 rounded-3xl placeholder:text-accent text-accent border-gray-300 appearance-none peer ${errors.title && 'input-error'}`}
                     placeholder="نام مجموعه را وارد کنید"/>
              <label
                className="absolute top-0 right-8 -translate-y-1/2 bg-white text-accent px-3 duration-200 transition-transform peer-placeholder-shown:opacity-0 peer-placeholder-shown:translate-y-1/2">نام
                مجموعه</label>
            </div>
            <div className="basis-2/6">
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
          <div className="flex gap-5 mt-5">
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
      </form>
    </Modal>
  )
}