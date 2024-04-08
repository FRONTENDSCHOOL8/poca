import { Link } from 'react-router-dom';

// 참고자료 1 : https://velog.io/@runprogrmm/React-소셜-로그인-구현-카카오-구글-네이버
// 참고자료 2 : https://velog.io/@runprogrmm/React-%EC%86%8C%EC%85%9C-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B5%AC%ED%98%84-%EC%B9%B4%EC%B9%B4%EC%98%A4-%EA%B5%AC%EA%B8%80-%EB%84%A4%EC%9D%B4%EB%B2%84

// 기타 참고자료 :
// https://velog.io/@taylorkwon92/TIL-%EB%84%A4%EC%9D%B4%EB%B2%84-%EB%A1%9C%EA%B7%B8%EC%9D%B8-API-in-React-TypeScript
// https://velog.io/@kados22/react-%EB%84%A4%EC%9D%B4%EB%B2%84-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B5%AC%ED%98%84-%EC%BB%A4%EC%8A%A4%ED%85%80
// https://velog.io/@iamminzzy/TIL-%EB%84%A4%EC%9D%B4%EB%B2%84-%EB%A1%9C%EA%B7%B8%EC%9D%B8-CORS-%EC%97%90%EB%9F%AC-%ED%95%B4%EA%B2%B0
// https://velog.io/@pakxe/React-%EC%A0%95%EB%A7%90-%EC%89%BD%EB%8B%A4-%EC%B9%B4%EC%B9%B4%EC%98%A4-%EC%86%8C%EC%85%9C-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%90%EC%84%9C-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B3%A0-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0
// https://data-jj.tistory.com/53
// https://velog.io/@rxxdo/%EB%84%A4%EC%9D%B4%EB%B2%84-%EC%86%8C%EC%85%9C-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0-1%EB%B6%80
// https://zindex.tistory.com/227

export default function NaverLogin() {
  const REST_API_KEY = '1YUgjJMsHQeWOQSVCow4';
  const REDIRECT_URI = 'http://localhost:3000/authNaver';
  const NAVER_STATE = 'test';
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?client_id=${REST_API_KEY}&response_type=code&redirect_uri=${REDIRECT_URI}&state=${NAVER_STATE}`;

  return (
    <Link to={NAVER_AUTH_URL}>
      <img src="/icons/naver.svg" />
    </Link>
  );
}
