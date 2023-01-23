export const form_change_fields_success_message = " با موفقیت تغییر یافت."
export const form_fields = {
  username: 'نام کاربری',
  first_name: 'نام',
  last_name: 'نام خانوادگی',
  old_password: 'پسوورد فعلی',
  password: 'پسوورد',
  password_confirmation: 'تایید رمز عبور',
  avatar: 'تصویر پروفایل',
  background_image: 'تصویر بک گراند',
  national_code: 'کد ملی',
  subject: 'موضوع',
  message: 'پیام',
  zarinpal: 'زرین پال',
  mellat: 'بانک ملت',
}

export const form_messages = {
  required: ':field را وارد کتید.',
  min: ':field حداقل می بایست :value کاراکتر باشد.',
  max: ':field حداکثر می بایست :value کاراکتر باشد.',
  email: ':field معتبر نمی باشد',
}

export function getFormError({field, type, val}){
  const field_name = form_fields?.[field] ?? field
  return form_messages?.[type].replace(":field",field_name).replace(":value",val)
}
export function getFormSuccessMessage(data){
  return Object.entries(data).map((v)=>(form_fields[v[0]])).join("، ").concat(form_change_fields_success_message)

}