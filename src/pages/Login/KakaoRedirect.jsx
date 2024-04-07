import pb from '@/api/pocketbase';
import { useEffect } from 'react';
import { isLogin } from '@/store/store';
import { useNavigate } from 'react-router-dom';

export default function KakaoRedirect() {
  const { login } = isLogin();
  const navigate = useNavigate();

  // 컴포넌트가 마운트되면 로그인 로직 실행
  useEffect(() => {
    async function KakaoLogin() {
      const authData = await pb
        .collection('users')
        .authWithOAuth2({ provider: 'kakao' });

      const { model, token } = await JSON.parse(
        localStorage.getItem('pocketbase_auth')
      );

      localStorage.setItem(
        'auth',
        JSON.stringify({
          isAuth: !!model,
          user: model,
          token: token,
        })
      );
    }

    try {
      KakaoLogin();
      login(true);
      navigate('/'); // 로그인 완료시 메인으로 이동
    } catch (error) {
      alert('오류입니다');
    }
  }, [login, navigate]);

  return;
}
