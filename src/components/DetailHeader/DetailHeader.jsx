import { IoIosInformationCircleOutline as Information } from 'react-icons/io';
import { FaChevronLeft as LeftArrow } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import useBottomSheet from '../BottomSheet/useBottomSheet';
import BottomSheet from '../BottomSheet/BottomSheet';

// 리액트 라우터 - 뒤로가기 구현 시 참고한 자료
// https://velog.io/@jellyjw/React-useNavigate로-뒤로가기-기능-구현하기

export default function DetailHeader({
  isBottomSheet,
  title,
  isRadio = false,
  itemList = [],
  text = '',
  desktop,
}) {
  const navigate = useNavigate();
  const { button, linkedBottomSheet, isOpen, setIsOpen } = useBottomSheet();

  const flexLayout = isBottomSheet ? 'justify-between' : 'justify-center';
  const absolute = isBottomSheet ? '' : 'absolute left-5';

  return (
    <>
      <div
        className={`fixed top-0 flex h-12 w-full items-center shadow ${flexLayout} z-10 bg-white px-5 ${desktop}`}
      >
        <button className={`w-16pxr ${absolute}`}>
          <LeftArrow onClick={() => navigate(-1)} className="cursor-pointer" />
        </button>
        <div className="font-bold text-neutral-800">{title}</div>
        <div ref={button} hidden={!isBottomSheet}>
          <Information size="1.6rem" />
        </div>
      </div>

      <BottomSheet
        isRadio={isRadio}
        itemList={itemList}
        text={text}
        linkedBottomSheet={linkedBottomSheet}
        isOpen
        setIsOpen={setIsOpen}
      />
    </>
  );
}
