
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
const Navbar = () => { 
  const router = useRouter()

  return (
    <nav className="w-full flex gap-12 navbarItem text-base">
        <Link className={router?.pathname === "/" ? "active" : ""} href="/">خانه</Link>
        <Link className={router?.pathname === "/videos" ? "active" : ""} href="/videos">ویدئو</Link>
        <Link className={router?.pathname === "/images" ? "active" : ""} href="/images">تصویر</Link>
        <Link className={router?.pathname === "/blogs" ? "active" : ""} href="/blogs">وبلاگ</Link>
        <Link className={router?.pathname === "/aboutUs" ? "active" : ""} href="/aboutUs">درباره ما</Link>
    </nav>
  );
};

export default Navbar;
