import { RadioGroup } from "@headlessui/react";
import { FiCheck } from "react-icons/fi";
import { forwardRef } from 'react'

function RadioButton({ options, onChange, ...rest }, ref) {
    return (
        <RadioGroup  {...rest} onChange={onChange} className={'flex gap-8'}>
            {options.map((option, k) => (
                <RadioGroup.Option value={option.value} key={k}>
                    {({ checked }) => (
                        <span className="inline-flex cursor-pointer">
                            <span className={`w-7 h-7 rounded-lg text-primary text-center text-2xl ${checked ? 'bg-white' : 'bg-secondary-400'}`}>
                                {checked && <FiCheck className="m-auto h-full" />}
                            </span>
                            <span className="mr-3 self-center">{option.label}</span>
                        </span>
                    )}
                </RadioGroup.Option>
            ))}
        </RadioGroup>
    );
}

export default forwardRef(RadioButton)