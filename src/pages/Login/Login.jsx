import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import pb from '../../api/pocketbase';
import { isLogin } from '@/store/store';

export default function Login() {
  const { login, collectBookInfo } = isLogin();
  const [formData, setFormData] = useState({ email: '', pwd: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await pb
        .collection('users')
        .authWithPassword(formData.email, formData.pwd, {
          expand: 'collectBook',
        });

      // 콜렉트북 정보
      collectBookInfo(data.record.expand.collectBook);

      // 로그인 유무 전역으로 관리
      login(true);

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

      navigate('/');
    } catch (error) {
      alert('아이디 혹은 비밀번호를 확인해주세요.');
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-tertiary">
      <Link to="/">
        <img
          className="mb-72pxr h-51pxr w-143pxr"
          src="/icons/shoongLogoLogin.svg"
        />
      </Link>

      <form onSubmit={handleSubmit}>
        <Input
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="text"
          placeholder="이메일"
        />
        <Input
          name="pwd"
          value={formData.pwd}
          onChange={handleChange}
          type="password"
          placeholder="비밀번호"
          mt={2}
        />
        <Button type="submit" customClassNames="mt-26pxr">
          로그인
        </Button>
      </form>

      <div className="mt-18pxr text-xs font-medium text-neutral-800">
        <span>계정찾기</span>
        <span className="mx-10pxr">ㅣ</span>
        <span>회원가입</span>
      </div>

      <div className="mt-44pxr flex items-center">
        <div className="h-1pxr w-100pxr bg-primary"></div>
        <span className="mx-15pxr text-10pxr font-medium text-primary">
          간편로그인
        </span>
        <div className="h-1pxr w-100pxr bg-primary"></div>
      </div>

      <div className="mt-6pxr flex gap-32pxr">
        <img src="/icons/kakao.svg" />
        <img src="/icons/naver.svg" />
        <img src="/icons/instagram.svg" />
      </div>

      <span className="mt-52pxr text-xs font-extrabold text-white underline">
        다음에 할게요
      </span>
    </div>
  );
}
