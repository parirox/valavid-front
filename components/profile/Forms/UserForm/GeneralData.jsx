import {useEffect, useState} from 'react';
import RowInput from "@/components/profile/Forms/RowInput";
import RadioButton from "@/components/Form/RadioButton";
import {Controller, useForm} from "react-hook-form";
import DatePicker, {DateObject} from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import CitySelect from "@/components/profile/Forms/CitySelect";
import FormSection from "@/components/profile/Forms/FormSection";
import Input from "@/components/profile/Forms/Input";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useUpdateUserInformationMutation} from "@/datasources/user/remote/UserSliceApi";
import {dirtyValues} from "@/utils/form/useform";
import {
  form_change_fields_success_message,
  form_fields,
  getFormError,
  getFormSuccessMessage
} from "@/utils/form/messages";
import {isEmpty} from "@/utils/general";
import toast from "@/utils/notification/toast";
import {handleApiError} from "@/datasources/errorHandler";

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

function GeneralData({defaultValues}) {
  const [updateUserData] = useUpdateUserInformationMutation();

  const [alertMessage, setAlertMessage] = useState("")
  const [isFormDisable, setFormDisable] = useState(true)

  const formSchema = Yup.object().shape({
    info: Yup.object().shape({
      gender: Yup.string()
        .required(getFormError({field: 'gender', type: 'choose'})),
      national_code: Yup.string()
        .required(getFormError({field: 'national_code', type: 'required'}))
    })
  });

  const {control, handleSubmit, trigger, getValues, reset, formState: {errors, dirtyFields}} = useForm({
    mode: "onSubmit",
    defaultValues,
    resolver: yupResolver(formSchema)
  });
  const onSubmit = async (data) => {
    let isValid = await trigger()
    if (!isValid) {
      setAlertMessage("اطلاعات ورودی خود را بررسی کنید.");
      return;
    }
    // let data = dirtyValues(dirtyFields,getValues())
    if (!isEmpty(data)) {
      updateUserData(data).unwrap().then(_ => {
        toast.success("ثبت شد!")
        resetForm()
      }).catch(e => {
        handleApiError({first_name: e.first_name, last_name: e.last_name, info: e.info})
        setAlertMessage(e.message)
      })
    }
  };

  const resetForm = () => {
    setFormDisable(true)
    setAlertMessage("")
    reset(defaultValues)
  }

  return (
    <FormSection title={"اطلاعات هویتی"} isFormDisable={isFormDisable} setFormDisable={setFormDisable}
                 handleSubmit={handleSubmit(onSubmit)}
                 alertMessage={alertMessage}>
      <RowInput label='نام' required>
        <Input name='first_name' control={control} disabled={isFormDisable}/>
      </RowInput>
      <RowInput label='نام خانوادگی' required>
        <Input name='last_name' control={control} disabled={isFormDisable}/>
      </RowInput>
      <RowInput label='جنسیت' required error={errors.genders?.message}>
        <RadioButton name="info.gender" control={control} disabled={isFormDisable} options={filterOptions.genders}
                     defaultValue="male"/>
      </RowInput>
      <RowInput label='کد ملی' required>
        <Input name='info.national_code' control={control} disabled={isFormDisable}/>
      </RowInput>
      <RowInput label='شماره پاسپورت' required>
        <Input name='info.passport_number' control={control} disabled={isFormDisable}/>
      </RowInput>
      <RowInput label='تاریخ تولد' required error={errors[name]}>
        <Controller
          control={control}
          name="info.birthdate"
          render={({
                     field: {onChange, name, value},
                     fieldState: {error},
                   }) => (
            <>
              <DatePicker
                value={(new DateObject(value)).convert(persian, persian_fa).format("YYYY-MM-DD") || ""}
                disabled={isFormDisable}
                onChange={(date) => {
                  const gregorian_date = date?.isValid ? (new DateObject(date)).convert(gregorian, gregorian_en).format("YYYY-MM-DD") : ""
                  onChange(gregorian_date);
                }}
                format={"YYYY-MM-DD"}
                calendar={persian}
                locale={persian_fa}
                className="bg-dark"
                inputClass={`input-secondary ${errors[name] && 'input-error'}`}
                maxDate={new DateObject().subtract(1, "days")}
              />
              {error && (<span className="text-gray px-3 mt-3 block">{error.message}</span>)}
            </>
          )}
        />
      </RowInput>
      <RowInput label='مدرک تحصیلی'>
        <Input name='info.major' control={control} disabled={isFormDisable}/>
      </RowInput>
      <RowInput label='محل تولد' required>
        <Controller
          control={control}
          name="info.location"
          render={({
                     field: {onChange, name, value},
                     fieldState: {error},
                   }) => (
            <>
              <CitySelect disabled={isFormDisable} value={value} setState={onChange}/>
              {error && (<span className="text-gray px-3 mt-3 block">{error.message}</span>)}
            </>
          )}
        />
      </RowInput>
      <RowInput label='کد پستی'>
        <Input name='info.zip_code' className={"w-auto"} control={control} disabled={isFormDisable}/>
      </RowInput>
      <RowInput label='آدرس'>
        <Input name='info.address' control={control} disabled={isFormDisable}/>
      </RowInput>
    </FormSection>
  );
}

export default GeneralData;