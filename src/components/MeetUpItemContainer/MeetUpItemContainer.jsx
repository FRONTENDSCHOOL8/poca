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
    <ul className={`${mapStyle}  z-10 flex snap-x flex-row gap-5`}>
      {searchResult.map((item) => {
        return <MeetUpItem key={item.id} info={item} className="snap-center" />;
      })}
    </ul>
  );
}
