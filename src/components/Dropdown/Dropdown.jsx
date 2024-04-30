import { FaAngleDown, FaSort } from 'react-icons/fa6';


export default function Dropdown({ options, onChange, defaultValue }) {
  return (
    <div className="relative flex justify-end py-2 pr-3">
      <div className="dropdown">
        <button className="flex items-center justify-between bg-white border border-gray-400 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:shadow-outline hover:bg-gray-50 w-64">
          {defaultValue} <FaAngleDown className="ml-2" />
        </button>
        <ul className="dropdown-menu absolute hidden text-gray-700 pt-1 w-64">
          {options.map((option, index) => (
            <li key={index} className="">
              <a
                className="rounded-t bg-white hover:bg-gray-100 py-2 px-4 block whitespace-no-wrap"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onChange(option);
                }}
              >
                {option}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
