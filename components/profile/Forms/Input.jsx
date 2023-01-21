import React from 'react';
import {Controller} from "react-hook-form";

function Input({disabled, className = "", type = "text", control, name}) {
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({field, fieldState: {error}}) => {
          return (
            <>
              <input disabled={disabled} type={type}
                     className={`input-secondary ${className} ${error && 'input-error'}`} {...field} />
              {error && <span className="text-gray px-3 mt-3 block">{error.message}</span>}
            </>
          )
        }}
      />
    </>
  );
}

export default Input;