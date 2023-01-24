import MultiValueTextInput from "@/components/MultiValueTextInput";
import Button from "@/components/Button";
import React, { useState } from "react";
import _toast from "@/utils/notification/toast";

const KeyWords = ({ handleCompleteStep, setProduct, productInfo }) => {
  const [activeInput, setActiveInput] = useState(null);

  const handleAddKeyWord = (level, keyWord) => {
    switch (level) {
      case 1:
        setProduct("tags_level_1", [...productInfo.tags_level_1, keyWord]);
        break;
      case 2:
        setProduct("tags_level_2", [...productInfo.tags_level_2, keyWord]);
        break;
      case 3:
        setProduct("tags_level_3", [...productInfo.tags_level_3, keyWord]);
        break;
      default:
        break;
    }
  };

  const handleClick = () => {
    if (
      productInfo.tags_level_1.length === 0 ||
      productInfo.tags_level_2.length === 0 ||
      productInfo.tags_level_3.length === 0
    ) {
      _toast.error("پر کردن تمامی فید تگ ها اجباری است.");
    } else {
      handleCompleteStep();
    }
  };

  return (
    <>
      <p className="text-secondary bg-color8 rounded-[22px] h-[55px] flex items-center justify-center w-fit px-[2rem] mx-auto my-4">
        کلیدواژه های مرتبط با محصول خود را به ترتیب بنویسید.(کلیدواژه ماسب منجر
        به پیدا کردن سریعتر محصول شما میشود.)
      </p>
      <div className="my-[2rem]">
        <MultiValueTextInput
          values={productInfo.tags_level_1}
          setValues={handleAddKeyWord}
          level={1}
          label="کلیدواژه های اولویت اول"
          activeInput={activeInput}
          setActiveInput={setActiveInput}
          id={0}
          ref={React.useRef(null)}
        />
      </div>
      <div className="my-[2rem]">
        <MultiValueTextInput
          values={productInfo.tags_level_2}
          setValues={handleAddKeyWord}
          level={2}
          label="کلیدواژه های اولویت دوم"
          activeInput={activeInput}
          setActiveInput={setActiveInput}
          id={1}
          ref={React.useRef(null)}
        />
      </div>
      <div className="my-[2rem]">
        <MultiValueTextInput
          values={productInfo.tags_level_3}
          setValues={handleAddKeyWord}
          level={3}
          label="کلیدواژه های اولویت سوم"
          activeInput={activeInput}
          setActiveInput={setActiveInput}
          id={2}
          ref={React.useRef(null)}
        />
      </div>
      <p className="text-[#EF4345] text-start">
        با نوشتن اطلاعات محصول به زبان های مختلف کاربر های سایر زبان ها هم
        اطلاعات شما را میبینند.
      </p>
      <Button
        onClick={() => handleClick()}
        className="w-[20rem] h-[4rem] btn-primary mt-4 block mr-auto"
      >
        مرحله بعد
      </Button>
    </>
  );
};

export default KeyWords;
