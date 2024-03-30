import { useState } from 'react';

export default function BottomSheetAnimation2(isOpen, setIsOpen) {
  const [bottomTouchStart, setBottomTouchStart] = useState(0);

  // console.log('this is outer space of event handlers');
  const handleStart = (e) => {
    // console.log(
    //   '-------------------------------------------------------------------'
    // );
    // console.log('bottomTouchStart of handleStart :', bottomTouchStart);
    setBottomTouchStart(e.clientY);
    // console.log('bottomTouchStart of handleStart :', bottomTouchStart);
  };

  const handleMove = (e) => {
    // console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
    // console.log('bottomTouchStart of handleMove :', bottomTouchStart);
    // console.log('e.clientY :', e.clientY);
    //사용자가 아래로 내렸을 경우 ("클릭 상태"에서 내리고 있어야 함)
    if (bottomTouchStart - e.clientY < -10 && e.buttons === 1) {
      // console.log('****************************************');
      // console.log(bottomTouchStart - e.clientY);
      //바텀시트 내리기
      document.getElementById('bottomSheet').style.height = '0px';
      setIsOpen((isOpen) => !isOpen);
    }
  };

  return { handleStart, handleMove };
}
