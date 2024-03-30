import { useState } from 'react';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import pb from '../../api/pocketbase';
import { useLoaderData, useNavigate } from 'react-router-dom';
import debounce from '@/utils/debounce';
import { Link } from 'react-router-dom';

export default function Register() {
  /* --------------------------------- 인풋 컨트롤 --------------------------------- */

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    pwd: '',
    pwdConfirm: '',
    phone: '',
    birth: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((formData) => ({ ...formData, [name]: value }));

    activateRegisterButton();
  };

  //email 인풋은 중복확인 때문에 따로 처리해줘야 함 : 사용자가 중복확인 통과 후(즉 중복확인 버튼 비활성화 후) 다시 이메일 인풋박스에 입력하면 중복확인 버튼 활성화되게.
  const handleEmailInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((formData) => ({ ...formData, [name]: value }));

    setIsEmailCheckButtonDisabled(false);

    activateRegisterButton();
  };

  //phone 인풋은 번호만 입력되게 따로 처리해줘야 함.
  const handlePhoneInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((formData) => ({ ...formData, [name]: value }));
    // setFormData((formData) => ({
    //   ...formData,
    //   [name]: value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1'),
    // }));

    activateRegisterButton();
  };

  /* ----------------------------------- 제출 ----------------------------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: formData.email,
      password: formData.pwd,
      passwordConfirm: formData.pwdConfirm,
      birth: formData.birth,
      phoneNumber: formData.phone,
      name: formData.name,
      collectBook: ['9mbahw8twzvbrwr'],
    };

    try {
      await pb.collection('users').create(data);
    } catch (error) {
      alert('입력사항을 다시 확인해주세요.');
    }
  };

  /* ---------------------------------- 체크리스트 --------------------------------- */

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

    activateRegisterButton();
  };

  /* --------------------------------- 중복확인 버튼 -------------------------------- */

  const [isEmailCheckButtonDisabled, setIsEmailCheckButtonDisabled] =
    useState(false);

  const users = useLoaderData();

  const handleEmailCheck = (e) => {
    const userEmails = users.map((user) => user.email); //왜 email 입력돼있는데도 users 데이터 열어보면 각 user에 email 안 들어가있지?

    if (userEmails.includes(formData.email)) {
      alert('입력하신 이메일이 이미 존재합니다');
      setIsEmailCheckButtonDisabled(false);
    } else {
      alert('사용 가능한 이메일입니다');
      setIsEmailCheckButtonDisabled(true);
    }

    activateRegisterButton();
  };

  /* --------------------------------- 모두동의 버튼 -------------------------------- */

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

    setIsRegisterButtonDisabled(!isRegisterButtonDisabled);

    activateRegisterButton();
  };

  /* --------------------------------- 회원가입 버튼 -------------------------------- */

  const [isRegisterButtonDisabled, setIsRegisterButtonDisabled] =
    useState(true);

  //회원가입 버튼 활성화
  function activateRegisterButton() {
    let filled = false;
    filled = Object.values(formData).reduce((prev, cur) => !!prev && !!cur);

    filled &&
    isEmailCheckButtonDisabled &&
    agreeAllButtonStyle.bg === 'bg-primary'
      ? setIsRegisterButtonDisabled(false)
      : setIsRegisterButtonDisabled(true);
  }

  /* ----------------------------------- 마크업 ---------------------------------- */

  return (
    <div className="flex flex-col items-center justify-center bg-white py-35pxr">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-6"
      >
        <Input
          name="name"
          defaultValue={formData.name}
          onChange={debounce(handleInputChange)}
          type="text"
          placeholder="이름"
          customClassNames="h-9 mt-1"
          bgClassName="bg-gray-100"
          isLabeled
          label="이름"
          mt={16}
        />

        <div className="flex flex-col gap-2">
          <Input
            name="email"
            defaultValue={formData.email}
            onChange={handleEmailInputChange}
            type="text"
            placeholder="이메일"
            customClassNames="h-9 mt-1"
            bgClassName="bg-gray-100"
            isLabeled
            label="이메일"
          />

          <Button
            type="button"
            isSmall
            isDisabled={isEmailCheckButtonDisabled}
            customClassNames="self-end"
            onClick={handleEmailCheck}
          >
            중복확인
          </Button>
        </div>

        <div className="flex flex-col">
          <Input
            name="pwd"
            defaultValue={formData.pwd}
            onChange={debounce(handleInputChange)}
            type="password"
            customClassNames="h-9 mt-1"
            placeholder="비밀번호 입력 (영어+숫자 8자 이상)"
            bgClassName="bg-gray-100"
            isLabeled
            label="비밀번호"
          />
          <Input
            name="pwdConfirm"
            defaultValue={formData.pwdConfirm}
            onChange={debounce(handleInputChange)}
            type="password"
            placeholder="비밀번호 재확인"
            customClassNames="h-9 mt-2"
            bgClassName="bg-gray-100"
          />
        </div>

        <Input
          name="phone"
          defaultValue={formData.phone}
          onChange={handlePhoneInputChange}
          type="text"
          placeholder="숫자만 입력해주세요"
          customClassNames="h-9 mt-1"
          bgClassName="bg-gray-100"
          isLabeled
          label="휴대폰 번호"
          maxLength="11"
        />

        <Input
          name="birth"
          defaultValue={formData.birth}
          onChange={debounce(handleInputChange)}
          type="text"
          placeholder="생년월일"
          customClassNames="h-9 mt-1"
          bgClassName="bg-gray-100"
          isLabeled
          label="생년월일"
        />

        <div className="flex w-full flex-col">
          <div className="self-start text-xs font-extrabold text-neutral-700">
            이용 약관 동의
          </div>

          <Button
            type="button"
            onClick={handleAgreeAll}
            bgClassName={agreeAllButtonStyle.bg}
            textColorClassName={agreeAllButtonStyle.text}
            customClassNames="h-9 mt-1"
          >
            네, 모두 동의합니다.
          </Button>

          <div className="mt-3 flex flex-col gap-3 px-2">
            <TermsCheckbox
              name={checkList[0]}
              checkedList={checkedList}
              onChange={handleCheckboxChange}
            >
              [필수] 만 14세 이상입니다.
            </TermsCheckbox>

            <TermsCheckbox
              name={checkList[1]}
              checkedList={checkedList}
              onChange={handleCheckboxChange}
            >
              [필수] 서비스 이용약관 동의 {'>'}
            </TermsCheckbox>

            <TermsCheckbox
              name={checkList[2]}
              checkedList={checkedList}
              onChange={handleCheckboxChange}
            >
              [필수] 개인정보 처리방침 동의 {'>'}
            </TermsCheckbox>

            <TermsCheckbox
              name={checkList[3]}
              checkedList={checkedList}
              onChange={handleCheckboxChange}
            >
              [선택] 마케팅 수신 동의
            </TermsCheckbox>
          </div>
        </div>

        <Link to="/">
          <Button
            type="submit"
            isDisabled={isRegisterButtonDisabled}
            customClassNames="mt-4"
          >
            가입하기
          </Button>
        </Link>
      </form>
    </div>
  );
}

function TermsCheckbox({ name, checkedList, onChange, children }) {
  const checked = checkedList.includes(name);

  const checkboxStyle = checked
    ? { background: "url('/checkboxChecked.svg') no-repeat" }
    : { background: "url('/checkboxUnchecked.svg') no-repeat" };

  return (
    <label className="relative flex justify-between">
      <span className="text-xs font-medium leading-none text-zinc-800">
        {children}
      </span>
      <input
        name={name}
        checked={checked}
        onChange={onChange}
        type="checkbox"
        className="absolute right-0 h-3 w-3 appearance-none"
      />
      <span className="h-3 w-3" style={checkboxStyle}></span>
    </label>
  );
}
