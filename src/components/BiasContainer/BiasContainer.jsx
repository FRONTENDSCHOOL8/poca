import { globalState, isLogin } from '@/store/store';
import Bias from '../Bias/Bias';
import { useRef } from 'react';
import { useState } from 'react';

export default function BiasContainer({ photoCardsData }) {
  const { change } = globalState();
  const { init } = isLogin();
  const biasGroup = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const isGroup =
    init && JSON.parse(localStorage.getItem('auth')).user.biasGroup !== '';
  const bias = isGroup
    ? JSON.parse(localStorage.getItem('auth')).user.biasGroup
    : null;

  // console.log('bias: ', bias);

  const filterData = isGroup
    ? photoCardsData.filter((item) => {
        if (item.groupName === bias) return true;
      })
    : null;
  // console.log('filterData: ', filterData);

  const [groupId, setGroupId] = useState(isGroup ? filterData[0].id : null);
  const [groupLogoImage, setGroupLogoImage] = useState(
    isGroup ? filterData[0].logoImage : null
  );

  const handleSelect = (e) => {
    // 클릭과 키보드를 모두 사용가능하게 하기 위해 삼항식 사용
    biasGroup.current.src = e.target.value ? e.target.value : e.target.src;
    change(e.target.value ? e.target.id : e.target.title);

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
      <div className="draggable flex items-center text-center w-fit">
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

        {/* <ul className=" flex h-100pxr items-center overflow-x-scroll"> */}
        <ul
          className={`flex h-100pxr items-center overflow-y-hidden overflow-x-scroll ${isHovered ? 'showScrollbar' : ''}`}
          style={{ maxWidth: '1200px' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {photoCardsData.map((item) => {
            return (
              <li key={item.id} >
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