import Image from 'next/image';
import React, {useRef} from 'react';
import {BsFillDiamondFill} from 'react-icons/bs';
import {IoFolderOpenOutline, IoHeart, IoHeartOutline, IoVideocamOutline} from 'react-icons/io5';
import Badge from '@/components/Badge';
import {FaCartPlus, FaPlay} from 'react-icons/fa'
import Link from 'next/link';
import {addOrRemoveToCart, cartItems, checkInCart} from "@/datasources/checkout/local/CheckoutSlice";
import {MdRemoveShoppingCart} from "react-icons/md";
import {useDispatch, useSelector} from "react-redux";
import {addToFavorite, checkInFavorite, favoriteItems} from "@/datasources/user/local/UserSlice";

const PopularCardVideo = ({ data, className, link = '#' }) => {
    const _cartItems = useSelector(cartItems);
    const _favoriteItems = useSelector(favoriteItems);

    const dispatch = useDispatch();
    const ref = useRef()
    return (
        <div className={className}>
            <div className='h-[300px] group/popularCard relative' onMouseEnter={()=>ref.current.play()} onMouseLeave={()=>ref.current.pause()}>
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
                                            <Badge className='bg-primary rounded-2xl  text-2xl'><IoVideocamOutline /></Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute bottom-12 left-10 z-50 transition-400-linear opacity-0 group-hover/popularCard:opacity-100">
                            <div className="basis-auto text-black">
                                <div className="flex gap-3 justify-end items-center mb-3">
                                    <div className="flex items-center basis rounded-3xl bg-white py-2 px-3">
                                        <span className='ml-2 text-sm opacity-80'>{data.author.name}</span>
                                        <Image src={data.author.profile_image} alt={data.author.name} width={16} height={16} className='w-8 rounded-full' />
                                    </div>
                                </div>
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
                        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 z-40">
                            <div className="rounded-full w-16 h-16 pl-2 py-4 cursor-pointer bg-secondary opacity-50 group-hover/popularCard:bg-primary group-hover/popularCard:text-white text-3xl text-white text-center">
                                <FaPlay className='h-full w-full' />
                            </div>
                        </div>
                        <Link href={link}>
                            <video ref={ref} autoPlay={false} muted loop className="absolute inset-0 h-full w-full object-cover transition-400-linear group-hover/popularCard:scale-110 rounded-[2.6rem] z-30 hover:autoPlay">
                                <source src={data.media.src} type="video/mp4" />
                            </video>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PopularCardVideo;
