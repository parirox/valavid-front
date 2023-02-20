import Button from "@/components/Button";
import SingleCheckBox from "@/components/Form/SingleCheckBox";
import Modal from "@/components/Modal";
import { useEffect } from "react";
import { IoClose, IoTrash } from "react-icons/io5";
import ButtonIcon from "@/components/ButtonIcon";
import { Controller, useForm } from "react-hook-form";
import {
  useAddCollectionMutation,
  useEditCollectionMutation,
  useRemoveCollectionMutation,
} from "@/datasources/user/remote/UserSliceApi";
import toast from "@/utils/notification/toast";
import { isEmpty } from "@/utils/general";

export default function ManageCollectionDialog({ show, showHandler, ...rest }) {
  const [
    fetchAdd,
    {
      data: addData,
      isSuccess: addIsSuccess,
      error: addError,
      isError: addIsError,
      isLoading: addIsLoading,
    },
  ] = useAddCollectionMutation();
  const [
    fetchEdit,
    {
      data: editData,
      isSuccess: editIsSuccess,
      error: editError,
      isError: editIsError,
      isLoading: editIsLoading,
    },
  ] = useEditCollectionMutation();
  const [
    fetchRemove,
    {
      data: removeData,
      isSuccess: removeIsSuccess,
      error: removeError,
      isError: removeIsError,
      isLoading: removeIsLoading,
    },
  ] = useRemoveCollectionMutation();
  const { id, is_published, title } = rest;

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (isEmpty(id)) {
      //->> on edit
      fetchAdd(data)
        .unwrap()
        .then((data) => {
          successResult("مجموعه جدید با موفقیت ایجاد شد!");
        })
        .catch((err) => {
          toast.error(err);
        });
    } else {
      //->> on create a new
      fetchEdit([{ id }, data])
        .unwrap()
        .then((data) => {
          successResult("ویرایش مجموعه با موفقیت انجام شد!");
        })
        .catch((err) => {
          toast.error(err);
        });
    }
  };

  const removeCollectionHandler = () => {
    fetchRemove({ id })
      .unwrap()
      .then((data) => {
        successResult("حذف مجموعه با موفقیت انجام شد!");
      })
      .catch((err) => {
        toast.error(err);
      });
  };
  const successResult = (message) => {
    toast.success(message);
    showHandler(false);
  };

  //->> initialize the default form value
  useEffect(() => {
    reset({
      title: title,
      is_public: is_published,
    });
  }, [show]);

  return (
    <Modal
      customHeight="w-full md:w-8/12 xl:w-6/12"
      isOpen={show}
      setIsOpen={(state) => showHandler(state)}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-full flex flex-col gap-8 rounded-3xl text-center p-10"
      >
        <div className="flex justify-between mb-5">
          <span className="text-secondary-300 text-xl">ویرایش مجموعه</span>
          <span
            className="text-accent text-2xl cursor-pointer"
            onClick={() => showHandler(false)}
          >
            <IoClose />
          </span>
        </div>
        <div className="flex-col sm:flex-row flex gap-4">
          <div className="relative w-full basis-4/6">
            <input
              {...register("title", { required: true })}
              type="text"
              className={`min-h-[60px] block full pb-2.5 border border-accent pr-4 rounded-3xl placeholder:text-accent text-accent border-gray-300 appearance-none peer ${
                errors.title && "input-error"
              }`}
              placeholder="نام مجموعه را وارد کنید"
            />
            <label className="absolute top-0 right-8 -translate-y-1/2 bg-white text-accent px-3 duration-200 transition-transform peer-placeholder-shown:opacity-0 peer-placeholder-shown:translate-y-1/2">
              نام مجموعه
            </label>
          </div>
          <div className="basis-2/6">
            <div className="flex gap-5">
              {id ? (
                <>
                  <Button
                    className={
                      "btn-accent flex-auto rounded-3xl px-10 py-6 text-xl"
                    }
                    type={"submit"}
                  >
                    ویرایش
                  </Button>
                  <ButtonIcon
                    className={
                      "bg-gray h-20 w-20 flex-initial rounded-3xl text-3xl"
                    }
                    onClick={removeCollectionHandler}
                    icon={<IoTrash />}
                  />
                </>
              ) : (
                <Button
                  className={"btn-accent w-full rounded-3xl px-10 py-6 text-xl"}
                  type={"submit"}
                >
                  ایجاد مجموعه
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-5 mb-5">
          <div className="relative w-full basis-4/6">
            <Controller
              control={control}
              name="is_public"
              render={({
                field: { onChange, name, value },
                fieldState: { error }, //optional
                formState: { errors }, //optional, but necessary if you want to show an error message
              }) => {
                return (
                  <>
                    <SingleCheckBox
                      label="انتشار عمومی"
                      selected={value}
                      selectHandler={onChange}
                    />
                  </>
                );
              }}
            />
          </div>
        </div>
      </form>
    </Modal>
  );
}
