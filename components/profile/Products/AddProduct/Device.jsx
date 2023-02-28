import AutoSelect from "@/components/autoSelect";
import Button from "@/components/Button";
import { useGetDevicesQuery } from "@/datasources/product/remote/ProductSliceApi";
import React, { useState } from "react";

const Device = ({
  handleCompleteStep,
  setActiveStep,
  productInfo,
  setProductInfo,
  setProduct,
}) => {
  const [camera, setCamera] = useState(null);
  const [lens, setLens] = useState(null);

  const { data, isSuccess } = useGetDevicesQuery();

  return (
    <div>
      <p className="text-secondary bg-color8 rounded-[22px] h-[55px] flex items-center justify-center w-fit px-[2rem] mx-auto mt-[5rem] mb-[6rem]">
        لنز و دوربین مورد نظر را انتخاب کنید.
      </p>
      <div>
        <div className="my-[2rem] relative">
          <AutoSelect
            placeholder="دوربین"
            value={productInfo.device}
            setValue={(item) => {
              setProduct("device", item);
            }}
            options={isSuccess ? data.devices : []}
          />
        </div>
        <div className="my-[2rem] relative">
          <AutoSelect
            placeholder="لنز"
            value={productInfo.lens}
            setValue={(item) => {
              setProduct("lens", item);
            }}
            options={isSuccess ? data.lenses : []}
          />
        </div>
      </div>
      <div className="flex items-center justify-end mt-[13.5rem]">
        <Button
          onClick={() => setActiveStep((prev) => prev - 1)}
          className="w-[20rem] h-[4rem] btn-accent block mr-4"
        >
          مرحله قبل
        </Button>
        <Button
          onClick={() => handleCompleteStep()}
          className="w-[20rem] h-[4rem] btn-primary block mr-4 "
        >
          مرحله بعد
        </Button>
      </div>
    </div>
  );
};

export default Device;
