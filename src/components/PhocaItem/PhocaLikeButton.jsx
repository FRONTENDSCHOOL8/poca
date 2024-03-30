import React, { useEffect, useState } from 'react';
import { GoHeartFill } from 'react-icons/go';
import { likeStore } from '@/store/store';
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://shoong.pockethost.io');

export default function PhocaLikeButton({ phocaId }) {
  const [userId, setUserId] = useState(null);
  const isLiked = likeStore((state) => !!state.likedCards[phocaId]);
  const toggleLike = likeStore((state) => state.toggleLike);

  // 사용자 ID를 가져오기 위한 useEffect
  useEffect(() => {
    const authDataString = localStorage.getItem('pocketbase_auth');
    if (authDataString) {
      try {
        const authData = JSON.parse(authDataString);
        setUserId(authData.model.id);
      } catch (error) {
        // console.error('Parsing authData error:', error);
      }
    }
  }, []);

  // 포토카드의 likeCount 업데이트
  async function updateLikeCount(phocaId, shouldIncrease) {
    const currentCard = await pb.collection('photoCards').getOne(phocaId);
    const newLikeCount = currentCard.likeCount + (shouldIncrease ? 1 : -1);
    await pb
      .collection('photoCards')
      .update(phocaId, { likeCount: newLikeCount });
  }

  // 사용자의 likeList 업데이트
  async function updateLikeListInUserCollection() {
    if (!userId) return;
    const likedCards = likeStore.getState().likedCards;
    const likedPhotoCardIds = Object.keys(likedCards).filter(
      (id) => likedCards[id]
    );
    await pb
      .collection('users')
      .update(userId, { likeList: likedPhotoCardIds });
  }

  // 버튼 클릭 핸들러
  const handleClick = async (event) => {
    event.stopPropagation();
    const previouslyLiked = isLiked; // 클릭 전 상태
    toggleLike(phocaId); // 상태 토글
    await updateLikeCount(phocaId, !previouslyLiked); // likeCount 업데이트
    await updateLikeListInUserCollection(); // 사용자의 likeList 업데이트
  };

  return (
    <button
      className={`hover:text-red-500 ${isLiked ? 'text-red-500' : 'text-white'} button-focus-visible`}
      onClick={handleClick}
    >
      <GoHeartFill
        className={`h-6 w-6 ${isLiked ? 'text-red-500' : 'text-white'}`}
      />
    </button>
  );
}
