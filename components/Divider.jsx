const Divider = ({ start, middle, end, through = false,orientation = 'horizintal',spacing=0, color = 'bg-secondary-100' }) => {
    const dividerLine = <div className={`flex-auto ${orientation === 'vertical' ? 'w' : 'h'}-[1px] ${color}`}></div>
    return (
        <div className={`flex gap-4 flex-${orientation === 'vertical' ? 'col' : 'row'} items-center p${orientation === 'vertical' ? 'y' : 'x'}-${spacing}`}>
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