import Image from 'next/image';
import { BsFillDiamondFill } from 'react-icons/bs';
import { IoFolderSharp } from 'react-icons/io5';
import Badge from './Badge';

const PopularCardCollection = ({ data }) => {
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
                                        <div className="flex gap-3 text-xl">
                                            <span className="bg-primary rounded-2xl py-2 px-3">{data.label}</span>
                                        </div>
                                    </div>
                                    <div className="basis-auto">
                                        <div className="flex gap-3 justify-center items-center">
                                            <Badge className='bg-primary rounded-2xl  text-2xl'><IoFolderSharp /></Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-rows-2 grid-cols-2 h-full gap-2 group/collection">
                            {data.media.map((img, key) => (
                                <div className="relative h-full" key={key}>
                                    <div className="absolute inset-0 z-10 bg-gradient-to-bl group-hover/popularCard:from-[#00101C99] group-hover/popularCard:to-[#0E1F2C14]"></div>
                                    <Image
                                        src={img.src}
                                        className="object-cover"
                                        fill
                                        alt={img.alt}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PopularCardCollection;
