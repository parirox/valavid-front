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


function DocsUpload({defaultValues,defaultMediaValues, defaultAccountValues}) {
  const [fetchUpdateUserData] = useUpdateUserInformationMutation();
  const [fetchChangePassword] = useChangePasswordMutation();

  const [alertMessage, setAlertMessage] = useState("")
  const [isFormDisable, setFormDisable] = useState(true)

  const formSchemaMedia = Yup.object().shape({});
  const {
    control: controlMedia,
    getValues: getValuesMedia,
    trigger: triggerMedia,
    reset: resetMedia,
    formState: {dirtyFields: dirtyFieldsMedia}
  } = useForm({
    defaultValues,
    resolver: yupResolver(formSchemaMedia)
  });

  const formSchemaAccount = Yup.object().shape({
    password: Yup.string(),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], getFormError({field: 'password_confirmation', type: 'required'}))
  });

  const {
    control: controlAccount,
    getValues: getValuesAccount,
    trigger: triggerAccount,
    reset: resetAccount,
    formState: {dirtyFields: dirtyFieldsAccount}
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      company_idcart_photo: '',
      company_shabanumber: '',
      company_banknumber: '',
    },
    resolver: yupResolver(formSchemaAccount)
  });


  const handleMedia = () => new Promise((resolve, reject) => {
    // get only dirty values from form
    let data = dirtyValues(dirtyFieldsMedia, getValuesMedia())
    if (!isEmpty(data)) {
      const formData = jsonToFormData(data)
      fetchUpdateUserData(formData).unwrap().then(_ => {
        const res_msg = getFormSuccessMessage(data)
        toast.success(res_msg)
        resolve()
      }).catch(e => {
        handleApiError(e)
        setAlertMessage(e.message)
        reject()
      })
    } else resolve()
  })

  const handleAccount = () => new Promise((resolve, reject) => {
    // get only dirty values from form
    let data = dirtyValues(dirtyFieldsAccount, getValuesAccount())
    if (!isEmpty(data)) {
      fetchChangePassword(data).unwrap().then(_ => {
        toast.success(form_fields.password.concat(form_change_fields_success_message))
        resolve()
      }).catch(e => {
        handleApiError(e)
        setAlertMessage(e.message)
        reject()
      })
    } else resolve()
  })
  const onSubmit = async () => {
    let isValidMedia = await triggerMedia()
    let isValidAccount = await triggerAccount()
    if (!isValidMedia || !isValidAccount) {
      setAlertMessage("اطلاعات ورودی خود را بررسی کنید.");
      return;
    }

    Promise.all([handleAccount(), handleMedia()]).then((res) => {
      reset()
    })
  };

  const reset = () => {
    setFormDisable(true)
    setAlertMessage("")
    resetMedia(defaultMediaValues)
    resetAccount(defaultAccountValues)
  }

  return (
    <FormSection title={"بارگزاری مدارک"} isFormDisable={isFormDisable}
                 setFormDisable={setFormDisable}
                 handleSubmit={onSubmit}
                 alertMessage={alertMessage}
                 reset={reset}>
      <RowInput label='تصویر کارت ملی /پاسپورت' required>
        <FileInput name="company_idcart_photo" disabled={isFormDisable} hookFormControl={controlMedia}/>
      </RowInput>
      <RowInput label='شماره شبا' required helperText={'(باید به نام صاحب حساب باشد)'}>
        <Input name='company_shabanumber' className={"w-1/3"} type="password" control={controlAccount} disabled={isFormDisable}/>
      </RowInput>
      <RowInput label='شماره حساب' required helperText={'(باید به نام صاحب حساب باشد)'}>
        <Input name='company_banknumber' className={"w-1/3"} type="password" control={controlAccount} disabled={isFormDisable}/>
      </RowInput>
    </FormSection>
  );
}

export default DocsUpload;