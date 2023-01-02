import { isEmpty } from "@/utils/general";
import Link from "next/link";

const Button = ({
  link,
  children, ...rest
}) => {
  rest.className += ' btn'

  if (isEmpty(link)) {
    return (
      <button {...rest}>
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
