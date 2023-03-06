import React, {Fragment} from 'react';
import {BsFillDiamondFill} from 'react-icons/bs';
import SectionTitleDivider from '../SectionTitleDivider';
import Button from "@/components/Button";
import Avatar from "@/components/Avatar";

const TopSellers = ({data = []}) => {
    return (
    <div className="mb-40 px-5 md:container">
        <SectionTitleDivider title="برترین فروشندگان"></SectionTitleDivider>
        <div className="flex items-center gap-x-2 overflow-y-auto h-[27rem] hide-scrollbar touch-auto">
            {
                data.map((item, i) => (
                <Fragment key={i}>
                    <div
                    className="lg:flex-1 max-lg:basis-1/3 max-lg:flex-nowrap max-lg:flex-shrink-0 group/topSellerCard h-full rounded-2xl bg-gradient-to-tl max-lg:from-[#163155] max-lg:via-[#091E34] max-lg:to-[#021220] hover:from-[#173358] hover:to-[#0D213B44] p-7 cursor-pointer">
                        <div className="flex h-full w-full flex-col items-center justify-end">
                            <div className="flex-grow">
                                <Avatar src={item.profile_image} alt={item.name}
                                        size={110}
                                />
                            </div>
                            <div className="flex-1 text-xl">
                                <span>{item.name}</span>
                            </div>
                            <div className="flex-1 text-lg font-bold text-primary">
                                <span>تولید {item.produce_count}</span>
                            </div>
                            <div className="h-full w-full flex-1">
                                <Button link={`/profile/${item.username}/products`}
                                        className='h-full w-full whitespace-nowrap text-center text-xl transition-all btn-primary-gradient group-hover/topSellerCard:lg:opacity-100 lg:opacity-0'>
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
