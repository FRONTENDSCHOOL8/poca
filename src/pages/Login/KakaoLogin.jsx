import { Link } from 'react-router-dom';

// 참고자료 :
// https://velog.io/@koyk0408/flutter-%EC%B9%B4%EC%B9%B4%EC%98%A4%EB%A1%9C%EA%B7%B8%EC%9D%B8
// https://velog.io/@qnrl3442/%ED%8C%80-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%82%AC%EC%A0%84-%EC%A4%80%EB%B9%84
// https://pocketbase.io/docs/authentication/#oauth2-integration

export default function KakaoLogin() {
  const REST_API_KEY = 'ec43bb3c5745d602305ce49fdcaa89f9';
  const REDIRECT_URI = 'http://localhost:3000/api/oauth2-redirect';
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <Link to={KAKAO_AUTH_URL}>
      <img src="/icons/kakao.svg" />
    </Link>
  );
}
