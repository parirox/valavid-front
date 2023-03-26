import {useState} from 'react';
import RowInput from "@/components/profile/Forms/RowInput";
import {useForm} from "react-hook-form";
import FormSection from "@/components/profile/Forms/FormSection";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import Input from "@/components/profile/Forms/Input";
import toast from "@/utils/notification/toast";
import {useUpdateUserInformationMutation} from "@/datasources/user/remote/UserSliceApi";
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


function AccountData({defaultMediaValues, defaultAccountValues,defaultSloganValues}) {
  const [fetchUpdateUserData] = useUpdateUserInformationMutation();

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
    defaultValues: {
      ...defaultMediaValues
    },
    resolver: yupResolver(formSchemaMedia)
  });

  const formSchemaAccount = Yup.object().shape({
    password: Yup.string(),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], getFormError({field: 'password_confirmation', type: 'required'}))
  });

  const {
    handleSubmit,
    control: controlAccount,
    getValues: getValuesAccount,
    trigger: triggerAccount,
    reset: resetAccount,
    formState: {dirtyFields: dirtyFieldsAccount}
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      username: '',
      ...defaultAccountValues
    },
    resolver: yupResolver(formSchemaAccount)
  });

  const {
    control: controlSlogan,
    getValues: getValuesSlogan,
    trigger: triggerSlogan,
    reset: resetSlogan,
    formState: {dirtyFields: dirtyFieldsSlogan}
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      ...defaultSloganValues
    },
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

  const handleSlogan = () => new Promise((resolve, reject) => {
    // get only dirty values from form
    let data = dirtyValues(dirtyFieldsSlogan, getValuesSlogan())
    if (!isEmpty(data)) {
      fetchUpdateUserData(data).unwrap().then(_ => {
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
  const onSubmit = async () => {
    let isValidMedia = await triggerMedia()
    let isValidAccount = await triggerAccount()
    if (!isValidMedia || !isValidAccount) {
      setAlertMessage("اطلاعات ورودی خود را بررسی کنید.");
      return;
    }

    Promise.all([handleSlogan(), handleMedia()]).then((res) => {
      resetForm()
    })
  };

  const resetForm = () => {
    setFormDisable(true)
    setAlertMessage("")
    resetMedia(defaultMediaValues)
    resetAccount(defaultSloganValues)
  }

  return (
    <FormSection title={"اطلاعات حساب"} isFormDisable={isFormDisable}
                 setFormDisable={setFormDisable}
                 handleSubmit={handleSubmit(onSubmit)}
                 alertMessage={alertMessage}>
      <RowInput label='نام کاربری'>
        <Input name='username' control={controlAccount} disabled/>
      </RowInput>
      <RowInput label='شعار من'>
        <Input name='info.user_slogan' disabled={isFormDisable} control={controlSlogan}/>
      </RowInput>
      <RowInput label='تصویر پروفایل' required>
        <FileInput name="avatar" disabled={isFormDisable} hookFormControl={controlMedia}/>
      </RowInput>
      <RowInput label='تصویر بک گراند' required>
        <FileInput name="background_image" disabled={isFormDisable} hookFormControl={controlMedia}/>
      </RowInput>
    </FormSection>
  );
}

export default AccountData;