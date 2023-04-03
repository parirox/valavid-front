import { isEmpty } from "@/utils/general";
import { Controller } from "react-hook-form";
import classNames from "classnames";

function FileInput({
  hookFormControl,
  name,
  rules,
  textButton,
  handleChange,
  multiple = false,
  disabled,
  ...rest
}) {
  return (
    <Controller
      control={hookFormControl}
      name={name}
      rules={rules}
      render={({
        field: { onChange, name, value },
        fieldState: { error },
        formState: { errors },
      }) => (
        <>
          <label
            className="rounded-2xl flex items-stretch border-2 border-dashed border-accent w-full h-16 p-1 cursor-pointer"
            htmlFor={name + "ID"}>
            <div className="flex-auto relative">
              <input
                disabled={disabled}
                {...rest}
                type="file"
                className="full opacity-0"
                multiple={multiple}
                onChange={({ target: { files } }) => {
                  multiple ? onChange(files) : onChange(files[0]);
                  handleChange && handleChange(files[0]);
                }}
                id={name + "ID"}
              />
              {value && (
                <div className="absolute inset-0 z-10 flex flex-row-reverse px-10 items-center text-secondary-300">
                  {multiple
                    ? Object.values(value)
                        .map((v) => v.name)
                        .join()
                    : value.name}
                </div>
              )}
            </div>
            <div
              className={classNames(
                "basis-2/12 h-full rounded-l-2xl text-accent text-center flex items-center justify-center",
                { "bg-gray": disabled, "bg-color8": !disabled }
              )}>
              {textButton || "Choose File"}
            </div>
          </label>
          {errors && <span>{error}</span>}
        </>
      )}
    />
  );
}

export default FileInput;
