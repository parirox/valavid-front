import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import ButtonIcon from "@/components/ButtonIcon";
import Chip from "@/components/Chip";
import Divider from "@/components/Divider";
import {addOrRemoveToCart, cartItems, checkInCart} from "@/datasources/checkout/local/CheckoutSlice";
import {setModalCollectionTo} from "@/datasources/config/local/ConfigSlice";
import product_api, {ProductDetails, useProductDetailsQuery} from "@/datasources/product/remote/ProductSliceApi";
import {wrapper} from "@/datasources/store";
import {Fragment, Popover, Transition} from '@headlessui/react';
import Head from "next/head";
import Image from "next/image";
import React, {useEffect, useMemo, useState} from "react";
import {BsShieldFillCheck} from "react-icons/bs";
import {CgFolderAdd} from "react-icons/cg";
import {FaCartPlus} from "react-icons/fa";
import {
  IoHeart,
  IoHeartOutline,
  IoInformationCircleOutline,
  IoShareSocialOutline,
  IoWarningOutline
} from "react-icons/io5";
import {MdCamera, MdRemoveShoppingCart} from "react-icons/md";
import {useDispatch, useSelector} from "react-redux";
import dynamic from "next/dynamic";
import MainProductCard from "@/components/MainProductCard";
import ManageCollectionDialog from "@/components/ManageCollectionDialog";
import {dateFormat} from "@/utils/date/date"
import toast from "@/utils/notification/toast";
import {
  useAddToFavoritesMutation,
  useGetFavoritesQuery,
  useRemoveFromFavoritesMutation
} from "@/datasources/user/remote/UserSliceApi";
import ErrorPage from "../../ErrorPage";
import Link from "next/link";
import ReportModal from "@/components/products/report/ReportModal";

const RatePieChart = dynamic(import("@/components/charts/RatePieChart"), {ssr: false})

function FootageDetails({query}) {
  const dispatch = useDispatch();
  const {data, isSuccess, isError, error} = useProductDetailsQuery(query);

  const _cartItems = useSelector(cartItems);
  const is_in_cart = useMemo(() => {
    return checkInCart(_cartItems, data?.id)
  }, [data, _cartItems])

  const [likeCount, setLikeCount] = useState(data?.like_count ?? 0)

  useEffect(() => {
    if (isSuccess && (likeCount !== data?.like_count)) setLikeCount(data.like_count)
  }, [isSuccess])
  //->> favorite endpoints
  const {
    data: favoritesData,
  } = useGetFavoritesQuery()
  const [addToFavorites, {
    isLoading: addFavoriteIsLoading,
  }] = useAddToFavoritesMutation()
  const [removeFromFavorites, {
    isLoading: removeFavoriteIsLoading,
  }] = useRemoveFromFavoritesMutation()

  const myFavoritesIds = useMemo(() => {
    return favoritesData?.results.map(v => v.id) ?? []
  }, [favoritesData])

  if (isError) return <ErrorPage info={error}/>

  function copyToClipboard() {
    navigator.clipboard.writeText(window.location.href);
    toast.success("لینک صفحه کپی شد!")
  }

  if (isSuccess) {
    return (
      <>
        <Head>
          <title>والاوید | {data.title}</title>
        </Head>
        <div className="container mt-20">
          <ManageCollectionDialog/>
          <div className="flex gap-24 flex-col md:flex-row md:items-stretch mb-32">
            <div className="basis-full md:basis-7/12">
              <div className="relative w-full h-50">
                {
                  data.type === "video" ?
                    <video autoPlay={false} preload='metadata' controls loop
                           className="full object-cover rounded-[2.6rem]">
                      <source src={data.media.src} type="video/mp4"/>
                    </video>
                    :
                    <Image src={data.media.src} alt={data.media.alt} fill
                           className="full object-cover rounded-[2.6rem]"/>
                }
                <ButtonIcon icon={<IoHeart className={"text-2xl"}/>}
                            className={"btn-accent opacity-80 absolute top-14 right-8 flex-row-reverse justify-center text-lg gap-1 z-40"}>
                  {likeCount}
                </ButtonIcon>
              </div>

              <div className="flex justify-start flex-wrap gap-3 mt-6">
                {data.tags.map((v, i) => (
                  <Chip href={`/products/${data.type}/?tags=${v.label}`} key={i}
                        className={"btn-glass font-bold h-[24px]"} content={v.label}/>
                ))}
              </div>
            </div>
            <div className="basis-full md:basis-5/12">
              <div className="flex flex-col h-full gap-6">
                <div className="basis-1/12 h-full">
                  <div className="flex justify-between items-center">
                    <div className="flex-none">
                      <Link href={`/profile/${data.publisher?.username}`} className="flex items-center gap-3">
                        <Avatar src={data.publisher?.profile_image} alt={data.publisher?.name}
                                size={50}
                                badge={<span
                                  className="rounded-full bg-white absolute -right-3 -top-3 p-2 text-success-100 text-xl"><BsShieldFillCheck/></span>}/>
                        <span className="text-lg">{data.publisher?.name}</span>
                      </Link>
                    </div>
                    <div className="flex-none border-l border-gray p-2"></div>
                    <div className="flex-none">
                      <span className="text-gray">فیلم بردار: </span>
                      <span className="text-success-100">{data.author?.name}</span>
                    </div>
                    <div className="flex-none border-l border-gray p-2"></div>
                    <div className="flex-none text-gray">
                      <span>تاریخ بارگزاری: </span>
                      <span>{dateFormat(data.created_at)}</span>
                    </div>
                  </div>
                </div>
                <div className="basis-3/12">
                  <h1 className="text-3xl mb-6">{data.title}</h1>
                  {data.devices && <div className="flex gap-3 mb-4 items-center"><MdCamera className={"text-2xl"}/>
                    <span>{data.devices}</span></div>}
                  <p className="text-secondary-300 leading-9 text-lg">
                    {data.description}
                  </p>
                </div>
                <div className="basis-2/12 flex gap-3 h-full text-xl relative">
                  <Popover className="relative">
                    <Popover.Button className="btn text-gray py-4 px-6 rounded-2xl btn-accent">
                      <IoInformationCircleOutline className="text-3xl"/>
                      <span className="ml-2">اطلاعات بیشتر</span>
                    </Popover.Button>
                    <Popover.Panel
                      className="absolute z-40 mt-3 w-screen max-w-sm right-0 transform p-7 lg:max-w-3xl bg-secondary rounded-3xl border border-accent">
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <ul className="grid grid-cols-4 grid-row-2 min-w-40 min-h-40 p-3">
                          {data.extra_information?.resolution && <li className="flex flex-col gap-2 mb-3">
                            <span className='text-gray text-lg'>رزولوشن</span>
                            <span>{data.extra_information.resolution}</span>
                          </li>}
                          {data.extra_information?.codek && <li className="flex flex-col gap-2 mb-3">
                            <span className='text-gray text-lg'>کدک</span>
                            <span>{data.extra_information.codek}</span>
                          </li>}
                          {data.extra_information?.ratio && <li className="flex flex-col gap-2 mb-3">
                            <span className='text-gray text-lg'>نسبت تصویر</span>
                            <span>{data.extra_information.ratio}</span>
                          </li>}
                          {(data.extra_information.colors.length > 0) && <li className="flex flex-col gap-2 mb-3">
                            <span className='text-gray text-lg'>رنگ</span>
                            <div className='flex w-24 h-5 rounded-3xl overflow-hidden'>
                              {
                                data.extra_information.colors.map((Hex, k) => (
                                  <div key={k} className='flex-initial full'
                                       style={{backgroundColor: Hex}}></div>
                                ))
                              }
                            </div>
                          </li>}
                          {data.extra_information?.file_type && <li className="flex flex-col gap-2 mb-3">
                            <span className='text-gray text-lg'>نوع فایل</span>
                            <span>{data.extra_information.file_type}</span>
                          </li>}
                          {data.extra_information.frame_rate && <li className="flex flex-col gap-2 mb-3">
                            <span className='text-gray text-lg'>فرم ریت</span>
                            <span>{data.extra_information.frame_rate}</span>
                          </li>}
                          {data.extra_information.time && <li className="flex flex-col gap-2 mb-3">
                            <span className='text-gray text-lg'>زمان</span>
                            <span>{data.extra_information.time}</span>
                          </li>}
                          {data.extra_information.file_size && <li className="flex flex-col gap-2 mb-3">
                            <span className='text-gray text-lg'>حجم</span>
                            <span>{data.extra_information.file_size}</span>
                          </li>}
                        </ul>
                        <ul
                          className="bg-accent rounded-3xl grid grid-cols-5 grid-row-2 place-items-center p-4 min-w-40 min-h-40">
                          {
                            data.extra_information.rates.filter(v => (!!v.rate)).map((rate, key) => (
                              <li key={key} className="flex flex-col gap-2 mb-5">
                                                                <span className="w-20 h-20 block mb-2 mx-auto">
                                                                    <RatePieChart data={rate}/>
                                                                </span>
                                <span className="text-sm text-center">{rate.label}</span>
                              </li>
                            ))}
                        </ul>
                      </Transition>
                    </Popover.Panel>
                  </Popover>
                  <Popover>
                    <Popover.Button className="btn text-gray py-4 px-6 rounded-2xl btn-accent">
                      <IoWarningOutline className="text-3xl"/>
                      <span className="ml-2">گزارش</span>
                    </Popover.Button>
                    <Popover.Panel
                      className="absolute z-40 mt-3 w-screen max-w-sm right-0 transform px-7 py-10 lg:max-w-2xl bg-secondary rounded-3xl border border-accent">
                      {({close}) => (
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 translate-y-1"
                        >
                          <ReportModal close={close} product={data.id}/>
                        </Transition>
                      )}
                    </Popover.Panel>
                  </Popover>
                  <button onClick={copyToClipboard} className="btn text-gray w-16 h-16 mr-7 rounded-2xl btn-accent">
                    <IoShareSocialOutline
                      className="text-3xl"/></button>
                  <button title={"لایک کردن"} className="btn text-gray w-16 h-16 rounded-2xl btn-accent text-3xl"
                          onClick={() => {
                            if (!addFavoriteIsLoading && !removeFavoriteIsLoading) {
                              myFavoritesIds.includes(data.id) ? removeFromFavorites({id: data.id}).unwrap().then((res) => {
                                setLikeCount(res.like_count)
                              }) : addToFavorites({id: data.id}).unwrap().then((res) => {
                                setLikeCount(res.like_count)
                              })
                            }
                          }}>
                    {myFavoritesIds.includes(data.id) ? <IoHeart className={"text-danger"}/> :
                      <IoHeartOutline/>}
                  </button>
                  <button title={"اضافه کردن به مجموعه"} className="btn text-gray w-16 h-16 rounded-2xl btn-accent"
                          onClick={() => dispatch(setModalCollectionTo({active: true, footage_details: data}))}>
                    <CgFolderAdd className="text-3xl"/>
                  </button>
                </div>
                <div className="basis-3/12">
                  {data.price?.off > 0 && <div className="flex items-center gap-3 mb-4">
                    <span className="bg-danger rounded-2xl w-12 px-2 py-1 text-center">%{data.price.percent}</span>
                    <span className="text-xs text-gray">تخفیف اشتراک</span>
                  </div>}
                  <div className="flex items-center gap-3">
                    {data.price.original > 0 &&
                      <span className="line-through text-gray text-lg">{data.price.original}</span>}
                    <span className="text-2xl">{!data.price.free ? `${data.price.pay_price} تومان` : 'رایگان'}</span>
                  </div>
                </div>
                <div className="basis-3/12">
                  <div className="flex gap-3 h-20 items-stretch">
                    <ButtonIcon className="btn text-white py-4 px-10 rounded-2xl btn-primary-gradient"
                                onClick={() => dispatch(addOrRemoveToCart(data))}
                                icon={is_in_cart ? <MdRemoveShoppingCart className="text-3xl"/> :
                                  <FaCartPlus
                                    className="text-3xl"/>}>
                      {is_in_cart ? 'حذف از' : 'اضافه به'} سبد خرید
                    </ButtonIcon>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Divider start={(
            <div className='flex items-center gap-4'>
              <Avatar src={data.publisher?.profile_image} alt={data.publisher?.name}
                      size={50}
                      badge={<span
                        className="rounded-full bg-white absolute -right-3 -top-3 p-2 text-success-100 text-xl"><BsShieldFillCheck/></span>}/>
              <span>بیشتر از {data.publisher?.name}</span>
            </div>
          )}
                   end={<Button className="btn-accent text-secondary-300" link={`/profile/${data.publisher.username}`}>مشاهده
                     پروفایل</Button>}
          />
          <div className="grid grid-cols-4 overflow-hidden mb-20 mt-10">
            {data.more_user_products.map((item, key) => (
              <MainProductCard small key={item.id} data={item} link={`/products/${item.type}/${item.id}`}/>))}
          </div>
          <Divider start='مشابه ها'/>
          <section className="mb-40 mt-10">
            <div className="grid grid-cols-4 grid-rows-2 gap-4">
              {data.related_products.map((item, key) => (
                <MainProductCard key={item.id}
                                 link={`/products/${item.type}/${item.id}`} small data={item}/>
              ))}
            </div>
            <Button
              className={"h-[4.6rem] w-52 rounded-3xl btn-circle mx-auto flex mt-20 text-[1.5rem] font-light btn-ghost"}
              link={`/products/${data.type}/?tags=${data.tags.slice(0, 3).map((v, i) => (v.label)).join(",")}`}>
              بیشتر
            </Button>
          </section>
        </div>
      </>
    );
  }
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const query = context.params
    store.dispatch(ProductDetails.initiate(query))
    await Promise.all(store.dispatch(product_api.util.getRunningQueriesThunk()))
    return {
      props: {
        query
      },
    };
  }
);

export default FootageDetails
