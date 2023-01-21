import Image from "next/image";
import Chip from "./Chip";
import { IoCalendarClearOutline } from "react-icons/io5";
import moment from "jalali-moment";

export default function BlogBox(props) {
  const {
    className,
    row = false,
    image,
    title,
    description,
    tags,
    date,
    ...rest
  } = props;
  return (
    <div
      className={`group bg-white min-h-[300px] p-3 rounded-[29px] box-shadow flex ${className} ${
        row ? "flex-row-reverse w-100" : "flex-col"
      }`}
    >
      <div
        className={`relative overflow-hidden rounded-[2rem] ${
          row ? "w-7/12 h-100" : "w-100 min-h-[20rem]"
        }`}
      >
        <Chip
          content={moment(date, "YYYY/MM/DD").locale("fa").format("YYYY/MM/DD")}
          className="bg-[#0000009a] absolute top-3 left-3 flex-row-reverse text-[0.95rem] z-10 py-[0.2rem] px-[0.7rem] gap-[0.4rem]"
          icon={<IoCalendarClearOutline className="text-[1.1rem]" />}
        ></Chip>
        <Image
          alt={image.alt}
          className="rounded-[2rem] group-hover:scale-110 transition-all"
          src={image.src}
          fill
          sizes={"33vw"}
        ></Image>
      </div>
      <div className={`p-5 ${row ? "w-5/12" : "w-100"}`}>
        <h4
          className={`text-black font-semibold text-[1.6rem] group-hover:text-primary transition-all w-100 pb-7 ${
            row ? "pt-1" : "pt-4"
          }`}
        >
          {title}
        </h4>
        <p className="text-secondary-200 w-100 pb-7 leading-8">{description}</p>
        <div className="flex flex-wrap w-100">
          {tags.map((tag, index) => (
            <Chip
              className={"bg-[#EFEFEF] text-black text-xs font-thin"}
              content={tag}
              key={index}
            ></Chip>
          ))}
        </div>
      </div>
    </div>
  );
}
