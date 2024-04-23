import pb from '@/api/pocketbase';

export async function meetUpDetail({ params }) {
  const { id } = params;
  return await pb.collection('meetUps').getOne(id);
}
