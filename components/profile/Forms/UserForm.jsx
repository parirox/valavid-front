import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker, {DateObject} from "react-multi-date-picker";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import ButtonIcon from "@/components/ButtonIcon";
import RadioButton from "@/components/Form/RadioButton";
import {useEffect} from "react";
import {Controller, useForm} from "react-hook-form";
import {MdEdit} from "react-icons/md";
import {useRouter} from "next/router";
import {isEmpty} from "@/utils/general";
import CitySelect from "@/components/profile/Forms/CitySelect";
import RowInput from "@/components/profile/Forms/RowInput";


const UserForm = () => {
  const router = useRouter()

  const filterOptions = {
    genders: [
      {
        value: 'male',
        label: 'مرد'
      },
      {
        value: 'female',
        label: 'زن'
      }
    ],
  }

  const {register, control, setValue, getValues, handleSubmit, watch, formState: {errors}} = useForm({
    defaultValues: {
      firstname: '',
      lastname: '',
      gender: 'male',
      national_code: '',
      birthday: '',
      major: '',
      birthplace: {
        country: '',
        province: '',
        city: '',
      },
      postal_code: '',
      address: '',
      // second
      username: '',
      password: '',
      password_confirmation: '',
    }
  });
  const onSubmit = data => console.log(data);

  const addSocialSelect = (name) => () => {
    setValue(`${name}.${getValues(name).length}`, {
      name: 'instagram',
      address: ''
    })
  }

  useEffect(() => {
    const sectionSelected = router.asPath.split('#')?.[1];
    if (router.isReady && !isEmpty(sectionSelected)) {
      if (document.querySelector(`.${sectionSelected}`)) {
        document.querySelector(`.${sectionSelected}`).click()
      }
      ;
    }
  }, [router.asPath])


  return (
    <div className="mb-40">
      <div className="text-lg py-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full flex items-center gap-5">
            <span className="flex-initial">اطلاعات هویتی</span>
            <ButtonIcon icon={<MdEdit/>} className="bg-secondary-400 text-2xl h-12 w-12"/>
            <div className="alert alert-danger">اطلاعات وارد شده شما با اطلاعات ثبتی در اسناد مطابق نیست</div>
          </div>
          <div className="w-full text-gray-500 bg-secondary-light rounded-3xl border border-accent p-10 mt-8">
            <RowInput label='نام' required>
              <input type="text" className="input-secondary" {...register('firstname')} />
              {errors.firstname && <span>This field is required</span>}
            </RowInput>
            <RowInput label='نام خانوادگی' required>
              <input type="text" className="input-secondary" {...register('lastname')} />
              {errors.lastname && <span>This field is required</span>}
            </RowInput>
            <RowInput label='جنسیت' required>
              <RadioButton options={filterOptions.genders} defaultValue="male"  {...register("gender")}
                           onChange={(v) => {
                             console.log(v);
                           }}/>
            </RowInput>
            <RowInput label='کد ملی / شماره پاسپورت' required>
              <input type="text" className="input-secondary" {...register('national_code')} />
              {errors.national_code && <span>This field is required</span>}
            </RowInput>

            <RowInput label='تاریخ تولد' required>
              <Controller
                control={control}
                name="birthday"
                // rules={{ required: true }} //optional
                render={({
                           field: {onChange, name, value},
                           fieldState: {error}, //optional
                           formState: {errors}, //optional, but necessary if you want to show an error message
                         }) => (
                  <>
                    <DatePicker
                      value={value || ""}
                      onChange={(date) => {
                        onChange(date?.isValid ? date : "");
                      }}
                      calendar={persian}
                      locale={persian_fa}
                      className="bg-dark"
                      inputClass="input-secondary"
                      maxDate={new DateObject().subtract(1, "days")}

                    />
                    {errors && errors[name] && errors[name].type === "required" && (
                      //if you want to show an error message
                      <span>your error message !</span>
                    )}
                  </>
                )}
              />
            </RowInput>
            <RowInput label='مدرک تحصیلی'>
              <input type="text" className="input-secondary"  {...register('major')} />
              {errors.lastname && <span>This field is required</span>}
            </RowInput>
            <RowInput label='محل تولد' required>
              {/* birthplace */}
              <Controller
                control={control}
                name="birthday"
                // rules={{ required: true }} //optional
                render={({
                           field: {onChange, name, value},
                           fieldState: {error}, //optional
                           formState: {errors}, //optional, but necessary if you want to show an error message
                         }) => (
                  <>
                    <CitySelect value={value} setState={onChange}/>
                    {
                      errors && errors[name] && errors[name].type === "required" && (
                        //if you want to show an error message
                        <span>your error message !</span>
                      )
                    }
                  </>
                )}
              />
            </RowInput>
            <RowInput label='کد پستی'>
              <input type="text" className="input-secondary w-auto input-error" {...register('postal_code')} />
              {errors.lastname && <span>This field is required</span>}
            </RowInput>
            <RowInput label='آدرس'>
              <input type="text" className="input-secondary" {...register('address')} />
              {errors.address && <span>This field is required</span>}
            </RowInput>
          </div>
        </form>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-16">
          <div className="w-full flex items-center gap-5">
            <span className="flex-initial">اطلاعات حساب</span>
            <ButtonIcon icon={<MdEdit/>} className="bg-secondary-400 text-2xl h-12 w-12"/>
          </div>
          <div className="w-full text-gray-500 bg-secondary-light rounded-3xl border border-accent p-10 mt-8">
            <RowInput label='نام کاربری' required>
              <input type="text" className="input-secondary" {...register('username')} />
              {errors.username && <span>This field is required</span>}
            </RowInput>
            <RowInput label='رمز عبور' required>
              <input type="password"
                     className="input-secondary"
                     {...register('password')} />
              {errors.password && <span>This field is required</span>}
            </RowInput>
            <RowInput label='تکرار رمز' required>
              <input
                className="input-secondary"
                {...register('password_confirmation')} type="password"/>
              {errors.password_confirmation && <span>This field is required</span>}
            </RowInput>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserForm;
