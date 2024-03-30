import { NavLink } from 'react-router-dom';

/**
 *
 * @param {{
 *  togo: string,
 *  label: string,
 *  icon: React.ElementType
 * }} props 컴포넌트의 props 정의
 * @returns
 */

export default function NavBarItem({ togo, label, icon: Icon }) {
  return (
    <li className="w-2/12 cursor-pointer text-contentTertiary hover:text-primary">
      <NavLink
        to={togo}
        className={({ isActive }) =>
          isActive
            ? 'flex flex-col items-center  text-primary'
            : 'flex flex-col items-center '
        }
      >
        <Icon className="h-8 w-22pxr" />
        {label}
      </NavLink>
    </li>
  );
}
