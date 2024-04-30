import MeetUpMobile from './MeetUpMobile';
import MeetUpDesktop from './MeetUpDesktop';
import { useLoaderData } from 'react-router';

export default function MeetUp() {
  const meetUpData = useLoaderData();

  return (
    <div className="relative top-56pxr h-screen-nav @container desktop:top-0">
      <div className="block h-full w-full @desktop:hidden">
        <MeetUpMobile meetUpData={meetUpData} />
      </div>
      <div className="hidden  @desktop:block @desktop:h-screen-meetUp @desktop:w-full">
        <MeetUpDesktop meetUpData={meetUpData} />
      </div>
    </div>
  );
}
