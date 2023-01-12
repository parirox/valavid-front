const Checkbox = ({ children, checked, onChange }) => {
  return (
    <div class="flex items-center">
      <input
        id="default-checkbox"
        type="checkbox"
        value=""
        checked={checked}
        onChange={onChange}
        className="checked:bg-[#534CDA] ml-2 checkmark bg-[#F2F2F3] w-[25px] h-[25px] rounded-[8px] border border-[#90999F]"
      />
      <label
        htmlFor="default-checkbox"
        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {children}
      </label>
    </div>
  );
};

export default Checkbox;
