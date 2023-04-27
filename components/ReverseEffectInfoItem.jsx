import Link from "next/link";
import classNames from "classnames";

const ReverseEffectInfoItem = ({ link,className, title, value, icon, disable }) => {
    return (
        <>
            <div className={classNames(`bg-neutral flex gap-2 xl:gap-5 rounded-full py-0 xl:py-4 px-3 xl:px-6 h-[6.25rem] xl:h-[8.25rem] items-center group ${disable ? '' : 'hover:bg-gradient-to-br hover:from-[#534CDA] hover:to-[#AEAAFF] hover:text-accent relative'} ${className}`)}>
                { link && <Link href={link} className={"absolute inset-0"}></Link>}
                <div className={`p-5 flex justify-center items-center btn-circle rounded-full ${disable ? 'bg-gray-700' : 'bg-primary group-hover:bg-white'}`}>
                    {icon}
                </div>
                <div className="flex flex-col basis-auto">
                    <div className={`w-full ${disable ? 'text-xl lg:text-3xl pb-2' : 'text-xl lg:text-4xl pb-1'}`}>
                        {disable ? 'به زودی' : value}
                    </div>
                    <div className="w-full text-base">
                        {title}
                    </div>
                </div>
            </div>
        </>
    );
};
 
export default ReverseEffectInfoItem;