import { useId } from 'react';
import NavBarItem from './NavBarItem';
import { isLogin } from '@/store/store';
import { GoArrowSwitch, GoPerson, GoLocation, GoHome } from 'react-icons/go';

export default function NavBar() {
  const { init } = isLogin();

  const navItems = [
    { id: useId(), togo: '/', icon: GoHome, label: '홈' },
    { id: useId(), togo: '/exchange', icon: GoArrowSwitch, label: '교환' },
    { id: useId(), togo: '/meetup', icon: GoLocation, label: '밋업' },
    {
      id: useId(),
      togo: init ? '/profile' : '/login',
      icon: GoPerson,
      label: '프로필',
    },
  ];
  return (
    <div className="fixed bottom-0 z-10 w-full bg-white shadow-navShadow desktop:hidden">
      <ul className="flex items-center justify-between py-1">
        {navItems.map((item) => (
          <NavBarItem
            key={item.id}
            togo={item.togo}
            icon={item.icon}
            label={item.label}
          />
        ))}
      </ul>
    </div>
  );
}
