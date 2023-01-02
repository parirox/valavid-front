import { isEmpty } from "@/utils/general";
import Link from "next/link";

const ButtonIcon = (props) => {
  const {
    link,
    icon,
    children, ...rest
  } = props;
  rest.className += ' btn rounded-full gap-2'

  if (isEmpty(link)) {
    return (
      <button {...rest}>
        <span>{icon}</span>
        <span>{children}</span>
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
