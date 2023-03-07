import Image from "next/image";
import Chip from "./Chip";
import {IoCalendarClearOutline} from "react-icons/io5";
import moment from "jalali-moment";
import Link from "next/link";
import classNames from "classnames";

export default function BlogBox(props) {
    const {
        className, row = false, image, title, description, tags, date, id, ...rest
    } = props;
    return (<div className={classNames("relative group bg-white min-h-[300px] p-3 rounded-[29px] box-shadow flex", {
        "flex-row-reverse w-100": row, "flex-col": !row, [className]: !!className
    })}
    >
        <Link href={`/blogs/${id}`} className={"absolute z-20 inset-0"}></Link>
        <div
        className={`relative overflow-hidden rounded-[2rem] ${row ? "md:w-7/12 min-h-[20rem] sm:min-h-[30rem] md:h-100" : "w-100 min-h-[20rem]"}`}
        >
            <Chip
            content={moment(date, "YYYY/MM/DD").locale("fa").format("YYYY/MM/DD")}
            className="bg-[#0000009a] absolute top-3 left-3 flex-row-reverse text-[0.95rem] z-10 py-[0.2rem] px-[0.7rem] gap-[0.4rem]"
            icon={<IoCalendarClearOutline className="text-[1.1rem]"/>}
            ></Chip>
            <Image
            alt={image.alt}
            className="transition-all rounded-[2rem] group-hover:scale-110"
            src={image.src}
            fill
            sizes={"33vw"}
            ></Image>
        </div>
        <div className={`p-5 ${row ? "w-full md:w-5/12" : "w-100"}`}>
            <h4
            className={`text-black font-semibold leading-10 text-xl lg:text-[1.6rem] group-hover:text-primary transition-all w-100 pb-7 ${row ? "pt-1" : "pt-4"}`}
            >
                {title}
            </h4>
            <p className="pb-7 leading-8 text-secondary-200 w-100">{description}</p>
            <div className="flex flex-wrap w-100">
                {tags.map((tag, index) => (<Chip
                href={`/blogs/?tag=${tag.title}`}
                className={"bg-[#EFEFEF] text-black text-xs relative z-30 font-thin m-1"}
                content={tag.title}
                key={index}
                ></Chip>))}
            </div>
        </div>
    </div>);
}
