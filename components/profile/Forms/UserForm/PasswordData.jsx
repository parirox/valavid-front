import {useState} from 'react';
import RowInput from "@/components/profile/Forms/RowInput";
import {useForm} from "react-hook-form";
import FormSection from "@/components/profile/Forms/FormSection";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import Input from "@/components/profile/Forms/Input";
import toast from "@/utils/notification/toast";
import {useChangePasswordMutation, useUpdateUserInformationMutation} from "@/datasources/user/remote/UserSliceApi";
import FileInput from "@/components/Form/FileInput";
import {dirtyValues, jsonToFormData} from "@/utils/form/useform";
import {handleApiError} from "@/datasources/errorHandler";
import {isEmpty} from "@/utils/general";
import {
  form_change_fields_success_message,
  form_fields,
  getFormError,
  getFormSuccessMessage
} from "@/utils/form/messages";


function PasswordData() {
  const [fetchChangePassword] = useChangePasswordMutation();

  const [alertMessage, setAlertMessage] = useState("")
  const [isFormDisable, setFormDisable] = useState(true)

  const formSchemaPassword = Yup.object().shape({
    password: Yup.string(),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], getFormError({field: 'password_confirmation', type: 'required'}))
  });

  const {
    handleSubmit,
    control: controlPassword,
    getValues: getValuesPassword,
    trigger: triggerPassword,
    reset: resetPassword,
    formState: {dirtyFields: dirtyFieldsPassword}
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      old_password: '',
      password: '',
      password_confirmation: '',
    },
    resolver: yupResolver(formSchemaPassword)
  });

  const handlePassword = () => new Promise((resolve, reject) => {
    // get only dirty values from form
    let data = dirtyValues(dirtyFieldsPassword, getValuesPassword())
    if (!isEmpty(data)) {
      fetchChangePassword(data).unwrap().then(_ => {
        toast.success(form_fields.password.concat(form_change_fields_success_message))
        resolve()
      }).catch(e => {
        setAlertMessage(e.data.message)
        reject()
      })
    } else resolve()
  })

  const onSubmit = async () => {
    let isValidPassword = await triggerPassword()
    if (!isValidPassword) {
      setAlertMessage("اطلاعات ورودی خود را بررسی کنید.");
      return;
    }
    handlePassword().then((res) => {
      resetForm()
    })
  };

  const resetForm = () => {
    setFormDisable(true)
    setAlertMessage("")
    resetPassword()
  }

  return (
    <FormSection title={"تغییر رمز عبور"} isFormDisable={isFormDisable}
                 setFormDisable={setFormDisable}
                 handleSubmit={handleSubmit(onSubmit)}
                 alertMessage={alertMessage}>
      <RowInput label='رمز عبور فعلی' required>
        <Input name='old_password' type="password" control={controlPassword} disabled={isFormDisable}/>
      </RowInput>
      <RowInput label='رمز عبور جدید' required>
        <Input name='password' type="password" control={controlPassword} disabled={isFormDisable}/>
      </RowInput>
      <RowInput label='تکرار رمز جدید' required>
        <Input name='password_confirmation' type="password" control={controlPassword} disabled={isFormDisable}/>
      </RowInput>
    </FormSection>
  );
}

export default PasswordData;