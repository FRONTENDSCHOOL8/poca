import { useEffect, useState } from 'react';

import MyBias from '../MyBias/MyBias';
import pb from '@/api/pocketbase';

export default function ProfileInfo({ user, bias, container }) {
  const [profileImage, setProfileImage] = useState(
    '/icons/floatingDefault.jpg'
  );
  const [userName, setUserName] = useState('');
  useEffect(() => {
    pb.autoCancellation(false);
    const fetchProfileImage = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem('auth')).user.id;
        const record = await pb.collection('users').getOne(userId);
        const url = `https://shoong.pockethost.io/api/files/users/${userId}/${record.avatar}`;
        const userName = record.username;
        setProfileImage(url);
        setUserName(userName);
      } catch (error) {
        console.error('Error fetching profile image:', error);
      }
    };
    fetchProfileImage();
  }, []);
  return (
    <div className={`flex w-full items-center justify-between ${container}`}>
      <div className={`flex items-center gap-x-2 ${user}`}>
        <img
          className="h-54pxr w-54pxr rounded-full border-2"
          src={profileImage}
          alt="Profile"
        />
        <p className="text-b04 font-sb01 text-contentPrimary">{userName}</p>
      </div>
      <MyBias hide={bias} />
    </div>
  );
}
