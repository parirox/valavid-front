import "react-multi-date-picker/styles/backgrounds/bg-dark.css";

import Button from "@/components/Button";
import ButtonIcon from "@/components/ButtonIcon";
import {Fragment, useEffect} from "react";
import {Controller, useForm} from "react-hook-form";
import {IoAdd} from "react-icons/io5";
import {MdEdit} from "react-icons/md";
import RowInput from "@/components/profile/Forms/RowInput";
import FileInput from "@/components/Form/FileInput";
import {useRouter} from "next/router";
import {isEmpty} from "@/utils/general";
import SelectWithKey from "@/components/profile/Forms/SelectWithKey";


const SellerForm = () => {
  const router = useRouter()

  const {register, control, setValue, getValues, handleSubmit, watch, formState: {errors}} = useForm({
    defaultValues: {
      // third
      email: '',
      phonenumber: '',
      socials: [
        {
          name: 'instagram',
          address: ''
        },
        {
          name: 'youtube',
          address: ''
        },
      ],
      // forth
      idcart_photo: '',
      shabanumber: '',
      banknumber: '',
    }
  });
  const onSubmit = data => console.log(data);

  const addSocialSelect = (name) => () => {
    setValue(`${name}.${getValues(name).length}`, {
      name: 'instagram',
      address: ''
    })
  }

  return (
    <div className="mb-40">
      <div className="text-lg py-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full flex items-center gap-5">
            <span className="flex-initial">اطلاعات تماس</span>
            <ButtonIcon icon={<MdEdit/>} className="bg-secondary-400 text-2xl h-12 w-12"/>
          </div>
          <div className="w-full text-gray-500 bg-secondary-light rounded-3xl border border-accent p-10 mt-8">
            <RowInput label='ایمیل' required>
              <input type="email"
                     disabled
                     className="input-secondary w-2/6"
                     {...register('email')} />
              {errors.email && <span>This field is required</span>}
            </RowInput>
            <RowInput label='شماره موبایل' required helperText={'(باید به نام صاحب حساب باشد)'}>
              <input
                type="text"
                className="input-secondary w-2/6"
                disabled
                {...register('phonenumber')} />
              {errors.phonenumber && <span>This field is required</span>}
            </RowInput>
            <RowInput label='شبکه های اجتماعی'>
              <div className="grid grid-cols-2 gap-10">
                <Controller
                  control={control}
                  name="socials"
                  // rules={{ required: true }} //optional
                  render={({
                             field: {onChange, name, value},
                             fieldState: {error}, //optional
                             formState: {errors}, //optional, but necessary if you want to show an error message
                           }) => (
                    value.map((social, k) => (
                      <Fragment key={k}>
                        <SelectWithKey value={social} index={k}
                                       setState={(newVal => setValue(`${name}.${k}`, newVal))}/>
                        {
                          errors && errors[name] && errors[name].type === "required" && (
                            //if you want to show an error message
                            <span>your error message !</span>
                          )
                        }
                      </Fragment>
                    ))
                  )}
                />
                <Button onClick={addSocialSelect('socials')} className="btn-accent py-4"><IoAdd/></Button>
              </div>
            </RowInput>
          </div>
        </form>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-16">
          <div className="w-full flex items-center gap-5">
            <span className="flex-initial">بارگزاری مدارک</span>
            <ButtonIcon icon={<MdEdit/>} className="bg-secondary-400 text-2xl h-12 w-12"/>
          </div>
          <div className="w-full text-gray-500 bg-secondary-light rounded-3xl border border-accent p-10 mt-8">
            <RowInput label='تصویر کارت ملی /پاسپورت' required>
              <FileInput hookFormControl={control} name="idcart_photo"/>
            </RowInput>
            <RowInput label='شماره شبا' required helperText={'(باید به نام صاحب حساب باشد)'}>
              <input type="text" className="input-secondary w-2/6" {...register('shabanumber')} />
              {errors.phonenumber && <span>This field is required</span>}
            </RowInput>
            <RowInput label='شماره حساب' required helperText={'(باید به نام صاحب حساب باشد)'}>
              <input type="text" className="input-secondary w-2/6" {...register('banknumber')} />
              {errors.phonenumber && <span>This field is required</span>}
            </RowInput>

          </div>
        </form>
      </div>
    </div>
  );
}

export default SellerForm;
