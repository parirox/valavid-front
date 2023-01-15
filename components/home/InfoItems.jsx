import ReverseEffectInfoItem from '@/components/ReverseEffectInfoItem';
import OctagonalDivider from '../OctagonalDivider';
import {IoImage, IoMusicalNote, IoVideocam} from "react-icons/io5";
import {FaPalette} from "react-icons/fa";


const InfoItems = ({stats}) => {
    return (
        <div className="flex gap-16 max-w-[1120px] h-[20rem] items-center w-full m-auto">
            <ReverseEffectInfoItem title='تصویر' value={stats.images} icon={<IoImage className="text-3xl" />} disable={!stats.images} className="basis-1/4"></ReverseEffectInfoItem>
            <OctagonalDivider></OctagonalDivider>
            <ReverseEffectInfoItem title='ویدئو' value={stats.videos} icon={<IoVideocam className="text-3xl" />} disable={!stats.videos} className="basis-1/4"></ReverseEffectInfoItem>
            <OctagonalDivider></OctagonalDivider>
            <ReverseEffectInfoItem title='صوت' value={stats.audios} icon={<IoMusicalNote className="text-3xl" />} disable={!stats.audios} className="basis-1/4"></ReverseEffectInfoItem>
            <OctagonalDivider></OctagonalDivider>
            <ReverseEffectInfoItem title='تمپلیت' value={stats.templates} icon={<FaPalette className="text-3xl" />} disable={!stats.templates} className="basis-1/4"></ReverseEffectInfoItem>
        </div>
    );
}

export default InfoItems;
