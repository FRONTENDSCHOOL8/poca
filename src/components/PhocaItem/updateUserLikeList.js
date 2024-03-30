import PocketBase from 'pocketbase';
import { likeStore } from '../../store/store'; // './store' 경로는 실제 store.js 파일의 위치에 맞게 조정해야 합니다.

const pb = new PocketBase('https://shoong.pockethost.io');

export async function updateUserLikeList(userId) {
  const likedCards = likeStore.getState().likedCards;
  const likedIds = Object.entries(likedCards)
    .filter(([_, liked]) => liked)
    .map(([id, _]) => id);

  const data = {
    likeList: JSON.stringify(likedIds),
  };

  try {
    const record = await pb.collection('users').update(userId, data);
    // console.log('Update Success:', record);
  } catch (error) {
    // console.error('Update Failed:', error);
  }
}
