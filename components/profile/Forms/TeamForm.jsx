import "react-multi-date-picker/styles/backgrounds/bg-dark.css";

import Button from "@/components/Button";
import ButtonIcon from "@/components/ButtonIcon";
import {Fragment, useEffect} from "react";
import {Controller, useForm} from "react-hook-form";
import {IoAdd} from "react-icons/io5";
import {MdEdit} from "react-icons/md";
import RowInput from "./RowInput";
import SelectWithKey from "./SelectWithKey";
import FileInput from "@/components/Form/FileInput";
import {useRouter} from "next/router";
import {isEmpty} from "@/utils/general";


const TeamForm = () => {
  const router = useRouter()

  const {register, control, setValue, getValues, handleSubmit, watch, formState: {errors}} = useForm({
    defaultValues: {
      // fifth
      company_name: '',
      company_address: '',
      employees_count: '',
      statute: '',
      newspaper_ads: '',
      // sixth
      company_email: '',
      company_phonenumber: '',
      company_socials: [
        {
          name: 'instagram',
          address: ''
        },
        {
          name: 'youtube',
          address: ''
        },
      ],
      // seventh
      company_idcart_photo: '',
      company_shabanumber: '',
      company_banknumber: '',
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
            <span className="flex-initial">اطلاعات شرکت</span>
            <ButtonIcon icon={<MdEdit/>} className="bg-secondary-400 text-2xl h-12 w-12"/>
          </div>
          <div className="w-full text-gray-500 bg-secondary-light rounded-3xl border border-accent p-10 mt-8">
            <RowInput label='نام شرکت'>
              <input type="text" className="input-secondary" {...register('company_name')} />
              {errors.firstname && <span>This field is required</span>}
            </RowInput>
            <RowInput label='آدرس شرکت'>
              <input type="text" className="input-secondary" {...register('company_address')} />
              {errors.lastname && <span>This field is required</span>}
            </RowInput>
            <RowInput label='تعداد کارمندان'>
              <input type="number" className="input-secondary w-auto"  {...register('employees_count')} />
              {errors.lastname && <span>This field is required</span>}
            </RowInput>
            <RowInput label='اساسنامه' required>
              <FileInput hookFormControl={control} name="statute"/>
            </RowInput>
            <RowInput label='آگهی روزنامه' required>
              <FileInput hookFormControl={control} name="newspaper_ads"/>
            </RowInput>
          </div>
        </form>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-16">
          <div className="w-full flex items-center gap-5">
            <span className="flex-initial">اطلاعات تماس</span>
            <ButtonIcon icon={<MdEdit/>} className="bg-secondary-400 text-2xl h-12 w-12"/>
          </div>
          <div className="w-full text-gray-500 bg-secondary-light rounded-3xl border border-accent p-10 mt-8">
            <RowInput label='ایمیل'>
              <input type="text" className="input-secondary" {...register('company_email')} />
              {errors.firstname && <span>This field is required</span>}
            </RowInput>
            <RowInput label='تلفن'>
              <input type="text" className="input-secondary" {...register('company_phonenumber')} />
              {errors.lastname && <span>This field is required</span>}
            </RowInput>
            <RowInput label='شبکه های اجتماعی'>
              <div className="grid grid-cols-2 gap-10">
                <Controller
                  control={control}
                  name="company_socials"
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
                <Button onClick={addSocialSelect('company_socials')} className="btn-accent py-4"><IoAdd/></Button>
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
              <FileInput hookFormControl={control} name="company_idcart_photo"/>
            </RowInput>
            <RowInput label='شماره شبا' required helperText={'(باید به نام صاحب حساب باشد)'}>
              <input type="text" className="input-secondary w-2/6" {...register('company_shabanumber')} />
              {errors.phonenumber && <span>This field is required</span>}
            </RowInput>
            <RowInput label='شماره حساب' required helperText={'(باید به نام صاحب حساب باشد)'}>
              <input type="text" className="input-secondary w-2/6" {...register('company_banknumber')} />
              {errors.phonenumber && <span>This field is required</span>}
            </RowInput>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TeamForm;
