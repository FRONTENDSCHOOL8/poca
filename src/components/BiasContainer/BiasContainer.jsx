import { globalState } from '@/store/store';
import Bias from '../Bias/Bias';
import { useRef } from 'react';

export default function BiasContainer({ photoCardsData }) {
  const { change } = globalState();
  const biasGroup = useRef(null);
  const handleSelect = (e) => {
    if (e.target.value) {
      biasGroup.current.src = e.target.value;
      change(e.target.id);
    } else {
      biasGroup.current.src = e.target.src;
      change(e.target.title);
    }
  };

  return (
    <>
      <div className="draggable flex items-center text-center">
        <Bias fakeRef={biasGroup}>그룹</Bias>

        <ul className="biasContainer flex h-100pxr items-center overflow-x-scroll">
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
