import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLoaderData } from 'react-router';
import { globalState } from '@/store/store';

export default function MyBias({ hide }) {
  const groups = useLoaderData();
  const [biasImage, setBiasImage] = useState('/myBias.jpg');
  const { init } = globalState();

  useEffect(() => {
    // Zustand 스토어의 최애 그룹명을 사용하여 해당하는 그룹 이미지 URL 설정
    const matchingGroup = groups.find((group) => group.groupName === init);
    if (matchingGroup) {
      setBiasImage(
        `https://shoong.pockethost.io/api/files/groups/${matchingGroup.id}/${matchingGroup.logoImage}`
      );
    }
  }, [groups, init]);

  return (
    <div className={hide}>
      <Link
        to="/myBias"
        className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full"
        title="최애 그룹 선택"
      >
        <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-b from-red-400 to-indigo-500 p-3pxr">
          <img
            src={biasImage}
            alt="내 최애 그룹"
            className=" h-full w-full rounded-full object-cover transition-transform duration-200 hover:scale-105"
          />
        </div>
      </Link>
    </div>
  );
}
