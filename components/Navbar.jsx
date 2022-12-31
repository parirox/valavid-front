
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const links = [
  {
    title: 'خانه',
    href: '/'
  },
  {
    title: 'ویدئو',
    href: '/videos'
  },
  {
    title: 'تصویر',
    href: '/pictures'
  },
  {
    title: 'وبلاگ',
    href: '/blog'
  },
  {
    title: 'درباره ی ما',
    href: '/aboutUs'
  },
  {
    title: 'سوالات متداول',
    href: '/faq'
  },
]

const Navbar = ({styleMode}) => { 
  const router = useRouter()
  return (
    <nav className={`w-full flex gap-12 navbarItem text-base ${styleMode === 'blog' ? 'text-secondary' : ''}`}>
        {
          links.map((page, index) => (
            <Link href={page.href} className={`${styleMode === 'blog' ? 'text-secondary' : ''} ${router?.pathname === page.href ? 'active' : ''}`} key={index}>{page.title}</Link>
          ))
        }
    </nav>
  );
};

export default Navbar;
