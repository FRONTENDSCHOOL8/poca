import pb from '@/api/pocketbase';
import { isLogin } from '@/store/store';
import { useState, useEffect } from 'react';
import ExchangeEdit from '../ExchangeListDetail/ExchangeEdit';
import PhotoCardInfo from '../ExchangeListDetail/PhotoCardInfo';
import ExchangeArticle from '../ExchangeListDetail/ExchangeArticle';
import DetailHeader from '../DetailHeader/DetailHeader';

/**
 * ExchangeList 컴포넌트는 포토카드와 관련된 교환 글 목록을 표시하며, 각 교환 글의 작성자 정보를 함께 표시합니다.
 * 이 컴포넌트는 포토카드 데이터를 로드하고, 해당 데이터의 확장된 exchangeList 배열을 사용하여 교환 글을 렌더링합니다.
 *
 * @param {Object} props - 컴포넌트의 props 객체입니다.
 * @param {Object} props.photoCardData - 포토카드 데이터 객체입니다. 다음과 같은 필드를 포함해야 합니다:
 * @param {string} props.photoCardData.id - 포토카드의 고유 식별자입니다.
 * @param {object} props.photoCardData.expand
 * @param {Object[]} [props.photoCardData.expand.exchangeList] - 포토카드에 연관된 교환 글 객체의 배열입니다.
 * @param {React.ReactNode} [props.children] - 컴포넌트의 자식 요소들입니다.
 *
 * @returns {React.ReactNode} - ExchangeList 컴포넌트를 렌더링합니다.
 */

export default function ExchangeList({ photoCardData }) {
  const [users, setUsers] = useState([]);
  const [exchangeListData, setExchangeListData] = useState(
    photoCardData?.expand?.exchangeList || []
  );
  const { init } = isLogin();
  const userInfo = localStorage.getItem('auth');
  const loggedInUser = userInfo ? JSON.parse(userInfo) : null;
  console.log(init);

  useEffect(() => {
    // 교환글에서 작성자들의 id들을 추출
    const writerIds = exchangeListData
      .map((exchangeData) => exchangeData?.writer)
      .filter((id) => id);

    // 작성자가 있을 경우엔, users에서 해당하는 유저의 정보 가져오기
    if (writerIds.length > 0) {
      const fetchUsersData = async () => {
        try {
          pb.autoCancellation(false);
          const users = writerIds.map((writerId) => {
            return pb.collection('users').getOne(writerId);
          });
          const usersData = await Promise.all(users);

          setUsers(usersData);
        } catch (error) {
          console.error('Error fetching users data:', error);
        }
      };
      fetchUsersData();
    }
  }, [exchangeListData]);

  return (
    <>
      <DetailHeader title="교환 디테일" isBottomSheet={} text={text} />
      <div className="flexCenter mx-auto mb-3 mt-10 w-11/12 flex-col pt-10">
        <PhotoCardInfo
          // @ts-ignore
          photoCardData={photoCardData}
        />
        <div className="mx-auto my-4 h-1 w-8/12 border-t border-gray-300"></div>
        <div className="mx-auto mt-8 w-10/12 self-start">
          <span className="text-xl font-extrabold leading-7 text-neutral-600">
            {exchangeListData ? exchangeListData.length : 0}
          </span>
          <span className="text-xl font-bold leading-7 text-neutral-500">
            개의 교환글
          </span>
        </div>
        <div className="mx-auto mt-4 w-10/12">
          <ExchangeEdit
            photoCardData={photoCardData}
            exchangeListData={exchangeListData}
            setExchangeListData={setExchangeListData}
            loginUser={loggedInUser}
            loginStatus={init}
          />
          <ExchangeArticle
            exchangeListData={exchangeListData}
            users={users}
            setExchangeListData={setExchangeListData}
          />
        </div>
      </div>
    </>
  );
}
