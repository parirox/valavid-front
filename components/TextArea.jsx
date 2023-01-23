import clsx from "clsx";

const TextArea = ({ label, className, name, value, type, onChange, background }) => {
  return (
    <div className="h-[10rem] relative m-4 w-100 group">
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className={`h-[100%] w-[100%] border-none outline-none px-3 py-3 peer text-[#303D47] ${background ? background : "bg-[#F2F2F3]"}`}
        placeholder=" "
      />

      <label
        className={`z-10 absolute right-[9px] top-px text-sm text-secondary-300 transition-all duration-300 px-1 transform -translate-y-1/2 pointer-events-none 
        peer-placeholder-shown:top-[45%] peer-placeholder-shown:text-base group-focus-within:!top-px group-focus-within:!text-sm group-focus-within:!text-secondary-300 ${background ? background : "bg-[#F2F2F3]"}`}
      >
        {label}
      </label>

      <fieldset
        className={clsx(
          "rounded-[1.438rem] inset-0 absolute border border-secondary-300 pointer-events-none mt-[-9px] invisible peer-placeholder-shown:visible group-focus-within:!border-secondary-300 group-focus-within:border group-hover:border-gray-400",
          className
        )}
      >
        <legend className="w-0 p-0 text-sm transition-all duration-300 opacity-0 max-w-[0.01px] whitespace-nowrap">
          {label}
        </legend>
      </fieldset>

      <fieldset
        className={clsx(
          "rounded-[1.438rem] inset-0 absolute border border-secondary-300 pointer-events-none mt-[-9px] visible peer-placeholder-shown:invisible group-focus-within:border group-focus-within:!border-secondary-300 group-hover:border-gray-400",
          className
        )}
      >
        <legend className="w-0 text-sm opacity-0 p-0 max-w-full whitespace-nowrap">
          {label}
        </legend>
      </fieldset>
    </div>
  );
};

export default TextArea;
