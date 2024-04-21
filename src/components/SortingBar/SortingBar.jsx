import { useRef } from 'react';
import { FaAngleDown, FaSort, FaCircleXmark } from 'react-icons/fa6';
import useBottomSheet from '../BottomSheet/useBottomSheet';
import BottomSheet from '../BottomSheet/BottomSheet';
import { sorting } from '@/store/store';

export default function SortingBar({ phoca, SetPhoca, biasData }) {
  const categoryRef = useRef(null);

  const handleLatest = () => SetPhoca(biasData);
  const handleHigh = () => {
    const high = [...phoca].sort((a, b) => b.likeCount - a.likeCount);
    SetPhoca(high);
  };
  const handleLow = () => {
    const low = [...phoca].sort((a, b) => a.likeCount - b.likeCount);
    SetPhoca(low);
  };

  const { button, linkedBottomSheet, isOpen, setIsOpen } = useBottomSheet();
  const { init } = sorting();

  return (
    <>
      <BottomSheet
        isRadio={true}
        itemList={['최신순', '찜높은순', '찜낮은순']}
        linkedBottomSheet={linkedBottomSheet}
        setIsOpen={setIsOpen}
        handleLatest={handleLatest}
        handleHigh={handleHigh}
        handleLow={handleLow}
      />

      <div className="flex justify-end py-10pxr pr-15pxr">
        <button
          ref={button}
          type="button"
          className="flex h-30pxr w-100pxr items-center justify-evenly rounded border border-zinc-500 bg-white bg-opacity-40 "
        >
          <FaSort />
          <span className="text-sm font-medium  leading-tight">{init}</span>
          <FaAngleDown />
        </button>
      </div>
    </>
  );
}
