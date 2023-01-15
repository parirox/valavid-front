import Image from "next/image";
import Button from "./Button";
import { IoMdMore } from "react-icons/io";
import { FiDownload } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { CgEye } from "react-icons/cg";
import { BiCart } from "react-icons/bi";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { IoImageOutline, IoVideocamOutline } from "react-icons/io5";
import { Fragment, useState } from "react";
import { MdModeEdit, MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import Link from "next/link";

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
    id: 2,
    name: "پاک کردن",
    icon: <RiDeleteBin5Line className="text-[15px]" />,
    unavailable: false,
  },
];

export default function UploadCard({
  className,
  cover,
  title,
  address,
  status = 0,
  downloadUrl,
  price,
  date,
  likes = 0,
  views = 0,
  purchases = 0,
  handleCompleteInfo,
}) {
  const [selected, setSelected] = useState(actions[0]);

  return (
    <div
      className={`flex flex-col gap-6 py-5 px-6 rounded-[2rem] ${className} 
      ${
        status == 0
          ? "bg-[#534cda14] border border-solid border-primary"
          : "bg-secondary border border-solid border-accent hover:bg-[#142531]"
      }`}
    >
      <div className="flex justify-between gap-8">
        <div className="flex gap-6">
          <Image
            src={cover}
            alt=""
            className="rounded-lg w-[12rem] h-28"
            width={140}
            height={70}
          ></Image>
          <div className="flex justify-between py-2 flex-col gap-3">
            <h5
              className={`${
                title == null || title == "" ? "text-[#4F5B62]" : "text-white"
              }`}
            >
              {title || "بدون عنوان"}
            </h5>
            <p className="text-white">{address}</p>
          </div>
        </div>
        <div className="flex gap-6 items-center">
          {status == 0 ? (
            <div className="text-center mt-6">
              <Button
                onClick={() => handleCompleteInfo && handleCompleteInfo()}
                className={"btn-primary text-lg px-6 py-3"}
                link={""}
              >
                تکمیل اطلاعات
              </Button>
              <p className="text-xs opacity-60 pt-2">
                اطلاعات محصول را تکمیل کنید
              </p>
            </div>
          ) : status == 1 ? (
            <div className="text-center">
              <div
                className={"text-lg px-6 py-3 bg-secondary-600 rounded-xl"}
                link={""}
              >
                در حال برسی برای انتشار ...
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div
                className={"text-lg px-6 py-3 bg-secondary-600 rounded-xl"}
                link={""}
              >
                منتشر شده
                {date}
              </div>
            </div>
          )}
          {status != 0 ? (
            <dir className="bg-secondary-600 w-12 h-12 relative rounded-[1.1rem]">
              <Link download={true} href={downloadUrl}>
                <FiDownload className="text-3xl absolute m-auto top-0 bottom-0 left-0 right-0"></FiDownload>
              </Link>
            </dir>
          ) : (
            ""
          )}

          <Listbox value={selected} onChange={setSelected}>
            <div className="relative px-2 h-full">
              <Listbox.Button className="flex gap-3 items-center content-between h-full relative w-full cursor-pointer rounded-lg py-2 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                <dir className="bg-secondary-600 w-12 h-12 relative rounded-[1.1rem]">
                  <IoMdMore className="text-4xl absolute m-auto top-0 bottom-0  left-0 right-0"></IoMdMore>
                </dir>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-2 z-50 left-5 max-h-60 w-40 overflow-auto rounded-md bg-secondary-200 text-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {actions.map((action, actionIdx) => (
                    <Listbox.Option
                      key={actionIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 mx-1 rounded-xl pl-10 pr-4 ${
                          active ? "bg-[#717C84] text-white" : "text-gray-900"
                        }`
                      }
                      value={action}
                    >
                      {({ selected }) => (
                        <div className="flex items-center gap-2">
                          {action.icon}
                          <span
                            className={`block truncate text-white ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {action.name}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </div>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
      </div>
      {status == 2 ? (
        <div className="flex justify-between">
          <div className="flex gap-6">
            <div
              className={
                "text-lg px-6 py-3 flex items-center gap-4 bg-accent rounded-3xl"
              }
              link={""}
            >
              <CgEye className="text-2xl"></CgEye>
              {views}
            </div>
            <div
              className={
                "text-lg px-6 py-3 flex items-center gap-4 bg-accent rounded-3xl"
              }
              link={""}
            >
              <FaRegHeart className="text-xl"></FaRegHeart>
              {purchases}
            </div>
            <div
              className={
                "text-lg px-6 py-3 flex items-center gap-4 bg-accent rounded-3xl"
              }
              link={""}
            >
              <BiCart className="text-2xl"></BiCart>
              {likes}
            </div>
          </div>
          <div className="text-2xl flex items-center">
            قیمت <span>(تومان) :</span>
            <span className="text-3xl px-3">{price}</span>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
