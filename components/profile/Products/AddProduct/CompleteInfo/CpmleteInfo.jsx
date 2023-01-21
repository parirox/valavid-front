import React from "react";
import ProductCard from "../../../../ProductCard";
import LangInfo from "./LangInfo";
import Button from "@/components/Button";
import _toast from "@/utils/notification/toast";

const CompleteInfo = ({ handleCompleteStep, productInfo, setProductInfo }) => {
  const handleChangeTranlations = (translation, name, value) => {
    setProductInfo((prev) => {
      return {
        ...prev,
        translations: {
          ...prev.translations,
          [translation.language_code]: {
            ...prev.translations[translation.language_code],
            [name]: value,
          },
        },
      };
    });
    console.log(productInfo);
  };

  const handleClick = () => {
    let errors = [];
    for (let key in productInfo.translations) {
      if (key === "fa") {
        if (
          !productInfo.translations[key].title ||
          !productInfo.translations[key].description
        ) {
          errors.push("وارد کردن عنوان و توضیحات زبان فارسی الزامی است.");
        }
      } else {
        if (
          (!productInfo.translations[key].title &&
            productInfo.translations[key].description) ||
          (productInfo.translations[key].title &&
            !productInfo.translations[key].description)
        ) {
          errors.push(
            "برای فیلد های دلخواهتان هر دو گزینه عنوان و توضیحات را پر کنید."
          );
        }
      }
    }
    if (errors.length > 0) {
      errors.forEach((err) => {
        _toast.error(err);
      });
    } else {
      handleCompleteStep();
    }
  };

  return (
    <div>
      {productInfo.file && <ProductCard product={productInfo.file} description={productInfo.translations['fa']?.description || ""} />}
      <LangInfo
        translations={productInfo.translations}
        handleChangeTranlations={handleChangeTranlations}
      />
        <p className="text-[#EF4345] text-start mt-[2rem]">
          با نوشتن اطلاعات محصول به زبان های مختلف کاربر های سایر زبان ها هم
          اطلاعات شما را میبینند.
        </p>
        <Button
          onClick={() => handleClick()}
          className="w-[20rem] h-[4rem] btn-primary mt-4 block mr-auto"
        >
          مرحله بعد
        </Button>
    </div>
  );
};

export default CompleteInfo;
