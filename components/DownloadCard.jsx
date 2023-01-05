import Image from "next/image";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";
import Button from "./Button";

export default function DownloadCard({ className, type, media, mediaLink, title, filterTags, haveLicense, price }) {
  return (
    <div className={`bg-secondary-600 min-h-[520px] rounded-[2.25rem] relative p-8 ${className}`}>
      {
        type == 'video' ?
          <div className="relative w-full h-64 rounded-lg overflow-hidden">
            <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 z-40">
              <div className="rounded-full w-16 h-16 pl-2 py-4 cursor-pointer bg-secondary opacity-50 group-hover/popularCard:bg-primary group-hover/popularCard:text-white text-3xl text-white text-center">
                <FaPlay className='h-full w-full' />
              </div>
            </div>
            <Link href={mediaLink} className="absolute inset-0">
              <video autoPlay={false} muted loop className="absolute inset-0 h-full w-full object-cover transition-400-linear group-hover/popularCard:scale-110 rounded-lg z-30 hover:autoPlay">
                <source src={media} type="video/mp4" />
              </video>
            </Link>
          </div>
          : ''
      }

      {
        type == 'image' ?
          <Image src={media} alt="" className="w-full h-64 rounded-lg" width={200} height={100} />
          : ''
      }

      <h5 className="pt-8 pr-2">
        {title}
      </h5>
      <div className="text-secondary-100 flex flex-wrap px-2 pt-4">
        {
          filterTags.map((tag, index) => (
            <p className={`text-secondary-300 ml-1 pt-1`}>{`${tag} |`}</p>
          ))
        }
      </div>
      <div className="flex text-white pt-6 px-2">
        <p className="text-lg pl-3">لایسنس:</p>
        <p className="text-xl">{haveLicense ? 'دارد' : 'ندارد'}</p>
      </div>
      <div className="flex text-white pt-6 px-2">
        <p className="text-lg pl-3">قیمت <span className="text-xs opacity-80">(تومان)</span>:</p>
        <p className="text-xl">{price || 'رایگان'}</p>
      </div>
      <div className="flex h-16 absolute bottom-8 gap-3 w-fit left-0 right-0 mx-auto">
        <Button className="btn-primary px-14 py-4 rounded-full">دانلود</Button>
        <Button className="btn-ghost px-14 py-4 rounded-full">اطلاعات بیشتر</Button>
      </div>
    </div>
  )
}
