import React from "react";
import Image from "next/image";
import { formatBytes, isFileImage, isFileVideo } from "@/utils/helpers/files";
const ProductCard = ({ product, description }) => {
  return (
    <div className="flex p-4 rounded-[23px] bg-[#FFFFFF] shadow-3xl w-[100%]">
      {product.fileType === "image" && (
        <Image
          src={product}
          alt=""
          width={147}
          height={88}
          className="rounded-[5px] w-[147px] h-[88px]"
        />
      )}
      {product.fileType === "video" && (
        <video
          loop
          controls
          controlsList="nofullscreen nodownload noremoteplayback noplaybackrate"
          className="rounded-[5px] w-[147px] h-[88px]"
        >
          <source src={URL.createObjectURL(product)} />
        </video>
      )}

      <div className="flex flex-col items-start justify-between">
        <p className="mx-4 mt-4 text-secondary">{description}</p>
        <div className="text-secondary-300 mx-4">
          <span>{product.name}</span>
          <span className="mx-[4rem]">|</span>
          <span>{product.size}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
