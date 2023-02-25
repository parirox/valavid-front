
export default function RowInput({ label, required, error, helperText, children, className }) {
    return (
        <div className={`flex flex-col sm:flex-row sm:items-center mb-10 ${className ? className : ''}`}>
            <div className="basis-1/6 mb-4 sm:mb-0">
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

