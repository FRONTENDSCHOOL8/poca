import React, { useEffect, useState } from 'react';
import DetailHeader from '@/components/DetailHeader/DetailHeader';
import PhocaContainerEx from '@/components/PhocaContainer/PhocaContainerEx';
import SearchBar from '@/components/SearchBar/SearchBar';
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://shoong.pockethost.io');

export default function LikeDetail() {
  const [likedPhotoCards, setLikedPhotoCards] = useState([]);

  useEffect(() => {
    async function fetchLikedPhotoCards() {
      const authDataString = localStorage.getItem('pocketbase_auth');
      if (!authDataString) return;

      try {
        const authData = JSON.parse(authDataString);
        const likeList = authData.model.likeList;
        if (!likeList || likeList.length === 0) return;

        // likeList 내의 각 ID를 OR 조건으로 연결하여 필터 쿼리 문자열 생성
        const filterQuery = likeList.map((id) => `id="${id}"`).join(' || ');

        // PocketBase에서 필터링된 포토카드 리스트 조회
        const matchedCards = await pb
          .collection('photoCards')
          .getFullList({ filter: filterQuery });

        // 상태 업데이트
        setLikedPhotoCards(matchedCards);
      } catch (error) {
        // console.error('Error fetching liked photo cards:', error);
      }
    }

    fetchLikedPhotoCards();
  }, []);

  return (
    <div className="pt-35pxr">
      <DetailHeader title="찜 목록" />
      <div className="flex items-center justify-center pt-60pxr ">
        <SearchBar
          name="search"
          placeholder="찜한 포카 찾기"
          bgStyle="bg-white"
        />
      </div>
      <div>
        <PhocaContainerEx biasData={likedPhotoCards} />
      </div>
    </div>
  );
}
