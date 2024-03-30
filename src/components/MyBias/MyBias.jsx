import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PocketBase from 'pocketbase';
import { useLoaderData } from 'react-router';

const pb = new PocketBase('https://shoong.pockethost.io');

export default function MyBias() {
  const groups = useLoaderData(); // 'groups'가 로더에서 로드된 그룹의 배열을 포함하고 있음을 가정
  const [biasImage, setBiasImage] = useState('/myBias.jpg'); // 기본 이미지 설정

  useEffect(() => {
    const biasData = localStorage.getItem('bias');
    if (biasData) {
      const { init } = JSON.parse(biasData);
      const matchingGroup = groups.find((group) => group.groupName === init);
      if (matchingGroup) {
        setBiasImage(
          `https://shoong.pockethost.io/api/files/groups/${matchingGroup.id}/${matchingGroup.logoImage}`
        );
      }
    }
  }, [groups]); // 'groups' 데이터가 변경될 때마다 useEffect 훅이 실행되도록 의존성 배열에 추가

  return (
    <div>
      <Link
        to="/myBias"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-b from-red-400 to-indigo-500"
        title="최애 그룹 선택"
      >
        <img
          src={biasImage}
          alt="내 최애 그룹"
          className="m-auto h-52pxr cursor-pointer rounded-full border-2 object-cover"
        />
      </Link>
    </div>
  );
}
