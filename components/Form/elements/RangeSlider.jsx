import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import {useState} from "react";
import {isEmpty} from "@/utils/general";

export default function RangeInput({
                                     min,
                                     max,
                                     step = 1,
                                     defaultValue,
                                     state,
                                     setState,
                                     unit = "price",
                                     thumbsDisabled = [false, false]
                                   }) {
  const [value, setValue] = useState(isEmpty(state) ? [min, max] : state.split(","));

  function onChange() {
    console.log(value.join(","))
    setState(value.join(","))
  }

  return (
    <div>
      <RangeSlider onInput={setValue}
                   thumbsDisabled={thumbsDisabled}
                   rangeSlideDisabled={thumbsDisabled.some(v => v)} onRangeDragEnd={onChange} onThumbDragEnd={onChange}
                   min={min}
                   max={max}
                   step={step}
                   defaultValue={defaultValue} value={value}/>
      <span className={"absolute left-3 bottom-5"}>
        {typeof video_time !== "undefined" ? (() => {
          if (unit === "price") {
            if (value[0] === 0) {
              return "رایگان"
            }else {
              return value?.[0]?.toLocaleString()
            }
          }
        })()
          : value?.[0]?.toLocaleString() ?? ""
        }
        </span>
      <span className={"absolute right-3 bottom-5"}>{value?.[1]?.toLocaleString() ?? ""}</span>
    </div>
  );
}