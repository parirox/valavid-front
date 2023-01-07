const Divider = ({ start, middle, end, through = false, orientation = 'horizontal', spacing = 0, className, color = 'bg-secondary-100' }) => {
    const dividerLine = <div className={`flex-auto ${orientation === 'vertical' ? 'w-[1px]' : 'h-[1px]'} ${color}`}></div>

    const styles = {
        'vertical': `py-${spacing} flex-col`,
        'horizontal': `px-${spacing} flex-row`
    }
    return (
        <div className={`flex gap-4 items-center ${styles[orientation]} ${className}`}>
            {through && dividerLine}
            {start && <div className="flex-initial">
                {start}
            </div>}
            {dividerLine}
            {middle && <div className="flex-initial">
                {middle}
            </div>}
            {middle && dividerLine}
            {end && <div className="flex-initial">
                {end}
            </div>}
            {through && dividerLine}
        </div>
    );
}

export default Divider;