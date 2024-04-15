import { useEffect, useState } from 'react';
import pb from '@/api/pocketbase';
import { useNavigate } from 'react-router-dom';

export default function useSubmit(
  formData,
  isValidatedList,
  isEmailUnique,
  checkList,
  checkedList
) {
  const navigate = useNavigate();

  /* -------------------------------------------------------------------------- */
  /*                  유효성 검사 등을 다 통과해야 회원가입 버튼 활성화                    */
  /* -------------------------------------------------------------------------- */

  const [isRegisterButtonDisabled, setIsRegisterButtonDisabled] =
    useState(true);

  //모든 입력필드가 다 채워져 있는지 검사
  const isAllFilled = Object.values(formData).reduce((acc, cur) => acc && cur);

  //모든 입력필드가 형식에 맞게 채워졌는지 검사
  const isAllValidated = Object.values(isValidatedList).reduce(
    (acc, cur) => acc && cur
  );

  //필수약관이 모두 체크돼있는지 검사
  const requiredCheckList = checkList.slice(0, 3); //전체 약관 중 필수약관만 잘라내기
  const isRequiredChecked = requiredCheckList.reduce(
    (acc, cur) => acc && checkedList.includes(cur),
    true
  );

  //setIsRegisterButtonDisabled를 useEffect에 안 넣고 그냥 상태 변경해버리면 무한 루프에 빠짐.
  useEffect(() => {
    if (isAllFilled && isAllValidated && isEmailUnique && isRequiredChecked) {
      setIsRegisterButtonDisabled(false);
    } else {
      setIsRegisterButtonDisabled(true);
    }
  }, [isAllFilled, isAllValidated, isEmailUnique, isRequiredChecked]);

  /* -------------------------------------------------------------------------- */
  /*                               handleSubmit                                 */
  /* -------------------------------------------------------------------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: formData.name,
      password: formData.pwd,
      passwordConfirm: formData.pwdConfirm,
      oldPassword: '7Hx9eL3Pb1NcW4Qa2Rf5', //SDK에는 optional이라 돼있는데 필수였음;;
      birth:
        formData.birth.slice(0, 4) +
        '-' +
        formData.birth.slice(4, 6) +
        '-' +
        formData.birth.slice(6, 8),
      phoneNumber: formData.phone,
      collectBook: ['9mbahw8twzvbrwr'],
    };

    let user;

    try {
      user = await pb
        .collection('users')
        .getFirstListItem(`email="${formData.email}"`);
    } catch {
      alert('이메일 인증을 진행해주세요');
      return;
    }

    try {
      if (user.verified) {
        await pb.collection('users').update(user.id, data);
        alert('환엽합니다!');
        navigate('/');
      } else {
        alert('이메일이 인증되지 않았습니다');
      }
    } catch (error) {
      alert('통신 에러');
    }
  };

  return { isRegisterButtonDisabled, handleSubmit };
}
