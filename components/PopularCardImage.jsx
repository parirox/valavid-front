import Image from 'next/image';
import React from 'react';
import {BsFillDiamondFill} from 'react-icons/bs';
import {IoFolderOpenOutline, IoHeart, IoHeartOutline, IoImagesOutline} from 'react-icons/io5';
import Badge from '@/components/Badge';
import Link from 'next/link'
import {useDispatch, useSelector} from "react-redux";
import {addOrRemoveToCart, cartItems, checkInCart} from "@/datasources/checkout/local/CheckoutSlice";
import {FaCartPlus} from "react-icons/fa";
import {MdRemoveShoppingCart} from "react-icons/md";
import {addToFavorite, checkInFavorite, favoriteItems} from "@/datasources/user/local/UserSlice";

const PopularCardImage = ({ data, link = '#' }) => {
    const _cartItems = useSelector(cartItems);
    const _favoriteItems = useSelector(favoriteItems);
    const dispatch = useDispatch();

    return (
        <div className='h-full group/popularCard relative'>
            <div className="hidden group-hover/popularCard:block border-[1px] rounded-[3.35rem] w-full h-full z-30 absolute border-white">
                <BsFillDiamondFill className="w-9 absolute -left-[0.5px] top-2/4 -translate-y-2/4 -translate-x-2/4"></BsFillDiamondFill>
            </div>
            <div className="w-full h-full p-3">
                <div className="relative w-full h-full rounded-[2.6rem] overflow-hidden">
                    <div className="absolute top-12 right-10 z-50 transition-400-linear opacity-0 group-hover/popularCard:opacity-100">
                        <div className="basis-auto">
                            <div className="flex p-1 gap-3 justify-between">
                                <div className="basis-auto">
                                    <div className="flex gap-3 text-2xl">
                                        <Badge className='bg-[#00000088] rounded-2xl cursor-pointer hover:bg-white hover:text-primary' onClick={() => dispatch(addToFavorite({id: data.id, price: data.price}))}>
                                            {checkInFavorite(_favoriteItems, data.id) ? <IoHeart className={"text-danger"}/> : <IoHeartOutline/>}
                                        </Badge>
                                        <Badge className='bg-[#00000088] rounded-2xl cursor-pointer hover:bg-white hover:text-primary'><IoFolderOpenOutline /></Badge>
                                        <Badge className='bg-[#00000088] rounded-2xl cursor-pointer hover:bg-white hover:text-primary'
                                               onClick={() => dispatch(addOrRemoveToCart({id: data.id, price: data.price}))}>
                                            {checkInCart(_cartItems, data.id) ? <MdRemoveShoppingCart/> : <FaCartPlus/>}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-12 left-10 z-50 transition-400-linear opacity-0 group-hover/popularCard:opacity-100">
                        <div className="basis-auto">
                            <div className="flex p-1 gap-3 justify-between">
                                <div className="basis-auto">
                                    <div className="flex gap-3 justify-center items-center">
                                        <Badge className='bg-primary rounded-2xl'><span dir="ltr">{data.price}</span></Badge>
                                        <Badge className='bg-primary rounded-2xl  text-2xl'><IoImagesOutline /></Badge>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute bottom-12 left-10 z-50 transition-400-linear opacity-0 group-hover/popularCard:opacity-100">

                        <div className="basis-auto text-black">
                            {data.author && (<div className="flex gap-3 justify-end items-center mb-3">
                                <div className="flex items-center basis rounded-3xl bg-white py-2 px-3">
                                    <span className='ml-2 text-sm opacity-80'>{data.author.name}</span>
                                    <Image src={data.author.profile_image} alt={data.author.name} width={16} height={16} className='w-8 rounded-full' />
                                </div>
                            </div>)}
                            <div className="flex gap-3 justify-end">
                                <div className="flex-none rounded-3xl bg-white py-2 px-3">
                                    <div className="flex items-center justify-center">
                                        <Link href={link}>
                                            <span>{data.title}</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link href={link}>
                        <Image
                            src={data.media.src}
                            className="object-cover transition-400-linear group-hover/popularCard:scale-110 rounded-[2.6rem] z-30"
                            fill
                            sizes="(max-width: 768px) 100vw,
                                    (max-width: 1200px) 50vw,
                                    33vw"
                            alt={data.media.alt}
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default PopularCardImage;
