import TextInput from '@/components/TextInput'
import React from 'react'

const Mobile = ({setContent}) => {
  return (
    <div className="m-4 flex flex-col mt-[7rem]">
    <p className="mb-4 text-[14px] text-[#303D47]">
      لطفا شماره موبایل یا ایمیل خود را وارد کنید.
    </p>
    <TextInput label="ایمیل/شماره موبایل" />
    <button
      onClick={() => setContent("auth")}
      className="bg-[#534CDA] color-white h-[4.063rem] rounded-[1.438rem] m-4"
    >
      دریافت کد تایید
    </button>
  </div>
  )
}

export default Mobile
