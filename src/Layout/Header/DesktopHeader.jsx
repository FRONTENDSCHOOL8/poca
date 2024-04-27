import { Link, useLocation } from 'react-router-dom';

export default function DesktopHeader() {
  const { pathname } = useLocation();
  const isActive = pathname === menu.to;
  return (
    <div className="hidden desktop:block">
      <div
        role="banner"
        className="flex h-100pxr flex-row items-center justify-between bg-white px-4"
      >
        <img
          src="/icons/shoongLogo.svg"
          alt="슝"
          className="inline max-h-60pxr"
        />
        <div role="menu" className="inline-flex flex-row gap-5">
          {menu.map((item, index) => (
            <Link to={item.to} key={index}>
              <p
                className={`${isActive ? 'text-primary' : 'text-contentPrimary'} text-2xl`}
              >
                {item.text}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

const menu = [
  { text: 'HOME', to: './' },
  { text: '교환', to: './exchange' },
  { text: '밋업', to: './meetup' },
  { text: '프로필', to: './profile' },
];
