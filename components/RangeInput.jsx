import Image from "next/image";
import { useEffect, useRef, useTransition } from "react";
import BorderValue from '@/public/icons/OutlineBorderValueRange.png'

export default function RangeInput(props) {
  const {
    min,
    max,
    state,
    setState,
    step,
    unit,
    ...rest
  } = props;
  const sliderUI = useRef();
  const rangeInputTag = useRef();
  const minSelector = useRef();
  const maxSelector = useRef();
  const rangeVal = useRef();
  const rangeBar = useRef();
  const showValue = useRef();
  const [isPending, startTransition] = useTransition()

  function setRangeVal() {
    let percent = ((rangeInputTag.current.value - min) / (max - min)) * 100;
    rangeVal.current.style.left = percent + "%";
    rangeBar.current.style.width = percent + "%";
    showValue.current.innerText = rangeInputTag.current.value
    startTransition(() => {
      setState(rangeInputTag.current.value)
    })
  }



  useEffect(() => {
    setRangeVal();
    rangeInputTag.current.addEventListener("input", setRangeVal);
  }, [])

  return (
    <div className="relative" dir="ltr">
      <div className="relative w-full" ref={sliderUI}>
        <input className="absolute opacity-0 cursor-pointer w-full top-0 bottom-0 z-50" value={state} type="range" min={min} max={max} step={step ?? 100} ref={rangeInputTag} onChange={setRangeVal} />
        <div className="absolute z-20 left-0 bottom-0 top-0 right-0 w-full h-2 rounded-full bg-primary" ref={rangeBar}></div>
        <div className="absolute w-full z-10 left-0 bottom-0 top-[1.5px] right-0 h-[3px] rounded-full bg-secondary-300">
          <span className="absolute z-[2] top-1/2 text-secondary-300 left-2 bottom-0 translate-y-7" ref={minSelector}>{unit == 'دقیقه' ? 'همه' : (unit ? min + unit : min)}</span>
          <span className="absolute z-[2] top-1/2 text-secondary-300 right-2 bottom-0 translate-y-7" ref={maxSelector}> {max} {unit ?? ''}</span>
        </div>
        <div className="absolute z-30 left-0 right-2">
          <div className="absolute flex flex-row-reverse items-center justify-center w-4 h-10 bg-primary rounded-md -top-4" ref={rangeVal}>
            <div className="h-6 w-1 bg-[#7E79EC]"></div>
            <div className="absolute -top-12 z-20 min-w-[4rem] h-12">
              <div className="relative h-full flex justify-center px-2 items-center">
                <Image src={BorderValue} alt="" fill sizes="" className="object-fill w-full h-full"></Image>
                <p className="text-secondary-300 font-bold" ref={showValue}></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
