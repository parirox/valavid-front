import ProductCard from "@/components/ProductCard";
import FreeReleaseCard from "./FreeReleaseCard";
import PricingCard from "./PricingCard";
import React from "react";
import Button from "@/components/Button";

const Release = ({ productInfo, handleAddProduct, setActiveStep, loading }) => {
  return (
    <div>
      <ProductCard
        product={productInfo.file}
        description={productInfo.translations["fa"]?.description || ""}
      />
      <p className="text-secondary bg-color8 rounded-[22px] h-[55px] flex items-center justify-center w-fit px-[2rem] mx-auto my-[4rem]">
        نحوه انتشار محصول خود را انتخاب کنید.
      </p>
      <div className="flex justify-center flex-col sm:flex-row">
        <FreeReleaseCard
          loading={
            loading && productInfo.publish_type === "free" ? true : false
          }
          handleSubmit={handleAddProduct}
        />
        <PricingCard
          loading={
            loading && productInfo.publish_type === "nonfree" ? true : false
          }
          handleSubmit={handleAddProduct}
        />
      </div>
      <div className="flex items-center justify-end mt-4">
        <Button
          onClick={() => setActiveStep((prev) => prev - 1)}
          className="w-[20rem] h-[4rem] btn-accent block mr-4">
          مرحله قبل
        </Button>
      </div>
    </div>
  );
};

export default Release;
