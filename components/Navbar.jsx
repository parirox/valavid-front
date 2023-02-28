import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { slide as Menu } from "react-burger-menu";
import ValavidLogo from "@/public/icons/valavidLogo.svg";
import Image from "next/image";
import Avatar from "./Avatar";

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

const profileLinks = [
  {
    title: "اطلاعات کاربری",
    href: "/profile/me",
  },
  {
    title: "دانلود ها",
    href: "/profile/me/Downloads",
  },
  {
    title: "مجموعه ها",
    href: "/profile/me/Collections",
  },
  {
    title: "محصولات",
    href: "/profile/me/Products",
  },
  {
    title: "علاقه مندی ها",
    href: "/profile/me/Favorites",
  },
  {
    title: "تیکت ها",
    href: "/profile/me/Tickets",
  },
  {
    title: "افتخارات",
    href: "/profile/me/Achievements",
  },
  {
    title: "حسابداری",
    href: "/profile/me/Accounting",
  },
];

const Navbar = ({ styleMode, showNav, setShowNav, profileData }) => {
  const router = useRouter();
  return (
    <>
      <div className="">
        <Menu
          isOpen={showNav}
          onOpen={() => setShowNav(true)}
          onClose={() => setShowNav(false)}
          right
        >
          <div className="flex flex-col px-10">
            <div className="flex items-center justify-center w-full my-6">
              <ValavidLogo />
            </div>
            {links.map((page, index) => (
              <Link
                onClick={() => setShowNav(false)}
                href={page.href}
                className={`w-full py-6 whitespace-nowrap text-color7 text-xl`}
                key={index}
              >
                {page.title}
              </Link>
            ))}
            <hr className="text-color8 mt-20" />
            {profileData && (
              <div>
                <div className="flex items-center justify-between py-6 text-secondary-300 text-xl">
                  <div className="flex items-center gap-4">
                    {
                      <Avatar
                        src={profileData.avatar.src}
                        alt={profileData.username}
                        size={70}
                      />
                    }
                    <span>
                      {profileData.first_name + profileData.last_name}
                    </span>
                  </div>
                  <span>خروج</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 sm:grid-rows-3 gap-4 py-6">
                  {profileLinks.map((item, index) => {
                    return (
                      <Link
                        onClick={() => setShowNav(false)}
                        key={index}
                        className="text-secondary-300 text-xl"
                        href={item.href}
                      >
                        {item.title}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
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
