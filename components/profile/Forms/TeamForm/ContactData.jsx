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
    // let data = dirtyValues(dirtyFields,getValues())
    if (!isEmpty(data)) {
      updateUserData(data).unwrap().then(_ => {
        toast.success("ثبت شد!")
        setFormDisable(true)
      }).catch(e => {
        handleApiError({first_name: e.first_name, last_name: e.last_name, info: e.info})
        setAlertMessage(e.message)
      })
    }
  };

  const formReset = () => {
    setFormDisable(true)
    setAlertMessage("")
    reset(defaultValues)
  }

  return (
    <FormSection title={"اطلاعات تماس"} isFormDisable={isFormDisable} setFormDisable={setFormDisable}
                 handleSubmit={handleSubmit(onSubmit)}
                 reset={formReset} alertMessage={alertMessage}>
      <RowInput label='ایمیل' required>
        <Input name='company_email' control={control} disabled={isFormDisable}/>
      </RowInput>
      <RowInput label='شماره موبایل' required helperText={'(باید به نام صاحب حساب باشد)'}>
        <Input name='company_phonenumber' control={control} disabled={isFormDisable}/>
      </RowInput>
      <RowInput label='شبکه های اجتماعی'>
        <div className="grid grid-cols-2 gap-10">
          <Controller
            control={control}
            name="company_socials"
            // rules={{ required: true }}
            render={({
                       field: {onChange, name, value},
                       fieldState: {error},
                       formState: {errors},
                     }) => (
              value.map((social, k) => (
                <Fragment key={k}>
                  <SelectWithKey value={social} index={k}
                                 setState={(newVal => setValue(`${name}.${k}`, newVal))}/>
                  {error && <span>{error}</span>}
                </Fragment>
              ))
            )}
          />
          <Button onClick={addSocialSelect('socials')} className="btn-accent py-4"><IoAdd/></Button>
        </div>
      </RowInput>
    </FormSection>
  );
}

export default ContactData;