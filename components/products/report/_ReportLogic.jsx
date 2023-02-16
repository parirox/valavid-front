import React, {useState} from 'react';
import {useReportMutation} from "@/datasources/product/remote/ProductSliceApi";
import toast from "@/utils/notification/toast";
import {isEmpty} from "@/utils/general";
import * as Yup from "yup";
import {getFormError} from "@/utils/form/messages";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {getErrorMessage} from "@/utils/errors/errorsMessages";

const reportOptions = {
  'violation_of_copyright': 'نقض حقوق مولف',
  'inappropriate_content': 'محتوای نامناسب',
  'incorrect_information': 'اطلاعات نادرست',
  'other': 'سایر'
}
const _ReportLogic = ({product, close, children}) => {
  const formSchema = Yup.object().shape({
    report_type: Yup.string()
      .oneOf(Object.keys(reportOptions), getFormError({field: 'report_type', type: 'choose'})),
    reporter_description: Yup.string()
      .required(getFormError({field: 'description', type: 'required'}))
  });

  const {control, trigger, getValues, setValue, reset, formState: {errors}} = useForm({
    mode: "onSubmit",
    defaultValues: {
      product: product,
      report_type: '',
      reporter_description: '',
    },
    resolver: yupResolver(formSchema)
  });

  const [report, rtk] = useReportMutation()

  async function submit() {
    let isValid = await trigger()
    if (!isValid) {
      toast.error('اطلاعات ورودی خورد را بررسی نمایید.');
      return;
    }
    const body = {
      product: product,
      ...getValues()
    }

    report(body).then((res) => {
      toast.success("گزارش شما با موفقیت ارسال شد!")
      reset()
      close()
    }).catch((err) => {
      toast.error("لطفا دوباره سعی نمایید.")
    })
  }

  return children({reportOptions, ...rtk, control, submit});
};

export default _ReportLogic;