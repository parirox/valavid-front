import CoverPage from "@/components/CoverPage";
import Head from "next/head";
import AzadiTower from "@/public/images/azadi_tower_large-aboutUs.png";
import PicturIcon from "@/public/icons/FillPictureActive.svg";
import VideoIcon from "@/public/icons/FillVideoActive.svg";
import MusicIcon from "@/public/icons/FillMusicDisable.svg";
import ThemeIcon from "@/public/icons/FillThemeDisable.svg";
import ValavidIcon from "@/public/images/VALAVID.png";
import Pictures from "@/public/images/pictures_in_aboutUs.png";
import {BsTelephoneFill} from "react-icons/bs";
import {FaTelegramPlane} from "react-icons/fa";
import {AiFillMail} from "react-icons/ai";
import {HiLocationMarker} from "react-icons/hi";
import PcPic from "@/public/images/pcIncontactus.png";
import LocationMap from "@/public/images/locationValavidMap.png";
import Image from "next/image";
import ContactUsBox from "@/components/ContactUsBox";
import Link from "next/link";
import ValavidLogo from "@/public/icons/ValavidLogo.svg";
import {makeTitleWith} from "@/utils/seo/meta";
import React from "react";

export const InfoItemData = [
  {
    title: "تصویر",
    value: 1354,
    icon: <PicturIcon className="scale-[0.7]" />,
  },
  {
    title: "ویدئو",
    value: 1354,
    icon: <VideoIcon className="scale-[0.7]" />,
  },
  {
    title: "صوت",
    value: null,
    icon: <MusicIcon className="scale-[0.7]" />,
  },
  {
    title: "تمپلیت",
    value: null,
    icon: <ThemeIcon className="scale-[0.7]" />,
  },
];
const contactBoxes = [
  {
    connectionWay: "شماره تلفن",
    value: "09018899554",
    icon: <BsTelephoneFill className="text-white text-3xl" />,
  },
  {
    connectionWay: "آیدی تلگرام",
    value: (
      <a href={"https://t.me/valadmin"} target={"_blank"} rel={"noreferrer"}>
        @valadmin
      </a>
    ),
    icon: <FaTelegramPlane className="text-white text-3xl" />,
  },
  {
    connectionWay: "ایمیل",
    value: "valavid_official@yahoo.com",
    icon: <AiFillMail className="text-white text-3xl" />,
  },
  {
    connectionWay: "آدرس",
    value: "تهران، چهارراه تئاتر شهر، نبش خ راضی، پلاک 1034",
    icon: <HiLocationMarker className="text-white text-3xl" />,
  },
];

export default function index() {
  return (
    <>
      <Head>
        <title>{makeTitleWith("درباره ی ما")}</title>
      </Head>
      <CoverPage
        className="bg-gradient-to-l from-[#13222db3] via-[#14232f59] to-[#13222db3]"
        description="هدف ما الهام بخشیدن و انتشار میهن عزیزمان است"
        backgroundImage={AzadiTower}
      >
        با ما بیشتر آشنا شوید
      </CoverPage>
      {/*<div className="relative h-[10rem] w-full">*/}
        {/*<div className="absolute -top-[4.25rem] right-0 left-0 flex gap-14 max-w-[940px] items-center w-full m-auto">*/}
        {/*  {*/}
        {/*    InfoItemData.map((item,i) => (*/}
        {/*      <ReverseEffectInfoItem title={item.title} value={item.value} icon={item.icon} disable={item.value == null} className="basis-1/4" key={i}></ReverseEffectInfoItem>*/}
        {/*    ))*/}
        {/*  }*/}
        {/*</div>*/}
      {/*</div>*/}
      <div className="relative mt-14">
        <div className="flex container">
          <div className="">
            <Link href={"/"} className={"mb-10 block lg:hidden text-3xl"}>
              <ValavidLogo/>
            </Link>
            <Image className={"hidden lg:block"} alt={"valavid logo"} src={ValavidIcon} width={140}></Image>
            <p className="max-w-[62rem] text-lg text-justify leading-[3.5rem]">
              والاوید پلتفرم اشتراک گذاری فوتیج یا تکه ویدئو های مورد نیاز
              فیلمسازه. اینجا تعدادی زیادی از فیلمبردارها و فیلمسازانی که
              چشم‌شان به ایران دوخته شده، گرد هم جمع شده‌اند تا با اشتراک گذاشتن
              هنر و تجربیاتشون، زاویه نگاه‌شونو به دیگران نشان بدهند. اهالی
              والاوید اولین کتابخانه تصویری ایران رو که با همکاری یک تیم کوچک
              چند نفره در سال 1396 تاسیس شده بود، حالا به بزرگترین بانک جامع
              آرشیو تکه ویدئو از ایران تبدیل کرده‌اند. پلتفرمی که از خلاقیت
              حمایت می‌کنه تا محصولات رسانه ای با کیفیت بیشتری تولید بشه و
              فیلمسازان بیشتری بتونن داستان های بهتری روایت کنن. داستان والاوید
              از مشکلات فیلمسازی در ایران شروع میشه. البته که بعضی از این مشکلات
              در همه جای دنیا وجود داره اما بعضی کشورها مسائل منحصر به فرد
              خودشون رو دارن. مثلا یکی از مهمترین مسأله های ما در ایران مصیبت
              مجوز گرفتن است. مصیبتی که میتونه چنان دیواری بلندی دور تیم بکشه که
              هر فیلمسازی رو از ادامه مسیرش منصرف کنه. مثلا میدونستید با مجوز
              ناجی هنر در مدت محدودی که در نامه درج شده، تنها از سطح شهر میتونید
              فیلمبرداری کنید ولی از پارک‌ها یا ایستگاه های اتوبوس نه! برای
              تصویربرداری از پارک باید نامه ناجی هنر رو ببرید روابط عمومی
              شهرداری استان که بعد ارجاع بشه به واحد رسانه که بعد 10 روز کاری
              ارجاع بشه به شهرداری منطقه که بعد از طی مراحلی مثل تعهدنامه و
              ضمانت ارجاع بشه به مدیر پارک که تازه اگه تا اون زمان مجوز ناجی هنر
              تموم نشده باشه بتونید تصویربرداری کنید. قشنگ نیست؟! اما از حق
              نگذریم مساله هزینه بالای تولید یک مساله جهانیه. هماهنگی عوامل
              تولید، آفیش تجهیزات، حمل و نقل و حتی تغذیه گروه از جمله چالش های
              تولیده که خیلی هم طبیعیه. اما یک سوال! آیا ما برای تک تک پلان های
              یک فیلم باید همه این مراحل رو طی کنیم و این همه هزینه بدیم؟ جواب
              ما به این سوال یک نه بزرگه! قطعا لازم نیست هر بار چرخ از ابتدا خلق
              بشه. وقتی هنرمندان دیگری با تنوع بالا در قاب بندی و استفاده از
              تجهیزات مختلف از سوژه مورد نظر شما، آرشیوی از فوتیج آماده کرده اند
              که با چند کلیک ساده میتونی بهشون دسترسی پیدا کنی، دیگ صرف هزینه و
              و وقت برای مجوز و آفیش و رفت و آمد و.... چه معنی میتونه داشته
              باشه! حالا تصور کن که هر چیزی رو سرچ کنی اینجا بتونی تصویر مرتبط
              باهاش رو پیدا کنی و از بین هزاران فوتیج اونی که به داستانت نزدیک
              تره رو انتخاب کنی. دیگه نه نیازی به مجوز هست و نه هزینه های تولیدی
              روی دوشت سنگینی میکنه. اینجا برای تو آماده شده. پس فقط به داستانت
              فکر کن!
            </p>
          </div>
          <div className="absolute z-[-1] top-0 left-5 hidden lg:block">
            <Image src={Pictures} className="" width={850} height={250}></Image>
            <div className="bg-gradient-to-r from-secondary-500 via-[#00101c5a] to-secondary-500 w-full h-full absolute top-0 left-0 z-1 opacity-75"></div>
            <div className="bg-gradient-to-b from-secondary-500 via-[#00101c5a] to-secondary-500 w-full h-full absolute top-0 left-0 z-1 opacity-75"></div>
          </div>
        </div>
        <div className="container mt-24">
          <div className="flex flex-col lg:flex-row gap-20 items-end mb-16">
           <div className="flex flex-col sm:flex-row gap-10 w-full lg:w-auto items-center">
           <Link className="flex-1" href={"/faq"}>
              <Image src={PcPic} className="h-[22rem] w-[25rem]"></Image>
            </Link>
          <p className="text-xl opacity-40 font-thin mb-6 lg:hidden flex-1 flex items-center justify-center">با ما در تماس باشید</p>

           </div>
            <div className="w-full lg:flex-1">
          <p className="text-xl opacity-40 font-thin mb-6 hidden lg:block">با ما در تماس باشید</p>
             <div className="grid grid-cols-2 xl:grid-cols-3 gap-6">
             {contactBoxes.map((box, i) => (
                <ContactUsBox
                  value={box.value}
                  connectionWay={box.connectionWay}
                  icon={box.icon}
                  className={
                    i === 3
                      ? "col-span-2 xl:col-span-3"
                      : i=== 0 ?"sm:col-span-2 xl:col-span-1":i=== 2 ?"sm:col-span-1 col-span-2":""
                  }
                  key={i}
                ></ContactUsBox>
              ))}
             </div>
            </div>
          </div>
          <div className="pt-10 pb-44">
            <Image
              src={LocationMap}
              className="h-[220px] w-full object-cover rounded-[2rem]"
            ></Image>
          </div>
        </div>
      </div>
    </>
  );
}
