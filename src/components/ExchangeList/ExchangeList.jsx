import pb from '@/api/pocketbase';
import { isLogin } from '@/store/store';
import { useState, useEffect } from 'react';
import ExchangeEdit from '../ExchangeListDetail/ExchangeEdit';
import PhotoCardInfo from '../ExchangeListDetail/PhotoCardInfo';
import ExchangeArticle from '../ExchangeListDetail/ExchangeArticle';
import DetailHeader from '../DetailHeader/DetailHeader';
import NumberOfExchangeList from '../ExchangeListDetail/NumberOfExchangeList';

export default function ExchangeList({ photoCardData }) {
  const [users, setUsers] = useState([]);
  const [exchangeListData, setExchangeListData] = useState(
    photoCardData?.expand?.exchangeList || []
  );
  const { init } = isLogin();
  const userInfo = localStorage.getItem('auth');
  const loggedInUser = userInfo ? JSON.parse(userInfo) : null;

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

  const text = `** 포토카드 이미지는 거래의 이해를 돕는 식별 목적으로 사용하고 있어요**
  
   ** 실제 포토카드와 이미지의 사이즈가 상이할 수 있으니 주의해주세요! **`;

  return (
    <>
      <DetailHeader title="자세히" isBottomSheet text={text} />
      <PhotoCardInfo photoCardData={photoCardData} />
      <NumberOfExchangeList exchangeListData={exchangeListData} />
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
          loginUser={loggedInUser}
          loginStatus={init}
        />
      </div>
    </>
  );
}
