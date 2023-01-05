import Divider from "@/components/Divider";
import { Disclosure } from "@headlessui/react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker, { DateObject } from "react-multi-date-picker";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";

import { FaChevronUp } from "react-icons/fa";

import Button from "@/components/Button";
import ButtonIcon from "@/components/ButtonIcon";
import RadioButton from "@/components/Form/RadioButton";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoAdd } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import CitySelect from "./CitySelect";
import RowInput from "./RowInput";
import SelectWithKey from "./SelectWithKey";
import FileInput from "@/components/Form/FileInput";
import { useRouter } from "next/router";
import { isEmpty } from "@/utils/general";
import Link from "next/link";


const UserInformation = () => {
    const router = useRouter()

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

    const [activeSection, setActiveSection] = useState({
        baseUserForm: false,
        sellerForm: false,
        teamForm: false,
    });

    const { register, control, setValue, getValues, handleSubmit, watch, formState: { errors } } = useForm({
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
            email: '',
            phonenumber: '',
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
            // forth
            idcart_photo: '',
            shabanumber: '',
            banknumber: '',
            // fifth
            company_name: '',
            company_address: '',
            employees_count: '',
            statute: '',
            newspaper_ads: '',
            // sixth
            company_email: '',
            company_phonenumber: '',
            company_socials: [
                {
                    name: 'instagram',
                    address: ''
                },
                {
                    name: 'youtube',
                    address: ''
                },
            ],
            // seventh
            company_idcart_photo: '',
            company_shabanumber: '',
            company_banknumber: '',
        }
    });
    const onSubmit = data => console.log(data);

    const addSocialSelect = (name) => () => {
        setValue(`${name}.${getValues(name).length}`, {
            name: 'instagram',
            address: ''
        })
    }

    useEffect(() => {
        const sectionSelected = router.asPath.split('#')?.[1];
        console.log(sectionSelected);
        if (router.isReady && !isEmpty(sectionSelected)) {
            if (document.querySelector(`.${sectionSelected}`)) {
                document.querySelector(`.${sectionSelected}`).click()
            };
        }
    }, [router.asPath])


    return (
        <div className="mb-40">
            <Disclosure>
                <Disclosure.Button as={Link} scroll={false} href="#baseUserForm">
                    <div id="baseUserForm" className="py-2 w-full mt-16 baseUserForm">
                        <Divider className="text-secondary-300" start={"اطلاعات کاربری"} end={<FaChevronUp className="ui-open:rotate-180 ui-open:transform" />} />
                    </div>
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
            <Disclosure>
                <Disclosure.Button as={Link} scroll={false} href="#sellerForm">
                    <div id="sellerForm" className="py-2 w-full mt-16 sellerForm">
                        <Divider className="text-secondary-300" start={"فرم فروشنده"} end={<FaChevronUp className="ui-open:rotate-180 ui-open:transform" />} />
                    </div>
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
                            <RowInput label='شماره موبایل' required helperText={'(باید به نام صاحب حساب باشد)'}>
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
                                            value.map((social, k) => (
                                                <Fragment key={k}>
                                                    <SelectWithKey value={social} index={k} setState={(newVal => setValue(`${name}.${k}`, newVal))} />
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
                                    <Button onClick={addSocialSelect('socials')} className="btn-accent py-4"><IoAdd /></Button>
                                </div>
                            </RowInput>
                        </div>
                    </form>

                    <form onSubmit={handleSubmit(onSubmit)} className="mt-16">
                        <div className="w-full flex items-center gap-5">
                            <span className="flex-initial">بارگزاری مدارک</span>
                            <ButtonIcon icon={<MdEdit />} className="bg-secondary-400 text-2xl h-12 w-12" />
                        </div>
                        <div className="w-full text-gray-500 bg-secondary-light rounded-3xl border border-accent p-10 mt-8">
                            <RowInput label='تصویر کارت ملی /پاسپورت' required>
                                <FileInput hookFormControl={control} name="idcart_photo" />
                            </RowInput>
                            <RowInput label='شماره شبا' required helperText={'(باید به نام صاحب حساب باشد)'}>
                                <input type="text" className="input-secondary w-2/6" {...register('shabanumber')} />
                                {errors.phonenumber && <span>This field is required</span>}
                            </RowInput>
                            <RowInput label='شماره حساب' required helperText={'(باید به نام صاحب حساب باشد)'}>
                                <input type="text" className="input-secondary w-2/6" {...register('banknumber')} />
                                {errors.phonenumber && <span>This field is required</span>}
                            </RowInput>

                        </div>
                    </form>
                </Disclosure.Panel>
            </Disclosure>

            <Disclosure>
                <Disclosure.Button as={Link} scroll={false} href="#teamForm">
                    <div id="teamForm" className="py-2 w-full mt-16 sellerForm">
                        <Divider className="text-secondary-300" start={"ثبت تیم"} end={<FaChevronUp className="ui-open:rotate-180 ui-open:transform" />} />
                    </div>
                </Disclosure.Button>
                <Disclosure.Panel className="text-lg py-5">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="w-full flex items-center gap-5">
                            <span className="flex-initial">اطلاعات شرکت</span>
                            <ButtonIcon icon={<MdEdit />} className="bg-secondary-400 text-2xl h-12 w-12" />
                        </div>
                        <div className="w-full text-gray-500 bg-secondary-light rounded-3xl border border-accent p-10 mt-8">
                            <RowInput label='نام شرکت'>
                                <input type="text" className="input-secondary" {...register('company_name')} />
                                {errors.firstname && <span>This field is required</span>}
                            </RowInput>
                            <RowInput label='آدرس شرکت'>
                                <input type="text" className="input-secondary" {...register('company_address')} />
                                {errors.lastname && <span>This field is required</span>}
                            </RowInput>
                            <RowInput label='تعداد کارمندان'>
                                <input type="number" className="input-secondary w-auto"  {...register('employees_count')} />
                                {errors.lastname && <span>This field is required</span>}
                            </RowInput>
                            <RowInput label='اساسنامه' required>
                                <FileInput hookFormControl={control} name="statute" />
                            </RowInput>
                            <RowInput label='آگهی روزنامه' required>
                                <FileInput hookFormControl={control} name="newspaper_ads" />
                            </RowInput>
                        </div>
                    </form>

                    <form onSubmit={handleSubmit(onSubmit)} className="mt-16">
                        <div className="w-full flex items-center gap-5">
                            <span className="flex-initial">اطلاعات تماس</span>
                            <ButtonIcon icon={<MdEdit />} className="bg-secondary-400 text-2xl h-12 w-12" />
                        </div>
                        <div className="w-full text-gray-500 bg-secondary-light rounded-3xl border border-accent p-10 mt-8">
                            <RowInput label='ایمیل'>
                                <input type="text" className="input-secondary" {...register('company_email')} />
                                {errors.firstname && <span>This field is required</span>}
                            </RowInput>
                            <RowInput label='تلفن'>
                                <input type="text" className="input-secondary" {...register('company_phonenumber')} />
                                {errors.lastname && <span>This field is required</span>}
                            </RowInput>
                            <RowInput label='شبکه های اجتماعی'>
                                <div className="grid grid-cols-2 gap-10">
                                    <Controller
                                        control={control}
                                        name="company_socials"
                                        // rules={{ required: true }} //optional
                                        render={({
                                            field: { onChange, name, value },
                                            fieldState: { error }, //optional
                                            formState: { errors }, //optional, but necessary if you want to show an error message
                                        }) => (
                                            value.map((social, k) => (
                                                <Fragment key={k}>
                                                    <SelectWithKey value={social} index={k} setState={(newVal => setValue(`${name}.${k}`, newVal))} />
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
                                    <Button onClick={addSocialSelect('company_socials')} className="btn-accent py-4"><IoAdd /></Button>
                                </div>
                            </RowInput>

                        </div>
                    </form>

                    <form onSubmit={handleSubmit(onSubmit)} className="mt-16">
                        <div className="w-full flex items-center gap-5">
                            <span className="flex-initial">بارگزاری مدارک</span>
                            <ButtonIcon icon={<MdEdit />} className="bg-secondary-400 text-2xl h-12 w-12" />
                        </div>
                        <div className="w-full text-gray-500 bg-secondary-light rounded-3xl border border-accent p-10 mt-8">
                            <RowInput label='تصویر کارت ملی /پاسپورت' required>
                                <FileInput hookFormControl={control} name="company_idcart_photo" />
                            </RowInput>
                            <RowInput label='شماره شبا' required helperText={'(باید به نام صاحب حساب باشد)'}>
                                <input type="text" className="input-secondary w-2/6" {...register('company_shabanumber')} />
                                {errors.phonenumber && <span>This field is required</span>}
                            </RowInput>
                            <RowInput label='شماره حساب' required helperText={'(باید به نام صاحب حساب باشد)'}>
                                <input type="text" className="input-secondary w-2/6" {...register('company_banknumber')} />
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
