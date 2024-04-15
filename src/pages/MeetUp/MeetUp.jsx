import MeetUpItemContainer from '@/components/MeetUpItemContainer/MeetUpItemContainer';
import MeetUpMap from '@/components/MeetUpMap/MeetUpMap';
import SearchBar from '@/components/SearchBar/SearchBar';
import { useLoaderData } from 'react-router';

export default function MeetUp() {
  const meetUpData = useLoaderData();

  return (
    <div className="mt-55pxr">
      <SearchBar
        name={'mapSearch'}
        placeholder={'장소,아티스트 이름'}
        bgStyle={'absolute top-60pxr left-5 z-20 bg-white py-3 shadow-meetUp '}
      />
      <MeetUpMap />
      <MeetUpItemContainer
        meetUpData={meetUpData}
        mapStyle={'absolute bottom-80pxr w-full overflow-x-auto'}
      />
    </div>
  );
}

// 지도의 마커 클릭 시 해당 밋업 아이템으로 focus
