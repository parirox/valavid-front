import Image from 'next/image';
import React, {Fragment} from 'react';
import {BsFillDiamondFill} from 'react-icons/bs';
import SectionTitleDivider from '../SectionTitleDivider';
import Button from "@/components/Button";
import Avatar from "react-avatar";

const TopSellers = ({data = []}) => {
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
                                        {item.profile_image ? <Image src={item.profile_image} alt={item.name} width={110} height={110} className='rounded-full' /> : <Avatar round={true} name={item.name} size="110" />}
                                    </div>
                                    <div className="flex-1 text-xl">
                                        <span>{item.name}</span>
                                    </div>
                                    <div className="flex-1 text-primary font-bold text-lg">
                                        <span>تولید {item.produce_count}</span>
                                    </div>
                                    <div className="flex-1 w-full h-full">
                                        <Button link={`/profile/${item.username}/products`} className='btn-primary-gradient text-xl w-full h-full opacity-0 transition-all group-hover/topSellerCard:opacity-100'>
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
