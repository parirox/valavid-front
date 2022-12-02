import Link from "next/link";

const Button = (props) => {
  const {
    link,
    icon,
    children,...rest
  } = props;
  rest.className += ' btn'
  
  return (
    <button
      {...rest}
    >
      {icon && <span className="ml-2">{icon}</span>}
      {link ? <Link href={link}>{children}</Link> : <span>{children}</span>}
    </button>
  );
};

export default Button;
