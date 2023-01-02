const ReverseEffectInfoItem = ({ className, title, value, icon, disable }) => {
    return (
        <>
            <div className={`bg-neutral flex gap-5 rounded-full py-4 px-6 h-[8.25rem] items-center group ${disable ? '' : 'hover:bg-gradient-to-br hover:from-[#534CDA] hover:to-[#AEAAFF]'} ${className}`}>
                <div className={`w-[5.1rem] h-[5.1rem] flex justify-center items-center btn-circle rounded-full ${disable ? 'bg-gray-700' : 'bg-primary group-hover:bg-white'}`}>
                    {icon}
                </div>
                <div className="flex flex-col basis-auto">
                    <div className={`w-full ${disable ? 'text-3xl pb-2' : 'text-4xl pb-1'}`}>
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