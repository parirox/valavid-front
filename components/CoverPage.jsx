import Image from 'next/image'
import PicMountain from '@/public/images/astara_mountain.jpg';
import PageTitle from './PageTitle';
import VideoIcon from '@/public/icons/FillVideoPrimary.svg';

export default function CoverPage({ className }) {
  return (
    <div className={`relative w-full flex items-center justify-center h-[30rem] ${className}`}>
      <Image fill sizes='' src={PicMountain} alt="" className='z-[-1]'></Image>
      <PageTitle icon={<VideoIcon />}>مجموعه فیلم ویدئویی با کیفیت باورنکردنی</PageTitle>
    </div>
  )
}
