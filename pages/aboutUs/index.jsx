import CoverPage from "@/components/CoverPage";
import Head from "next/head";
import AzadiTower from "@/public/images/azadi_tower_large-aboutUs.png";
import ReverseEffectInfoItem from "@/components/ReverseEffectInfoItem";
import PicturIcon from '@/public/icons/FillPictureActive.svg';
import VideoIcon from '@/public/icons/FillVideoActive.svg';
import MusicIcon from '@/public/icons/FillMusicDisable.svg';
import ThemeIcon from '@/public/icons/FillThemeDisable.svg';
import ValavidIcon from "@/public/images/VALAVID.png";
import Pictures from "@/public/images/pictures_in_aboutUs.png";
import { BsTelephoneFill } from "react-icons/bs";
import { FaTelegramPlane } from "react-icons/fa";
import { AiFillMail } from "react-icons/ai";
import { HiLocationMarker } from "react-icons/hi";
import PhonePic from "@/public/images/phonInContactus.png";
import LocationMap from "@/public/images/locationValavidMap.png"
import Image from "next/image";
import ContactUsBox from "@/components/ContactUsBox";
import Link from "next/link";

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
const contactBoxes = [
  {
    connectinoWay: 'موبایل',
    value: "09154444444",
    icon: <BsTelephoneFill className="text-primary text-3xl" />
  },
  {
    connectinoWay: 'تلگرام',
    value: "09154444444",
    icon: <FaTelegramPlane className="text-primary text-3xl" />
  },
  {
    connectinoWay: 'ایمیل',
    value: "john.doe@mail.com",
    icon: <AiFillMail className="text-primary text-3xl" />
  },
  {
    connectinoWay: 'مکان',
    value: "خراسان رضوی، مشهد",
    icon: <HiLocationMarker className="text-primary text-3xl" />
  },
]

export default function index() {
  return (
    <>
      <Head>
        <title>Valavid | About us</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <CoverPage className="bg-gradient-to-l from-[#13222db3] via-[#14232f59] to-[#13222db3]" description="هدف ما الهام بخشیدن و انتشار میهن عزیزمان است" backgroundImage={AzadiTower}>
        با ما بیشتر آشنا شوید
      </CoverPage>
      <div className="relative h-[10rem] w-full">
        <div className="absolute -top-[4.25rem] right-0 left-0 flex gap-14 max-w-[940px] items-center w-full m-auto">
          {
            InfoItemData.map((item,i) => (
              <ReverseEffectInfoItem title={item.title} value={item.value} icon={item.icon} disable={item.value == null} className="basis-1/4" key={i}></ReverseEffectInfoItem>
            ))
          }
        </div>
      </div>
      <div className="relative">
        <div className="flex container">
          <div className="h-[50rem]">
            <Image src={ValavidIcon} width={140}></Image>
            <p className="max-w-[62rem] text-lg leading-[3.5rem]">
              سایت والاوید نخستین سایت ایرانی است که با تمرکز ویژه بر سبک زندگی ایرانیان، به روایت منظم آن پرداخته است . این سایت به دو زبان فارسی و انگلیسی هر آنچه را مورد نیاز در شناساندن حقیقی سیمای ایران و ایرانیان، اسلام و مسلمانان است برای هنرمندان فراهم کرده است . گروه متخصص والاوید به پشتیبانی شبانه روزی مخاطبان خود پرداخته و هر روز مسیر تکامل این روند را با سرعت بیش از پیش می پیماید. سایت والاوید در کنار فعالیت حرفه ای خود، امکان آشنایی ملل مختلف و مسافران ایران را با آثار باستانی، مناظر طبیعی، سبک زندگی ایرانیان، اعتقادات و جذابیت های تصویری فراهم نموده است. به تصویر در آوردن همه زیبایی های ایران حتما هرگز ممکن نخواهد بود اما اعتقاد داریم والاوید ابتدای مسیری طولانی در پالایش جعلیات و والایش حقایق است که باید توسط حقیقت جویان پیموده شده تا به گوش حقیقت پذیر جهانیان رسانده شود.
            </p>
          </div>
          <div className="absolute z-[-1] top-0 left-5">
            <Image src={Pictures} className="" width={850} height={250}></Image>
            <div className="bg-gradient-to-r from-secondary-500 via-[#00101c5a] to-secondary-500 w-full h-full absolute top-0 left-0 z-1 opacity-75"></div>
            <div className="bg-gradient-to-b from-secondary-500 via-[#00101c5a] to-secondary-500 w-full h-full absolute top-0 left-0 z-1 opacity-75"></div>
          </div>
        </div>
        <div className="container">
          <p className="text-xl opacity-40 font-thin">با ما در تماس باشید</p>
          <div className="flex justify-between gap-2 items-center">
            <div className="flex flex-wrap gap-6 w-[75rem] py-24">
              {
                contactBoxes.map((box,i) => (
                  <ContactUsBox value={box.value} connectionWay={box.connectinoWay} icon={box.icon} className="w-[calc(50%_-_1.5rem)]" key={i}></ContactUsBox>
                ))
              }
            </div>
           <Link href={'/faq'}>
           <Image src={PhonePic} className="h-[16rem] w-[25rem]"></Image>
           </Link>
          </div>
          <div className="pt-10 pb-44">
            <Image src={LocationMap} className="h-[220px] w-full object-cover rounded-[2rem]"></Image>
          </div>
        </div>
      </div>
    </>
  )
}
