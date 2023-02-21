import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { useEffect } from "react";
import { IoClose, IoTrash } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { isEmpty } from "@/utils/general";
import { useEditAccountProductMutation } from "@/datasources/product/remote/ProductSliceApi";
import _toast from "@/utils/notification/toast";

export default function EditCardName({
  show,
  showHandler,
  id,
  title,
  ...rest
}) {
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [editAccountProduct, { data, isSuccess }] =
    useEditAccountProductMutation();

  const onSubmit = (data) => {
    console.log(data, id);
    if (isEmpty(data.title)) {
      _toast.error("لطفا نام محصول را وارد کنید.");
    } else {
      editAccountProduct([{ id }, data]);
    }
  };

  //->> initialize the default form value
  useEffect(() => {
    reset({
      title: title,
    });
  }, [show]);

  return (
    <Modal small isOpen={show} setIsOpen={(state) => showHandler(state)}>
      {id}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-full flex flex-col gap-8 rounded-3xl text-center p-10"
      >
        <div className="flex justify-between mb-5">
          <span className="text-secondary-300 text-xl">ویرایش نام محصول</span>
          <span
            className="text-accent text-2xl cursor-pointer"
            onClick={() => showHandler(false)}
          >
            <IoClose />
          </span>
        </div>
        <div className="flex gap-14">
          <div className="relative w-full basis-4/6">
            <input
              {...register("title", { required: true })}
              type="text"
              className={`block full pb-2.5 border border-accent pr-4 rounded-3xl placeholder:text-accent text-accent border-gray-300 appearance-none peer ${
                errors.title && "input-error"
              }`}
              placeholder="نام محصول را وارد کنید"
              defaultValue={"title"}
            />
            <label className="absolute top-0 right-8 -translate-y-1/2 bg-white text-accent px-3 duration-200 transition-transform peer-placeholder-shown:opacity-0 peer-placeholder-shown:translate-y-1/2">
              نام محصول
            </label>
          </div>
          <div className="basis-2/6">
            <div className="flex gap-5">
              <Button
                className={
                  "btn-accent flex-auto rounded-3xl px-10 py-6 text-xl"
                }
                type={"submit"}
              >
                ویرایش
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
}
