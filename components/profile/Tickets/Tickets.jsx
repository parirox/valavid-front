import Button from "@/components/Button";
import Modal from "@/components/Modal";
import {
  useAddMessageMutation,
  useCreateTicketMutation,
  useGetTicketDetailsMutation,
  useGetTicketListQuery,
} from "@/datasources/ticket/remote/TicketSliceApi";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import NoContent from "@/components/NoContent";
import toast from "@/utils/notification/toast";
import { IoAttach } from "react-icons/io5";
import TicketBox from "@/components/profile/Tickets/TicketBox";
import { jsonToFormData } from "@/utils/form/useform";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { getFormError } from "@/utils/form/messages";
import { isEmpty } from "@/utils/general";
import {
  handleApiError,
  handleFormApiResponse,
} from "@/datasources/errorHandler";
import ProductAutoComplete from "@/components/Form/elements/auto_complete/ProductAutoComplete";

const ticket = [
  {
    subject: "اعتراض قیمت گزاری",
    productName: "تصویر صحرای دشت مغان در غروب",
    date: "1401/12/24",
  },
];

const Tickets = () => {
  const { data, isSuccess, isError, isLoading } = useGetTicketListQuery();
  const [
    fetchCreate,
    {
      data: createData,
      isSuccess: createIsSuccess,
      error: createError,
      isError: createIsError,
      isLoading: createIsLoading,
    },
  ] = useCreateTicketMutation();
  const [isOpen, setIsOpen] = useState(false);

  const formSchema = Yup.object().shape({
    subject: Yup.string().required(
      getFormError({ field: "subject", type: "required" })
    ),
    product: Yup.string().required(
      getFormError({ field: "product", type: "choose" })
    ),
    message: Yup.string().required(
      getFormError({ field: "message", type: "required" })
    ),
  });

  const {
    register,
    trigger,
    control,
    watch,
    reset,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // second
      subject: "",
      message: "",
      priority: "low",
      product: null,
      attachment: "",
    },
    resolver: yupResolver(formSchema),
  });

  const createTicket = async (formData) => {
    let isValid = await trigger();
    if (!isValid) {
      console.log(isValid, errors);
      // const error_message = getFormError()
      // setAlertMessage("اطلاعات ورودی خود را بررسی کنید.");
      return;
    }
    formData = jsonToFormData(formData);
    fetchCreate(formData)
      .unwrap()
      .then((data) => {
        toast.success("تیکت جدید با موفقیت ایجاد شد!");
        reset();
      })
      .catch((err) => {
        toast.error(err);
      });
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isEmpty(errors)) {
      Object.entries(errors).forEach(([_, value]) => {
        toast.error(value.message);
      });
    }
  }, [errors]);

  if (!isSuccess) return <></>;
  return (
    <div className="pt-7 pb-20">
      <Button
        className={"btn-primary py-4 px-12 rounded-full"}
        onClick={() => setIsOpen(true)}
      >
        افزودن تیکت
      </Button>
      {ticket.length === 0 ? (
        <NoContent />
      ) : (
        <div className="pt-10">
          <div className="h-16 flex-col md:flex-row w-full hidden sm:flex md:px-3">
            <div className="flex basis-3/4">
              <div className="text-start pr-6 md:pr-14 basis-1/3 px-4">
                موضوع
              </div>
              <div className="text-start basis-1/3 px-4">محصول</div>
              <div className="text-start basis-1/3 px-4">تاریخ</div>
            </div>
            <div className="text-start basis-1/4"></div>
          </div>
          <div className="flex flex-col gap-6">
            {data?.results?.map((data, index) => (
              <TicketBox data={data} id={data.id} key={index}></TicketBox>
            ))}
          </div>
        </div>
      )}
      <Modal
        customHeight="w-full md:w-8/12 lg:w-6/12"
        small
        isOpen={isOpen ?? false}
        setIsOpen={setIsOpen}
      >
        <form onSubmit={handleSubmit(createTicket)} className="p-2">
          <p className="opacity-50 text-accent w-full text-start px-3 text-xl">
            ایجاد تیکت
          </p>
          <div className="pb-8">
            <div className="flex flex-col sm:flex-row gap-y-14 sm:gap-y-0 pt-16 gap-x-3 justify-between">
              <div className="relative basis-5/12">
                <label
                  htmlFor="subjectInput"
                  className="text-accent absolute -top-9"
                >
                  موضوع
                </label>
                <input
                  type="text"
                  id="subjectInput"
                  className="bg-color8 text-secondary px-4 h-14 w-full rounded-[1.2rem] border-none active:border-none focus:border-none"
                  {...register("subject")}
                />
              </div>
              <div className="relative basis-7/12">
                <label
                  htmlFor="productInput"
                  className="text-accent absolute -top-9"
                >
                  محصول
                </label>
                <input
                  type="text"
                  id="productInput"
                  className="bg-color8 text-secondary px-4 h-14 w-full rounded-[1.2rem] border-none active:border-none focus:border-none"
                  {...register("product")}
                />
              </div>
            </div>
            <div className="pt-20 pb-10 w-full">
              <div className="relative w-full text-right">
                <label
                  htmlFor="productInput"
                  className="text-accent mb-3 inline-block"
                >
                  توضیحات
                </label>
                <div className={"relative w-full"}>
<<<<<<< HEAD
                    <textarea id="productInput"
                              className="bg-white text-secondary p-4 pb-16 min-h-[14rem] max-h-[16rem] h-56 w-full rounded-[.7rem] border-1 border-secondary-300 border-solid active:border-primary focus:border-primary"
                              {...register('message')} />
                  <div className={"text-secondary-300 absolute bottom-5 left-7 right-0 text-left"}>
                    <span className={""}>
                      <span className={"ml-2"}>{watch('attachment')?.[0]?.name}</span>
                      {watch('attachment')?.length && <img
                        className={"w-auto h-10 rounded-xl mr-auto inline-block align-middle object-cover shadow mx-5 aspect-square"}
                        src={window.URL.createObjectURL(watch('attachment')?.[0])}/>}
                    </span>
                    <label htmlFor="attachmentId"
                           className="align-middle rotate-45 inline-block text-3xl cursor-pointer">
                      <IoAttach/>
                    </label>
                    <input type="file" id="attachmentId" className="hidden w-0 h-0"
                           {...register('attachment')} />
                  </div>
=======
                  <textarea
                    id="productInput"
                    className="bg-white text-secondary p-4 min-h-[14rem] max-h-[16rem] h-56 w-full rounded-[.7rem] border-1 border-secondary-300 border-solid active:border-primary focus:border-primary"
                    {...register("message")}
                  />
                  <label
                    htmlFor="attachmentId"
                    className="text-secondary-300 absolute bottom-7 left-7 rotate-45 text-3xl"
                  >
                    <IoAttach />
                  </label>
                  <input
                    type="file"
                    id="attachmentId"
                    className="opacity-0 w-0 h-0"
                    {...register("attachment")}
                  />
>>>>>>> dedf656295ad8b4db4747e6d111d1bacda952f70
                </div>
              </div>
            </div>
            <Button
              className="btn-primary px-20 py-3 rounded-3xl text-lg"
              type="submit"
            >
              ایجاد تیکت
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Tickets;
