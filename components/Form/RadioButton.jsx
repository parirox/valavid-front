import {RadioGroup} from "@headlessui/react";
import {FiCheck} from "react-icons/fi";
import React from 'react'
import {Controller} from "react-hook-form";

function RadioButton({control, name, disabled,defaultValue, options}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({
                 field: {onChange, name, value},
                 fieldState: {error},
               }) => {
        return (
          <>
            <RadioGroup value={value} disabled={disabled} onChange={onChange} className={'flex gap-8'}>
              {options.map((option, k) => (
                <RadioGroup.Option value={option.value} key={option.value}>
                  {({checked}) => (
                    <span className="inline-flex cursor-pointer">
                            <span
                              className={`w-7 h-7 rounded-lg text-primary text-center text-2xl ${checked ? 'bg-white' : 'bg-secondary-400'}`}>
                                {checked && <FiCheck className="m-auto h-full"/>}
                            </span>
                            <span className="mr-3 self-center">{option.label}</span>
                        </span>
                  )}
                </RadioGroup.Option>
              ))}
            </RadioGroup>
            {error && (<span className="text-gray px-3 mt-3 block">{error.message}</span>)}
          </>
        )
      }
      }
    />
  );
}

export default RadioButton