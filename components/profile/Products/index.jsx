import React, { useEffect, useState } from "react";
import AddFile from "@/components/AddFile";
import Modal from "@/components/Modal";
import Uploads from "../Uploads";
import Stepper from "@/components/Stepper";
import CompleteInfo from "./AddProduct/CompleteInfo/CpmleteInfo";
import KeyWords from "./AddProduct/KeyWords";
import Location from "./AddProduct/Location";
import Release from "./AddProduct/Release/Release";
import SuccessIcon from "@/public/icons/SuccessIcon.svg";
import CloudIcon from "@/public/icons/CloudIcon.svg";
import ComputerIcon from "@/public/icons/ComputerIcon.svg";
import Button from "@/components/Button";
import {
  useAddProductMutation,
  useGetAccountProductListMutation,
} from "@/datasources/product/remote/ProductSliceApi";
import { handleApiError } from "@/datasources/errorHandler";
import _toast from "@/utils/notification/toast";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoClose } from "react-icons/io5";

const Products = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("steps");
  const [activeStep, setActiveStep] = useState(1);
  const [filter, setFilter] = useState("newest");
  const [productInfo, setProductInfo] = useState({
    title: "",
    description: "",
    translations: {
      fa: {},
      en: {},
      ar: {},
      fr: {},
      tr: {},
    },
    country: "",
    state: "",
    city: "",
    tags_level_1: [],
    tags_level_2: [],
    tags_level_3: [],
    file: null,
    publish_type: null,
  });

  const router = useRouter();

  const [addProduct, { data, isSuccess }] = useAddProductMutation();
  const [
    getAccountProductList,
    {
      data: products,
      isFetching,
      isSuccess: isFetchProducts,
      isLoading,
      isError,
      error,
    },
  ] = useGetAccountProductListMutation({
    ordering: router.query["order"] || "newest",
  });

  useEffect(() => {
    getAccountProductList();
  }, [router.query]);

  const setProduct = (name, value) => {
    setProductInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSelectFile = (file) => {
    if (file) {
      if (productInfo.file && file.name === productInfo.file.name) {
        setProduct("file", file);
      } else {
        setProductInfo({
          title: "",
          description: "",
          translations: {
            fa: {},
            en: {},
            ar: {},
            fr: {},
            tr: {},
          },
          country: "",
          state: "",
          city: "",
          tags_level_1: [],
          tags_level_2: [],
          tags_level_3: [],
          file: file,
          publish_type: null,
        });
        setActiveStep(1);
      }
      setIsOpen(true);
    }
  };

  const getApiTranslationsFormat = (translations) => {
    let tranlationsArray = [];
    Object.keys(translations).forEach((key) => {
      if (translations[key].title && translations[key].description) {
        tranlationsArray.push({
          title: translations[key].title,
          description: translations[key].description,
          language_code: key,
        });
      }
    });

    return JSON.stringify(tranlationsArray);
  };

  const handleAddProduct = (publish_type) => {
    const formData = new FormData();
    formData.append("title", productInfo.translations["fa"].title);
    formData.append("description", productInfo.translations["fa"].description);
    formData.append(
      "translations",
      getApiTranslationsFormat(productInfo.translations)
    );
    productInfo.country &&
      formData.append("country", productInfo.country.value);
    productInfo.state && formData.append("state", productInfo.state.value);
    productInfo.city && formData.append("city", productInfo.city.value);
    productInfo.tags_level_1 &&
      formData.append("tags_level_1", productInfo.tags_level_1);
    productInfo.tags_level_2 &&
      formData.append("tags_level_2", productInfo.tags_level_2);
    productInfo.tags_level_3 &&
      formData.append("tags_level_3", productInfo.tags_level_3);
    productInfo.file && formData.append("file", productInfo.file);
    formData.append("publish_type", "free");

    addProduct(formData)
      .unwrap()
      .then(() => {
        _toast.success("محصول با موفقیت اضافه شد.");
        getAccountProductList();
        setContent("success");
        setProductInfo({
          title: "",
          description: "",
          translations: {
            fa: {},
            en: {},
            ar: {},
            fr: {},
            tr: {},
          },
          country: "",
          state: "",
          city: "",
          tags_level_1: [],
          tags_level_2: [],
          tags_level_3: [],
          file: null,
          publish_type: null,
        });
      })
      .catch((err) => {
        handleApiError(err);
      });
  };

  const steps = [
    {
      label: "بارگزاری محصول",
    },
    {
      label: "تکمیل اطلاعات",
      content: (
        <CompleteInfo
          handleCompleteStep={() => setActiveStep(activeStep + 1)}
          productInfo={productInfo}
          setProductInfo={setProductInfo}
        />
      ),
    },
    {
      label: "کلیدواژه",
      content: (
        <KeyWords
          setProduct={setProduct}
          productInfo={productInfo}
          handleCompleteStep={() => setActiveStep(activeStep + 1)}
        />
      ),
    },
    {
      label: "لوکیشن",
      content: (
        <Location
          setProduct={setProduct}
          productInfo={productInfo}
          handleCompleteStep={() => setActiveStep(activeStep + 1)}
        />
      ),
    },
    {
      label: "انتشار",
      content: (
        <Release
          handleAddProduct={handleAddProduct}
          productInfo={productInfo}
          setProduct={setProduct}
          handleCompleteStep={() => setActiveStep(activeStep + 1)}
        />
      ),
    },
  ];

  useEffect(() => {
    if (content === "success" && !isOpen) {
      setContent("steps");
      setActiveStep(1);
    }
  }, [isOpen]);

  return (
    <div>
      <AddFile handleSelectFile={handleSelectFile} />
      <Uploads
        isFetchProducts={isFetchProducts}
        products={products}
        handleCompleteInfo={() => setIsOpen(true)}
        getAccountProductList={getAccountProductList}
      />
      <Modal
        big={true}
        isOpen={isOpen ?? false}
        setIsOpen={(state) => setIsOpen(state)}
        background="bg-[#F8F8F8]"
        containerClass="p-0"
        modalClass="min-h-[100vh]"
        rounded="rounded-0"
      >
        <div className="relative w-full flex justify-center">
          <IoClose
            onClick={() => setIsOpen(false)}
            className="absolute w-8 h-8 text-black left-0 cursor-pointer"
          />
          <CloudIcon className="absolute bottom-[17rem] right-0 z-[-1]" />
          <div className="w-[900px] max-w-[900px] flex flex-cols gap-7 rounded-3xl text-center p-5 min-h-[70vh] h-[765px] justify-center">
            {content === "steps" && (
              <Stepper
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                steps={steps}
              />
            )}
            {content === "success" && (
              <div className="flex flex-col items-center justify-center">
                <SuccessIcon className="w-[10rem] h-[10rem]" />
                <p className="text-[#42C950] p-4 my-4 text-center">
                  درخواست انتشار محصول با موفقیت ثبت شد.
                </p>
                <ComputerIcon className="my-[4rem]" />
                <Link href="/">
                  <Button className="w-[20rem] h-[4rem] btn-primary mt-4 block">
                    رفتن به خانه
                  </Button>
                </Link>
              </div>
            )}
          </div>
          <CloudIcon className="absolute top-[20rem] left-0 z-[-1]" />
        </div>
      </Modal>
    </div>
  );
};

export default Products;
