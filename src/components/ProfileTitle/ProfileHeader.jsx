import ProfileInfo from './ProfileInfo';
import ProfileTitle from './ProfileTitle';

export default function ProfileHeader() {
  return (
    <>
      {/* 데스크톱 화면 */}
      <div className="mb-40pxr mt-100pxr hidden flex-row-reverse px-7 py-3 text-end desktop:flex">
        <ProfileInfo user="hidden" />
      </div>

      {/* 모바일 화면 */}
      <div className="flex flex-col gap-y-7 px-7 py-3 text-start desktop:hidden">
        <ProfileTitle />
        <ProfileInfo />
      </div>
    </>
  );
}
