import { isEmpty } from "@/utils/general";
import Link from "next/link";

const Button = ({
  link,
  onClick,
  children, ...rest
}) => {
  rest.className += ' btn'

  if (isEmpty(link)) {
    return (
      <button type={rest.type ?? 'button'} onClick={onClick} {...rest}>
        {children}
      </button>
    )
  }
  return (
    <Link {...rest} href={link}>
      {children}
    </Link>
  );
};

export default Button;
