import { useState } from 'react';
import { useRef } from 'react';
import { FaRegAddressBook, FaAngleRight } from 'react-icons/fa6';

/**
 *
 * @param {{
 *    title?:string
 *    children?:React.ReactNode
 * }} props
 * @returns
 */

export default function ProfileItemContainer({ title, children }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div className="draggable mx-20pxr flex h-52 flex-col rounded-[10px] bg-white bg-opacity-70 pb-10pxr shadow-lg">
        <div className="flex items-center gap-1 p-3 text-18pxr font-m01 text-gray-700">
          <FaRegAddressBook />
          <span>{title}</span>
          <FaAngleRight className="ml-auto" />
        </div>

        <div
          className={`mx-3 overflow-y-hidden overflow-x-scroll ${isHovered ? 'showScrollbar' : ''}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {children}
        </div>
      </div>
    </>
  );
}
