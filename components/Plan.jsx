import Image from "next/image";
import { MdDone } from "react-icons/md";
import Button from "./Button";

export default function Plan(props) {
  const {
    name,
    duration,
    withStar,
    price,
    items,
    className,
    plan_id,
    ...rest
  } = props;
  return (
    <div className={`h-[32rem] relative bg-gradient-to-b rounded-[2.25rem] ${withStar ? 'from-primary to-success-100' : 'from-[#09192571] to-[#0E1F2C] border border-secondary-400'} ${className}`}>
      <div className={`h-full w-full px-9 pt-20 bg-gradient-to-b rounded-[2.25rem] ${withStar ? 'from-[#644cda01] to-[#534cdaa9]' : 'from-[#0917216f] to-[#091721] border-secondary-400'}`}>
        <div className={`absolute py-2 px-6 rounded-full min-w-[8rem] top-0 text-xl -translate-y-1/2 right-9 ${withStar ? 'bg-white text-primary' : 'bg-success-100'}`}>{name}</div>
        <div className={`text-xl font-bold text-start flex justify-start items-center gap-4 border-b pb-12  ${withStar ? 'border-[#6F69E9]' : 'border-secondary-400'}`}>
          <span className="text-[2.75rem] font-bold"> {(price/10).toLocaleString()} </span>
          تومانی
        </div>
        <div className="flex flex-col gap-6 py-12">
          {
            items.map((item, i) => (
              <div className="flex items-center text-xl gap-4" key={i}>
                <MdDone className='text-white text-xl bg-[#adc0cc3d] w-8 h-8 p-[0.2rem] rounded-full'></MdDone>
                {item}
              </div>
            ))
          }
        </div>
        <Button link={`/plans/checkout/${plan_id}`} className={`text-xl w-full h-[4rem] rounded-2xl transition-all ${withStar ? 'bg-gradient-to-l text-primary from-white via-white to-[#9893F5] hover:to-[#E9E8FF]' : 'bg-gradient-to-r from-[#9D99F8] to-[#534CDA]'}`}>
          انتخاب بسته
        </Button>
      </div>
      <Image src={'/images/backgroundOctagonars.png'} alt="" fill sizes="" className={`w-full object-cover h-full ${withStar ? 'z-2' : 'z-[-1]'}`}></Image>
      {
        withStar ? (<Image src={'/icons/StarSignIcon.png'} alt="" className="absolute top-0 left-0" width={72} height={70}></Image>) : null
      }
    </div>
  )
}
