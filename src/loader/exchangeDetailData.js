import pb from '@/api/pocketbase';

export default async function exchangeDetailData({ params }) {
  const { id } = params;
  try {
    const photoCardData = await pb.collection('photoCards').getOne(id, {
      expand: 'exchangeList',
    });

    return { photoCardData };
  } catch (error) {
    // console.error('Error Loading Data:', error);

    throw error;
  }
}
