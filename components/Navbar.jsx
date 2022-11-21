
import Link from 'next/link';
const Navbar = () => { 
  return (
    <nav className="w-full flex gap-12 navbarItem text-base">
        <Link href="#" className="active">خانه</Link>
        <Link href="#">ویدئو</Link>
        <Link href="#">تصویر</Link>
        <Link href="#">وبلاگ</Link>
        <Link href="#">درباره ما</Link>
    </nav>
  );
};

export default Navbar;
