import {Fragment, useState} from 'react';
import RowInput from "@/components/profile/Forms/RowInput";
import {Controller, useForm} from "react-hook-form";
import FormSection from "@/components/profile/Forms/FormSection";
import Input from "@/components/profile/Forms/Input";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useUpdateUserInformationMutation} from "@/datasources/user/remote/UserSliceApi";
import {getFormError} from "@/utils/form/messages";
import {isEmpty} from "@/utils/general";
import toast from "@/utils/notification/toast";
import {handleApiError} from "@/datasources/errorHandler";
import SelectWithKey from "@/components/profile/Forms/SelectWithKey";
import Button from "@/components/Button";
import {IoAdd} from "react-icons/io5";
import {dirtyValues} from "@/utils/form/useform";
import classNames from "classnames";


function ContactData({defaultValues}) {
  const [updateUserData] = useUpdateUserInformationMutation();

  const [alertMessage, setAlertMessage] = useState("")
  const [isFormDisable, setFormDisable] = useState(true)

  const formSchema = Yup.object().shape({

  });

  const {control, handleSubmit, trigger, setValue,getValues, reset, formState: {errors, dirtyFields}} = useForm({
    mode: "onSubmit",
    defaultValues,
    resolver: yupResolver(formSchema)
  });

  const addSocialSelect = (name) => () => {
    setValue(`${name}.${getValues(name).length}`, {
      name: 'instagram',
      address: ''
    })
  }
  const onSubmit = async (data) => {
    let isValid = await trigger()
    if (!isValid) {
      setAlertMessage("اطلاعات ورودی خود را بررسی کنید.");
      return;
    }
    // data = dirtyValues(dirtyFields,data)
    // console.log(dirtyFields,getValues(),data)
    if (!isEmpty(data)) {
      updateUserData(data).unwrap().then(_ => {
        toast.success("ثبت شد!")
        resetForm(true)
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
    <FormSection title={"اطلاعات تماس"} isFormDisable={isFormDisable} setFormDisable={setFormDisable}
                 handleSubmit={handleSubmit(onSubmit)}
                 alertMessage={alertMessage}>
      <RowInput label='ایمیل' required>
        <Input name='team.email' control={control} disabled={isFormDisable}/>
      </RowInput>
      <RowInput label='تلفن' required helperText={'(باید به نام صاحب حساب باشد)'}>
        <Input name='team.bank_owner_phone' control={control} disabled={isFormDisable}/>
      </RowInput>
      <RowInput className="pt-8 sm:pt-0" label='شبکه های اجتماعی'>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <Controller
            control={control}
            name="info.socials"
            render={({
                       field: {onChange, name, value},
                       fieldState: {error},
                       formState: {errors},
                     }) => (
              value.map((social, k) => (
                <Fragment key={k}>
                  <SelectWithKey value={social}
                                 disabled={isFormDisable}
                                 setState={(newVal => setValue(`${name}.${k}`, newVal))}/>
                  {error && <span>{error}</span>}
                </Fragment>
              ))
            )}
          />
          <Button disabled={isFormDisable} onClick={addSocialSelect('info.socials')} className={classNames("btn-accent py-4",{"opacity-50":isFormDisable})}><IoAdd/></Button>
        </div>
      </RowInput>
    </FormSection>
  );
}

export default ContactData;