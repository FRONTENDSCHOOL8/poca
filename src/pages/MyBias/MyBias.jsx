import DetailHeader from '@/components/DetailHeader/DetailHeader';
import SearchBar from '@/components/SearchBar/SearchBar';
import { useLoaderData } from 'react-router';
import React, { useEffect, useState } from 'react';
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://shoong.pockethost.io');

export default function MyBias({ items }) {
  const group = useLoaderData();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const authDataString = localStorage.getItem('auth');
    if (!authDataString) return; // 조건 불충족 시 조기 리턴
    try {
      const authData = JSON.parse(authDataString);
      if (!authData.user || !authData.user.id) return; // 조건 불충족 시 조기 리턴

      setUserId(authData.user.id); // 조건 충족 시 상태 업데이트
    } catch (error) {
      console.error('Parsing authData error:', error);
    }
  }, []);

  const handleClick = async (groupName) => {
    localStorage.setItem('bias', JSON.stringify({ init: groupName }));
    if (!userId) {
      console.error('User ID is missing');
      return;
    }

    // 사용자의 biasGroup 필드 업데이트
    try {
      await pb.collection('users').update(userId, {
        biasGroup: groupName,
      });

      console.log('biasGroup updated successfully');
    } catch (error) {
      console.error('Failed to update biasGroup', error);
    }
  };

  return (
    <div className="flex flex-col items-center px-6 pt-8">
      <DetailHeader title="내 최애" />
      <SearchBar
        name="search"
        placeholder="최애 그룹을 검색해 보세요!"
        bgStyle="bg-white mt-16 mb-10"
      />
      <div className="mx-auto max-w-6xl">
        <ul className="mb-16 grid grid-cols-3 gap-1">
          {group.map((item, index) => (
            <li
              key={index}
              className="flex flex-col items-center justify-center p-4"
            >
              <button
                onClick={() => handleClick(item.groupName)}
                className="flex flex-col items-center justify-center gap-2 text-center transition-transform duration-150 hover:scale-95"
              >
                <img
                  src={`https://shoong.pockethost.io/api/files/groups/${item.id}/${item.logoImage}`}
                  alt={item.groupName}
                  className="h-68pxr rounded-full border-4 object-cover"
                />
                <span className="whitespace-nowrap text-sb02 font-sb02 text-contentSecondary">
                  {item.groupName}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
