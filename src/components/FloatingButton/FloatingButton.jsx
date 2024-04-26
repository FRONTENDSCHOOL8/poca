import pb from '@/api/pocketbase';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function FloatingButton({ isAuth }) {
  const defaultImage = '/icons/floatingDefault.jpg';
  const [profileImage, setProfileImage] = useState(defaultImage);

  useEffect(() => {
    const fetchProfileImage = async () => {
      if (!isAuth) return;

      try {
        const userId = JSON.parse(localStorage.getItem('auth')).user.id;
        const record = await pb.collection('users').getOne(userId);
        const url = `https://shoong.pockethost.io/api/files/users/${userId}/${record.avatar}`;
        setProfileImage(url);
      } catch (error) {
        console.error('Error fetching profile image:', error);
      }
    };

    fetchProfileImage();
  }, [isAuth]);

  return (
    <Link to={isAuth ? '/LikeDetail' : '/Login'}>
      <button
        type="button"
        aria-label="찜목록으로 가기"
        className="fixed bottom-28 right-5 z-10 h-59pxr w-59pxr cursor-pointer rounded-full bg-gradient-to-b from-red-400 to-indigo-500 shadow-xl"
      >
        <img
          className="absolute left-2pxr top-2pxr h-55pxr w-55pxr rounded-full"
          src={profileImage}
        />
      </button>
    </Link>
  );
}
