import Rhomboid from '@/public/icons/FillRhomboidSmall.svg';
import {GiDiamonds} from "react-icons/gi";

export default function SectionTitleDivider({title}) {
    return (
    <div className="w-full items-center flex pb-10 md:pb-20">
        <div className="border-b border-solid border-secondary-100 basis-full relative"></div>
        <GiDiamonds className="text-5xl text-secondary-100 top-[0.5px] -right-1 z-50 relative"/>
        <h2 className="flex justify-center text-2xl min-w-fit px-6">{title}</h2>
        <GiDiamonds className="text-5xl text-secondary-100 top-[0.5px] -left-1 z-50 relative"/>
        <div className="border-b border-solid border-secondary-100 basis-full"></div>
    </div>
    )
}
