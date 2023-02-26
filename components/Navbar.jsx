import Link from 'next/link';
import {useRouter} from 'next/router';
import classNames from "classnames";

const links = [
  {
    title: "خانه",
    href: "/",
  },
  {
    title: "ویدئو",
    href: "/products/video",
  },
  {
    title: "تصویر",
    href: "/products/image",
  },
  {
    title: "وبلاگ",
    href: "/blogs",
  },
  {
    title: "درباره ی ما",
    href: "/aboutUs",
  },
  {
    title: "سوالات متداول",
    href: "/faq",
  },
];

const Navbar = ({styleMode}) => {
  const router = useRouter();
  return (
    <nav className={classNames('w-full flex gap-12 navbarItem font-bold', {'text-secondary': styleMode === 'blog'})}>
      {links.map((page, index) => (
        <Link
          href={page.href}
          className={classNames("", {
            "text-secondary": styleMode === "blog",
            "font-bold": router.pathname === "/blogs" && page.href === "/blogs",
            "active": router?.pathname === page.href && router.pathname !== "/blogs"
          })}
          key={index}>
          {page.title}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
