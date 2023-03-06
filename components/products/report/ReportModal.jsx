import React from 'react';
import CheckBoxButton from "@/components/Form/CheckBoxButton";
import _ReportLogic from "@/components/products/report/_ReportLogic";
import Button from "@/components/Button";
import {Controller} from "react-hook-form";
import classNames from "classnames";
import {AiOutlineLoading3Quarters} from "react-icons/ai";
import {IoClose} from "react-icons/io5";

const ReportModal = (props) => {
    return (
    <_ReportLogic {...props}>
        {
            ({reportOptions, isLoading, control, submit}) => (
            <div className="flex flex-col gap-5">
                <div className="mb-3 flex flex-wrap justify-between">
                    <div className="text-secondary-300">
                        دلیل <span className={"text-danger"}>تخلف محصول</span> را انتخاب کنید
                    </div>
                    <IoClose onClick={props.close}
                             className={"text-secondary-300 text-2xl sm:hidden"}/>
                </div>
                <div className="">
                    <Controller
                    control={control}
                    name={'report_type'}
                    render={({
                                 field: {onChange, name, value},
                                 fieldState: {error},
                             }) => {
                        return (
                        <CheckBoxButton
                        {...{error}}
                        data={reportOptions}
                        options={value}
                        setOptions={onChange}
                        multiple={false}/>
                        )
                    }}
                    />
                </div>
                <Controller
                control={control}
                name={'reporter_description'}
                render={({
                             field: {onChange, name, value},
                             fieldState: {error},
                         }) => {
                    return (
                    <textarea
                    className={classNames("border border-accent rounded-2xl bg-transparent w-full", {"!border-danger": !!error})}
                    placeholder={"توضیحات..."} name="description" id="description-box" cols="30"
                    rows="5"
                    value={value}
                    onChange={event => onChange(event.target.value)}></textarea>
                    )
                }}
                />
                <div className="flex justify-end gap-4">
                    <Button className={"btn-danger text-left px-10"} onClick={submit}>
                        ثبت
                        {isLoading && <AiOutlineLoading3Quarters className={"animate-spin"}/>}
                    </Button>
                </div>
            </div>
            )
        }
    </_ReportLogic>
    );
};

export default ReportModal;