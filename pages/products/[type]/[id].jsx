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
    IoClose,
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
        return (<>
            <Head>
                <title>والاوید | {data.title}</title>
            </Head>
            <div className="mt-10 px-4 sm:container xl:mt-20">
                <ManageCollectionDialog/>
                <div className="mb-32 flex flex-col gap-6 md:items-stretch lg:flex-row lg:gap-16 2xl:gap-24">
                    <div className="basis-full md:basis-6/12">
                        <div className="relative w-full h-50">
                            {data.type === "video" ? <video key={data.id} disablePictureInPicture
                                                            controlsList="nofullscreen nodownload noremoteplayback noplaybackrate no"
                                                            autoPlay={false} preload='metadata' controls loop
                                                            className="object-cover full rounded-[2.6rem]">
                                <source src={data.media.src} type="video/mp4"/>
                            </video> : <Image src={data.media.src} alt={data.media.alt} fill
                                              className="object-cover full rounded-[2.6rem]"/>}
                            {!likeCount && <ButtonIcon icon={<IoHeart className={"sm:text-2xl"}/>}
                                        className={"btn-accent opacity-80 absolute sm:top-14 top-5 py-1 px-3 sm:right-8 right-5 flex-row-reverse justify-center text-lg gap-1 z-40"}>
                                {likeCount}
                            </ButtonIcon>
                            }
                        </div>
                        <div className="mt-6 hidden flex-wrap justify-start gap-3 lg:flex">
                            {data.tags.map((v, i) => (<Chip href={`/products/${data.type}/?tags=${v.label}`} key={i}
                                                            className={"btn-glass font-bold h-[24px]"}
                                                            content={v.label}/>))}
                        </div>
                    </div>
                    <div className="basis-full md:basis-6/12">
                        <div className="flex h-full flex-col gap-10 sm:gap-6">
                            <div className="h-full basis-1/12">
                                <Divider
                                className={"md:!justify-around lg:!justify-between"}
                                start={<Link href={`/profile/${data.publisher?.username}`}
                                                      className="flex items-center gap-3">
                                    <Avatar src={data.publisher?.profile_image} alt={data.publisher?.name}
                                            size={50}
                                            badge={<span
                                            className="absolute -top-3 -right-3 rounded-full bg-white p-2 text-xl text-success-100"><BsShieldFillCheck/></span>}/>
                                    <span className="text-lg">{data.publisher?.name}</span>
                                </Link>}
                                         middle={<div className="flex-none">
                                             <span className="text-gray">فیلم بردار: </span>
                                             <span className="text-success-100">{data.author?.name}</span>
                                         </div>}
                                         end={<div className="hidden flex-none text-gray sm:block">
                                             <span>تاریخ بارگزاری: </span>
                                             <span>{dateFormat(data.created_at)}</span>
                                         </div>}
                                         dividerLine={<div className={"w-[1px] h-5 bg-secondary-100 hidden sm:block"}></div>}
                                />
                            </div>
                            <div className="basis-3/12">
                                <h1 className="mb-6 text-2xl xl:text-3xl">{data.title}</h1>
                                {data.devices &&
                                <div className="mb-4 flex items-center gap-3"><MdCamera className={"text-2xl"}/>
                                    <span>{data.devices}</span></div>}
                                <p className="text-lg leading-9 text-secondary-300 max-sm:hidden">
                                    {data.description}
                                </p>
                            </div>
                            <div className="basis-3/12">
                                <div className="relative flex flex-wrap gap-3 text-xl sm:h-16 lg:justify-start xl:flex-nowrap max-sm:justify-center">
                                    <div className={"flex gap-3"}>
                                        <Popover>
                                            <Popover.Button
                                            className="h-full rounded-2xl px-5 btn text-gray btn-accent">
                                                <IoInformationCircleOutline className="text-3xl"/>
                                                <span className="ml-2">اطلاعات بیشتر</span>
                                            </Popover.Button>
                                            <Popover.Panel
                                            className="fixed max-sm:inset-2 z-50 mt-3 rounded-t-3xl border px-7 py-10 bg-secondary border-accent sm:absolute sm:right-0 sm:max-w-3xl rounded-3xl">
                                                {({close,open}) => (
                                                <Transition
                                                show={open}
                                                appear
                                                enter="transition duration-300 ease-out"
                                                enterFrom="transform scale-95 opacity-0"
                                                enterTo="transform scale-100 opacity-100"
                                                leave="transition duration-150 ease-out"
                                                leaveFrom="transform scale-100 opacity-100"
                                                leaveTo="transform scale-95 opacity-0"
                                                >

                                                    <div className="mb-3 flex flex-wrap justify-between sm:hidden">
                                                        <span className='text-lg text-gray'>اطلاعات بیشتر</span>
                                                        <IoClose onClick={close} className={"text-secondary-300 text-2xl"}/>
                                                        <p className="my-16 basis-full">
                                                            {data.description}
                                                        </p>
                                                    </div>
                                                    <ul className="grid md:grid-cols-4 grid-cols-3 p-3 min-w-40 min-h-40">
                                                        {data.extra_information?.resolution &&
                                                        <li className="mb-3 flex flex-col gap-2">
                                                            <span className='text-lg text-gray'>رزولوشن</span>
                                                            <span>{data.extra_information.resolution}</span>
                                                        </li>}
                                                        {data.extra_information?.codek &&
                                                        <li className="mb-3 flex flex-col gap-2">
                                                            <span className='text-lg text-gray'>کدک</span>
                                                            <span>{data.extra_information.codek}</span>
                                                        </li>}
                                                        {data.extra_information?.ratio &&
                                                        <li className="mb-3 flex flex-col gap-2">
                                                            <span className='text-lg text-gray'>نسبت تصویر</span>
                                                            <span>{data.extra_information.ratio}</span>
                                                        </li>}
                                                        {(data.extra_information.colors.length > 0) &&
                                                        <li className="mb-3 flex flex-col gap-2">
                                                            <span className='text-lg text-gray'>رنگ</span>
                                                            <div className='flex h-5 w-24 overflow-hidden rounded-3xl'>
                                                                {data.extra_information.colors.map((Hex, k) => (
                                                                <div key={k} className='flex-initial full'
                                                                     style={{backgroundColor: Hex}}></div>))}
                                                            </div>
                                                        </li>}
                                                        {data.extra_information?.file_type &&
                                                        <li className="mb-3 flex flex-col gap-2">
                                                            <span className='text-lg text-gray'>نوع فایل</span>
                                                            <span>{data.extra_information.file_type}</span>
                                                        </li>}
                                                        {data.extra_information.frame_rate &&
                                                        <li className="mb-3 flex flex-col gap-2">
                                                            <span className='text-lg text-gray'>فرم ریت</span>
                                                            <span>{data.extra_information.frame_rate}</span>
                                                        </li>}
                                                        {data.extra_information.time &&
                                                        <li className="mb-3 flex flex-col gap-2">
                                                            <span className='text-lg text-gray'>زمان</span>
                                                            <span>{data.extra_information.time}</span>
                                                        </li>}
                                                        {data.extra_information.file_size &&
                                                        <li className="mb-3 flex flex-col gap-2">
                                                            <span className='text-lg text-gray'>حجم</span>
                                                            <span>{data.extra_information.file_size}</span>
                                                        </li>}
                                                    </ul>
                                                    <ul
                                                    className="grid md:grid-cols-5 sm:grid-cols-4 grid-cols-3 place-items-center rounded-3xl p-4 bg-accent grid-row-2 min-w-40 min-h-40">
                                                        {data.extra_information.rates.filter(v => (!!v.rate)).map((rate, key) => (
                                                        <li key={key} className="mb-5 flex flex-col flex-wrap gap-2">
                                                                <span className="mx-auto mb-2 block h-20 w-20">
                                                                    <RatePieChart data={rate}/>
                                                                </span>
                                                            <span className="text-center text-sm">{rate.label}</span>
                                                        </li>))}
                                                    </ul>
                                                </Transition>
                                                )}
                                            </Popover.Panel>
                                        </Popover>
                                        <Popover>
                                            <Popover.Button className="h-full rounded-2xl border-2 px-5 btn text-gray btn-secondary-300 border-accent">
                                                <IoWarningOutline className="text-3xl"/>
                                                <span className="ml-2 hidden sm:inline-block">گزارش</span>
                                            </Popover.Button>
                                            <Popover.Panel
                                            className="fixed max-sm:inset-0 max-sm:top-auto z-50 mt-3 rounded-t-3xl border px-7 py-10 bg-secondary border-accent sm:absolute sm:right-0 sm:max-w-2xl sm:rounded-3xl">
                                                {({close,open}) => (
                                                <Transition
                                                show={open}
                                                appear
                                                enter="transition duration-300 ease-out"
                                                enterFrom="transform scale-95 opacity-0"
                                                enterTo="transform scale-100 opacity-100"
                                                leave="transition duration-150 ease-out"
                                                leaveFrom="transform scale-100 opacity-100"
                                                leaveTo="transform scale-95 opacity-0"
                                                >
                                                    <ReportModal close={close} product={data.id}/>
                                                </Transition>
                                                )}
                                            </Popover.Panel>
                                        </Popover>
                                    </div>
                                    <div className={"flex gap-3 xl:mr-7 lg:mr-0 sm:mr-7"}>
                                        <button onClick={copyToClipboard}
                                                className="aspect-square h-full rounded-2xl btn text-gray btn-accent">
                                            <IoShareSocialOutline className="text-3xl"/>
                                        </button>
                                        <button title={"لایک کردن"}
                                                className="aspect-square h-full rounded-2xl text-3xl btn text-gray btn-accent"
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
                                        <button title={"اضافه کردن به مجموعه"}
                                                className="aspect-square h-full rounded-2xl btn text-gray btn-accent"
                                                onClick={() => dispatch(setModalCollectionTo({
                                                    active: true, footage_details: data
                                                }))}>
                                            <CgFolderAdd className="text-3xl"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="basis-2/12">
                                {data.price?.off > 0 && <div className="mb-4 flex items-center gap-3">
                                    <span
                                    className="w-12 rounded-2xl px-2 py-1 text-center bg-danger">%{data.price.percent}</span>
                                    <span className="text-xs text-gray">تخفیف اشتراک</span>
                                </div>}
                                <div className="flex items-center gap-3">
                                    {data.price.original > 0 &&
                                    <span className="text-lg line-through text-gray">{data.price.original}</span>}
                                    <span
                                    className="text-2xl">{!data.price.free ? `${data.price.pay_price} تومان` : 'رایگان'}</span>
                                </div>
                            </div>
                            <div className="basis-3/12">
                                <div className="flex h-20 items-stretch gap-3">
                                    <ButtonIcon className="rounded-2xl px-10 py-4 text-white btn btn-primary-gradient"
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
                <Divider start={(<div className='flex items-center gap-4'>
                    <Avatar src={data.publisher?.profile_image} alt={data.publisher?.name}
                            size={50}
                            badge={<span
                            className="absolute -top-3 -right-3 rounded-full bg-white p-2 text-xl text-success-100"><BsShieldFillCheck/></span>}/>
                    <span>بیشتر از {data.publisher?.name}</span>
                </div>)} end={<Button className="btn-accent text-secondary-300 max-sm:px-3"
                                      link={`/profile/${data.publisher?.username}`}>مشاهده
                    پروفایل</Button>}
                />
                <div className="mt-10 mb-20 grid flex-nowrap overflow-hidden md:grid-cols-2 xl:grid-cols-4">
                    {data.more_user_products.map((item, key) => (
                    <MainProductCard small key={item.id} data={item} link={`/products/${item.type}/${item.id}`}/>))}
                </div>
                <Divider start='مشابه ها'/>
                <section className="mt-10 mb-40">
                    <div className="grid grid-rows-2 gap-4 md:grid-cols-2 xl:grid-cols-4">
                        {data.related_products.map((item, key) => (<MainProductCard key={item.id}
                                                                                    link={`/products/${item.type}/${item.id}`}
                                                                                    small data={item}/>))}
                    </div>
                    <Button
                    className={"h-[4.6rem] w-52 rounded-3xl btn-circle mx-auto flex mt-20 text-[1.5rem] font-light btn-ghost"}
                    link={`/products/${data.type}/?tags=${data.tags.slice(0, 3).map((v, i) => (v.label)).join(",")}`}>
                        بیشتر
                    </Button>
                </section>
            </div>
        </>);
    }
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    const query = context.params
    store.dispatch(ProductDetails.initiate(query))
    await Promise.all(store.dispatch(product_api.util.getRunningQueriesThunk()))
    return {
        props: {
            query
        },
    };
});

export default FootageDetails
