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


function DocsUpload({defaultValues}) {
  const [fetchUpdateUser] = useUpdateUserInformationMutation();

  const [alertMessage, setAlertMessage] = useState("")
  const [isFormDisable, setFormDisable] = useState(true)

  const formSchemaMedia = Yup.object().shape({});
  const {
    control,
    getValues,
    trigger,
    reset,
    handleSubmit,
    formState: {dirtyFields}
  } = useForm({
    defaultValues,
    resolver: yupResolver(formSchemaMedia)
  });

  const onSubmit = async (data) => {
    let isValid = await trigger()
    if (!isValid) {
      setAlertMessage("اطلاعات ورودی خود را بررسی کنید.");
      return;
    }

    data = dirtyValues(dirtyFields,data)
    if (!isEmpty(data)) {
      const formData = jsonToFormData(data)
      fetchUpdateUser(formData).unwrap().then(_ => {
        const res_msg = getFormSuccessMessage(data)
        toast.success(res_msg)
        resetForm()
      }).catch(e => {
        handleApiError(e)
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
    <FormSection title={"بارگزاری مدارک"} isFormDisable={isFormDisable}
                 setFormDisable={setFormDisable}
                 handleSubmit={handleSubmit(onSubmit)}
                 alertMessage={alertMessage}
                 reset={resetForm}>
      <RowInput label='تصویر کارت ملی /پاسپورت' required>
        <FileInput name="seller.national_card" disabled={isFormDisable} hookFormControl={control}/>
      </RowInput>
      <RowInput label='شماره شبا' required helperText={'(باید به نام صاحب حساب باشد)'}>
        <Input name='seller.bank_shaba' className={"w-1/3"} control={control} disabled={isFormDisable}/>
      </RowInput>
      <RowInput label='شماره حساب' required helperText={'(باید به نام صاحب حساب باشد)'}>
        <Input name='seller.bank_account' className={"w-1/3"} control={control} disabled={isFormDisable}/>
      </RowInput>
    </FormSection>
  );
}

export default DocsUpload;