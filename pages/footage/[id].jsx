import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import ButtonIcon from "@/components/ButtonIcon";
import Chip from "@/components/Chip";
import CollectionModel from "@/components/CollectionModal";
import Divider from "@/components/Divider";
import PopularCardImage from "@/components/PopularCardImage";
import { addOrRemoveToCart, cartItems, checkInCart } from "@/datasources/checkout/local/CheckoutSlice";
import { setModalCollectionTo } from "@/datasources/config/local/ConfigSlice";
import product_api, { ProductDetails, useProductDetailsQuery } from "@/datasources/product/remote/ProductSliceApi";
import { wrapper } from "@/datasources/store";
import { addToFavorite, checkInFavorite, favoriteItems } from "@/datasources/user/local/UserSlice";
import { Fragment, Popover, Transition } from '@headlessui/react';
import Error from "next/error";
import Image from "next/image";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { BsShieldFillCheck } from "react-icons/bs";
import { CgFolderAdd } from "react-icons/cg";
import { FaCartPlus, FaHeart, FaRegHeart } from "react-icons/fa";
import { IoHeart, IoInformationCircleOutline, IoShareSocialOutline } from "react-icons/io5";
import { MdRemoveShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import RatePieChart from "../../components/charts/RatePieChart";

function FootageDetails() {
    const dispatch = useDispatch();
    const router = useRouter();

    const {data, isSuccess, isLoading, isError} = useProductDetailsQuery(router.query);

    const _cartItems = useSelector(cartItems);
    const is_in_cart = useMemo(() => {
        return checkInCart(_cartItems, data?.id)
    }, [data, _cartItems])

    const _favoriteItems = useSelector(favoriteItems);
    const is_in_favorite = useMemo(() => {
        return checkInFavorite(_favoriteItems, data?.id)
    }, [data, _favoriteItems])


    if (isError) return <Error statusCode={404}/>

    if (isSuccess) {
        return (
            <div className="container mt-20">
                <CollectionModel />
                <div className="flex gap-24 flex-col md:flex-row md:items-stretch">
                    <div className="basis-full md:basis-7/12">
                        <div className="relative full">
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
                            <ButtonIcon icon={<IoHeart className={"text-3xl"}/>}
                                        className={"btn-ghost absolute top-8 right-8 flex-row-reverse justify-center gap-1 text-lg z-40"}>
                                120
                            </ButtonIcon>
                        </div>

                    </div>
                    <div className="basis-full md:basis-5/12">
                        <div className="flex flex-col h-full gap-5">
                            <div className="basis-1/12 h-full">
                                <div className="flex justify-between items-center">
                                    <div className="flex-none">
                                        <div className="flex items-center gap-3">
                                            <Avatar src={data.author.profile_image} alt={data.author.name}
                                                    badge={<BsShieldFillCheck/>}/>
                                            <span className="text-lg">{data.author.name}</span>
                                        </div>
                                    </div>
                                    <div className="flex-none border-l border-gray p-2"></div>
                                    <div className="flex-none">
                                        <span className="text-gray">ناشر اثر: </span>
                                        <span className="text-success-100">{data.publisher.name}</span>
                                    </div>
                                    <div className="flex-none border-l border-gray p-2"></div>
                                    <div className="flex-none text-gray">
                                        <span>تاریخ بارگزاری: </span>
                                        <span>{data.created_at}</span>
                                    </div>
                                </div>
                                <div className="flex-auto">

                                </div>
                            </div>
                            <div className="basis-3/12">
                                <h1 className="text-3xl mb-3">{data.title}</h1>
                                <p className="text-secondary-300 leading-9">
                                    {data.description}
                                </p>
                            </div>
                            <div className="basis-2/12 flex gap-3 h-full text-xl">
                                <Popover className="relative">
                                    <Popover.Button className="btn text-gray py-4 px-6 rounded-xl btn-accent">
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
                                                <li className="flex flex-col gap-2 mb-3">
                                                    <span className='text-gray'>رزولوشن</span>
                                                    <span>{data.extra_information.resolution}</span>
                                                </li>
                                                <li className="flex flex-col gap-2 mb-3">
                                                    <span className='text-gray'>کدک</span>
                                                    <span>{data.extra_information.codek}</span>
                                                </li>
                                                <li className="flex flex-col gap-2 mb-3">
                                                    <span className='text-gray'>نسبت تصویر</span>
                                                    <span>{data.extra_information.ratio}</span>
                                                </li>
                                                <li className="flex flex-col gap-2 mb-3">
                                                    <span className='text-gray'>رنگ</span>
                                                    <div className='flex w-24 h-5 rounded-3xl overflow-hidden'>
                                                        {
                                                            data.extra_information.colors.map((Hex, k) => (
                                                                <div key={k} className='flex-initial full'
                                                                     style={{backgroundColor: Hex}}></div>
                                                            ))
                                                        }
                                                    </div>
                                                </li>
                                                <li className="flex flex-col gap-2 mb-3">
                                                    <span className='text-gray'>نوع فایل</span>
                                                    <span>{data.extra_information.file_type}</span>
                                                </li>
                                                <li className="flex flex-col gap-2 mb-3">
                                                    <span className='text-gray'>فرم ریت</span>
                                                    <span>{data.extra_information.frame_rate}</span>
                                                </li>
                                                <li className="flex flex-col gap-2 mb-3">
                                                    <span className='text-gray'>زمان</span>
                                                    <span>{data.extra_information.time}</span>
                                                </li>
                                                <li className="flex flex-col gap-2 mb-3">
                                                    <span className='text-gray'>حجم</span>
                                                    <span>{data.extra_information.file_size}</span>
                                                </li>
                                            </ul>
                                            <ul className="bg-accent rounded-3xl grid grid-cols-5 grid-row-2 place-items-center p-4 min-w-40 min-h-40">
                                                {
                                                    data.extra_information.rates.map((rate, key) => (
                                                        <li key={key} className="flex flex-col gap-2 mb-5">
                                                        <span className="w-20 h-20 block mb-2 mx-auto"><RatePieChart
                                                            data={rate}/></span>
                                                            <span className="text-sm text-center">{rate.label}</span>
                                                        </li>
                                                    ))}
                                            </ul>
                                        </Transition>
                                    </Popover.Panel>
                                </Popover>
                                <button className="btn text-gray w-16 h-16 rounded-xl btn-accent"><IoShareSocialOutline
                                    className="text-3xl"/></button>
                            </div>
                            <div className="basis-3/12">
                                <div className="flex items-center gap-3 mb-4">
                                <span
                                    className="bg-danger rounded-2xl w-12 px-2 py-1 text-center">{data.price.percent}</span>
                                    <span className="text-xs text-gray">تخفیف اشتراک</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{data.price.main}تومان </span>
                                    <span className="line-through text-gray text-lg">{data.price.off}</span>
                                </div>
                            </div>
                            <div className="basis-3/12">
                                <div className="flex gap-3 h-20 items-stretch">
                                    <Button className="btn text-white py-4 px-6 rounded-xl btn-primary-gradient"
                                            onClick={() => dispatch(addOrRemoveToCart({
                                                id: data.id,
                                                price: data.price
                                            }))}
                                            icon={is_in_cart ? <MdRemoveShoppingCart className="text-3xl"/> :
                                                <FaCartPlus
                                                    className="text-3xl"/>}>{is_in_cart ? 'حذف از' : 'اضافه به'} سبد
                                        خرید</Button>
                                    <button className="btn text-gray w-20 rounded-xl btn-accent"
                                            onClick={() => dispatch(addToFavorite({id: data.id}))}>
                                        {is_in_favorite ? <FaHeart className="text-3xl text-danger"/> :
                                            <FaRegHeart className="text-3xl"/>}
                                    </button>
                                    <button className="btn text-gray w-20 rounded-xl btn-accent"
                                            onClick={() => dispatch(setModalCollectionTo({active:true,footage_details:data}))}>
                                        <CgFolderAdd className="text-3xl"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-24 items-stretch mb-60">
                    <div className="basis-7/12">
                        <div className="flex justify-start gap-3 mt-6">
                            {data.tags.map((v, i) => (
                                <Chip key={i} className={"btn-glass font-bold h-[24px]"} content={v.label}/>
                            ))}
                        </div>
                    </div>
                </div>
                <Divider start={(
                    <div className='flex items-center gap-4'>
                        <Avatar src={data.author.profile_image} alt={data.author.name} badge={<BsShieldFillCheck/>}/>
                        <span>بیشتر از حمید باقری</span>
                    </div>
                )}
                         end={<Button className="btn-accent text-secondary-300" link={"#"}>مشاهده پروفایل</Button>}
                />
                <div className="grid grid-cols-4 h-72 mb-20 mt-10">
                    {data.more_user_products.map((item, key) => (
                        <PopularCardImage key={key} data={item} link={`/footage/${item.id}`}/>))}
                </div>
                <Divider start='مشابه ها'/>
                <section className="mb-40 mt-10">
                    <div className="grid grid-cols-4 grid-rows-2 h-[36rem]">
                        {data.related_products.map((item, key) => (
                            <div key={key} className={(key === 3 ? 'row-span-2' : '')}><PopularCardImage data={item}/>
                            </div>))}
                    </div>
                    <Button
                        className={"h-[4.6rem] w-52 rounded-3xl btn-circle mx-auto flex mt-20 text-[1.5rem] font-light btn-ghost"}
                        link={"#"}
                    >
                        بیشتر
                    </Button>
                </section>
            </div>
        );
    }
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (context) => {
        store.dispatch(ProductDetails.initiate(context.params))
        await Promise.all(store.dispatch(product_api.util.getRunningQueriesThunk()))
        return {
            props: {},
        };
    }
);

export default FootageDetails
