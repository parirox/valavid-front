import Image from "next/image";
import Button from "../Button";
import {IoMdMore} from "react-icons/io";
import {FiDownload} from "react-icons/fi";
import {FaRegHeart} from "react-icons/fa";
import {CgEye} from "react-icons/cg";
import {BiCart} from "react-icons/bi";
import {Listbox, Transition} from "@headlessui/react";
import {CheckIcon} from "@heroicons/react/20/solid";
import {Fragment, useState} from "react";
import {MdModeEdit} from "react-icons/md";
import {RiDeleteBin5Line} from "react-icons/ri";
import Link from "next/link";
import Modal from "../Modal";
import Router from "next/router";
import {isFileImage, isFileVideo} from "@/utils/helpers/files";
import {useRouter} from "next/router";
import {useDeleteAccountProductMutation} from "@/datasources/product/remote/ProductSliceApi";
import _toast from "@/utils/notification/toast";
import {handleApiError} from "@/datasources/errorHandler";
import {dateFormat} from "@/utils/date/date";
import EditCardName from "./EditCardName";
import classNames from "classnames";

export const actions = [{
  id: 1, name: "دانلود", icon: <FiDownload className="text-[15px]"/>, unavailable: false,
}, {
  id: 2, name: "تغییر نام", icon: <MdModeEdit className="text-[15px]"/>, unavailable: false,
}, {
  id: 3, name: "پاک کردن", icon: <RiDeleteBin5Line className="text-[15px]"/>, unavailable: false,
},];

export default function UploadCard({
                                     className,
                                     cover,
                                     title,
                                     address,
                                     status = "pending",
                                     downloadUrl,
                                     price,
                                     date,
                                     likes = 0,
                                     views = 0,
                                     purchases = 0,
                                     handleCompleteInfo,
                                     id,
                                     getAccountProductList,
                                   }) {
  const [selected, setSelected] = useState(actions[0]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const router = useRouter();

  const [deleteAccountProduct, {data, isSuccess}] = useDeleteAccountProductMutation();

  const handleDeleteProduct = () => {
    setDeleteModal(false);
    deleteAccountProduct({id})
    .unwrap()
    .then(() => {
      getAccountProductList();
      _toast.success("محصول با موفقیت حذف شد.");
    })
    .catch((err) => {
      handleApiError(error);
    });
  };

  const renderApprovedActions = () => {
    return (<>
      <div
      className={"text-lg px-6 py-3 flex items-center gap-4 bg-accent rounded-3xl flex-1 sm:flex-none"}
      >
        <CgEye className="text-2xl"></CgEye>
        {views}
      </div>
      <div
      className={"text-lg px-6 py-3 flex items-center gap-4 bg-accent rounded-3xl flex-1 sm:flex-none"}
      >
        <FaRegHeart className="text-xl"></FaRegHeart>
        {purchases}
      </div>
      <div className={"text-lg px-6 py-3 flex items-center gap-4 bg-accent rounded-3xl flex-1 sm:flex-none"}>
        <BiCart className="text-2xl"></BiCart>
        {likes}
      </div>
    </>);
  };

  return (<>
    <EditCardName
    show={editModal}
    showHandler={setEditModal}
    id={id}
    title={title}
    />
    <Modal
    className="p-4"
    isOpen={deleteModal ? true : false}
    setIsOpen={setDeleteModal}
    >
      <p className="text-center text-secondary font-bold font text-lg my-4">
        آیا مطمئن هستید که میخواهید محصول را حذف کنید؟
      </p>
      <div className="flex items-center justify-center">
        <Button
        onClick={() => handleDeleteProduct()}
        className="bg-success-100 min-w-[5rem] m-2"
        >
          بله
        </Button>
        <Button
        onClick={() => setDeleteModal(false)}
        className="bg-warning min-w-[5rem] m-2"
        >
          خیر
        </Button>
      </div>
    </Modal>
    <div
    className={`flex flex-col lg:gap-6 py-5 px-6 rounded-[2rem] ${className} 
      ${status === "approved" ? "bg-[#534cda14] border border-solid border-primary" : "bg-secondary border border-solid border-accent hover:bg-[#142531]"}`}
    >
      <div className="flex justify-between gap-6 lg:gap-8 flex-col lg:flex-row">
        <div className="flex gap-6 flex-1">
          {isFileVideo(cover) && (<video
          loop
          controls
          preload={"metadata"}
          controlsList="nodownload noremoteplayback noplaybackrate"
          className="rounded-lg w-[12rem] h-28"
          >
            <source src={cover}/>
          </video>)}
          {isFileImage(cover) && (<Image
          src={cover}
          alt=""
          className="rounded-lg w-[12rem] h-28"
          width={140}
          height={70}
          ></Image>)}
          {status === "approved" ? (<Link
          href={`/products/${isFileImage(cover) ? "image" : "video"}/${id}`}
          className="flex-1 overflow-hidden"
          >
            <div className="flex justify-between py-2 flex-col gap-3">
              <h5
              className={classNames(`overflow-hidden whitespace-nowrap w-full text-ellipsis ${title == null || title === "" ? "text-[#4F5B62]" : "text-white"}`)}
              >
                {title || "بدون عنوان"}
              </h5>
              <p className="text-white">{address}</p>
            </div>
          </Link>) : (<div className="flex justify-between py-2 flex-col gap-3">
            <h5
            className={`${title == null || title === "" ? "text-[#4F5B62]" : "text-white"}`}
            >
              {title || "بدون عنوان"}
            </h5>
            <p className="text-white">{address}</p>
          </div>)}
        </div>
        {status === "approved" && (<div className="gap-4 sm:gap-6 flex lg:hidden flex-1">
          {renderApprovedActions()}
        </div>)}
        {status === "approved" && (<div className="text-2xl flex sm:hidden items-center mr-auto whitespace-nowrap">
          قیمت <span>(تومان) :</span>
          <span className="text-3xl px-3">{price}</span>
        </div>)}
        <div className="flex gap-6 items-center">
          {(status === "pending" || status === "review") && (<div className="text-center flex-1 sm:flex-none">
            <div
            className={"text-lg px-6 py-3 bg-secondary-600 rounded-xl w-full"}
            >
              در انتظار بررسی ادمین...
            </div>
          </div>)}
          {status === "approved" && (<div className="text-center flex items-center justify-between flex-1 sm:flex-none">
            <div
            className={"text-lg px-6 py-3 bg-secondary-600 rounded-xl w-full"}
            >
              منتشر شده
              {" "}
              {dateFormat(date)}
            </div>
          </div>)}
          {status === "rejected" && (<div className="flex gap-6 items-center flex-1">
            <div className="text-center lg:mt-6 flex-1 sm:flex-none">
              <Button
              // onClick={() => setProduct("file", file)}
              className={"btn-primary bg-error text-lg px-6 py-3 w-full sm:w-auto w-full"}
              link={""}
              disabled={true}
              >
                محصول رد شده
              </Button>
              <p className="text-xs opacity-60 pt-2 hidden lg:block">
                نام محصول مناسب نیست-کیفیت نامناسب
              </p>
            </div>

            <dir
            onClick={() => setDeleteModal(id)}
            className="bg-secondary-600 w-12 h-12 relative rounded-[1.1rem] cursor-pointer m-0"
            >
              <RiDeleteBin5Line className="text-2xl absolute m-auto top-0 bottom-0  left-0 right-0"></RiDeleteBin5Line>
            </dir>
            <p className="text-md text-error opacity-60 pt-2 mr-auto hidden sm:block  lg:hidden">
              نام محصول مناسب نیست-کیفیت نامناسب
            </p>
          </div>)}
          {status === "approved" ? (
              <dir className="bg-secondary-600 w-12 h-12 relative rounded-[1.1rem] m-0">
                <Link download={true} href={downloadUrl ?? "#"}>
                  <FiDownload className="text-3xl absolute m-auto top-0 bottom-0 left-0 right-0"></FiDownload>
                </Link>
              </dir>
          ) : ("")}

          {status === "approved" ? (<Listbox
          value={selected}
          onChange={(option) => {
            setSelected(option);
            if (option.id === 1) {
              Router.push(downloadUrl);
            }
            if (option.id === 2) {
              setEditModal(true);
            }
            if (option.id === 3) {
              setDeleteModal(id);
            }
          }}
          >
            <div className="relative px-2 h-full">
              <Listbox.Button
              className="flex gap-3 items-center content-between h-full relative w-full cursor-pointer rounded-lg py-2 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                <dir className="bg-secondary-600 w-12 h-12 relative rounded-[1.1rem] m-0">
                  <IoMdMore className="text-4xl absolute m-auto top-0 bottom-0  left-0 right-0"></IoMdMore>
                </dir>
              </Listbox.Button>
              <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              >
                <Listbox.Options
                className="absolute mt-2 z-50 left-5 max-h-60 w-40 overflow-auto rounded-md bg-secondary-200 text-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {actions.map((action, actionIdx) => (<Listbox.Option
                  key={actionIdx}
                  className={({active}) => `relative cursor-default select-none py-2 mx-1 rounded-xl pl-10 pr-4 ${active ? "bg-[#717C84] text-white" : "text-gray-900"}`}
                  value={action}
                  >
                    {({selected}) => (<div className="flex items-center gap-2">
                      {action.icon}
                      <span
                      className={`block truncate text-white ${selected ? "font-medium" : "font-normal"}`}
                      >
                                {action.name}
                              </span>
                      {selected ? (<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                  <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                  />
                                </span>) : null}
                    </div>)}
                  </Listbox.Option>))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>) : status !== "rejected" ? (<dir
          onClick={() => setDeleteModal(id)}
          className="bg-secondary-600 w-12 h-12 relative rounded-[1.1rem] cursor-pointer m-0"
          >
            <RiDeleteBin5Line className="text-2xl absolute m-auto top-0 bottom-0  left-0 right-0"></RiDeleteBin5Line>
          </dir>) : ("")}
          {status === "approved" && (
          <div className="text-2xl hidden sm:flex lg:hidden items-center mr-auto whitespace-nowrap">
            قیمت <span>(تومان) :</span>
            <span className="text-3xl px-3">{price}</span>
          </div>)}
        </div>
      </div>
      {status == "approved" ? (<div className="flex justify-between">
        <div className="gap-4 sm:gap-6 hidden lg:flex">
          {renderApprovedActions()}
        </div>
        <div className="text-2xl items-center hidden lg:flex whitespace-nowrap">
          قیمت <span>(تومان) :</span>
          <span className="text-3xl px-3">{price}</span>
        </div>
      </div>) : ("")}
    </div>
  </>);
}
