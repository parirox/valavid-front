import React, {useEffect, useMemo, useRef, useState} from "react";
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
  useAddProductMutation, useGetAccountProductListMutation,
} from "@/datasources/product/remote/ProductSliceApi";
import {handleApiError} from "@/datasources/errorHandler";
import _toast from "@/utils/notification/toast";
import Link from "next/link";
import {useRouter} from "next/router";
import {IoClose} from "react-icons/io5";
import {useDispatch, useSelector} from "react-redux";
import {
  addAccountProduct,
  removeAccountProduct,
  setAccountProductUploadUrl,
  setAccountProductLoading,
  setAccountProductUploadStatus, uncompletedProductItems,
} from "@/datasources/user/local/UserSlice";
import {isFileImage, isFileVideo} from "@/utils/helpers/files";
import {useGetProfileDetailsQuery} from "@/datasources/user/remote/UserSliceApi";
import Device from "./AddProduct/Device";
import {useProductUploadMutation} from "@/datasources/upload/remote/UploadSliceApi";
import {ApiAddress, ApiEndpoint, BASE_API_URL} from "@/utils/api/api";

const Products = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("steps");
  const [activeStep, setActiveStep] = useState(1);
  const [productInfo, setProductInfo] = useState({
    title: "",
    description: "",
    translations: {
      fa: {}, en: {}, ar: {}, fr: {}, tr: {},
    },
    country: "",
    state: "",
    city: "",
    tags_level_1: [],
    tags_level_2: [],
    tags_level_3: [],
    device: null,
    lens: null,
    file: null,
    publish_type: null,
  });

  const router = useRouter();

  const page = useMemo(() => {
    return router.query?.page ?? 1
  }, [router.query]);

  const dispatch = useDispatch();

  // const [uploadProduct, {data, isSuccess}] = useProductUploadMutation();
  const [addProduct, {
    isLoading: addProductLoading,
  },] = useAddProductMutation();

  const [getAccountProductList, {
    data: products, isSuccess: isFetchProducts, isLoading,
  },] = useGetAccountProductListMutation();

  const {
    data: profileData,
  } = useGetProfileDetailsQuery();
  const uncompletedProducts = useSelector(uncompletedProductItems);

  useEffect(() => {
    // change loading state to failed
    uncompletedProducts.filter(product => product.loading && !product?.status?.success).map(({id}) => {
      dispatch(setAccountProductUploadStatus({id, loading: false, status: {success: false}}));
    })

    getAccountProductList({
      ordering: router.query["order"] || "newest", page,
    }).unwrap().then(() => {
      if (page > 1) document.getElementById("product-submitted-list")?.scrollIntoView({behavior: "smooth"})
    });
  }, [router.query]);

  const setProduct = (name, value) => {
    setProductInfo((prev) => {
      return {
        ...prev, [name]: value,
      };
    });
  };

  const progressHandler = ({id}) => (event) => {
    let percent = Math.ceil((event.loaded / event.total) * 1000) / 10;
    dispatch(setAccountProductLoading({id, loading: true, percent}));
  }

  const uploadFileHandler = (file, id) => {
    const formData = new FormData();
    formData.append("files", file);

    // ----------------------------------------------------------------
    let xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", progressHandler({id}), false);
    xhr.addEventListener("error", (event) => {
      dispatch(setAccountProductLoading({id, loading: false}));
      dispatch(setAccountProductUploadStatus({
        id, status: {success: false},
      }));
    });
    xhr.addEventListener("abort", (event) => {
      dispatch(setAccountProductLoading({id, loading: false}));
      dispatch(setAccountProductUploadStatus({
        id, status: {success: false},
      }));
    });
    xhr.open("POST", BASE_API_URL + ApiAddress(ApiEndpoint.product.account.upload), true);
    xhr.onreadystatechange = () => {
      // In local files, status is 0 upon success in Mozilla Firefox
      if (xhr.readyState === XMLHttpRequest.DONE) {
        const status = xhr.status;
        const res = xhr.response && JSON.parse(xhr.response);
        if (status && (status === 0 || (status >= 200 && status < 400))) {
          dispatch(setAccountProductLoading({id, loading: false}));
          dispatch(setAccountProductUploadStatus({id, status: {success: true}}));
          dispatch(setAccountProductUploadUrl({id, product: res.data[0]}));
        } else {
          dispatch(setAccountProductLoading({id, loading: false}));
          dispatch(setAccountProductUploadStatus({
            id, status: {success: false},
          }));
          handleApiError(res);
        }
      }
    };
    xhr.send(formData);
  }
  const handleReloadFile = (file) => {
    let id = file.id
    dispatch(setAccountProductLoading({id, loading: true}));
    uploadFileHandler(file.file, id)
  };

  const handleSelectFile = (files) => {
    for (let i = 0; i < files.length; i++) {
      let fileType = isFileImage(files[i]) ? "image" : isFileVideo(files[i]) ? "video" : null;
      let id = Math.random();
      if (profileData && (fileType === "video" && !profileData.is_seller)) {
        _toast.error("برای انتشار فیلم اطلاعات بخش فروشنده شوید را تکمیل کنید.");
      } else {
        console.log({
          product: {
            id,
            localSrc: URL.createObjectURL(files[i]),
            fileType,
            loading: true,
            name: files[i].name,
            type: files[i].type,
            file: files[i],
          },
        })
        dispatch(addAccountProduct({
          product: {
            id,
            localSrc: URL.createObjectURL(files[i]),
            fileType,
            loading: true,
            name: files[i].name,
            type: files[i].type,
            file: files[i],
          },
        }));
        uploadFileHandler(files[i], id)
      }
    }
  };

  const getApiTranslationsFormat = (translations) => {
    let tranlationsArray = [];
    Object.keys(translations).forEach((key) => {
      if (translations[key].title && translations[key].description) {
        tranlationsArray.push({
          title: translations[key].title, description: translations[key].description, language_code: key,
        });
      }
    });

    return JSON.stringify(tranlationsArray);
  };

  const handleAddProduct = (publish_type) => {
    setProductInfo((prev) => {
      return {
        ...prev, publish_type,
      };
    });
    let formData = {};
    formData.title = productInfo.translations["fa"].title;
    formData.description = productInfo.translations["fa"].description;
    formData.translations = getApiTranslationsFormat(productInfo.translations);

    formData.country = productInfo.country.value;
    formData.state = productInfo.state.value;
    formData.city = productInfo.city.value;
    formData.tags_level_1 = productInfo.tags_level_1;
    formData.tags_level_2 = productInfo.tags_level_2;
    formData.tags_level_3 = productInfo.tags_level_3;
    formData.device = productInfo.device;
    formData.lens = productInfo.lens;
    formData.publish_type = publish_type;
    formData.file = productInfo.file.path;

    if (!addProductLoading) {
      addProduct(formData)
      .unwrap()
      .then(() => {
        _toast.success("محصول با موفقیت اضافه شد.");
        dispatch(removeAccountProduct({id: productInfo.file.id}));
        getAccountProductList();
        setContent("success");
        setProductInfo({
          title: "",
          description: "",
          translations: {
            fa: {}, en: {}, ar: {}, fr: {}, tr: {},
          },
          country: "",
          state: "",
          city: "",
          tags_level_1: [],
          tags_level_2: [],
          tags_level_3: [],
          device: null,
          lens: null,
          file: null,
          publish_type: null,
        });
      })
      .catch((err) => {
        handleApiError(err);
      });
    }
  };

  const steps = [{
    label: "بارگزاری محصول",
  }, {
    label: "تکمیل اطلاعات", content: (<CompleteInfo
    handleCompleteStep={() => setActiveStep(activeStep + 1)}
    productInfo={productInfo}
    setProductInfo={setProductInfo}
    activeStep={activeStep}
    />),
  }, {
    label: "کلیدواژه", content: (<KeyWords
    setProduct={setProduct}
    productInfo={productInfo}
    setActiveStep={setActiveStep}
    handleCompleteStep={() => setActiveStep(activeStep + 1)}
    />),
  }, {
    label: "لوکیشن", content: (<Location
    setProduct={setProduct}
    productInfo={productInfo}
    setActiveStep={setActiveStep}
    handleCompleteStep={() => setActiveStep(activeStep + 1)}
    />),
  }, {
    label: "دستگاه", content: (<Device
    setProduct={setProduct}
    productInfo={productInfo}
    setActiveStep={setActiveStep}
    handleCompleteStep={() => setActiveStep(activeStep + 1)}
    />),
  }, {
    label: "انتشار", content: (<Release
    handleAddProduct={handleAddProduct}
    productInfo={productInfo}
    setProduct={setProduct}
    setActiveStep={setActiveStep}
    handleCompleteStep={() => setActiveStep(activeStep + 1)}
    loading={addProductLoading}
    />),
  },];

  useEffect(() => {
    if (content === "success" && !isOpen) {
      setContent("steps");
      setActiveStep(1);
    }
    if (!isOpen) {
      setActiveStep(1);
      setProductInfo({
        title: "",
        description: "",
        translations: {
          fa: {}, en: {}, ar: {}, fr: {}, tr: {},
        },
        country: "",
        state: "",
        city: "",
        tags_level_1: [],
        tags_level_2: [],
        tags_level_3: [],
        device: null,
        lens: null,
        file: null,
        publish_type: null,
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (productInfo.file) {
      setIsOpen(true);
    }
  }, [productInfo.file]);

  const comeBackToProducts = () => {
    setIsOpen(false)
    router.push("/profile/me/Products")
  };
  return (<div>
    <AddFile handleSelectFile={handleSelectFile}/>
    <Uploads
    isFetchProducts={isFetchProducts}
    products={products}
    isLoading={isLoading}
    handleCompleteInfo={() => setIsOpen(true)}
    getAccountProductList={getAccountProductList}
    setProduct={setProduct}
    handleSelectFile={handleSelectFile}
    handleReloadFile={handleReloadFile}
    />
    <Modal
    big={true}
    isOpen={isOpen ?? false}
    setIsOpen={(state) => setIsOpen(state)}
    background="bg-[#F8F8F8]"
    containerClass="p-0"
    modalClass="min-h-[100vh]"
    rounded="rounded-0">
      <div className="relative w-full flex justify-center">
        <IoClose
        onClick={() => setIsOpen(false)}
        className="absolute w-8 h-8 text-black left-0 cursor-pointer"
        />
        <CloudIcon className="absolute bottom-[17rem] right-0 z-[-1]"/>
        <div
        className="w-full max-w-[900px] flex flex-cols gap-7 rounded-3xl text-center pt-10 md:pt-5 p-5 min-h-[70vh] justify-center">
          {content === "steps" && (<Stepper
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          steps={steps}
          />)}
          {content === "success" && (<div className="flex flex-col items-center justify-center">
            <SuccessIcon className="w-[10rem] h-[10rem]"/>
            <p className="text-[#42C950] p-4 my-4 text-center">
              درخواست انتشار محصول با موفقیت ثبت شد.
            </p>
            <ComputerIcon className="my-[4rem]"/>
            <Button onClick={comeBackToProducts} className="w-[20rem] h-[4rem] btn-primary mt-4 block mx-2">
              بازگشت به پروفایل
            </Button>
          </div>)}
        </div>
        <CloudIcon className="absolute top-[20rem] left-0 z-[-1]"/>
      </div>
    </Modal>
  </div>);
};

export default Products;
