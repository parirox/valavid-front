import Image from "next/image"
import { IoCalendarClearOutline } from "react-icons/io5";

export default function BlogCard({ className, data }) {
  return (
    <div className={`rounded-[3.875rem] relative before:content-[''] before:h-1/2 before:w-full before:absolute before:bottom-0 before:right-0 before:bg-gradient-to-b before:from-[#ffffff00] before:to-secondary before:opacity-70 ${className}`}>
      <div className=" flex gap-1 absolute top-8 left-14">
        <IoCalendarClearOutline /> {data.date}
      </div>
      <div className="w-full absolute bottom-0 right-0 px-20 pb-8">
        <div className="text-3xl">
          {data.title}
        </div>
        <div className="divider w-32"></div>
        <div className="text-xl opacity-60">
          {data.description}
        </div>
      </div>
      <Image fill src={data.backgroundImage} className="z-[-1] rounded-[3.875rem]" />
    </div>
  )
}
