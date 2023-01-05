import { isEmpty } from "@/utils/general";
import { Controller } from "react-hook-form";

function FileInput({ hookFormControl, name, rules, textButton, ...rest }) {
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
                    <label className="rounded-2xl flex items-stretch border-2 border-dashed border-accent w-full h-16 p-1 cursor-pointer" htmlFor={name + "ID"}>
                        <div className="flex-auto relative">
                            <input type="file" className="full opacity-0" onChange={({ target: { files } }) => {
                                onChange(files)
                            }} id={name + "ID"} />
                            {!isEmpty(value) && <div className="absolute inset-0 z-10 flex flex-row-reverse px-10 items-center text-secondary-300">{Object.values(value).map(v => v.name).join()}</div>}
                        </div>
                        <div className="basis-2/12 h-full rounded-l-2xl bg-color8 text-accent text-center flex items-center justify-center">{textButton || 'Choose File'}</div>
                    </label>
                    {
                        errors && errors[name] && errors[name].type === "required" && (
                            <span>your error message !</span>
                        )
                    }
                </>
            )
            }
        />
    );
}

export default FileInput;