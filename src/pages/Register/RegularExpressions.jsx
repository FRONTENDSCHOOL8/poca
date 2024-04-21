export function nameReg(text) {
  const re1 = /^[가-힣]{2,4}$/;
  const re2 = /^[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/;
  // const re = /^[가-힣]{2,4}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/;으로 검사하면 '김슝ㅁ'을 못 걸러냄;;
  return re1.test(String(text)) || re2.test(String(text));
}

export function emailReg(text) {
  // 이메일 형식에 맞게 입력했는지 체크
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(text));
}

export function pwdReg(text) {
  // 영문/숫자/특수문자 중 2가지 이상 조합, 10자리 이상
  const re =
    /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{10,}$/;
  return re.test(String(text));
}
