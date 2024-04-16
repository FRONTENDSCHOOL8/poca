import { useState } from 'react';

export default function useCheckbox() {
  /* -------------------------------------------------------------------------- */
  /*                                  체크박스 컨트롤                                  */
  /* -------------------------------------------------------------------------- */

  const checkList = [
    'agreeOverFourteen',
    'agreeService',
    'agreePersonalInfo',
    'agreeMarketing',
  ];
  const [checkedList, setCheckedList] = useState([]);

  const handleCheckboxChange = (e) => {
    // checkedList.includes(e.target.name)와 console.log(e.target.checked)는 반대되는 값임에 주의
    // 가령 맨 처음 상태에서 아무것도 체크 안했을 때 체크박스 하나를 체크해서 이 handleCheckboxChange 발동하는 순간, 전자는 false인 반면 후자는 true임.

    const newCheckedList = checkedList.includes(e.target.name)
      ? checkedList.filter((name) => name !== e.target.name)
      : [...checkedList, e.target.name];

    setCheckedList((checkedList) => newCheckedList);

    newCheckedList.length === checkList.length
      ? setAgreeAllButtonStyle({
          bg: 'bg-primary',
          text: 'text-white',
        })
      : setAgreeAllButtonStyle({
          bg: 'bg-gray-100',
          text: 'text-contentTertiary',
        });

    // activateRegisterButton();
  };

  /* -------------------------------------------------------------------------- */
  /*                                   모두동의 버튼                                  */
  /* -------------------------------------------------------------------------- */

  const [agreeAllButtonStyle, setAgreeAllButtonStyle] = useState({
    bg: 'bg-gray-100',
    text: 'text-contentTertiary',
  });

  const handleAgreeAll = (e) => {
    checkedList.length === checkList.length
      ? setCheckedList((checkedList) => [])
      : setCheckedList((checkedList) => checkList);

    checkedList.length === checkList.length
      ? setAgreeAllButtonStyle({
          bg: 'bg-gray-100',
          text: 'text-contentTertiary',
        })
      : setAgreeAllButtonStyle({
          bg: 'bg-primary',
          text: 'text-white',
        });

    // setIsRegisterButtonDisabled(!isRegisterButtonDisabled);

    // activateRegisterButton();
  };

  return {
    checkList,
    checkedList,
    handleCheckboxChange,
    agreeAllButtonStyle,
    handleAgreeAll,
  };
}
