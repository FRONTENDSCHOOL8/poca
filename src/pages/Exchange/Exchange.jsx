import BiasContainer from '@/components/BiasContainer/BiasContainer';
import PhocaContainerEx from '@/components/PhocaContainer/PhocaContainerEx';
import SearchBar from '@/components/SearchBar/SearchBar';
import { globalState, isLogin } from '@/store/store';
import { useLoaderData } from 'react-router';

export default function Exchange() {
  const photoCardsData = useLoaderData(); // group 정보를 가져옴 (포카정보 포함)
  const { init: login } = isLogin(); // 로그인 여부 확인
  const { init } = globalState(); // 비로그인 시 보여줄 그룹정보 (기본값)

  /*
    localStorage에서 로그인(key) 값이
    true → auth에서 최애 그룹명을 사용
    false → 기본값을 사용
  */
  let group = login
    ? JSON.parse(localStorage.getItem('auth')).user.biasGroup
    : init;

  // 최애 그룹의 정보만 필터링
  const filterData = photoCardsData.filter((item) => {
    if (item.groupName === group) return true;
  });

  // 최애 그룹 포카 정보
  const biasData = filterData[0].expand.photoCards;

  return (
    <div className="exchange-page pt-75pxr text-center desktop:bg-white ">
      <SearchBar name="Exchange" placeholder="포카찾기" bgStyle="bg-gray-100" />
      <div className="mx-auto mt-20pxr desktop:my-20pxr ">
        <BiasContainer photoCardsData={photoCardsData} />
      </div>
      <PhocaContainerEx biasData={biasData} />
    </div>
  );
}
