import Image from "next/image";
import Button from "../Button";
import { FiDownload } from "react-icons/fi";
import { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import Modal from "../Modal";
import { useRouter } from "next/router";
import _toast from "@/utils/notification/toast";
import { useDispatch } from "react-redux";
import { removeAccountProduct } from "@/datasources/user/local/UserSlice";
import Spinner from "../Spinner";

export const actions = [
  {
    id: 1,
    name: "دانلود",
    icon: <FiDownload className="text-[15px]" />,
    unavailable: false,
  },
  {
    id: 2,
    name: "تغییر نام",
    icon: <MdModeEdit className="text-[15px]" />,
    unavailable: false,
  },
  {
    id: 3,
    name: "پاک کردن",
    icon: <RiDeleteBin5Line className="text-[15px]" />,
    unavailable: false,
  },
];

export default function UnCompletedUploadCard({
  className,
  cover,
  title,
  address,
  handleSelectFile,
  id,
  handleReloadFile,
  setProduct,
  fileType,
  file,
}) {
  const [deleteModal, setDeleteModal] = useState(false);

  const dispatch = useDispatch();

  const handleDeleteProduct = () => {
    setDeleteModal(false);

    dispatch(removeAccountProduct({ id: file.id }));
    _toast.success("محصول با موفقیت حذف شد.");
  };

  return (
    <>
      <Modal
        className="p-4"
        isOpen={deleteModal ? true : false}
        setIsOpen={setDeleteModal}>
        <p className="text-center text-secondary font-bold font text-lg my-4">
          آیا مطمئن هستید که میخواهید محصول را حذف کنید؟
        </p>
        <div className="flex items-center justify-center">
          <Button
            onClick={() => handleDeleteProduct()}
            className="bg-success-100 min-w-[5rem] m-2">
            بله
          </Button>
          <Button
            onClick={() => setDeleteModal(false)}
            className="bg-warning min-w-[5rem] m-2">
            خیر
          </Button>
        </div>
      </Modal>
      <div
        className={`relative flex flex-col gap-6 py-5 px-6 rounded-[2rem] bg-secondary border border-solid border-accent hover:bg-[#142531] ${className}`}>
        <div className="flex justify-between items-center gap-8 flex-col lg:flex-row">
          <div className="flex gap-6">
            <>
              {fileType === "video" && (
                <video
                  loop
                  controls
                  controlsList="nofullscreen nodownload noremoteplayback noplaybackrate"
                  className="rounded-lg w-[12rem] h-28">
                  <source src={cover} />
                </video>
              )}
              {fileType === "image" && (
                <Image
                  src={cover}
                  alt=""
                  className="rounded-lg w-[12rem] h-28 object-contain"
                  width={140}
                  height={70}></Image>
              )}
            </>
            <div className="flex justify-between py-2 flex-col gap-3">
              <h5
                className={`${
                  title == null || title == "" ? "text-[#4F5B62]" : "text-white"
                }`}>
                {title || "بدون عنوان"}
              </h5>
              <p className="text-white">{address}</p>
            </div>
          </div>
          <div className="flex gap-6 items-start">
            <div className="text-center flex-1 sm:flex-none">
              {!file.status || file.status.success === true ? (
                <Button
                  onClick={() => {
                    setProduct("file", file);
                    console.log(file);
                  }}
                  className={"btn-primary text-lg px-6 py-3 w-40"}
                  disabled={!file.path}
                  link={""}>
                  {file.loading ? (
                  <div className="flex justify-around animate-ping gap-3 items-center animate-text bg-gradient-to-r from-teal-500 via-white to-orange-500 bg-clip-text text-transparent font-black">
                    <span>{file.percent && `%${file.percent}`}</span>
                  </div>
                  )
                  : "تکمیل اطلاعات"}
                </Button>
              ) : (
                <>
                  {file.file && file.file.name ? (
                    <Button
                      onClick={() => {
                        handleReloadFile(file);
                      }}
                      className={"btn-primary bg-warning hover:bg-warning text-lg px-6 py-3 w-40 min-h-[3rem]"}
                      link={""}>
                      {file.loading ? (
                      <div className="flex justify-around animate-ping gap-3 items-center animate-text bg-gradient-to-r from-teal-500 via-white to-orange-500 bg-clip-text text-transparent font-black">
                        <span>{file.percent && `%${file.percent}`}</span>
                      </div>
                      )
                      : "اپلود مجدد"}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        setProduct("file", file);
                        console.log(file);
                      }}
                      className={"btn-primary bg-error hover:bg-error text-lg px-6 py-3 w-40 min-h-[3rem]"}
                      link={""}>
                      بارگزاری ناموفق
                    </Button>
                  )}
                </>
              )}
              {!file.loading && <p className="text-xs opacity-60 pt-2 hidden lg:block">
                اطلاعات محصول را تکمیل کنید
              </p>
              }
            </div>

            <dir
              onClick={() => setDeleteModal(id)}
              className="bg-secondary-600 w-12 h-12 relative m-0 rounded-[1.1rem] cursor-pointer">
              <RiDeleteBin5Line className="text-2xl absolute m-auto top-0 bottom-0  left-0 right-0"></RiDeleteBin5Line>
            </dir>
            <p className="text-md opacity-60 pt-2 mr-auto hidden sm:block  lg:hidden">
              اطلاعات محصول را تکمیل کنید
            </p>
          </div>
        </div>
        {/* {!file.path && (
          <LoadingBar
            className={"bg-primary h-1 w-10 z-[100] absolute bottom-0"}
          />
        )} */}
      </div>
    </>
  );
}
