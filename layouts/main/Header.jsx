import ButtonIcon from "@/components/ButtonIcon";
import Navbar from "@/components/Navbar";
import Select from "@/components/Select";
import { IoPerson } from "react-icons/io5";
import { BsCart2 } from "react-icons/bs";
import { useSelector } from "react-redux";
import { cartItems } from "@/datasources/checkout/local/CheckoutSlice";
import Image from "next/image";
import Button from "@/components/Button";
import ValavidIcon from "@/public/icons/VALAVID_blogPage.png";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import ProfileIcon from "@/public/icons/profile.svg";
import Link from "next/link";
import { FiDownload, FiUserCheck, FiMenu } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { RiFolderAddLine } from "react-icons/ri";
import { Menu, Transition } from "@headlessui/react";
import { useLogoutUserMutation } from "@/datasources/auth/remote/AuthSliceApi";
import Router from "next/router";
import { removeCookies } from "cookies-next";
import { useGetProfileDetailsQuery } from "@/datasources/user/remote/UserSliceApi";
import ValavidLogo from "@/public/icons/ValavidLogoWhite.svg";

const Header = ({ data, styleMode }) => {
  const [isLogedin, setIsLogedIn] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const _cartItems = useSelector(cartItems);

  const [logoutUser, { data: logoutData, isSuccess }] = useLogoutUserMutation();
  const {
    data: profileData,
    isSuccess: profileIsSuccess,
    isLoading: profileIsLoading,
  } = useGetProfileDetailsQuery();

  useEffect(() => {
    let token = getCookie("valavid_token");
    if (token) {
      setIsLogedIn(true);
    }
  }, []);

  const handleLogoutUser = () => {
    logoutUser()
      .unwrap()
      .then((response) => {
        if (response.result) {
          Router.push("/auth");
          removeCookies("valavid_token");
        }
      });
  };

  const profileLinks = [
    {
      icon: (
        <FiDownload className="text-secondary-300 w-[1.5rem] h-[1.5rem] ml-3" />
      ),
      link: "/profile/me/Downloads",
      title: "دانلودها",
    },
    {
      icon: (
        <RiFolderAddLine className="text-secondary-300 w-[1.5rem] h-[1.5rem] ml-3" />
      ),
      link: "/profile/me/Collections",
      title: "کالکشن ها",
    },
    {
      icon: (
        <FaRegHeart className="text-secondary-300 w-[1.5rem] h-[1.5rem] ml-3" />
      ),
      link: "/profile/me/Favorites",
      title: "علاقه مندی ها",
    },
    // {
    //   icon: (
    //     <FiUserCheck className="text-secondary-300 w-[1.5rem] h-[1.5rem] ml-3" />
    //   ),
    //   link: "",
    //   title: "دنبال شده ها",
    // },
  ];

  const renderProfileBtn = () => {
    if (isLogedin) {
      return (
        <Menu className="relative" as="div">
          <Menu.Button className="rounded-full bg-white h-full w-[4rem] h-[4rem] relative flex items-center justify-center">
            <ProfileIcon />
          </Menu.Button>
          <Transition>
            <Menu.Items>
              <div className="absolute top-[65px] left-[-9px] z-30">
                <div className="w-full h-full relative">
                  <div className="w-[200px] bg-[#1D2830] border border-accent rounded-[14px]">
                    <div className="w-[1.3rem] h-[1.3rem] bg-white rotate-45 top-[-8px] left-[24px] absolute bg-[#1D2830] border-l border-t border-accent" />
                    {/* <Menu.Item>
                      <span className="text-start block text-color8 m-4">
                        <Link href="/profile">سجاد قهرمانی</Link>
                      </span>
                    </Menu.Item> */}
                    <div className="border-b border-[#424E57] mx-4">
                      {profileLinks.map((item, index) => (
                        <Menu.Item key={index}>
                          <Link className="flex my-4" href={item.link}>
                            {item.icon}
                            <span className="bold">{item.title}</span>
                          </Link>
                        </Menu.Item>
                      ))}
                    </div>
                    <div className="mx-4">
                      <Menu.Item>
                        <Link
                          className="text-start my-4 block"
                          href="/profile/me"
                        >
                          داشبورد من
                        </Link>
                      </Menu.Item>
                      <div className="text-start my-4 cursor-pointer">
                        <Menu.Item onClick={() => handleLogoutUser()}>
                          <span>خروج</span>
                        </Menu.Item>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      );
    } else {
      return (
        <div className="basis-2/12">
          <Button
            className={"rounded-full full btn-primary min-w-[130px]"}
            link={"/auth"}
            icon={<IoPerson className="text-lg" />}
          >
            عضویت / ورود
          </Button>
        </div>
      );
    }
  };

  if (styleMode === "blog") {
    return (
      <header className={"bg-white py-7 box-shadow relative"}>
        <div className="flex items-center gap-4 container px-2 h-[45px]">
          <div className="basis-1/12 relative h-11 min-w-[100px]">
            <Link href={"/"}>
              <Image
                alt={"valavid icon"}
                src={ValavidIcon}
                fill
                sizes=""
              ></Image>
            </Link>
          </div>
          <div className="basis-5/12 mr-16">
            <Navbar
              showNav={showNav}
              setShowNav={setShowNav}
              styleMode={styleMode}
              profileData={isLogedin && profileIsSuccess ? profileData : null}
            />
          </div>
          <div className="lg:basis-6/12 h-full">
            <div className="flex flex-row justify-end gap-3 h-full">
              {renderProfileBtn()}
              {isLogedin && (
                <div className="basis-1/12">
                  <ButtonIcon
                    link={"/cart"}
                    className="rounded-full bg-accent h-full w-[4rem] h-[4rem] relative"
                    icon={<BsCart2 className="text-white text-2xl mx-auto" />}
                  >
                    <span className="absolute right-0 top-0 bg-primary rounded-full w-5 h-5 text-center">
                      {_cartItems.length}
                    </span>
                  </ButtonIcon>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    );
  } else {
    return (
      <header
        className={`${
          styleMode === "main"
            ? "absolute top-[45px] inset-x-0 z-[1] bg-[#00000044]"
            : "py-7 bg-color12"
        } ${styleMode == "404" ? "hidden" : ""}`}
      >
        <div className="flex items-center justify-between w-full gap-4 px-4 sm:px-6 lg:px-24 h-[45px]">
          <div className="basis-1/12 text-white hidden lg:flex">
            <Link href={"/"}>
              <ValavidLogo />
            </Link>
          </div>
          <div
            onClick={() => setShowNav(true)}
            className="lg:hidden text-3xl cursor-pointer"
          >
            <FiMenu />
          </div>
          <div className="basis-5/12">
            <Navbar
              showNav={showNav}
              setShowNav={setShowNav}
              styleMode={styleMode}
              profileData={isLogedin && profileIsSuccess ? profileData : null}
            />
          </div>
          <div className="lg:basis-6/12 h-full">
            <div className="flex flex-row gap-3 h-full">
              <div className="flex-auto hidden lg:flex">
                <Select />
              </div>
              {renderProfileBtn()}
              <div className="flex-initial">
                <ButtonIcon
                  link={"/cart"}
                  className="rounded-full bg-accent h-full w-[4rem] h-[4rem] relative"
                  icon={<BsCart2 className="text-white text-2xl mx-auto" />}
                >
                  <span className="absolute right-0 top-0 bg-primary rounded-full w-5 h-5 text-center">
                    {_cartItems.length}
                  </span>
                </ButtonIcon>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
};

export default Header;
