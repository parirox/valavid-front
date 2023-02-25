import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { slide as Menu } from "react-burger-menu";

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

const Navbar = ({ styleMode, showNav, setShowNav }) => {
  const router = useRouter();
  return (
    <>
      <div className="">
        <Menu
          isOpen={showNav}
          onOpen={() => setShowNav(true)}
          onClose={() => setShowNav(false)}
          right
          width={"280px"}
        >
          {links.map((page, index) => (
            <Link
              onClick={() => setShowNav(false)}
              href={page.href}
              className={`hover:bg-accent w-full py-6 px-8 whitespace-nowrap ${
                styleMode === "blog" ? "text-secondary" : ""
              } ${
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
        </Menu>
      </div>
      <nav
        className={`w-full gap-12 navbarItem text-base hidden lg:flex ${
          styleMode === "blog" ? "text-secondary" : ""
        }`}
      >
        {links.map((page, index) => (
          <Link
            href={page.href}
            className={`whitespace-nowrap ${
              styleMode === "blog" ? "text-secondary" : ""
            } ${
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
    </>
  );
};

export default Navbar;
