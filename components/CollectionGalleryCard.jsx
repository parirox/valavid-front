import Image from "next/image";
import Link from "next/link";
import {IoMdEye, IoMdEyeOff} from "react-icons/io";
import {MdEdit} from "react-icons/md";
import React from "react";

const CollectionGalleryCard = ({ items, label, icon, is_published = null, editHandler, total_count, id }) => {
  return (
    <div className="grid grid-cols-3 grid-row-3 h-[250px] rounded-[32px] overflow-hidden gap-3 group/collection cursor-pointer relative">
      <Link href={`/collections/${id}`} className='full absolute inset-0 z-40'></Link>
      {[1,2,3,4].map((item, index) => (
        <div
          key={index}
          className={
            "relative h-full" +
            (index === 0 ? " col-span-3 row-span-2" : "")
          }
        >
          {/* first div */}
          {index === 0 && (
            <>
              <span className="absolute right-8 top-8 w-auto max-w-[12rem] z-20 bg-primary rounded-xl p-2">{label}</span>
              <span className="absolute left-8 top-8 w-10 h-10 z-20 bg-primary rounded-2xl p-3 text-center">{icon}</span>
              {is_published !== null &&
                <span className={`absolute bottom-8 left-8 flex items-center gap-3 z-20 rounded-2xl px-5 py-2 text-center  ${is_published ? "bg-white text-primary" : "backdrop-blur bg-white/20 text-white"}`}>
                  {is_published ? <IoMdEye className="text-2xl" /> : <IoMdEyeOff className="text-2xl" />}
                  <span>انتشار عمومی</span>
                </span>
              }
              {editHandler && <span onClick={editHandler} className="absolute right-8 bottom-8 w-10 h-10 z-50 backdrop-blur bg-white/20 rounded-2xl p-3 text-center"><MdEdit /></span>}
            </>
          )}
          {/* first div */}
          {index === 3 && (
            <span className="absolute inset-0 flex items-center justify-center text-4xl z-20 ">
              <span className="text-slate-50" dir="ltr">
                {total_count > 4 && `+${total_count-4}`}
              </span>
            </span>
          )}
          <div className="absolute inset-0 z-10 bg-gradient-to-bl from-[#00101c98] to-[#0e1f2c14] group-hover/collection:from-[#534cda81] group-hover/collection:to-transparent"></div>
            {(typeof items[index] !== "undefined") ?
              (items[index].type === 'video' ?
                   <video autoPlay={false} controls={false} preload={"meta"} className="absolute inset-0 h-full w-full object-cover transition-400-linear group-hover/popularCard:scale-110 rounded-[2.6rem] z-20 hover:autoPlay">
                    <source src={items[index].src} type="video/mp4"/>
                  </video>
                  :
                  <Image
                    src={items[index].src || "/images/treePic404.png"}
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw,33vw"
                    alt={items[index].alt}
                  />)
                :
                <div className={"bg-secondary full"}></div>
            }
        </div>
      ))}
    </div>
  );
};

export default CollectionGalleryCard;
