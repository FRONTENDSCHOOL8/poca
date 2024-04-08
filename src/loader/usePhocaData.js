import { useLoaderData } from 'react-router';

export function usePhocaDataByLikeCount() {
  const phoca = useLoaderData();
  return phoca
    .reduce((acc, group) => acc.concat(group.expand.photoCards), [])
    .sort((a, b) => b.likeCount - a.likeCount)
    .slice(0, 20);
}

export function usePhocaDataByCreated() {
  const phoca = useLoaderData();
  return phoca
    .reduce((acc, group) => acc.concat(group.expand.photoCards), [])
    .sort((a, b) => new Date(b.created) - new Date(a.created))
    .slice(0, 20);
}
