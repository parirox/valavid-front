import MultiValueTextInput from "@/components/MultiValueTextInput";
import Button from "@/components/Button";
import React, { useState } from "react";
import _toast from "@/utils/notification/toast";

const KeyWords = ({
  handleCompleteStep,
  setProduct,
  productInfo,
  setActiveStep,
}) => {
  const [activeInput, setActiveInput] = useState(null);

  const handleAddKeyWord = (level, keyWord, isArray = false) => {
    switch (level) {
      case 1:
        setProduct(
          "tags_level_1",
          !isArray ? [...productInfo.tags_level_1, keyWord] : keyWord
        );
        break;
      case 2:
        setProduct(
          "tags_level_2",
          !isArray ? [...productInfo.tags_level_2, keyWord] : keyWord
        );
        break;
      case 3:
        setProduct(
          "tags_level_3",
          !isArray ? [...productInfo.tags_level_3, keyWord] : keyWord
        );
        break;
      default:
        break;
    }
  };

  const handleClick = () => {
    let errors = [];
    if (
      productInfo.tags_level_1.length < 3 ||
      productInfo.tags_level_1.length > 5
    ) {
      errors.push(
        "تعداد کلیدواژه های اولویت اول باید بیشتر از سه و کمتر از پنج مورد باشد."
      );
    }
    if (
      productInfo.tags_level_2.length < 3 ||
      productInfo.tags_level_2.length > 10
    ) {
      errors.push(
        "تعداد کلیدواژه های اولویت دوم باید بیشتر از سه و کمتر از ده مورد باشد."
      );
    }

    if (errors.length > 0) {
      errors.forEach((err) => {
        _toast.error(err);
      });
    } else {
      handleCompleteStep();
    }

    // if (
    //   productInfo.tags_level_1.length === 0 ||
    //   productInfo.tags_level_2.length === 0
    // ) {
    //   _toast.error("پر کردن کلیدواژه های اولویت اول و دوم اجباری است.");
    // }
  };

  return (
    <>
      <p className="text-secondary bg-color8 rounded-[22px] h-[55px] flex items-center justify-center w-fit px-[2rem] mx-auto mt-4 mb-10">
        کلیدواژه های مرتبط با محصول خود را به ترتیب بنویسید.(کلیدواژه مناسب منجر
        به پیدا کردن سریعتر محصول شما میشود.)
      </p>
      <div className="my-[2rem]">
        <MultiValueTextInput
          values={productInfo.tags_level_1}
          setValues={handleAddKeyWord}
          level={1}
          label="کلیدواژه های اولویت اول (حداقل سه و حداکثر پنج مورد)"
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
          label="کلیدواژه های اولویت دوم (حداقل سه و حداکثر ده مورد)"
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
          label="کلیدواژه های اولویت سوم (بدون محدودیت)"
          activeInput={activeInput}
          setActiveInput={setActiveInput}
          id={2}
          ref={React.useRef(null)}
        />
      </div>
      <p className="text-[#EF4345] text-start">
        کلید واژه ها به ترتیب اهمیت و نزدیکی به محصول باید نوشته شود *
      </p>
      <div className="flex items-center justify-end mt-4">
        <Button
          onClick={() => setActiveStep((prev) => prev - 1)}
          className="w-[20rem] h-[4rem] btn-accent mt-4 block mr-4"
        >
          مرحله قبل
        </Button>
        <Button
          onClick={() => handleClick()}
          className="w-[20rem] h-[4rem] btn-primary mt-4 block mr-4"
        >
          مرحله بعد
        </Button>
      </div>
    </>
  );
};

export default KeyWords;
