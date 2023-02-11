
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

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

const Navbar = ({ styleMode }) => {
  const router = useRouter();
  return (
    <nav className={classNames('w-full flex gap-12 navbarItem font-bold',{'text-secondary':styleMode === 'blog'})}>
        {
          links.map((page, index) => (
            <Link href={page.href} className={`${styleMode === 'blog' ? 'text-secondary' : ''} ${router?.pathname === page.href ? 'active' : ''}`} key={index}>{page.title}</Link>
          ))
        }
    <nav
      className={`w-full flex gap-12 navbarItem text-base ${
        styleMode === "blog" ? "text-secondary" : ""
      }`}
    >
      {links.map((page, index) => (
        <Link
          href={page.href}
          className={`${styleMode === "blog" ? "text-secondary" : ""} ${
            router.pathname === "/blogs" && page.href === "/blogs"
              ? "font-bold"
              : ""
          } ${
            router?.pathname === page.href && router.pathname !== "/blogs"
              ? "active"
              : ""
          }`}
          key={index}
        >
          {page.title}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
