import ButtonIcon from "@/components/ButtonIcon";
import Navbar from "@/components/Navbar";
import Select from "@/components/Select";
import {IoClose, IoPerson, IoSearchOutline} from "react-icons/io5";
import {BsCart2} from "react-icons/bs";
import {useSelector} from "react-redux";
import {cartItems} from "@/datasources/checkout/local/CheckoutSlice";
import Image from "next/image";
import Button from "@/components/Button";
import ValavidIcon from "@/public/icons/VALAVID_blogPage.png";
import {useEffect, useState} from "react";
import {getCookie, removeCookies} from "cookies-next";
import ProfileIcon from "@/public/icons/profile.svg";
import Link from "next/link";
import {FiDownload, FiUserCheck, FiMenu} from "react-icons/fi";
import {FaRegHeart} from "react-icons/fa";
import {RiFolderAddLine} from "react-icons/ri";
import {Menu, Transition} from "@headlessui/react";
import {useLogoutUserMutation} from "@/datasources/auth/remote/AuthSliceApi";
import Router, {useRouter} from "next/router";
import {useGetProfileDetailsQuery} from "@/datasources/user/remote/UserSliceApi";
import ValavidLogo from "@/public/icons/ValavidLogo.svg";
import {useDispatch} from "react-redux";
import {setShowSearch, showSearch} from "@/datasources/blog/local/BlogSlice";
import classNames from "classnames";

const Header = ({data, styleMode}) => {
    const [isLogedin, setIsLogedIn] = useState(false);
    const [showNav, setShowNav] = useState(false);
    const [showSelect, setShowSelect] = useState(false);
    const _cartItems = useSelector(cartItems);
    const router = useRouter();
    const [logoutUser, {data: logoutData, isSuccess}] = useLogoutUserMutation();
    const {
        data: profileData, isSuccess: profileIsSuccess, isLoading: profileIsLoading,
    } = useGetProfileDetailsQuery();
    const dispatch = useDispatch();
    const _showSearch = useSelector(showSearch);

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
                router.push("/auth");
                removeCookies("valavid_token");
            }
        });
    };

    const profileLinks = [{
        icon: (<FiDownload className="ml-3 text-secondary-300 w-[1.5rem] h-[1.5rem]"/>),
        link: "/profile/me/Downloads",
        title: "دانلودها",
    }, {
        icon: (<RiFolderAddLine className="ml-3 text-secondary-300 w-[1.5rem] h-[1.5rem]"/>),
        link: "/profile/me/Collections",
        title: "کالکشن ها",
    }, {
        icon: (<FaRegHeart className="ml-3 text-secondary-300 w-[1.5rem] h-[1.5rem]"/>),
        link: "/profile/me/Favorites",
        title: "علاقه مندی ها",
    }];

    const renderProfileBtn = () => {
        if (isLogedin) {
            return (<Menu className="relative" as="div">
                <Menu.Button
                className="relative flex h-full items-center justify-center rounded-full bg-white w-[4rem] h-[4rem]">
                    <ProfileIcon/>
                </Menu.Button>
                <Transition>
                    <Menu.Items>
                        <div className="absolute z-30 top-[65px] left-[-9px]">
                            <div className="relative h-full w-full">
                                <div className="w-[200px] bg-[#1D2830] border border-accent rounded-[14px]">
                                    <div
                                    className="w-[1.3rem] h-[1.3rem] rotate-45 top-[-8px] left-[24px] absolute bg-[#1D2830] border-l border-t border-accent"/>
                                    {/* <Menu.Item>
                      <span className="m-4 block text-start text-color8">
                        <Link href="/profile">سجاد قهرمانی</Link>
                      </span>
                    </Menu.Item> */}
                                    <div className="border-b border-[#424E57] mx-4">
                                        {profileLinks.map((item, index) => (<Menu.Item key={index}>
                                            <Link className="my-4 flex" href={item.link}>
                                                {item.icon}
                                                <span className="bold">{item.title}</span>
                                            </Link>
                                        </Menu.Item>))}
                                    </div>
                                    <div className="mx-4">
                                        <Menu.Item>
                                            <Link
                                            className="my-4 block text-start"
                                            href="/profile/me"
                                            >
                                                داشبورد من
                                            </Link>
                                        </Menu.Item>
                                        <div className="my-4 cursor-pointer text-start">
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
            </Menu>);
        } else {
            return (<div className="lg:basis-2/12">
                {styleMode === "blog" ? (<>
                    <Button
                    className={"[&>svg>path]:fill-white rounded-full full btn-primary bg-success-100  min-w-[130px] hidden lg:flex items-center justify-center"}
                    link={"/auth"}
                    icon={<IoPerson className="text-lg"/>}
                    >
                        <ProfileIcon className="text-white"/>
                        عضویت / ورود
                    </Button>
                    <Button
                    link={"/auth"}
                    className="relative flex h-full items-center justify-center rounded-full bg-success-100 w-[4rem] h-[4rem] lg:hidden [&>svg>path]:fill-white"
                    >
                        <ProfileIcon/>
                    </Button>
                </>) : (<>
                    <Button
                    className={"rounded-full full btn-primary min-w-[130px] hidden lg:flex items-center justify-center"}
                    link={"/auth"}
                    icon={<IoPerson className="text-lg"/>}
                    >
                        عضویت / ورود
                    </Button>
                    <Button
                    link={"/auth"}
                    className="relative flex h-full items-center justify-center rounded-full bg-primary w-[4rem] h-[4rem] lg:hidden [&>svg>path]:fill-white"
                    >
                        <ProfileIcon/>
                    </Button>
                </>)}
            </div>);
        }
    };

    if (styleMode === "blog") {
        return (<header className={"bg-white py-7 box-shadow relative"}>
            <div className="relative flex items-center justify-between gap-4 px-6 h-[45px] lg:container lg:px-2">
                <div className="flex cursor-pointer items-center gap-6 text-3xl lg:hidden">
                    <FiMenu className="text-black" onClick={() => setShowNav(true)}/>
                    <IoSearchOutline
                    className="text-black"
                    onClick={() => dispatch(setShowSearch(!_showSearch))}
                    />
                </div>
                <div className="absolute right-0 left-0 mx-auto h-11 w-fit basis-1/12 min-w-[100px] lg:relative">
                    <Link href={"/"}>
                        <Image
                        alt={"valavid icon"}
                        src={ValavidIcon}
                        fill
                        sizes=""
                        ></Image>
                    </Link>
                </div>
                <div className="mr-16 basis-5/12">
                    <Navbar
                    showNav={showNav}
                    setShowNav={setShowNav}
                    styleMode={styleMode}
                    profileData={isLogedin && profileIsSuccess ? profileData : null}
                    />
                </div>
                <div className="h-full lg:basis-6/12">
                    <div className="flex h-full flex-row justify-end gap-3">
                        {renderProfileBtn()}
                        {isLogedin && (<div className="basis-1/12">
                            <ButtonIcon
                            link={"/cart"}
                            className="relative h-full rounded-full bg-accent w-[4rem] h-[4rem]"
                            icon={<BsCart2 className="mx-auto text-2xl text-white"/>}
                            >
                    <span className="absolute top-0 right-0 h-5 w-5 rounded-full text-center bg-primary">
                      {_cartItems.length}
                    </span>
                            </ButtonIcon>
                        </div>)}
                    </div>
                </div>
            </div>
        </header>);
    } else {
        return (<header
        className={classNames("", {
            "absolute top-[45px] inset-x-0 z-[1]": styleMode === "main",
            "py-7 bg-secondary-600": styleMode !== "main",
            "hidden": styleMode === "404"
        })}
        >
            {showSelect ? (<div className="flex items-center gap-4 px-6 py-1 animate-in slide-in-from-right-72 fade-in zoom-in">
                <IoClose
                className="cursor-pointer text-3xl"
                onClick={() => setShowSelect(false)}
                />
                <Select/>
            </div>) : (<div
            className="relative flex w-full items-center justify-between gap-4 px-4 h-[45px] sm:px-6 lg:px-8 lg:px-24">
                <div className="mx-auto justify-center hidden w-fit text-white lg:ml-10 lg:flex lg:basis-1/12">
                    <Link href={"/"} className={"[&>svg>g>path]:fill-white"}>
                        <ValavidLogo/>
                    </Link>
                </div>
                <div className={"lg:hidden flex items-center md:gap-6 text-3xl cursor-pointer h-full"}>
                        <span className={"aspect-square full text-center"}>
                            <FiMenu className={"align-middle m-auto h-full"} onClick={() => setShowNav(true)}/>
                        </span>
                    {router.asPath !== "/" && <span className={"aspect-square full text-center"}>
                            <IoSearchOutline className={"align-middle m-auto h-full"}
                                             onClick={() => setShowSelect(true)}/>
                        </span>}
                </div>
                <Link href={"/"} className="absolute right-0 left-0 mx-auto w-fit lg:hidden [&>svg>g>path]:fill-white">
                    <ValavidLogo/>
                </Link>

                <div className="lg:basis-5/12">
                    <Navbar
                    showNav={showNav}
                    setShowNav={setShowNav}
                    styleMode={styleMode}
                    profileData={isLogedin && profileIsSuccess ? profileData : null}
                    />
                </div>
                <div className="h-full lg:basis-6/12">
                    <div className="flex h-full flex-row justify-end gap-3">
                        <div className="hidden basis-9/12 lg:flex">
                            {router.asPath !== "/" && <Select/>}
                        </div>
                        {renderProfileBtn()}
                        <div className="basis-1/12">
                            <ButtonIcon
                            link={"/cart"}
                            className="relative h-full rounded-full bg-accent w-[4rem] h-[4rem]"
                            icon={<BsCart2 className="mx-auto text-2xl text-white"/>}
                            >
                                <span className="absolute top-0 right-0 h-5 w-5 rounded-full text-center bg-primary">
                                  {_cartItems.length}
                                </span>
                            </ButtonIcon>
                        </div>
                    </div>
                </div>
            </div>)}
        </header>);
    }
};

export default Header;
