const Badge = (props) => {
    const {className = "bg-primary rounded-xl", children, ...rest} = props
    return <span className={"p-3 text-center " + className} {...rest}>{children}</span>;
};

export default Badge;
