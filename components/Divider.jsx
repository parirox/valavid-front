import classNames from "classnames";
import PropTypes from "prop-types";

const Divider = ({
                     start,
                     middle,
                     end,
                     through = false,
                     orientation = 'horizontal',
                     spacing = 0,
                     className,
                     color = 'bg-secondary-100',
                     dividerLine,
                    ...props
                 }) => {
    const _dividerLine = dividerLine ??
    <div className={classNames(`flex-auto ${orientation === 'vertical' ? 'w-[1px]' : 'h-[1px]'} ${color}`)}></div>

    const styles = {
        'vertical': `py-${spacing} flex-col`,
        'horizontal': `px-${spacing} flex-row`
    }
    return (
    <div {...props} className={classNames(`flex gap-${spacing > 0 ? spacing : 4} items-center justify-between ${styles[orientation]}`,{[className]:className})}>
        {through && _dividerLine}
        {start && <div className="flex-initial">
            {start}
        </div>}
        {_dividerLine}
        {middle && <div className="flex-initial">
            {middle}
        </div>}
        {middle && _dividerLine}
        {end && <div className="flex-initial">
            {end}
        </div>}
        {through && _dividerLine}
    </div>
    );
}

Divider.propTypes = {
    orientation: PropTypes.oneOf(['vertical', 'horizontal']),
    dividerLine: PropTypes.element
}
export default Divider;