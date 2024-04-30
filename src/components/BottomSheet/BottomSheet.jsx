import { useState, useEffect, useRef } from 'react';
import { TextLayout, RadioLayout } from './BottomSheetLayout';
// import { bottomSheetWebAnimation } from './BottomSheetAnimation';
import BottomSheetAnimation2 from './BottomSheetAnimation2';
import { sorting } from '@/store/store';

export default function BottomSheet({
  itemList = [],
  isRadio = false,
  text = '',
  children,
  linkedBottomSheet,
  isOpen,
  setIsOpen,
  handleLatest,
  handleHigh,
  handleLow,
}) {
  // const [checkedName, setCheckedName] = useState(itemList[0]);
  const { init, change } = sorting();
  const [checkedName, setCheckedName] = useState(init);

  // console.log(init);

  const handleClick = (e) => {
    setCheckedName(e.target.name);
    change(e.target.name);

    if (e.target.name === '최신순') {
      handleLatest();
    } else if (e.target.name === '찜높은순') {
      handleHigh();
    } else if (e.target.name === '찜낮은순') {
      handleLow();
    }
  };

  const { handleStart, handleMove } = BottomSheetAnimation2(isOpen, setIsOpen);

  const radioLayout = (
    <RadioLayout
      itemList={itemList}
      onChange={handleClick}
      checkedName={checkedName}
    />
  );
  const textLayout = <TextLayout text={text} />;

  const layout = isRadio ? 'radio -bottom-100pxr' : 'text bottom-0';

  return (
    // 왜 rounded에는 pxr 적용이 안 되지?
    <div className="upSensor bg-transparent desktop:hidden">
      <div
        id={'bottomSheet'}
        className={`${layout} fixed z-40 flex w-full flex-col items-center rounded-tl-[30px] rounded-tr-[30px] bg-indigo-200 duration-1000`}
        ref={linkedBottomSheet}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
      >
        <div className="bottomSheetHandleWrap flex w-10/12 justify-center">
          <div className="bottomSheetHandle mb-12pxr mt-10pxr h-5pxr w-38pxr rounded-[5px] bg-zinc-100" />
        </div>
        {isRadio ? radioLayout : textLayout}
      </div>
    </div>
  );
}
