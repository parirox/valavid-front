import CoverPage from "@/components/CoverPage";
import SortTabs from "@/components/SortTabs";
import PicMountain from '@/public/images/astara_mountain.jpg';
import Head from "next/head";
import {useEffect} from "react";
// Filter Drawern sidebar
import CollectionModel from "@/components/CollectionModal";
import product_api, {GetProductList, useGetProductListQuery} from "@/datasources/product/remote/ProductSliceApi";
import {wrapper} from "@/datasources/store";
import {useRouter} from "next/router";
import Error404 from "pages/404";
import {IoImage} from "react-icons/io5";
import PopularCardImage from "@/components/PopularCardImage";


const data = [
  {
    id: 1,
    type: "image",
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
      src: "https://placeimg.com/640/480/nature/1"
    }
  },
  {
    id: 4,
    type: "image",
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
      src: "https://placeimg.com/640/480/nature/2"
    }
  },
  {
    id: 1,
    type: "image",
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
      src: "https://placeimg.com/640/480/nature/3"
    }
  },
  {
    id: 4,
    type: "image",
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
      src: "https://placeimg.com/640/480/nature/4"
    }
  },
  {
    id: 1,
    type: "image",
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
      src: "https://placeimg.com/640/480/nature/5"
    }
  },
  {
    id: 4,
    type: "image",
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
      src: "https://placeimg.com/640/480/nature/6"
    }
  },
  {
    id: 1,
    type: "image",
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
      src: "https://placeimg.com/640/480/nature/7"
    }
  },
  {
    id: 1,
    type: "image",
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
      src: "https://placeimg.com/640/480/nature/8"
    }
  },
  {
    id: 4,
    type: "image",
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
      src: "https://placeimg.com/640/480/nature/9"
    }
  },
]

function Collections() {
  const router = useRouter();
  const {data2, isSuccess, isError} = useGetProductListQuery(router.query);

  useEffect(() => {

  }, [])

  if (isError) return <Error404/>

  if (isSuccess) return (
    <>
      <Head>
        <title>والاوید | تصاویر</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </Head>
      <CoverPage className="bg-opacity-30 bg-primary text-center" backgroundImage={PicMountain}
                 icon={<IoImage className={"text-primary text-3xl"}/>}>
        <div>
          مجموعه عکس با کیفیت باورنکردنی
        </div>
        <div className={"text-lg mt-3"}>
          به مناسبت روز گردشگری کالکشنی از نقاط گردشگری ایران را منتشر کردیم
        </div>
        <div className={'absolute bottom-10 left-0 right-0 text-center text-lg'}>
          بروزرسانی 12/8/1400
        </div>
      </CoverPage>
      <CollectionModel/>
      <div className="flex w-full">
        <div className="basis-full px-10 pb-[20rem]">
          <div className='grid grid-cols-4 gap-2 py-16'>
            {data.map((image, key) => {
              return <PopularCardImage link={`/images/${image.id}`} key={key} data={image}/>
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

export default Collections