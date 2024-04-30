import { globalState, isLogin } from '@/store/store';
import Bias from '../Bias/Bias';
import { useRef } from 'react';
import { useState } from 'react';

export default function BiasContainer({ photoCardsData }) {
  const { change } = globalState(); // localStorage에 bias(key)를 변경하는 함수
  const { init } = isLogin(); // 로그인 여부
  const biasGroup = useRef(null);
  const [isHovered, setIsHovered] = useState(false); // hover 시 스크롤 여부

  /**
   * 로그인 상태 → isGroup = true
   * 비로그인 상태 → isGroup = false
   */
  const isGroup =
    init && JSON.parse(localStorage.getItem('auth')).user.biasGroup !== '';

  /**
   * 로그인 상태 → bias = 최애 그룹명
   * 비로그인 상태 → bias = null
   */
  const bias = isGroup
    ? JSON.parse(localStorage.getItem('auth')).user.biasGroup
    : null;

  /**
   * 로그인 상태 → filterData = 최애 그룹 정보 (배열 데이터)
   * 비로그인 상태 → filterData = null
   */
  const filterData = isGroup
    ? photoCardsData.filter((item) => {
        if (item.groupName === bias) return true;
      })
    : null;

  /**
   * 로그인 상태 → groupId = 최애 그룹 id값
   * 비로그인 상태 → groupId = null
   */
  const [groupId, setGroupId] = useState(isGroup ? filterData[0].id : null);

  /**
   * 로그인 상태 → groupLogoImage = 최애 그룹 로고 이미지 값
   * 비로그인 상태 → groupLogoImage = null
   */
  const [groupLogoImage, setGroupLogoImage] = useState(
    isGroup ? filterData[0].logoImage : null
  );

  const handleSelect = (e) => {
    // 클릭과 키보드를 모두 사용가능하게 하기 위해 삼항식 사용
    biasGroup.current.src = e.target.value ? e.target.value : e.target.src;
    change(e.target.value ? e.target.id : e.target.title); // 선택한 그룹명

    // localStorage에 있는 유저의 최애그룹 수정 (실제 DB에 반영 X)
    if (isGroup) {
      const authUser = {
        ...JSON.parse(localStorage.getItem('auth')).user,
        biasGroup: e.target.value ? e.target.id : e.target.title,
      };
      const auth = {
        ...JSON.parse(localStorage.getItem('auth')),
        user: authUser,
      };
      localStorage.setItem('auth', JSON.stringify(auth));
    }
  };

  return (
    <>
      <div className="draggable flex w-fit items-center text-center">
        <Bias
          fakeRef={biasGroup}
          src={
            groupId
              ? `https://shoong.pockethost.io/api/files/groups/${groupId}/${groupLogoImage}`
              : '/myBias.jpg'
          }
        >
          그룹
        </Bias>

        <ul
          className={` flex h-100pxr max-w-[1100px] items-center overflow-y-hidden overflow-x-scroll ${isHovered ? 'showScrollbar' : ''}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {photoCardsData.map((item) => {
            return (
              <li key={item.id}>
                <Bias
                  alt={`${item.groupName} 로고`}
                  style={`hover:translate-y-1 duration-200 h-58pxr rounded-full border m-auto cursor-pointer `}
                  src={`https://shoong.pockethost.io/api/files/groups/${item.id}/${item.logoImage}`}
                  value={`https://shoong.pockethost.io/api/files/groups/${item.id}/${item.logoImage}`}
                  groupName={item.groupName}
                  handle={handleSelect}
                >
                  {item.groupName}
                </Bias>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
