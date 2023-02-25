import React from 'react';
import {Controller} from "react-hook-form";
import classNames from "classnames";

function Input({disabled, className = "", type = "text", control, name}) {
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({field: {onChange, name, value}, fieldState: {error}}) => {
          return (
            <>
              <input disabled={disabled} type={type}
                     className={classNames("input-secondary",{className:className,'input-error':error})} onChange={onChange} name={name} value={value ?? ""} />
              {error && <span className="text-gray px-3 mt-3 block">{error.message}</span>}
            </>
          )
        }}
      />
    </>
  );
}

export default Input;