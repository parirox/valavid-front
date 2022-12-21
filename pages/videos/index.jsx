import Button from "@/components/Button";
import CoverPage from "@/components/CoverPage";
import PopularCardVideo from "@/components/PopularCardVideo";
import SortTabs from "@/components/SortTabs";
import VideoIcon from '@/public/icons/FillVideoPrimary.svg';
import PicMountain from '@/public/images/astara_mountain.jpg';
import Head from "next/head";
import { useEffect, useState } from "react";
// Filter Drawern sidebar
import CollectionModel from "@/components/CollectionModal";
import CheckBoxButton from "@/components/Form/CheckboxButton";
import CheckBoxColorButton from "@/components/Form/CheckBoxColorButton";
import CollapseElement from "@/components/Form/CollapseElement";
import RangeInput from "@/components/RangeInput";
import product_api, { GetProductList, useGetProductListQuery } from "@/datasources/product/remote/ProductSliceApi";
import { wrapper } from "@/datasources/store";
import { useRouter } from "next/router";
import Error404 from "pages/404";
import { AiOutlineRotateRight } from "react-icons/ai";
import { BsPinMapFill } from "react-icons/bs";
import { FaLightbulb, FaPalette, FaUserFriends, FaVenusMars } from "react-icons/fa";
import { ImPriceTag } from "react-icons/im";
import { IoMdSpeedometer } from "react-icons/io";
import { IoSettingsSharp, IoSpeedometerSharp, IoTimeSharp } from "react-icons/io5";
import { TbAngle } from "react-icons/tb";
import { TiFilter } from "react-icons/ti";

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
const people = [
  { id: 1, name: 'Durward Reynolds' },
  { id: 2, name: 'Kenton Towne' },
  { id: 3, name: 'Therese Wunsch' },
  { id: 4, name: 'Benedict Kessler' },
  { id: 5, name: 'Katelyn Rohan' },
]
function Videos() {
  const router = useRouter();
  const { data2, isSuccess, isError } = useGetProductListQuery(router.query);

  const [formData, setFormData] = useState({
    price: 0,
    resolution: [],
    frame_rate: [],
    duration: 0,
    setting: [],
    enviroment: [],
    color_theme: [],
    colors: [],
    peaple_count: [],
    gender: [],
    camera_angle: [],
    orientation: [],
    location: [null, null, null],
    sutter_speed: []
  })

  const filterOptions = {
    price: [0, 950000],
    resolutions: ['همه', 'HD', '2K', '4K'],
    frame_rates: [24, 28, 33],
    duration: [0, 60],
    settings: ['لوپ', 'آلفاچنل'],
    enviroments: ['باز', 'بسته'],
    color_themes: ['روشن', 'تاریک'],
    colors: ['#f55', '#f99', '#f1a'],
    peaple_count: ["0", "1", "2", "+3"],
    genders: ['مرد', 'زن'],
    camera_angles: ['eye level', 'low angle', 'high angle', 'very low angle', 'very high angle', 'over head', 'emphasis level'],
    orientations: ['افقی', 'عمودی', 'مربع', 'واید اسکرین'],
    locations: [null, null, null],
    sutter_speeds: ['تایم لپس', 'اسلوموشن', 'رئال'],
  }

  const setFormDataHandler = (field) => (value) => {
    setFormData((prevState) => ({ ...prevState, [field]: value }))
  }

  useEffect(() => {
    console.log(formData);
  }, [formData])

  if (isError) return <Error404 />

  if (isSuccess) return (
    <>
      <Head>
        <title>Valavid | Videos</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <CoverPage className="bg-gradient-to-l from-[#13222db3] via-[#14232f59] to-[#13222db3]" backgroundImage={PicMountain} icon={<VideoIcon />}>
        مجموعه فیلم ویدئویی با کیفیت باورنکردنی
      </CoverPage>
      <CollectionModel />
      <div className="flex w-full">
        <div className="basis-1/4 bg-secondary-light py-10 px-7">
          <Button
            className="h-14 w-40 rounded-2xl text-xl font-light bg-[#26333E] mr-2"
            icon={<TiFilter className="text-[2.1rem]" />}
          >
            فیلترها
          </Button>
          <div className="flex flex-col w-full gap-14 pt-14">

            <CollapseElement headTitle='قیمت' headIcon={<ImPriceTag className="text-2xl" />}>
              <div className="pt-5 pb-10"><RangeInput min={filterOptions.price[0]} max={filterOptions.price[1]} step={1000} state={formData.price} setState={setFormDataHandler('price')}></RangeInput></div>
            </CollapseElement>

            <CollapseElement headTitle='رزولوشن' headIcon={<ImPriceTag className="text-2xl" />}>
              <CheckBoxButton data={filterOptions.resolutions} options={formData.resolution} setOptions={setFormDataHandler('resolution')} />
            </CollapseElement>

            <CollapseElement headTitle='فریم ریت' headIcon={<IoMdSpeedometer className="text-2xl" />}>
              <CheckBoxButton data={filterOptions.frame_rates} options={formData.frame_rate} setOptions={setFormDataHandler('frame_rate')} />
            </CollapseElement>

            <CollapseElement headTitle='زمان' headIcon={<IoTimeSharp className="text-2xl" />}>
              <div className="pt-5 pb-10"><RangeInput min={filterOptions.duration[0]} max={filterOptions.duration[1]} unit="دقیقه" step={1} state={formData.duration} setState={setFormDataHandler('duration')}></RangeInput></div>
            </CollapseElement>

            <CollapseElement headTitle='تنظیمات' headIcon={<IoSettingsSharp className="text-2xl" />}>
              <CheckBoxButton data={filterOptions.settings} options={formData.setting} setOptions={setFormDataHandler('setting')} />
            </CollapseElement>

            <CollapseElement headTitle='فضا' headIcon={<BsPinMapFill className="text-2xl" />}>
              <CheckBoxButton data={filterOptions.enviroments} options={formData.enviroment} setOptions={setFormDataHandler('enviroment')} />
            </CollapseElement>

            <CollapseElement headTitle='نور' headIcon={<FaLightbulb className="text-2xl" />}>
              <CheckBoxButton data={filterOptions.color_themes} options={formData.color_theme} setOptions={setFormDataHandler('color_theme')} />
            </CollapseElement>

            <CollapseElement headTitle='تم رنگی' headIcon={<FaPalette className="text-2xl" />}>
              <CheckBoxColorButton removeButton={true} data={filterOptions.colors} options={formData.colors} setOptions={setFormDataHandler('colors')} />
            </CollapseElement>

            <CollapseElement headTitle='تعداد انسان' headIcon={<FaUserFriends className="text-2xl" />}>
              <CheckBoxButton data={filterOptions.peaple_count} options={formData.peaple_count} setOptions={setFormDataHandler('peaple_count')} />
            </CollapseElement>

            <CollapseElement headTitle='جنسیت انسان ها' headIcon={<FaVenusMars className="text-2xl" />}>
              <CheckBoxButton data={filterOptions.genders} options={formData.gender} setOptions={setFormDataHandler('gender')} />
            </CollapseElement>

            <CollapseElement headTitle='زاویه دوربین' headIcon={<TbAngle className="text-2xl" />}>
              <CheckBoxButton data={filterOptions.camera_angles} options={formData.camera_angle} setOptions={setFormDataHandler('camera_angle')} />
            </CollapseElement>

            <CollapseElement headTitle='قاب دوربین' headIcon={<AiOutlineRotateRight className="text-2xl" />}>
              <CheckBoxButton data={filterOptions.orientations} options={formData.orientation} setOptions={setFormDataHandler('orientation')} />
            </CollapseElement>

            <CollapseElement headTitle='سرعت' headIcon={<IoSpeedometerSharp className="text-2xl" />}>
              <CheckBoxButton data={filterOptions.sutter_speeds} options={formData.sutter_speed} setOptions={setFormDataHandler('sutter_speed')} />
            </CollapseElement>

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

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    store.dispatch(GetProductList.initiate(context.params))
    await Promise.all(store.dispatch(product_api.util.getRunningQueriesThunk()))
    return {
      props: {},
    };
  }
);

export default Videos