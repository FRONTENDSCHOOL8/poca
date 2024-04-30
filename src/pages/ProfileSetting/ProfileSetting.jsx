import NavigationTile from '@/components/NavigationTile/NavigationTile';
import DetailHeader from '@/components/DetailHeader/DetailHeader';
import ProfileTitle from '@/components/ProfileTitle/ProfileTitle';
import ProfileFooter from '@/components/ProfileFooter/ProfileFooter';
import ProfileInfo from '@/components/ProfileTitle/ProfileInfo';

export default function ProfileSetting() {
  return (
    <div className="pt-6">
      <DetailHeader title="설정" desktop="desktop:hidden" />
      <ProfileTitle desktop="pl-6 hidden desktop:flex" hide="hidden" />
      <ProfileInfo
        bias="hidden"
        user="ml-24pxr mt-14pxr hidden desktop:flex"
        container="desktop:flex"
      />

      <div>
        <span className="mb-4 mt-14 block px-6 pt-4 text-lg font-bold desktop:mt-32pxr">
          내 정보
        </span>
        <NavigationTile
          to="/loginInfo"
          text="로그인 정보"
          className="desktop:flex desktop:py-4pxr"
        />
        <NavigationTile
          to="/"
          text="회원 정보 수정"
          className="desktop:flex desktop:py-4pxr"
        />
        <NavigationTile
          to="/LikeDetail"
          text="찜 목록"
          className="desktop:flex desktop:py-4pxr"
        />
        <NavigationTile
          to="/"
          text="내 작성 글"
          className="desktop:flex desktop:py-4pxr"
        />
        <NavigationTile
          to="/"
          text="알림 설정"
          className="desktop:flex desktop:py-4pxr"
        />
      </div>
      <div>
        <span className="mb-4 mt-12 block px-6 text-lg font-bold">
          서비스 정보
        </span>
        <NavigationTile
          to="/"
          text="서비스 이용약관"
          className="desktop:flex desktop:py-4pxr"
        />
        <NavigationTile
          to="/"
          text="개인정보 처리방침"
          className="desktop:flex desktop:py-4pxr"
        />
        <NavigationTile
          to="/"
          text="언어"
          className="desktop:flex desktop:py-4pxr"
        />
        <NavigationTile
          to="/"
          text="버전 정보"
          className="desktop:flex desktop:py-4pxr"
        />
      </div>
      <ProfileFooter desktop="desktop:pt-80pxr pb-110pxr" />
    </div>
  );
}
