import { useState } from "react";
import RowInput from "@/components/profile/Forms/RowInput";
import { useForm } from "react-hook-form";
import FormSection from "@/components/profile/Forms/FormSection";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/profile/Forms/Input";
import toast from "@/utils/notification/toast";
import {
  useChangePasswordMutation,
  useUpdateUserInformationMutation,
  useUploadMediaMutation,
} from "@/datasources/user/remote/UserSliceApi";
import FileInput from "@/components/Form/FileInput";
import { dirtyValues, jsonToFormData } from "@/utils/form/useform";
import { handleApiError } from "@/datasources/errorHandler";
import { isEmpty } from "@/utils/general";
import {
  form_change_fields_success_message,
  form_fields,
  getFormError,
  getFormSuccessMessage,
} from "@/utils/form/messages";
import _toast from "@/utils/notification/toast";
import Spinner from "@/components/Spinner";

function DocsUpload({ defaultValues }) {
  const [fetchUpdateUser] = useUpdateUserInformationMutation();
  const [uploadMedia] = useUploadMediaMutation();

  const [alertMessage, setAlertMessage] = useState("");
  const [isFormDisable, setFormDisable] = useState(true);
  const [uploadUrl, setUploadUrl] = useState(null);
  const [uploadMedaiLoading, setUploadMediaLodaing] = useState(false);

  const formSchemaMedia = Yup.object().shape({});
  const {
    control,
    getValues,
    trigger,
    reset,
    handleSubmit,
    formState: { dirtyFields },
  } = useForm({
    defaultValues,
    resolver: yupResolver(formSchemaMedia),
  });

  const onSubmit = async (data) => {
    let isValid = await trigger();
    if (!isValid) {
      setAlertMessage("اطلاعات ورودی خود را بررسی کنید.");
      return;
    }
    if (uploadUrl) {
      data.seller.national_card = uploadUrl;
    }
    data = dirtyValues(dirtyFields, data);
    if (!isEmpty(data)) {
      fetchUpdateUser(data)
        .unwrap()
        .then((_) => {
          const res_msg = getFormSuccessMessage(data);
          toast.success(res_msg);
          resetForm();
          setUploadUrl(null);
        })
        .catch((e) => {
          // handleApiError(e);
          setAlertMessage(e.message);
          setUploadUrl(null);
        });
    }
  };

  const resetForm = () => {
    setFormDisable(true);
    setAlertMessage("");
    reset(defaultValues);
  };

  const handleUploadMedia = (files) => {
    const formData = jsonToFormData({ files });
    setUploadMediaLodaing(true);
    uploadMedia(formData)
      .unwrap()
      .then((res) => {
        if (res.result) {
          setUploadMediaLodaing(false);
          setUploadUrl(res.data[0].path);
          _toast.success("تصویر با موفقیت بارگزاری شد.");
        }
      })
      .catch((err) => {
        setUploadMediaLodaing(false);
        handleApiError(err);
      });
  };

  return (
    <FormSection
      title={"بارگزاری مدارک"}
      isFormDisable={isFormDisable}
      setFormDisable={setFormDisable}
      handleSubmit={handleSubmit(onSubmit)}
      alertMessage={alertMessage}
      reset={resetForm}>
      <RowInput label="تصویر کارت ملی /پاسپورت" required>
        <FileInput
          name="seller.national_card"
          disabled={isFormDisable || !!defaultValues.seller.national_card}
          hookFormControl={control}
          textButton={uploadMedaiLoading ? <Spinner /> : null}
          handleChange={(file) => {
            handleUploadMedia(file);
          }}
        />
      </RowInput>
      <RowInput
        label="شماره شبا"
        required
        helperText={"(باید به نام صاحب حساب باشد)"}>
        <Input
          name="seller.bank_shaba"
          className={"w-1/3"}
          control={control}
          disabled={isFormDisable || !!defaultValues.seller.bank_shaba}
        />
      </RowInput>
      <RowInput
        label="شماره حساب"
        required
        helperText={"(باید به نام صاحب حساب باشد)"}>
        <Input
          name="seller.bank_account"
          className={"w-1/3"}
          control={control}
          disabled={isFormDisable || !!defaultValues.seller.bank_account}
        />
      </RowInput>
    </FormSection>
  );
}

export default DocsUpload;
