import { isEmpty } from "@/utils/general";
import Link from "next/link";
import {AiOutlineLoading} from "react-icons/ai";

const Button = ({
  link,
  onClick,
  loading=false,
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
