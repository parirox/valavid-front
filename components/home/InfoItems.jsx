import ReverseEffectInfoItem from '@/components/ReverseEffectInfoItem';
import PicturIcon from '@/public/icons/FillPictureActive.svg';
import VideoIcon from '@/public/icons/FillVideoActive.svg';
import MusicIcon from '@/public/icons/FillMusicDisable.svg';
import ThemeIcon from '@/public/icons/FillThemeDisable.svg';
import OctagonalDivider from '../OctagonalDivider';

export const InfoItemData = [
    {
        title: 'تصویر',
        value: 1354,
        icon: <PicturIcon className="scale-[0.7]" />
    },
    {
        title: 'ویدئو',
        value: 1354,
        icon: <VideoIcon className="scale-[0.7]" />
    },
    {
        title: 'صوت',
        value: null,
        icon: <MusicIcon className="scale-[0.7]" />
    },
    {
        title: 'تمپلیت',
        value: null,
        icon: <ThemeIcon className="scale-[0.7]" />
    },
]

const InfoItems = () => {
    return (
        <div className="flex gap-16 max-w-[1120px] h-[20rem] items-center w-full m-auto">
            <ReverseEffectInfoItem data={InfoItemData[0]} className="basis-1/4"></ReverseEffectInfoItem>
            <OctagonalDivider></OctagonalDivider>
            <ReverseEffectInfoItem data={InfoItemData[1]} className="basis-1/4"></ReverseEffectInfoItem>
            <OctagonalDivider></OctagonalDivider>
            <ReverseEffectInfoItem data={InfoItemData[2]} disable className="basis-1/4"></ReverseEffectInfoItem>
            <OctagonalDivider></OctagonalDivider>
            <ReverseEffectInfoItem data={InfoItemData[3]} disable className="basis-1/4"></ReverseEffectInfoItem>
        </div>
    );
}

export default InfoItems;
