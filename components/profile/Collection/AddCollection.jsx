import Button from "@/components/Button";
import SingleCheckBox from "@/components/Form/SingleCheckBox";
import Modal from "@/components/Modal";
import {IoClose} from "react-icons/io5";
import {Controller, useForm} from "react-hook-form";
import {useAddCollectionMutation} from "@/datasources/user/remote/UserSliceApi";
import {useEffect} from "react";
import toast from "@/utils/notification/toast";

export default function AddCollection({show, showHandler}) {
    const [fetchAdd, {
        data: addData,
        isSuccess: addIsSuccess,
        error: addError,
        isError: addIsError,
        isLoading: addIsLoading
    }] = useAddCollectionMutation()
    const {register, control, reset, handleSubmit, formState: {errors}} = useForm()
    const onSubmit = (data) => fetchAdd(data)

    //->> edit notify
    useEffect(() => {
        // on add item
        if (addIsSuccess) {
            toast.success("ویرایش مجموعه با موفقیت انجام شد!")
            showHandler(false)
        }
        if (addIsError) toast.error(addError)
    }, [addIsSuccess, addIsError])

    return (
        <Modal small isOpen={show} setIsOpen={(state) => showHandler(state)}>
            <form onSubmit={handleSubmit(onSubmit)}
                  className="bg-white w-full flex flex-col gap-8 rounded-3xl text-center p-10">
                <div className="flex justify-between mb-5">
                    <span className="text-secondary-300 text-xl">افزودن به مجموعه ها</span>
                    <span className="text-accent text-2xl cursor-pointer"
                          onClick={() => showHandler(false)}><IoClose/></span>
                </div>
                <div className="flex gap-14">
                    <div className="relative w-full basis-4/6">
                        <input {...register('title', {required: true})} type="text"
                               className={`block full pb-2.5 border border-accent pr-4 rounded-3xl placeholder:text-accent text-accent border-gray-300 appearance-none peer ${errors.title && 'input-error'}`}
                               placeholder="نام مجموعه را وارد کنید"/>
                        <label
                            className="absolute top-0 right-8 -translate-y-1/2 bg-white text-accent px-3 duration-200 transition-transform peer-placeholder-shown:opacity-0 peer-placeholder-shown:translate-y-1/2">نام
                            مجموعه</label>
                    </div>
                    <div className="basis-2/6">
                        <Button className={"btn-accent w-full rounded-3xl px-10 py-6 text-xl"}
                                type={"submit"}>ایجاد مجموعه</Button>
                    </div>
                </div>
                <div className="flex gap-5 mb-5">
                    <div className="relative w-full basis-4/6">
                        <Controller
                            control={control}
                            name="is_public"
                            render={({
                                         field: {onChange, name, value},
                                         fieldState: {error}, //optional
                                         formState: {errors}, //optional, but necessary if you want to show an error message
                                     }) => {
                                return <>
                                    <SingleCheckBox label='انتشار عمومی' selected={value} selectHandler={onChange}/>
                                </>
                            }
                            }
                        />
                    </div>
                </div>
            </form>
        </Modal>
    )
}