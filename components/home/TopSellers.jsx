import Image from 'next/image';
import React, { Fragment } from 'react';
import { BsFillDiamondFill } from 'react-icons/bs';
import Button from '../Button';
import OctagonalDivider from '../OctagonalDivider';
import SectionTitleDivider from '../SectionTitleDivider';

const data = [
    {
        id: 1,
        name: "حمید باقری",
        profile_image: "https://placeimg.com/192/192/people/1",
        produce_count: 49,
    },
    {
        id: 2,
        name: "حمید باقری",
        profile_image: "https://placeimg.com/192/192/people/2",
        produce_count: 49,
    },
    {
        id: 3,
        name: "حمید باقری",
        profile_image: "https://placeimg.com/192/192/people/3",
        produce_count: 49,
    },
    {
        id: 4,
        name: "حمید باقری",
        profile_image: "https://placeimg.com/192/192/people/4",
        produce_count: 49,
    },
    {
        id: 4,
        name: "حمید باقری",
        profile_image: "https://placeimg.com/192/192/people/5",
        produce_count: 49,
    }
]


const TopSellers = () => {
    return (
        <div className="container mb-40">
            <SectionTitleDivider title="برترین فروشندگان" ></SectionTitleDivider>
            <div className="flex items-center gap-x-2 h-[27rem]">
                {
                    data.map((item, i) => (
                        <Fragment key={i}>
                            <div className="flex-1 group/topSellerCard h-full rounded-2xl  bg-gradient-to-t hover:from-[#173358] hover:to-[#0D213B44] p-7 cursor-pointer">
                                <div className="flex flex-col w-full items-center justify-end h-full">
                                    <div className="flex-grow">
                                        <div className="avatar">
                                            <div className="w-36 rounded-full relative">
                                                <Image src={item.profile_image} alt={item.name} fill />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-1 text-xl">
                                        <span>{item.name}</span>
                                    </div>
                                    <div className="flex-1 text-primary font-bold text-lg">
                                        <span>تولید {item.produce_count}</span>
                                    </div>
                                    <div className="flex-1 w-full h-full">
                                        <Button link={`/show-user/${item.id}`} className='btn-primary-gradient text-xl w-full h-full opacity-0 transition-all group-hover/topSellerCard:opacity-100'>
                                            مشاهدات تولیدات
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            {i + 1 !== data.length && <BsFillDiamondFill className="flex-none text-white"></BsFillDiamondFill>}
                        </Fragment>
                    ))
                }
            </div>
        </div>
    );
}

export default TopSellers;
