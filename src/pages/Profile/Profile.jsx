import CollectBook from '@/components/CollectBook/CollectBook';
import ProfileItemContainer from '@/components/ProfileItemContainer/ProfileItemContainer';
import NavigationTile from '@/components/NavigationTile/NavigationTile';
import ProfileFooter from '@/components/ProfileFooter/ProfileFooter';
import ProfileHeader from '@/components/ProfileTitle/ProfileHeader';
import ExchangeStatus from '@/components/ExchangeStatus/ExchangeStatus';
import ProfileSetting from '../ProfileSetting/ProfileSetting';

export default function Profile() {
  return (
    <>
      {/* 데스크톱 화면 */}
      <div className="max-w-1280pxr mx-auto hidden justify-center bg-white desktop:flex desktop:gap-30pxr">
        <div className="hidden w-310pxr border-r border-neutral-300 pt-100pxr desktop:block">
          <ProfileSetting />
        </div>
        <div className="flex w-970pxr flex-col gap-5 pb-5 pt-60pxr">
          <ProfileHeader />
          <ProfileItemContainer title="콜렉트북">
            <CollectBook />
          </ProfileItemContainer>
          <ProfileItemContainer title="교환현황">
            <ExchangeStatus />
          </ProfileItemContainer>
          <div>
            <NavigationTile
              to="/"
              text="가이드"
              className=" mt-10 border-b-2 border-t-4 border-gray-200"
            />
            <NavigationTile
              to="/informUs"
              text="제보하기"
              className=" border-b-4 border-gray-200 "
            />
          </div>
        </div>
      </div>

      {/* 모바일 화면 */}
      <div className="flex flex-col gap-5 pb-5 pt-60pxr desktop:hidden">
        <ProfileHeader />
        <ProfileItemContainer title="콜렉트북">
          <CollectBook />
        </ProfileItemContainer>
        <ProfileItemContainer title="교환현황">
          <ExchangeStatus />
        </ProfileItemContainer>
        <div>
          <NavigationTile
            to="/"
            text="가이드"
            className=" mt-10 border-b-2 border-t-4 border-gray-200"
          />
          <NavigationTile
            to="/informUs"
            text="제보하기"
            className=" border-b-4 border-gray-200 "
          />
          <ProfileFooter />
        </div>
      </div>
    </>
  );
}
