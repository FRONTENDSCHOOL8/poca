import { FaChevronRight as RightArrow } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

export default function NavigationTile({ to, text, className }) {
  const customStyle = `flex items-center justify-between bg-white bg-opacity-50 px-6 py-4 text-b03 font-sb03 text-gray500 transition duration-300 ease-in-out hover:text-primary ${className}`;

  return (
    <Link to={to} className={customStyle}>
      <span>{text}</span>
      <RightArrow className="ml-2 desktop:hidden" />
    </Link>
  );
}
