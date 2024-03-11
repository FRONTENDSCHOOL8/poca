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
}) {
  const navigate = useNavigate();
  const { button, linkedBottomSheet, isOpen, setIsOpen } = useBottomSheet();

  const flexLayout = isBottomSheet ? 'justify-between' : 'gap-135pxr';

  return (
    <>
      <div
        className={`fixed flex h-12 w-full items-center ${flexLayout} bg-white px-5`}
      >
        <div className="w-30pxr">
          <LeftArrow onClick={() => navigate(-1)} />
        </div>
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
