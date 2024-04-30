import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function DesktopHeader() {
  const { pathname } = useLocation();
  const [setActiveMenuItem] = useState(useLocation().pathname);
  const isActive = (item) => {
    return item.to === pathname;
  };

  return (
    <div role="none" className="mx-auto hidden  bg-white desktop:block">
      <div
        role="banner"
        className="flex h-100pxr flex-row items-center justify-between px-4"
      >
        <img
          src="/icons/shoongLogo.svg"
          alt="슝"
          className="inline max-h-60pxr"
        />
        <div role="menu" className="inline-flex flex-row gap-8">
          {menu.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className={`${isActive(item) ? 'font-bold text-primary' : 'text-contentPrimary'} text-2xl`}
              onClick={() => setActiveMenuItem(item.to)}
            >
              {item.text}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

const menu = [
  { text: 'HOME', to: '/' },
  { text: '교환', to: '/exchange' },
  { text: '밋업', to: '/meetup' },
  { text: '프로필', to: '/profile' },
];
