import clsx from "clsx";

const TextInput = ({ label, className, name, value, type, onChange, background }) => {
  return (
    <div className="h-[4.063rem] relative m-4 w-100 group">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`h-[100%] w-[100%] border-none outline-none px-3 py-3 peer text-[#303D47] ${background ? background : "bg-[#F2F2F3]"}`}
        placeholder=" "
      />

      <label
        className={`z-10 absolute right-[9px] top-px text-sm text-[#C2CACF] transition-all duration-300 px-1 transform -translate-y-1/2 pointer-events-none 
        peer-placeholder-shown:top-[45%] peer-placeholder-shown:text-base group-focus-within:!top-px group-focus-within:!text-sm group-focus-within:!text-[#C2CACF] ${background ? background : "bg-[#F2F2F3]"}`}
      >
        {label}
      </label>

      <fieldset
        className={clsx(
          "rounded-[1.438rem] inset-0 absolute border border-[#D6DADC] pointer-events-none mt-[-9px] invisible peer-placeholder-shown:visible group-focus-within:!border-[#D6DADC] group-focus-within:border group-hover:border-gray-400",
          className
        )}
      >
        <legend className=" ml-2 px-0 text-sm transition-all duration-300 invisible max-w-[0.01px] whitespace-nowrap">
          {label}
        </legend>
      </fieldset>

      <fieldset
        className={clsx(
          "rounded-[1.438rem] inset-0 absolute border border-[#D6DADC] pointer-events-none mt-[-9px] visible peer-placeholder-shown:invisible group-focus-within:border group-focus-within:!border-[#D6DADC] group-hover:border-gray-400",
          className
        )}
      >
        <legend className="ml-2 text-sm invisible px-1 max-w-full whitespace-nowrap">
          {label}
        </legend>
      </fieldset>
    </div>
  );
};

export default TextInput;
