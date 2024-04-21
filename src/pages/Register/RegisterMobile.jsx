import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import debounce from '@/utils/debounce';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TermsCheckbox from './TermsCheckbox';
import useCheckbox from './useCheckbox';
import useSubmit from './useSubmit';
import useValidation from './useValidation';
import useVerified from './useVerified';
// import express from 'express';
// import phone from 'phone';
// import Twilio from './Twilio';

// export default function Register() {
//   return (
//     <div>
//       hello<br></br>hello<br></br>hello<br></br>hello<br></br>hello<br></br>
//       hello<br></br>hello<br></br>
//     </div>
//   );
// }

export default function Register() {
  /* -------------------------------------------------------------------------- */
  /*                                    커스텀훅                                    */
  /* -------------------------------------------------------------------------- */

  const {
    formData,
    isValidatedList,
    isOnceList,
    isAllFilled,
    isAllValidated,
    isEmailUnique,
    handleInputChange,
    setBirth,
  } = useValidation();

  const {
    handleEmailVerification,
    isVerificationButtonDisabled,
    isEmailInputFieldReadOnly,
  } = useVerified(formData.email, isValidatedList.email, isEmailUnique);

  const {
    termsCheckboxList,
    checkList,
    checkedList,
    isRequiredChecked,
    handleCheckboxChange,
    agreeAllButtonStyle,
    handleAgreeAll,
  } = useCheckbox();

  const { isRegisterButtonDisabled, handleSubmit } = useSubmit(
    formData,
    isAllFilled,
    isAllValidated,
    isEmailUnique,
    isRequiredChecked
  );

  /* -------------------------------------------------------------------------- */
  /*                                     마크업                                    */
  /* -------------------------------------------------------------------------- */

  return (
    <div className="bg-white pb-10 pt-24">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex w-265pxr flex-col gap-6"
      >
        {/* -------------------------------------------------------------------------- */
        /*                                    name                                   */
        /* -------------------------------------------------------------------------- */}
        <div className="name flex flex-col">
          <Input
            name="name"
            defaultValue={formData.name}
            onChange={debounce(handleInputChange)}
            type="text"
            placeholder="김슝 / Shoong Kim"
            customClassNames="h-9 mt-1"
            bgClassName="bg-gray-100"
            isLabeled
            label="이름"
          />

          <p //name 인풋 박스 비워져있는데 한 번이라도 입력한 적 있으면 입력하라는 메시지 보여주기
            className="mt-1 pl-2 text-xs text-red-500"
            style={{
              display:
                formData.name === '' && isOnceList.current.name ? '' : 'none',
            }}
          >
            이름을 입력해주세요
          </p>

          <p //name 인풋 박스 채워졌는데 이름 형식 안 지켰으면 형식 지키라는 메시지 보여주기
            className="mt-1 pl-2 text-xs text-red-500"
            style={{
              display:
                formData.name !== '' && !isValidatedList.name ? '' : 'none',
            }}
          >
            이름 형식으로 입력해주세요
          </p>
        </div>
        {/* -------------------------------------------------------------------------- */
        /*                                    email                                   */
        /* -------------------------------------------------------------------------- */}
        <div className="email flex flex-col">
          <Input
            name="email"
            defaultValue={formData.email}
            onChange={debounce(handleInputChange)}
            type="text"
            placeholder="shoong@gmail.com"
            customClassNames="h-9 mt-1"
            bgClassName="bg-gray-100"
            isLabeled
            label="이메일"
            readOnly={isEmailInputFieldReadOnly}
          />

          <p //email 인풋 박스 비워져있는데 한 번이라도 입력한 적 있으면 입력하라는 메시지 보여주기
            className="mt-1 pl-2 text-xs text-red-500"
            style={{
              display:
                formData.email === '' && isOnceList.current.email ? '' : 'none',
            }}
          >
            이메일을 입력해주세요
          </p>

          <p //email 인풋 박스 채워졌는데 이메일 형식 안 지켰으면 형식 지키라는 메시지 보여주기
            className="mt-1 pl-2 text-xs text-red-500"
            style={{
              display:
                formData.email !== '' && !isValidatedList.email ? '' : 'none',
            }}
          >
            이메일 형식으로 입력해주세요
          </p>

          <p //email 이메일 형식 지켜서 잘 입력했는데 이미 가입된 이메일이면 이미 가입된 메일이라는 메시지 보여주기
            className="mt-1 pl-2 text-xs text-red-500"
            style={{
              display: isValidatedList.email && !isEmailUnique ? '' : 'none',
            }}
          >
            이미 가입된 이메일입니다.
          </p>

          <Button
            type="button"
            isSmall
            customClassNames="self-end mt-2"
            onClick={handleEmailVerification}
            isDisabled={isVerificationButtonDisabled}
          >
            인증하기
          </Button>
        </div>
        {/* -------------------------------------------------------------------------- */
        /*                                    pwd                                     */
        /* -------------------------------------------------------------------------- */}
        <div className="pwd flex flex-col">
          <Input
            name="pwd"
            defaultValue={formData.pwd}
            onChange={debounce(handleInputChange)}
            type="password"
            customClassNames="h-9 mt-1"
            placeholder="비밀번호 입력"
            bgClassName="bg-gray-100"
            isLabeled
            label="비밀번호"
          />

          <p //pwd 길이 10자 안 되는데 한 번이라도 입력한 적 있으면 입력하라는 메시지 보여주기
            className="mt-1 pl-2 text-xs text-red-500"
            style={{
              display:
                formData.pwd.length < 10 && isOnceList.current.pwd
                  ? ''
                  : 'none',
            }}
          >
            최소 10자 이상 입력해주세요.
          </p>
          <p //pwd 길이 10자 넘었는데 패스워드 형식 안 지켰으면 형식 지키라는 메시지 보여주기
            className="mt-1 pl-2 text-xs text-red-500"
            style={{
              display:
                formData.pwd.length >= 10 && !isValidatedList.pwd ? '' : 'none',
            }}
          >
            영문/숫자/특수문자(공백 제외)만 허용, 2개 이상 조합
          </p>

          {/* -------------------------------------------------------------------------- */
          /*                                    pwdConfirm                               */
          /* -------------------------------------------------------------------------- */}

          <Input
            name="pwdConfirm"
            defaultValue={formData.pwdConfirm}
            onChange={debounce(handleInputChange)}
            type="password"
            placeholder="비밀번호 재확인"
            customClassNames="h-9 mt-2"
            bgClassName="bg-gray-100"
          />

          <p //pwdConfirm 인풋 박스 비워져있는데 한 번이라도 입력한 적 있으면 입력하라는 메시지 보여주기
            className="mt-1 pl-2 text-xs text-red-500"
            style={{
              display:
                formData.pwdConfirm === '' && isOnceList.current.pwdConfirm
                  ? ''
                  : 'none',
            }}
          >
            비밀번호를 한 번 더 입력해주세요.
          </p>
          <p //pwdConfirm 인풋 박스 채워졌는데 pwd랑 안 똑같으면 동일한 비번 입력하라는 메시지 보여주기
            className="mt-1 pl-2 text-xs text-red-500"
            style={{
              display:
                formData.pwdConfirm !== '' && !isValidatedList.pwdConfirm
                  ? ''
                  : 'none',
            }}
          >
            동일한 비밀번호를 입력해주세요.
          </p>
        </div>

        {/* -------------------------------------------------------------------------- */
        /*                                    phone                                   */
        /* -------------------------------------------------------------------------- */}
        <div className="phone flex flex-col">
          <Input
            name="phone"
            value={formData.phone}
            //debounce 적용하려면 value 대신 defaultValue 써야 되는데 그렇게 되면 숫자만 입력되게 만들지를 못함..
            onChange={handleInputChange}
            type="text"
            placeholder="01012345678"
            customClassNames="h-9 mt-1"
            bgClassName="bg-gray-100"
            isLabeled
            label="휴대폰 번호"
            maxLength="11"
          />

          <p //phone 인풋 박스 비워져있는데 한 번이라도 입력한 적 있으면 입력하라는 메시지 보여주기
            className="mt-1 pl-2 text-xs text-red-500"
            style={{
              display:
                formData.phone === '' && isOnceList.current.phone ? '' : 'none',
            }}
          >
            휴대폰번호를 입력해주세요.
          </p>

          <p //phone 인풋 박스 채워졌는데 11자리 안 되면 제대로 입력하라는 메시지 보여주기
            className="mt-1 pl-2 text-xs text-red-500"
            style={{
              display:
                formData.phone !== '' && !isValidatedList.phone ? '' : 'none',
            }}
          >
            휴대폰번호를 올바르게 입력해주세요.
          </p>

          {/* <Button
            type="button"
            isSmall
            customClassNames="self-end mt-2 w-96pxr"
          >
            인증번호 받기
          </Button> */}
        </div>

        {/* ---------------------------------- 참고자료 ---------------------------------- */}
        {/* ---------------------- https://dawonny.tistory.com/403 ------------------- */}
        {/* ------------ https://mui.com/x/react-date-pickers/date-picker/ ----------- */}
        {/* ----------- https://mui.com/x/react-date-pickers/custom-field/ ----------- */}
        {/* ------------- https://mui.com/x/api/date-pickers/date-picker/ ------------ */}
        <div className="birth flex flex-col gap-1">
          <div className="text-xs font-semibold text-primary">생년월일</div>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              className="MuiOutlinedInput-notchedOutline MuiInputBase-root"
              onChange={setBirth}
              format="YYYY / MM / DD"
              slotProps={{
                textField: {
                  size: 'small',
                  sx: {
                    fontSize: '1px',
                    borderRadius: '0.625rem',
                    width: '16.56rem',
                    height: '2.22rem',
                    backgroundColor: 'rgb(243 244 246)',
                    contentEditable: 'false',
                  },
                },
              }}
              style={{ width: '2000px' }}
            />
          </LocalizationProvider>

          <p //birth 인풋 박스 비워져있는데 한 번이라도 입력한 적 있으면 입력하라는 메시지 보여주기
            className="mt-1 pl-2 text-xs text-red-500"
            style={{
              display:
                isOnceList.birth === true && formData.birth === ''
                  ? ''
                  : 'none',
            }}
          >
            생년월일을 입력해주세요.
          </p>

          <p //birth 인풋 박스 채워졌는데 형식이 올바르지 않으면 올바르게 입력하라는 메시지 보여주기
            className="mt-1 pl-2 text-xs text-red-500"
            style={{
              display:
                formData.birth !== '' && !isValidatedList.birth ? '' : 'none',
            }}
          >
            생년월일을 올바르게 입력해주세요.
          </p>
        </div>

        {/* -------------------------------------------------------------------------- */
        /*                                    이용약관 동의                                */
        /* -------------------------------------------------------------------------- */}
        <div className="agree mb-4 flex w-full flex-col">
          <div className="self-start text-xs font-extrabold text-neutral-700">
            이용 약관 동의
          </div>

          <Button
            type="button"
            onClick={handleAgreeAll}
            bgClassName={agreeAllButtonStyle.bg}
            textColorClassName={agreeAllButtonStyle.text}
            customClassNames="mt-1"
          >
            네, 모두 동의합니다.
          </Button>

          <div className="mt-3 flex flex-col gap-3 px-2">
            {termsCheckboxList.map((item, index) => (
              <TermsCheckbox
                key={index}
                name={checkList[index]}
                checkedList={checkedList}
                onChange={handleCheckboxChange}
              >
                {item}
              </TermsCheckbox>
            ))}
          </div>
        </div>
        <Button type="submit" isDisabled={isRegisterButtonDisabled}>
          가입하기
        </Button>
      </form>
    </div>
  );
}
