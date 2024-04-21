import { useRef, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { emailReg, nameReg, pwdReg } from './RegularExpressions';

export default function useValidation() {
  /* -------------------------------------------------------------------------- */
  /*                    formData, isValidatedList, isOnceList                   */
  /* -------------------------------------------------------------------------- */

  const users = useLoaderData();
  const userEmails = users.map((user) => user.email);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    pwd: '',
    pwdConfirm: '',
    phone: '',
    birth: '',
  });

  const [isValidatedList, setIsValidatedList] = useState({
    name: false,
    email: false,
    pwd: false,
    pwdConfirm: false,
    phone: false,
    birth: false,
  });

  const isOnceList = useRef({
    name: false,
    email: false,
    pwd: false,
    pwdConfirm: false,
    phone: false,
    birth: false,
  });

  /* -------------------------------------------------------------------------- */
  /*                 isAllFilled, isAllValidated, isEmailUnique                 */
  /* -------------------------------------------------------------------------- */

  //모든 입력필드가 다 채워져 있는지 검사
  const isAllFilled = Object.values(formData).reduce((acc, cur) => acc && cur);

  //모든 입력필드가 형식에 맞게 채워졌는지 검사
  const isAllValidated = Object.values(isValidatedList).reduce(
    (acc, cur) => acc && cur
  );

  const [isEmailUnique, setIsEmailUnique] = useState(true);

  /* -------------------------------------------------------------------------- */
  /*                              handleInputChange                             */
  /* -------------------------------------------------------------------------- */

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((formData) => ({
      ...formData,
      [name]:
        name !== 'phone'
          ? value
          : value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1'),
    }));

    isOnceList.current[name] = true; //적어도 한 번은 입력 시도되었음을 기억.

    if (name === 'name') {
      isValidatedList.name = nameReg(value); //value가 이름 형식이면 isValidatedList.name을 true로 설정.
    } else if (name === 'email') {
      isValidatedList.email = emailReg(value); //value가 이메일 형식이면 isValidatedList.email을 true로 설정.
      if (userEmails.includes(value)) {
        //formData.email가 아니라 value로 검사해야 함.
        setIsEmailUnique(false);
      } else {
        setIsEmailUnique(true);
      }
    } else if (name === 'pwd') {
      isValidatedList[name] = pwdReg(value); //value가 적합한 패스워드 형식이면 isValidatedList.pwd을 true로 설정.
      isValidatedList.pwdConfirm = value === formData.pwdConfirm; //value가 pwdConfirm과 같은면 isValidatedList.pwdConfrim을 true로 설정.
    } else if (name === 'pwdConfirm') {
      isValidatedList[name] = value === formData.pwd; //value가 pwd와 같은면 isValidatedList.pwdConfrim을 true로 설정.
    } else if (name === 'phone') {
      if (value.length < 11) {
        isValidatedList[name] = false;
      } else {
        isValidatedList[name] = true;
      }
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                                  setBirth                                  */
  /* -------------------------------------------------------------------------- */
  const setBirth = (newValue) => {
    const inputDate = new Date(newValue);

    const year = inputDate.getFullYear().toString();
    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to month because getMonth() returns zero-based month index
    const day = inputDate.getDate().toString().padStart(2, '0');
    let formattedDate = `${year}${month}${day}`;

    const length = inputDate.toString().length;
    const hour = inputDate.toString().slice(16, length - 24);

    isOnceList.birth = true; //일단 birth 한 번이라도 입력했으면 isOnce 값 true 됨.

    // 연원일이 (한 번 채워졌다가) 다 비워졌을 때는 fomattedDate가 19700101이기 때문에 formattedDate이 아닌 inputDate로 확인해야 함.
    if (hour === '09') {
      //연월일 한 번 채웠다가 비우면 inputDate가 Invalid Date가 아닌 1970년 1월 1일 09:00:00가 돼버림.
      //다행인 건 연월일에 1970, 01, 01을 입력하면 1970년 1월 1일 00:00:00이 돼서 hour로 구분이 된다는 것.
      //그래서 hour가 09라는 걸로 연월일이 한 번 채워졌다가 비워졌음을 알 수 있고, 이 사실을 이용해 hour가 '09'이면 formattedDate을 NaNNaNNaN으로 설정.
      formattedDate = '';
    }

    // 연월일 중 하나만 비어있을 때는 formattedDate이 'NaNNaNNaN'임.
    if (
      formattedDate === 'NaNNaNNaN' ||
      year < 1900 ||
      year > new Date().getFullYear()
    ) {
      isValidatedList.birth = false;
    } else {
      isValidatedList.birth = true;
    }

    setFormData((formData) => ({
      ...formData,
      birth: formattedDate,
    }));
  };

  return {
    formData,
    isValidatedList,
    isOnceList,
    isAllFilled,
    isAllValidated,
    isEmailUnique,
    handleInputChange,
    setBirth,
  };
}
