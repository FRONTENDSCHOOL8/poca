import SearchBar from '@/components/SearchBar/SearchBar';
import MeetUpMap from '@/components/MeetUpMap/MeetUpMap';
import MeetUpItemContainer from '@/components/MeetUpItemContainer/MeetUpItemContainer';

export default function MeetUpDesktop({ meetUpData }) {
  return (
    <>
      <div className="flex h-full w-full flex-row">
        <div className="relative flex h-full w-1/4 flex-row border-t-gray-50">
          <SearchBar
            name={'mapSearch'}
            placeholder={'장소,아티스트 이름'}
            bgStyle={'@desktop:h-1/6 w-full rounded-none'}
          />
          <MeetUpItemContainer
            meetUpData={meetUpData}
            desktopStyle={'@desktop:top-60pxr'}
          />
        </div>
        <div className="flex-grow">
          <MeetUpMap meetUpData={meetUpData} />
        </div>
      </div>
    </>
  );
}
