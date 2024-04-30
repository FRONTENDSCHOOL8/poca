import SearchBar from '@/components/SearchBar/SearchBar';
import MeetUpMap from '@/components/MeetUpMap/MeetUpMap';
import MeetUpItemContainer from '@/components/MeetUpItemContainer/MeetUpItemContainer';

export default function MeetUpMobile({ meetUpData }) {
  return (
    <>
      <div className="flex flex-row">
        <SearchBar
          name={'mapSearch'}
          placeholder={'장소,아티스트 이름'}
          bgStyle={'absolute top-2 left-5 z-20 bg-white py-3 shadow-meetUp '}
        />
        <MeetUpItemContainer
          meetUpData={meetUpData}
          mapStyle={'overflow-auto touch-pan-x draggable h-full'}
        />
      </div>
      <div className="h-full w-full flex-grow">
        <MeetUpMap meetUpData={meetUpData} />
      </div>
    </>
  );
}
