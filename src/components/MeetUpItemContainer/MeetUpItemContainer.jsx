import { searchStore } from '@/store/store';
import MeetUpItem from '../MeetUpItem/MeetUpItem';

export default function MeetUpItemContainer({ meetUpData, mapStyle }) {
  const { search } = searchStore();
  const searchText = search?.toLowerCase();
  const searchResult = searchText
    ? meetUpData.filter((data) => {
        const lowerdData = JSON.stringify(data).toLowerCase();
        return lowerdData.includes(searchText);
      })
    : meetUpData;
  return (
    <ul
      className={`${mapStyle} absolute bottom-3 z-20 mx-3 mb-3 flex w-full gap-5 rounded-xl shadow-md`}
    >
      {searchResult.map((item) => {
        return <MeetUpItem key={item.id} info={item} />;
      })}
    </ul>
  );
}
