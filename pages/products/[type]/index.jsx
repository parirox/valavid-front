import Button from "@/components/Button";
import CoverPage from "@/components/CoverPage";
import SortTabs from "@/components/SortTabs";
import PicMountain from '@/public/images/astara_mountain.jpg';
import Head from "next/head";
import {useDeferredValue, useEffect, useState} from "react";
import product_api, {
  GetProductListFilter,
  GetProductListScroll,
  useGetProductListFilterQuery,
  useGetProductListScrollQuery
} from "@/datasources/product/remote/ProductSliceApi";
import {wrapper} from "@/datasources/store";
import {useRouter} from "next/router";
import Error404 from "pages/404";
import {IoVideocam} from "react-icons/io5";
import {TiFilter} from "react-icons/ti";
import Pagination from "@/components/Pagination";
import InfiniteList from "@/components/InfiniteList";
import {isEmpty} from "@/utils/general";
import dynamic from 'next/dynamic'
import ManageCollectionDialog from "@/components/ManageCollectionDialog";
import VideoFilter from "@/components/products/VideoFilter";
import ImageFilter from "@/components/products/ImageFilter";
import ProductCart from "@/components/ProductCart";

const VideoCardLoader = dynamic(import("@/components/skelton/VideoCardLoader"), {ssr: false})

function Products({query}) {
  const router = useRouter()
  const {
    data,
    isFetching,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useGetProductListScrollQuery({query});

  const {
    data: filterOptions,
    isSuccess: filterIsSuccess,
    isLoading: filterIsLoading,
    isError: filterIsError,
    error: filterError,
  } = useGetProductListFilterQuery({query: {type: query.type}});

  const [filterChanged, setFilterChanged] = useState(false)
  const [filterState, setFilterState] = useState(true);
  const [formData, setFormData] = useState({
    price: 0,
    resolution: [],
    frame_rate: [],
    duration: 0,
    environment: [],
    color_theme: [],
    colors: [],
    people_count: [],
    gender: [],
    camera_angle: [],
    orientation: [],
    aspect_ratio: [],
    country: [],
    province: [],
    city: [],
    shutter_speed: []
  })
  const deferredQuery = useDeferredValue(formData);

  const setFormDataHandler = (field) => (value) => {
    if (!filterChanged) setFilterChanged(true)
    setFormData((prevState) => ({...prevState, [field]: value}))
  }

  useEffect(() => {
    if (filterChanged) {
      const {order, type} = query
      let newQuery = {...deferredQuery, type, page: 1}
      if (!isEmpty(order)) {
        newQuery.order = order
      }
      const removedEmptyObject = Object.fromEntries(Object.entries(newQuery).filter((v) => !isEmpty(v[1])))

      router.push({
        pathname: router.pathname,
        query: removedEmptyObject
      }, undefined, {scroll: false})
    }
  }, [deferredQuery, filterChanged])

  useEffect(() => {
    console.log(filterOptions)
  }, [filterOptions])

  if (isError) return <Error404/>

  return (
    <>
      <Head>
        <title>والاوید | لیست محصولات</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </Head>
      <CoverPage className="bg-gradient-to-l from-[#13222db3] via-[#14232f59] to-[#13222db3]"
                 backgroundImage={PicMountain} icon={<IoVideocam className={"text-primary text-3xl"}/>}>
        {query.type === 'video' ? 'مجموعه فیلم ویدئویی با کیفیت باورنکردنی' : 'مجموعه عکس با کیفیت باورنکردنی'}
      </CoverPage>
      <ManageCollectionDialog/>
      <div className="flex w-full">
        <div className={`bg-secondary-light py-6 ${filterState ? 'basis-1/4' : ''}`}>
          <Button
            onClick={() => setFilterState(!filterState)}
            className={`h-14 w-40 rounded-2xl text-xl font-light bg-[#26333E] mx-7 ${filterState ? '' : 'absolute'}`}
            icon={<TiFilter className="text-[2.1rem]"/>}>
            فیلترها
          </Button>
          <div
            className={`flex flex-col gap-14 pt-14 transition-all overflow-hidden ${filterState ? 'w-full px-7' : 'w-0'}`}>
            {(filterIsSuccess && !filterIsLoading && query.type === 'video') &&
              <VideoFilter filterOptions={filterOptions} setFormDataHandler={setFormDataHandler} formData={formData}/>}
            {(filterIsSuccess && !filterIsLoading && query.type === 'image') &&
              <ImageFilter filterOptions={filterOptions} setFormDataHandler={setFormDataHandler} formData={formData}/>}
          </div>
        </div>
        <div className="basis-full overflow-hidden transition-all px-10 pb-[10rem]">
          <SortTabs count={data?.count}
                    className={`border-b border-solid border-secondary-100 px-4 ${filterState ? '' : 'pr-52'}`}></SortTabs>
          {isSuccess &&
            <>
              {query?.page ? <InfiniteList
                  className={`grid gap-2 py-16 ${filterState ? 'grid-cols-3' : 'grid-cols-4'}`}
                  query={query}
                  rtkSlice={product_api}
                  isError={isError}
                  isLoading={isLoading}
                  isFetching={isFetching}
                  loadingContent={<VideoCardLoader count={3}/>}
                  items={data}>
                  {(item, k) => {
                    return <ProductCart link={`/products/${query.type}/${item.id}`} key={k} data={item}/>
                  }}
                </InfiniteList>
                :
                <div className={`grid gap-2 py-16 ${filterState ? 'grid-cols-3' : 'grid-cols-4'}`}>
                  {data.results.map((item, key) => {
                    return <ProductCart link={`/products/${query.type}/${item.id}`} key={key} data={item}/>
                  })}
                </div>
              }
              <div className="py-20 flex justify-center aligns-center gap-3 cursor-pointer">
                {isSuccess && (data.count > 0) &&
                  <Pagination totalCount={data.count} currentPage={router.query?.page} itemsPerPage={30}/>}
              </div>
            </>
          }
          {isLoading &&
            <div className={`grid gap-2 gap-10 py-16 ${filterState ? 'grid-cols-3' : 'grid-cols-4'}`}>
              <VideoCardLoader count={6}/>
            </div>
          }
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    if (!["video", "image"].includes(context.query.type)) {
      return {
        notFound: true,
      }
    }
    const page = parseInt(context.query?.page ?? 1)
    const query = {...context.query,page}
    store.dispatch(GetProductListFilter.initiate({query: {type: context.query.type}}))
    store.dispatch(GetProductListScroll.initiate({query}))

    await Promise.all(store.dispatch(product_api.util.getRunningQueriesThunk()))
    return {
      props: {
        query,
      }
    };
  }
);

export default Products