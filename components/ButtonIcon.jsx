import { isEmpty } from "@/utils/general";
import Link from "next/link";

const ButtonIcon = ({
  link,
  icon,
  children, ...rest
}) => {
  rest.className += ' btn gap-2'

  if (isEmpty(link)) {
    return (
      <button {...rest}>
        <span>{icon}</span>
        {children}
      </button> 
    )
  }
  return (
    <Link {...rest} href={link}>
      <span>{icon}</span>
      {children}
    </Link>
  );
};

export default ButtonIcon;
