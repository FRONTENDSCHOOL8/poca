import { searchStore } from '@/store/store';
import MeetUpItem from '../MeetUpItem/MeetUpItem';

export default function MeetUpItemContainer({ meetUpData, desktopStyle }) {
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
      className={`${desktopStyle} absolute bottom-3 z-20 flex w-full touch-pan-x snap-both gap-4 overflow-auto rounded-xl @desktop:touch-pan-y @desktop:flex-col`}
    >
      {searchResult.map((item) => {
        return <MeetUpItem key={item.id} info={item} />;
      })}
    </ul>
  );
}
