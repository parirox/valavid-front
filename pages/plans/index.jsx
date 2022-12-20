import Head from "next/head";
import OctagonalIcon from "@/public/icons/OutlineOctagonarIcon.svg";
import Plan from "@/components/Plan";
import AdvantageBox from "@/components/AdvantageBox";
import lockIcon from "@/public/icons/lockIcon.png";
import takhfifIcon from "@/public/icons/takhfifIcon.png";
import eseyShopIcon from "@/public/icons/eseyShopIcon.png";

export const plansData = [
  {
    duration: '10 روزه',
    price: 2300000,
    withStar: false,
    items: [
      "50% تخفیف خرید محصولات",
      "سقف خرید 8000000 تومان",
      "ذخیره همیشگی مطالب"
    ]
  },
  {
    duration: '30 روزه',
    price: 2300000,
    withStar: false,
    items: [
      "50% تخفیف خرید محصولات",
      "سقف خرید 8000000 تومان",
      "ذخیره همیشگی مطالب"
    ]
  },
  {
    duration: '60 روزه',
    price: 2300000,
    withStar: false,
    items: [
      "50% تخفیف خرید محصولات",
      "سقف خرید 8000000 تومان",
      "ذخیره همیشگی مطالب"
    ]
  },
  {
    duration: '6 ماهه',
    price: 2300000,
    withStar: true,
    items: [
      "50% تخفیف خرید محصولات",
      "سقف خرید 8000000 تومان",
      "ذخیره همیشگی مطالب"
    ]
  },
]

const advantagesData = [
  {
    icon : eseyShopIcon,
    advantage : 'خرید آسان',
    description : 'تنها در چند مرحله ساده خرید خود را نهایی کنید'
  },
  {
    icon : takhfifIcon,
    advantage : 'خرید با تخفیف',
    description : 'پرداخت از طریق درگاه امن و ضمانت بازگشت پول'
  },
  {
    icon : lockIcon,
    advantage : 'دانلود قانونی',
    description : 'دانلود تمامی محصولات با لایسنس اختصاصی'
  },
]

export default function index() {
  return (
    <>
      <Head>
        <title>Valavid | Plans</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="bg-secondary-600 w-full h-52 flex flex-col justify-center items-center">
        <p className="text-secondary-100 pb-2">
          دانلود قانونی
        </p>
        <h3 className="text-color8">
          هزاران ویدئو و تصاویر با کیفیت
        </h3>
      </div>
      <div className="container py-24 text-center">
        <div className="flex justify-center items-center gap-6">
          <OctagonalIcon></OctagonalIcon>
          <h5 className="">بسته های قیمتی</h5>
          <OctagonalIcon></OctagonalIcon>
        </div>
        <p className="text-secondary-100 pb-2 pt-4 text-lg">
          دانلود محتوا با تخفیف تا سقف قیمت مشخص
        </p>
        <div className="flex gap-11 pt-20 flex-wrap">
          {
            plansData.map((plan, i) => (
              <Plan className="w-[calc(25%_-_2.1rem)]" duration={plan.duration} items={plan.items} price={plan.price} withStar={plan.withStar} key={i}></Plan>
            ))
          }
        </div>
        <div className="flex justify-center items-center gap-6 pt-28">
          <OctagonalIcon></OctagonalIcon>
          <h5 className="">بسته های حجمی</h5>
          <OctagonalIcon></OctagonalIcon>
        </div>
        <p className="text-secondary-100 pb-2 pt-4 text-lg">
          دانلود محتوا با تخفیف تا سقف قیمت مشخص
        </p>
        <div className="flex gap-11 pt-20 flex-wrap">
          {
            plansData.map((plan, i) => (
              <Plan className="w-[calc(25%_-_2.1rem)]" duration={plan.duration} items={plan.items} price={plan.price} withStar={plan.withStar} key={i}></Plan>
            ))
          }
        </div>
        <div className="flex pt-40 pb-10 justify-between gap-2">
        {
          advantagesData.map((advantage, i) => (
            <AdvantageBox icon={advantage.icon} advantage={advantage.advantage} description={advantage.description} key={i}></AdvantageBox>
          ))
        }
        </div>
      </div>
    </>
  )
}
