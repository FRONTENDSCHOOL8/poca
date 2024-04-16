import DetailHeader from '@/components/DetailHeader/DetailHeader';
import { useEffect, useState } from 'react';
import pb from '@/api/pocketbase';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';

export default function LoginInfo() {
  const [user, setUser] = useState({ email: '', username: '', id: '' });
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const authDataString = localStorage.getItem('auth');
    if (!authDataString) return;

    try {
      const auth = JSON.parse(authDataString);
      if (!auth?.user) return;

      setUser({
        email: auth.user.email,
        username: auth.user.username,
        id: auth.user.id,
      });
    } catch (error) {
      // console.error('Parsing authData error:', error);
    }
  }, []);

  const handleLogout = () => {
    setIsLogoutModalOpen(false);
    localStorage.setItem(
      '로그인',
      JSON.stringify({ init: false, collectBook: [] })
    );
    localStorage.removeItem('auth');
    pb.authStore.clear();
    window.location.href = '/login';
  };

  const handleDeleteAccount = async () => {
    setIsDeleteModalOpen(false);
    if (!user.id) {
      alert('유저 ID를 찾을 수 없습니다.');
      return;
    }

    try {
      await pb.collection('users').delete(user.id);
      handleLogout(); // 로그아웃 처리
    } catch (error) {
      // console.error('Error deleting user account:', error);
    }
  };

  return (
    <div className="pt-12">
      <DetailHeader title="로그인 정보" />
      <div className="flex  flex-col">
        <div className="flex flex-col items-start space-y-4 p-6">
          <div className="text-gray-700">
            <p className="pb-2 pt-16 text-m04 font-sb01 text-gray-700">
              이메일 주소
            </p>
            <p className="text-b04 font-m04 text-gray300">{user.email}</p>
          </div>
          <div className="text-gray-700">
            <p className="pb-2 pt-2 text-m04 font-sb01 text-gray-700">
              고유 닉네임
            </p>
            <p className="pb-2 text-b04 font-m04 text-gray300">
              {user.username}
            </p>
          </div>
          <div className="my-4 w-full border-t border-gray500"></div>
          <p className="pt-2 text-m04 font-sb01 text-gray-700">소셜 로그인</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-5 p-6">
          <button
            className="mt-32 rounded-lg border border-red-500 bg-white px-20 py-2 text-red-500 transition-all duration-300 hover:font-bold"
            onClick={() => setIsLogoutModalOpen(true)}
          >
            로그아웃
          </button>
          <button
            className="text-m04 font-m04 text-gray300 underline"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            서비스 탈퇴하기
          </button>
        </div>
        <ConfirmationModal
          isOpen={isLogoutModalOpen}
          onClose={() => setIsLogoutModalOpen(false)}
          onConfirm={handleLogout}
          message="정말로 로그아웃하시겠습니까?"
          cancelButtonText="아니오"
          confirmButtonText="예"
        />
        <ConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteAccount}
          message="정말로 계정을 삭제하시겠습니까? 🥲"
          cancelButtonText="아니오"
          confirmButtonText="예"
        />
      </div>
    </div>
  );
}
