import { isEmpty } from "@/utils/general";
import Link from "next/link";
import classNames from "classnames";

const Chip = ({ icon, className, content, href, onClick = () => {} }) => {
  const mergedClassName = classNames(`btn min-h-0 border-none rounded-full flex items-center gap-3 px-4 py-2 ${className}`);
  if (isEmpty(href)) {
    return (
      <button className={mergedClassName} onClick={onClick}>
        {icon}
        <span>{content}</span>
      </button>
    )
  }
  return (
    <Link className={mergedClassName} href={href}>
      {icon}
      <span>{content}</span>
    </Link>
  );
};

export default Chip;
