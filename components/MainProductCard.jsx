import Image from 'next/image';
import React, {useMemo, useRef} from 'react';
import {BsFillDiamondFill} from 'react-icons/bs';
import {IoFolderOpenOutline, IoHeart, IoHeartOutline, IoVideocamOutline} from 'react-icons/io5';
import Badge from '@/components/Badge';
import {FaCartPlus, FaPlay} from 'react-icons/fa'
import Link from 'next/link';
import {addOrRemoveToCart, cartItems, checkInCart} from "@/datasources/checkout/local/CheckoutSlice";
import {MdRemoveShoppingCart} from "react-icons/md";
import {useDispatch, useSelector} from "react-redux";
import {setModalCollectionTo} from '@/datasources/config/local/ConfigSlice';
import Avatar from "react-avatar";
import {
  useAddToFavoritesMutation,
  useGetFavoritesQuery,
  useRemoveFromFavoritesMutation
} from "@/datasources/user/remote/UserSliceApi";
import {isEmpty} from "@/utils/general";
import classNames from "classnames";

const MainProductCard = ({data, small, className, link = '#'}) => {
  const _cartItems = useSelector(cartItems);
  const dispatch = useDispatch();
  const ref = useRef()

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

  function onMouseEnterHandler() {
    if (data.type === 'video' && ref.current.readyState >= 3) {
        ref.current.play()
    }
  }

  function onMouseLeaveHandler() {
    if (data.type === 'video' && ref.current.readyState >= 3) {
      ref.current.currentTime = 0
      ref.current.load()
    }
  }

  return (
    <div className={classNames(className, {'h-[250px]': (small && isEmpty(className)), 'h-[300px]': (!small && isEmpty(className))})}>
      <div className={classNames("group/popularCard relative h-full")} onMouseEnter={onMouseEnterHandler}
           onMouseLeave={onMouseLeaveHandler}>
        <div
          className="hidden group-hover/popularCard:block border-[1px] rounded-[3.35rem] w-full h-full z-30 absolute border-white">
          <BsFillDiamondFill
            className="w-9 absolute -left-[0.5px] top-2/4 -translate-y-2/4 -translate-x-2/4"></BsFillDiamondFill>
        </div>
        <div className="w-full h-full p-3">
          <div className="relative w-full h-full rounded-[2.6rem] overflow-hidden">
            <div
              className="absolute top-10 right-7 z-50 transition-400-linear hidden group-hover/popularCard:block">
              <div className="basis-auto">
                <div className="flex p-1 gap-3 justify-between">
                  <div className="basis-auto">
                    <div className="flex gap-3 text-2xl">
                      <Badge title={"لایک کردن"}
                             className='bg-[#00000088] rounded-2xl cursor-pointer hover:bg-white hover:text-primary'
                             onClick={() => {
                               if (!addFavoriteIsLoading && !removeFavoriteIsLoading) {
                                 myFavoritesIds.includes(data.id) ? removeFromFavorites({id: data.id}) : addToFavorites({id: data.id})
                               }
                             }}>
                        {myFavoritesIds.includes(data.id) ? <IoHeart className={"text-danger"}/> :
                          <IoHeartOutline/>}
                      </Badge>
                      <Badge title={"اضافه کردن به مجموعه"}
                             className='bg-[#00000088] rounded-2xl cursor-pointer hover:bg-white hover:text-primary'
                             onClick={() => dispatch(setModalCollectionTo({active: true, footage_details: data}))}>
                        <IoFolderOpenOutline/>
                      </Badge>
                      <Badge className='bg-[#00000088] rounded-2xl cursor-pointer hover:bg-white hover:text-primary'
                             onClick={() => dispatch(addOrRemoveToCart(data))}>
                        {checkInCart(_cartItems, data.id) ? <MdRemoveShoppingCart/> : <FaCartPlus/>}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="absolute top-10 left-7 z-30 transition-400-linear hidden group-hover/popularCard:block">
              <div className="basis-auto">
                <div className="flex p-1 gap-3 justify-between">
                  <div className="basis-auto">
                    <div className="flex gap-3 justify-center items-center">
                      <Badge className='bg-primary rounded-2xl'><span
                        dir="ltr">{data.price.free ? "رایگان" : (data?.price.pay_price / 10).toLocaleString()}</span></Badge>
                      <Badge className='bg-primary rounded-2xl  text-2xl'><IoVideocamOutline/></Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {data.author && <div
              className="absolute bottom-[5.5rem] left-7 z-50 transition-400-linear hidden group-hover/popularCard:block">
              <div className="basis-auto text-black">
                <div className="relative z-50 flex gap-3 justify-end items-center mb-3">
                  <Link href={`/profile/${data.author?.username}`} className="flex items-center basis rounded-3xl bg-white py-2 px-3">
                    <span className='ml-2 text-sm opacity-80'>{data.author.name}</span>
                    {data.author.profile_image ?
                      <Image src={data.author.profile_image} alt={data.author.name} width={16} height={16}
                             className='w-8 rounded-full'/> :
                      <Avatar round={true} name={data.author.name} size="20"/>}
                  </Link>
                </div>
              </div>
            </div>}
            <div
              className={"absolute bottom-12 left-7 right-10 z-30 transition-400-linear hidden group-hover/popularCard:block"}>
              <div className="basis-auto text-black w-full overflow-hidden">
                <div className="flex gap-3 justify-end">
                  <div className="flex-none rounded-3xl bg-white py-2 min-w-[auto] max-w-full">
                    <div className="flex items-center justify-center">
                      <Link href={link} className={"w-full px-5"}>
                        <span className={"block truncate"}>{data.title}</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {data.type === 'video' && <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 z-30">
              <div className="rounded-full w-16 h-16 pl-2 py-4 cursor-pointer bg-secondary opacity-50 group-hover/popularCard:bg-primary group-hover/popularCard:text-white text-3xl text-white text-center">
                <FaPlay className='h-full w-full'/>
              </div>
            </div>}
            <Link href={link} className="absolute inset-0 z-40"></Link>
            {data.type === 'video' ?
              <video ref={ref}
                     poster={data.media.cover}
                     autoPlay={false} preload="metadata" muted loop
                     className="absolute inset-0 h-full w-full object-cover transition-400-linear group-hover/popularCard:scale-110 z-20 hover:autoPlay">
                <source src={data.media.src} type="video/mp4"/>
              </video>
              :
              <Image
                src={data.media.src}
                className="object-cover transition-400-linear group-hover/popularCard:scale-110 z-20"
                fill
                sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw,33vw"
                alt={data.media.alt}
              />
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainProductCard;
