import Image from "next/image"
import { IoCalendarClearOutline } from "react-icons/io5";
import moment from 'jalali-moment'

export default function BlogCard({ className, data }) {
  return (
    <div className={`rounded-[3.875rem] group relative before:content-[''] overflow-hidden before:h-1/2 before:w-full before:absolute before:bottom-0 before:right-0 before:bg-gradient-to-b before:from-[#ffffff00] before:to-secondary before:opacity-70 ${className}`}>
      <div className=" flex gap-1 absolute top-8 left-14 opacity-60 items-center text-sm">
        <IoCalendarClearOutline /> {moment(data.date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}
      </div>
      <div className="w-full absolute bottom-0 right-0 px-14 pb-8">
        <div className="text-2xl">
          {data.title}
        </div>
        <div className="w-32 border-t divide-solid my-4"></div>
        <div className="text-md font-light opacity-60">
          {data.description}
        </div>
      </div>
      <Image fill sizes="50vw" src={data.media.src} alt={data.media.alt} className="z-[-1] group-hover:scale-[1.2] transition-all ease-out duration-700 rounded-[3.875rem]" />
    </div>
  )
}
