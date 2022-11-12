import Link from "next/link";

const Button = ({
  type,
  className,
  link,
  icon,
  children,
  onClickHandler = () => {},
}) => {
  return (
    <button
      className={`btn ${className}`}
      onClick={onClickHandler}
    >
      {icon && <span className="ml-2">{icon}</span>}
      {link ? <Link href={link}>{children}</Link> : <span>{children}</span>}
    </button>
  );
};

export default Button;
