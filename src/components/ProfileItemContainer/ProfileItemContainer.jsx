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
  return (
    <>
      <div className="h-50 mx-20pxr flex flex-col rounded-[10px] bg-white bg-opacity-70 pb-10pxr shadow-lg">
        <div className="flex items-center gap-1 p-3 text-18pxr font-m01 text-gray-700">
          <FaRegAddressBook />
          <span>{title}</span>
          <FaAngleRight className="ml-auto" />
        </div>

        <div className="mx-3 overflow-x-scroll">{children}</div>
      </div>
    </>
  );
}
