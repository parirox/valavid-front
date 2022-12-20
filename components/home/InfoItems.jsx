import ReverseEffectInfoItem from '@/components/ReverseEffectInfoItem';
import MusicIcon from '@/public/icons/FillMusicDisable.svg';
import PicturIcon from '@/public/icons/FillPictureActive.svg';
import ThemeIcon from '@/public/icons/FillThemeDisable.svg';
import VideoIcon from '@/public/icons/FillVideoActive.svg';
import OctagonalDivider from '../OctagonalDivider';


const InfoItems = ({stats}) => {
    return (
        <div className="flex gap-16 max-w-[1120px] h-[20rem] items-center w-full m-auto">
            <ReverseEffectInfoItem title='تصویر' value={stats.images} icon={<PicturIcon className="scale-[0.7]" />} className="basis-1/4"></ReverseEffectInfoItem>
            <OctagonalDivider></OctagonalDivider>
            <ReverseEffectInfoItem title='ویدئو' value={stats.videos} icon={<VideoIcon className="scale-[0.7]" />} className="basis-1/4"></ReverseEffectInfoItem>
            <OctagonalDivider></OctagonalDivider>
            <ReverseEffectInfoItem title='صوت' value={stats.audios} icon={<MusicIcon className="scale-[0.7]" />} disable className="basis-1/4"></ReverseEffectInfoItem>
            <OctagonalDivider></OctagonalDivider>
            <ReverseEffectInfoItem title='تمپلیت' value={stats.templates} icon={<ThemeIcon className="scale-[0.7]" />} disable className="basis-1/4"></ReverseEffectInfoItem>
        </div>
    );
}

export default InfoItems;
