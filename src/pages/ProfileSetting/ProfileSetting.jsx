import NavigationTile from '@/components/NavigationTile/NavigationTile';
import DetailHeader from '@/components/DetailHeader/DetailHeader';

export default function ProfileSetting() {
  return (
    <div className="pt-12">
      <DetailHeader title="설정" />
      <div>
        <span className="mb-4 mt-14 block px-6 pt-4 text-lg font-bold">
          내 정보
        </span>
        <NavigationTile to="/loginInfo" text="로그인 정보" className="" />
        <NavigationTile to="/" text="회원 정보 수정" className=" " />
        <NavigationTile to="/" text="찜 목록" className=" " />
        <NavigationTile to="/" text="내 작성 글" className=" " />
        <NavigationTile to="/" text="알림 설정" className=" " />
      </div>
      <div>
        <span className="mb-4 mt-12 block px-6 text-lg font-bold">
          서비스 정보
        </span>
        <NavigationTile to="/" text="서비스 이용약관" className=" " />
        <NavigationTile to="/" text="개인정보 처리방침" className=" " />
        <NavigationTile to="/" text="언어" className=" " />
        <NavigationTile to="/" text="버전 정보" className=" " />
      </div>
    </div>
  );
}
