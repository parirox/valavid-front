import CoverPage from "@/components/CoverPage";
import SortTabs from "@/components/SortTabs";
import Head from "next/head";
import VideoIcon from '@/public/icons/FillVideoPrimary.svg';
import PopularCardVideo from "@/components/PopularCardVideo";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
// Filter Drawern sidebar
import { TiFilter } from "react-icons/ti"
import { ImPriceTag } from "react-icons/im"
import { IoIosArrowDown } from "react-icons/io"
import RangeInput from "@/components/RangeInput";


const data = [
  {
    id: 1,
    type: "video",
    title: "مقبره بزرگ زیبای شب در شهر اصفهان",
    author: {
      name: "حمید باقری",
      profile_image: "https://placeimg.com/192/192/people",
    },
    price: "2,500 T",
    stats: {
      liked: false,
      cart_added: false,
      added_in_collection: false,
    },
    media: {
      alt: "natural",
      src: "/videos/sample1.mp4"
    }
  },
  {
    id: 4,
    type: "video",
    title: "مقبره بزرگ زیبای شب در شهر اصفهان",
    author: {
      name: "حمید باقری",
      profile_image: "https://placeimg.com/192/192/people",
    },
    price: "2,500 T",
    stats: {
      liked: false,
      cart_added: false,
      added_in_collection: false,
    },
    media: {
      alt: "natural",
      src: "/videos/sample2.mp4"
    }
  },
  {
    id: 1,
    type: "video",
    title: "مقبره بزرگ زیبای شب در شهر اصفهان",
    author: {
      name: "حمید باقری",
      profile_image: "https://placeimg.com/192/192/people",
    },
    price: "2,500 T",
    stats: {
      liked: false,
      cart_added: false,
      added_in_collection: false,
    },
    media: {
      alt: "natural",
      src: "/videos/sample1.mp4"
    }
  },
  {
    id: 4,
    type: "video",
    title: "مقبره بزرگ زیبای شب در شهر اصفهان",
    author: {
      name: "حمید باقری",
      profile_image: "https://placeimg.com/192/192/people",
    },
    price: "2,500 T",
    stats: {
      liked: false,
      cart_added: false,
      added_in_collection: false,
    },
    media: {
      alt: "natural",
      src: "/videos/sample2.mp4"
    }
  },
  {
    id: 1,
    type: "video",
    title: "مقبره بزرگ زیبای شب در شهر اصفهان",
    author: {
      name: "حمید باقری",
      profile_image: "https://placeimg.com/192/192/people",
    },
    price: "2,500 T",
    stats: {
      liked: false,
      cart_added: false,
      added_in_collection: false,
    },
    media: {
      alt: "natural",
      src: "/videos/sample1.mp4"
    }
  },
  {
    id: 4,
    type: "video",
    title: "مقبره بزرگ زیبای شب در شهر اصفهان",
    author: {
      name: "حمید باقری",
      profile_image: "https://placeimg.com/192/192/people",
    },
    price: "2,500 T",
    stats: {
      liked: false,
      cart_added: false,
      added_in_collection: false,
    },
    media: {
      alt: "natural",
      src: "/videos/sample2.mp4"
    }
  },
  {
    id: 1,
    type: "video",
    title: "مقبره بزرگ زیبای شب در شهر اصفهان",
    author: {
      name: "حمید باقری",
      profile_image: "https://placeimg.com/192/192/people",
    },
    price: "2,500 T",
    stats: {
      liked: false,
      cart_added: false,
      added_in_collection: false,
    },
    media: {
      alt: "natural",
      src: "/videos/sample1.mp4"
    }
  },
  {
    id: 1,
    type: "video",
    title: "مقبره بزرگ زیبای شب در شهر اصفهان",
    author: {
      name: "حمید باقری",
      profile_image: "https://placeimg.com/192/192/people",
    },
    price: "2,500 T",
    stats: {
      liked: false,
      cart_added: false,
      added_in_collection: false,
    },
    media: {
      alt: "natural",
      src: "/videos/sample1.mp4"
    }
  },
  {
    id: 4,
    type: "video",
    title: "مقبره بزرگ زیبای شب در شهر اصفهان",
    author: {
      name: "حمید باقری",
      profile_image: "https://placeimg.com/192/192/people",
    },
    price: "2,500 T",
    stats: {
      liked: false,
      cart_added: false,
      added_in_collection: false,
    },
    media: {
      alt: "natural",
      src: "/videos/sample2.mp4"
    }
  },
]

export default function Videos() {
  const [isOpenPriceFilter, setIsOpenPriceFilter] = useState(false)
  const [formData , setFormData] = useState({
    price: 0,
  })

  const setFormDataHandler = (field) => (value)=> {
    setFormData((prevState)=>({...prevState,[field]:value}))
  }
useEffect(() => {
  console.log(formData);
}, [formData])

  return (
    <>
      <Head>
        <title>Valavid | Videos</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <CoverPage className="bg-gradient-to-l from-[#13222db3] via-[#14232f59] to-[#13222db3]" value="مجموعه فیلم ویدئویی با کیفیت باورنکردنی" icon={<VideoIcon />} />
      <div className="flex w-full">
        <div className="basis-1/4 h-[40rem] bg-secondary-light pt-8 px-7">
          <Button
            className="h-14 w-40 rounded-2xl text-xl font-light bg-[#26333E] mr-2"
            icon={<TiFilter className="text-[2.1rem]" />}
          >
            فیلترها
          </Button>
          <div className="flex flex-col gap-14 pt-14">
            <div className="border-b border-secondary-400 pr-2">
              <div className="flex items-center justify-between gap-4 text-lg mr-3">
                <div className="flex items-center gap-4">
                  <ImPriceTag className="text-2xl" />
                  قیمت
                </div>
                <button onClick={() => setIsOpenPriceFilter(!isOpenPriceFilter)}>
                  <IoIosArrowDown className={`text-2xl text-secondary-200 mr-auto transition-all duration-500 ${isOpenPriceFilter ? 'rotate-180' : 'rotate-0'}`} />
                </button>
              </div>
              <div className="w-full h-44 relative pt-20 px-3">
                <RangeInput min={0} max={1000000} step={1000} state={formData.price} setState={setFormDataHandler('price')}></RangeInput>
              </div>
            </div>
          </div>
        </div>
        <div className="basis-full px-10 pb-[20rem]">
          <SortTabs></SortTabs>
          <div className="flex flex-wrap py-7 w-full">
            {data.map((video, key) => {
              return <PopularCardVideo className="basis-1/3" key={key} data={video} />
            })}
          </div>
        </div>
      </div>
    </>
  )
}