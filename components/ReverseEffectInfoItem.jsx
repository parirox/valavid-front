const ReverseEffectInfoItem = ({ className, data, disable }) => {
    return (
        <>
            <div className={`bg-neutral flex gap-5 rounded-full py-4 px-6 h-[7.25rem] items-center group ${disable ? '' : 'hover:bg-gradient-to-br hover:from-[#534CDA] hover:to-[#AEAAFF]'} ${className}`}>
                <div className={`w-[5rem] h-[5rem] flex justify-center items-center btn-circle rounded-full ${disable ? 'bg-gray-700' : 'bg-primary group-hover:bg-white'}`}>
                    {data.icon}
                </div>
                <div className="flex flex-col basis-auto">
                    <div className={`w-full ${disable ? 'text-3xl pb-2' : 'text-4xl pb-1'}`}>
                        {disable ? 'به زودی' : data.value}
                    </div>
                    <div className="w-full text-base">
                        {data.title}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReverseEffectInfoItem;