import { NavLink } from 'react-router-dom';

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
