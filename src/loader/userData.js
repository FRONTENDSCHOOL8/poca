import pb from '@/api/pocketbase';

export default async function userData() {
  return await pb.collection('users').getFullList();
}
