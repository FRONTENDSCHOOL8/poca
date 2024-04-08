// import axios from 'axios';
// import { useEffect } from 'react';
// import { useCookies } from 'react-cookie';
// import { useNavigate } from 'react-router-dom';

// export default function NaverRedirect() {
//   const CODE = new URL(window.location.href).searchParams.get('code'); // 현재 URL에서 코드만 추출
//   console.log(CODE);

//   const [cookies, setCookie] = useCookies();
//   const navigate = useNavigate();

//   // 컴포넌트가 마운트되면 로그인 로직 실행
//   useEffect(() => {
//     const REST_API_KEY = '1YUgjJMsHQeWOQSVCow4';
//     const REST_API_KEY_SECRET = 'v_XPlWlFy4';
//     const NAVER_STATE = 'test';
//     const REDIRECT_URI = 'http://localhost:3000/authNaver';

//     async function NaverLogin() {
//       const res = await axios.get(''); // 이 부분은 서버 API에 따라 바뀔 수 있으니 API 명세서를 잘 확인하세요.
//       console.log(res);
//       const ACCESS_TOKEN = res.headers['authorization'];
//       const REFRESH_TOKEN = res.headers['refresh-token'];
//       setCookie('accessToken', ACCESS_TOKEN);
//       setCookie('refreshToken', REFRESH_TOKEN);

//       // const naverTokenLink = `/oauth2.0/token?grant_type=authorization_code&client_id=${REST_API_KEY}&client_secret=${REST_API_KEY_SECRET}&code=${CODE}&state=${NAVER_STATE}`;
//       // return await axios.get(naverTokenLink);
//     }
//     // console.log(NaverLogin());
//     NaverLogin();

//     // navigate('/', { replace: true }); // 로그인 완료시 메인으로 이동
//   }, [CODE, navigate, setCookie]);

//   return;
// }
