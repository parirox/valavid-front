
export default function RowInput({ label, required, error, helperText, children }) {
    return (
        <div className="flex items-center mb-10">
            <div className="basis-1/6">
                {required && <span className={`${error ? 'text-danger' : 'text-gray'} ml-1`}>*</span>}
                <span>{label}</span>
            </div>
            <div className="basis-5/6">
                {children}
                {helperText && <span className="text-gray px-3 mt-3 block">{helperText}</span>}
            </div>
        </div>
    )
}

