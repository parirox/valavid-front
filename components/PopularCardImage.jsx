import Image from 'next/image';
import React from 'react';
import { BsFillDiamondFill } from 'react-icons/bs';
import { IoCartOutline, IoFolderOpenOutline, IoHeartOutline, IoImagesOutline } from 'react-icons/io5';
import Badge from '@/components/Badge';

const PopularCardImage = ({ data }) => {
    return (
        <div>
            <div className='h-[300px] group/popularCard relative'>
                <div className="hidden group-hover/popularCard:block border-[1px] rounded-[3.35rem] w-full h-full z-30 absolute border-white">
                    <BsFillDiamondFill className="w-9 absolute -left-[0.5px] top-2/4 -translate-y-2/4 -translate-x-2/4"></BsFillDiamondFill>
                </div>
                <div className="w-full h-full p-3">
                    <div className="relative w-full h-full rounded-[2.6rem] overflow-hidden">
                        <div className="absolute inset-0 z-40 transition-400-linear opacity-0 group-hover/popularCard:opacity-100 py-12 px-10 flex flex-col justify-between">
                            <div className="basis-auto">
                                <div className="flex p-1 gap-3 justify-between">
                                    <div className="basis-auto">
                                        <div className="flex gap-3 text-2xl">
                                            <Badge className='bg-[#00000088] rounded-2xl cursor-pointer hover:bg-white hover:text-primary'><IoHeartOutline /></Badge>
                                            <Badge className='bg-[#00000088] rounded-2xl cursor-pointer hover:bg-white hover:text-primary'><IoFolderOpenOutline /></Badge>
                                            <Badge className='bg-[#00000088] rounded-2xl cursor-pointer hover:bg-white hover:text-primary'><IoCartOutline /></Badge>
                                        </div>
                                    </div>
                                    <div className="basis-auto">
                                        <div className="flex gap-3 justify-center items-center">
                                            <Badge className='bg-primary rounded-2xl'><span dir="ltr">{data.price}</span></Badge>
                                            <Badge className='bg-primary rounded-2xl  text-2xl'><IoImagesOutline /></Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="basis-auto text-black">
                                <div className="flex gap-3 justify-end items-center mb-3">
                                    <div className="flex items-center basis rounded-3xl bg-white py-2 px-3">
                                        <span className='ml-2 text-sm opacity-80'>{data.author.name}</span>
                                        <div className="avatar">
                                            <div className="w-8 rounded-full">
                                                <Image src={data.author.profile_image} alt={data.author.name} width={16} height={16} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-3 justify-end">
                                    <div className="flex-none rounded-3xl bg-white py-2 px-3">
                                        <div className="flex items-center justify-center">
                                            <span>{data.title}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Image
                            src={data.media.src}
                            className="object-cover transition-400-linear group-hover/popularCard:scale-110 rounded-[2.6rem] z-30"
                            fill
                            alt={data.media.alt}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PopularCardImage;
