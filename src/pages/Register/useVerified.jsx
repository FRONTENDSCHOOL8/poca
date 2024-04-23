// 참고자료
// https://www.youtube.com/watch?v=pw58zxqxHOk&list=PLqFvlDFoiZ-0ixIS8D4JTHRuVy_rkfROY&index=5

import { useState } from 'react';

import pb from '@/api/pocketbase';

export default function useVerified(email, isEmailValidated, isEmailUnique) {
  const [isVerificationButtonDisabled, setIsVerificationButtonDisabled] =
    useState(false);

  const [isEmailInputFieldReadOnly, setIsEmailInputFieldReadOnly] =
    useState(false);

  /* -------------------------------------------------------------------------- */
  /*                    이메일 인증을 위해서는 일단 register 필요                      */
  /* -------------------------------------------------------------------------- */
  const registerForEmailVerification = async (email) => {
    const data = {
      email: email,
      emailVisibility: true,
      password: '7Hx9eL3Pb1NcW4Qa2Rf5', //chatGPT가 만들어준 난수
      passwordConfirm: '7Hx9eL3Pb1NcW4Qa2Rf5',
    };

    try {
      await pb.collection('users').create(data);
    } catch (error) {
      alert('통신 에러');
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                         유저에게 인증메일 보내주는 함수                            */
  /* -------------------------------------------------------------------------- */
  const requestVerification = async (email) => {
    // const email = pb.authStore.model.email;
    const response = await pb.collection('users').requestVerification(email);
    try {
      if (response) {
        alert('인증메일이 보내졌습니다. 메일함을 확인해주세요.');
      }
    } catch (error) {
      alert('통신 에러');
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                       '인증하기' 버튼에 달릴 handler                            */
  /* -------------------------------------------------------------------------- */
  const handleEmailVerification = async (e) => {
    e.preventDefault();

    if (email !== '' && isEmailValidated && isEmailUnique) {
      setIsVerificationButtonDisabled(true); //인증하기 버튼 비활성화
      setIsEmailInputFieldReadOnly(true); //이메일 입력필드 읽기전용화

      registerForEmailVerification(email); //임시적으로 이메일만으로 계정 생성

      //setTimeout 안 쓰면 requestVerification 안 먹힘.
      setTimeout(() => {
        requestVerification(email);
      }, 900);
    } else {
      alert('이메일을 확인해주세요');
    }
  };

  return {
    handleEmailVerification,
    isVerificationButtonDisabled,
    isEmailInputFieldReadOnly,
  };
}
