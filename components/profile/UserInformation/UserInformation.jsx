import Divider from "@/components/Divider";
import { Disclosure } from "@headlessui/react";
import DatePicker, { DateObject } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import "react-multi-date-picker/styles/backgrounds/bg-dark.css"

import { FaChevronUp } from "react-icons/fa";

import ButtonIcon from "@/components/ButtonIcon";
import RadioButton from "@/components/Form/RadioButton";
import { Controller, useForm } from "react-hook-form";
import { MdEdit } from "react-icons/md";
import RowInput from "./RowInput";
import CitySelect from "./CitySelect";
import React, { Fragment, useEffect, useRef, useState } from "react";
import SelectWithKey from "./SelectWithKey";
import Button from "@/components/Button";
import { IoAdd } from "react-icons/io5";

const sections = [
    {
        name: "اطلاعات هویتی"
    },
    {
        name: "فرم فروشنده"
    },
    {
        name: "قبت تیم"
    },
]

const UserInformation = () => {
    const filterOptions = {
        genders: [
            {
                value: 'male',
                label: 'مرد'
            },
            {
                value: 'female',
                label: 'زن'
            }
        ],
    }
    const [mySocials, setmysocials] = useState([{}])

    const { register, control, getValues, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            firstname: '',
            lastname: '',
            gender: 'male',
            national_code: '',
            birthday: '',
            major: '',
            birthplace: {
                country: '',
                province: '',
                city: '',
            },
            postal_code: '',
            adderss: '',
            // second
            username: '',
            password: '',
            password_confimation: '',
            // third
            socials: [
                {
                    name: 'instagram',
                    address: ''
                },
                {
                    name: 'youtube',
                    address: ''
                },
            ],
        }
    });
    const onSubmit = data => console.log(data);
    const [selectedDay, setSelectedDay] = useState(null);


    return (
        <div>
            <Disclosure defaultOpen={false}>
                <Disclosure.Button className="py-2 w-full mt-16">
                    <Divider className="text-secondary-300" start={"اطلاعات کاربری"} end={<FaChevronUp className="ui-open:rotate-180 ui-open:transform" />} />
                </Disclosure.Button>
                <Disclosure.Panel className="text-lg py-5">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="w-full flex items-center gap-5">
                            <span className="flex-initial">اطلاعات هویتی</span>
                            <ButtonIcon icon={<MdEdit />} className="bg-secondary-400 text-2xl h-12 w-12" />
                            <div className="alert alert-danger">اطلاعات وارد شده شما با اطلاعات ثبتی در اسناد مطابق نیست</div>
                        </div>
                        <div className="w-full text-gray-500 bg-secondary-light rounded-3xl border border-accent p-10 mt-8">
                            <RowInput label='نام' required>
                                <input type="text" className="input-secondary" {...register('firstname')} />
                                {errors.firstname && <span>This field is required</span>}
                            </RowInput>
                            <RowInput label='نام خانوادگی' required>
                                <input type="text" className="input-secondary" {...register('lastname')} />
                                {errors.lastname && <span>This field is required</span>}
                            </RowInput>
                            <RowInput label='جنسیت' required>
                                <RadioButton options={filterOptions.genders} defaultValue="male"  {...register("gender")} onChange={(v) => { console.log(v); }} />
                            </RowInput>
                            <RowInput label='کد ملی / شماره پاسپورت' required>
                                <input type="text" className="input-secondary" {...register('national_code')} />
                                {errors.national_code && <span>This field is required</span>}
                            </RowInput>

                            <RowInput label='تاریخ تولد' required>
                                <Controller
                                    control={control}
                                    name="birthday"
                                    // rules={{ required: true }} //optional
                                    render={({
                                        field: { onChange, name, value },
                                        fieldState: { error }, //optional
                                        formState: { errors }, //optional, but necessary if you want to show an error message
                                    }) => (
                                        <>
                                            <DatePicker
                                                value={value || ""}
                                                onChange={(date) => {
                                                    onChange(date?.isValid ? date : "");
                                                }}
                                                calendar={persian}
                                                locale={persian_fa}
                                                className="bg-dark"
                                                inputClass="input-secondary"
                                                maxDate={new DateObject().subtract(1, "days")}

                                            />
                                            {errors && errors[name] && errors[name].type === "required" && (
                                                //if you want to show an error message
                                                <span>your error message !</span>
                                            )}
                                        </>
                                    )}
                                />
                            </RowInput>
                            <RowInput label='مدرک تحصیلی' >
                                <input type="text" className="input-secondary"  {...register('major')} />
                                {errors.lastname && <span>This field is required</span>}
                            </RowInput>
                            <RowInput label='محل تولد' required>
                                {/* birthplace */}
                                <Controller
                                    control={control}
                                    name="birthday"
                                    // rules={{ required: true }} //optional
                                    render={({
                                        field: { onChange, name, value },
                                        fieldState: { error }, //optional
                                        formState: { errors }, //optional, but necessary if you want to show an error message
                                    }) => (
                                        <>
                                            <CitySelect value={value} setState={onChange} />
                                            {
                                                errors && errors[name] && errors[name].type === "required" && (
                                                    //if you want to show an error message
                                                    <span>your error message !</span>
                                                )
                                            }
                                        </>
                                    )}
                                />
                            </RowInput>
                            <RowInput label='کد پستی' >
                                <input type="text" className="input-secondary w-auto input-error" {...register('postal_code')} />
                                {errors.lastname && <span>This field is required</span>}
                            </RowInput>
                            <RowInput label='آدرس' >
                                <input type="text" className="input-secondary" {...register('address')} />
                                {errors.lastname && <span>This field is required</span>}
                            </RowInput>
                        </div>
                    </form>

                    <form onSubmit={handleSubmit(onSubmit)} className="mt-16">
                        <div className="w-full flex items-center gap-5">
                            <span className="flex-initial">اطلاعات حساب</span>
                            <ButtonIcon icon={<MdEdit />} className="bg-secondary-400 text-2xl h-12 w-12" />
                        </div>
                        <div className="w-full text-gray-500 bg-secondary-light rounded-3xl border border-accent p-10 mt-8">
                            <RowInput label='نام کاربری' required>
                                <input type="text" className="input-secondary" {...register('username')} />
                                {errors.username && <span>This field is required</span>}
                            </RowInput>
                            <RowInput label='رمز عبور' required>
                                <input type="password"
                                    className="input-secondary"
                                    {...register('password')} />
                                {errors.password && <span>This field is required</span>}
                            </RowInput>
                            <RowInput label='تکرار رمز' required>
                                <input
                                    className="input-secondary"
                                    {...register('password_confimation')} type="password" />
                                {errors.password_confimation && <span>This field is required</span>}
                            </RowInput>
                        </div>
                    </form>
                </Disclosure.Panel>
            </Disclosure>
            <Disclosure defaultOpen={true}>
                <Disclosure.Button className="py-2 w-full mt-16">
                    <Divider className="text-secondary-300" start={"فرم فروشنده"} end={<FaChevronUp className="ui-open:rotate-180 ui-open:transform" />} />
                </Disclosure.Button>
                <Disclosure.Panel className="text-lg py-5">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="w-full flex items-center gap-5">
                            <span className="flex-initial">اطلاعات تماس</span>
                            <ButtonIcon icon={<MdEdit />} className="bg-secondary-400 text-2xl h-12 w-12" />
                        </div>
                        <div className="w-full text-gray-500 bg-secondary-light rounded-3xl border border-accent p-10 mt-8">
                            <RowInput label='ایمیل' required>
                                <input type="email"
                                    disabled
                                    className="input-secondary w-2/6"
                                    {...register('email')} />
                                {errors.email && <span>This field is required</span>}
                            </RowInput>
                            <RowInput label='شماره موبایل' required>
                                <input
                                    type="text"
                                    className="input-secondary w-2/6"
                                    disabled
                                    {...register('phonenumber')} />
                                {errors.phonenumber && <span>This field is required</span>}
                            </RowInput>
                            <RowInput label='شبکه های اجتماعی'>
                                <div className="grid grid-cols-2 gap-10">
                                    <Controller
                                        control={control}
                                        name="socials"
                                        // rules={{ required: true }} //optional
                                        render={({
                                            field: { onChange, name, value },
                                            fieldState: { error }, //optional
                                            formState: { errors }, //optional, but necessary if you want to show an error message
                                        }) => (
                                            value.map((social,k) => (
                                                <Fragment key={k}>
                                                    <SelectWithKey value={social} setState={onChange} />
                                                    {
                                                        errors && errors[name] && errors[name].type === "required" && (
                                                            //if you want to show an error message
                                                            <span>your error message !</span>
                                                        )
                                                    }
                                                </Fragment>
                                            ))
                                        )}
                                    />
                                    <Button onClick={() => setmysocials([])} className="btn-accent py-4"><IoAdd /></Button>
                                </div>
                            </RowInput>
                        </div>
                    </form>
                </Disclosure.Panel>


                <Disclosure.Panel className="text-lg py-5">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="w-full flex items-center gap-5">
                            <span className="flex-initial">بارگزاری مدارک</span>
                            <ButtonIcon icon={<MdEdit />} className="bg-secondary-400 text-2xl h-12 w-12" />
                        </div>
                        <div className="w-full text-gray-500 bg-secondary-light rounded-3xl border border-accent p-10 mt-8">
                            <RowInput label='تصویر کارت ملی /پاسپورت' required>
                                <input type="file"
                                    disabled
                                    className="input-secondary w-2/6"
                                    {...register('email')} />
                                {errors.email && <span>This field is required</span>}
                            </RowInput>
                            <RowInput label='شماره شبا' required>
                                <input
                                    type="text"
                                    className="input-secondary w-2/6"
                                    {...register('phonenumber')} />
                                {errors.phonenumber && <span>This field is required</span>}
                            </RowInput>
                            <RowInput label='شماره حساب' required>
                                <input
                                    type="text"
                                    className="input-secondary w-2/6"
                                    {...register('phonenumber')} />
                                {errors.phonenumber && <span>This field is required</span>}
                            </RowInput>
                        
                        </div>
                    </form>
                </Disclosure.Panel>
            </Disclosure>
        </div>
    );
}

export default UserInformation;
