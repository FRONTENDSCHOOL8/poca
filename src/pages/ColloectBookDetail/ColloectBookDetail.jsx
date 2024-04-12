// @ts-nocheck

import pb from '@/api/pocketbase';
import CollectBookItemContainer from '@/components/CollectBookItemContainer/CollectBookItemContainer';
import ConfirmationModal from '@/components/ConfirmationModal/ConfirmationModal';
import DetailHeader from '@/components/DetailHeader/DetailHeader';
import DragonSphere from '@/components/DragonSphere/DragonSphere';
import ToastAlert from '@/components/ToastAlert/ToastAlert';
import ToggleButton from '@/components/ToggleButton/ToggleButton';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router';
import { useLoaderData } from 'react-router';

export default function ColloectBookDetail() {
  const data = useLoaderData();
  const { group, id, title } = useParams();
  const editButton = useRef(null);
  const [phocaInfo, setPhocaInfo] = useState([]);
  const [phocaId, setPhocaId] = useState([]);
  const [editId, setEditId] = useState([]);
  const userName = JSON.parse(localStorage.getItem('auth')).user.name;
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  const logoImage = data.filter((item) => {
    if (item.groupName === group) return true;
  });

  // 선택한 카드 저장
  const handleOpenModal = () => setIsSaveModalOpen(true);

  const handleSave = () => {
    const data = {
      cardInfo: [...editId],
    };
    pb.collection('collectBook').update(id, data);
    setIsSaveModalOpen(false);
  };

  // 카드 클릭 시 색상 변화 (키보드 조작 시 엔터 or 스페이스바)
  const handlePressCard = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const pocaIdExtraction = e.target.querySelector('img').src.split('/')[6];

      if (e.target.querySelector('img').className.includes('grayscale')) {
        e.target.querySelector('img').className =
          'h-full w-full object-cover rounded-xl';
        setEditId([...editId, pocaIdExtraction]);
      } else {
        e.target.querySelector('img').className =
          'h-full w-full object-cover rounded-xl grayscale';
        const copy = [...editId];
        const index = copy.indexOf(pocaIdExtraction);

        // eslint-disable-next-line max-depth
        if (index !== -1) copy.splice(index, 1);

        setEditId(copy);
      }
    }
  };

  // 카드 클릭 시 색상 변화 (마우스 클릭)
  const handleClickCard = (e) => {
    if (e.target.src) {
      const pocaIdExtraction = e.target.src.split('/')[6];

      if (e.target.className.includes('grayscale')) {
        e.target.className = 'h-full w-full object-cover rounded-xl';
        setEditId([...editId, pocaIdExtraction]);
      } else {
        e.target.className = 'h-full w-full object-cover rounded-xl grayscale';
        const copy = [...editId];
        const index = copy.indexOf(pocaIdExtraction);

        // eslint-disable-next-line max-depth
        if (index !== -1) copy.splice(index, 1);

        setEditId(copy);
      }
    }
  };

  const collectBook = data.filter((item) => {
    if (item.groupName === group) return true;
  });
  const phocaData = collectBook[0].expand.photoCards;

  useEffect(() => {
    // 업데이트 발생 시 실시간으로 보유한 포카 정보 렌더링
    pb.collection('collectBook').subscribe(
      id,
      function (e) {
        if (e.record.expand) {
          const secondPocaInfo = e.record.expand.cardInfo.map((item) => {
            return item;
          });
          setPhocaInfo(secondPocaInfo);

          const secondPocaID = secondPocaInfo.map((item) => {
            return item.id;
          });
          setPhocaId(secondPocaID);
          setEditId(secondPocaID);
        } else {
          setPhocaInfo('');
          setPhocaId('');
          setEditId('');
        }
      },
      { expand: 'cardInfo' }
    );

    // 처음 렌더링 시 보유한 포카 정보
    const pbData = pb
      .collection('collectBook')
      .getOne(id, { expand: 'cardInfo' });
    pb.autoCancellation(false);

    pbData
      .then((res) => {
        const firstPocaInfo = res.expand.cardInfo.map((item) => {
          return item;
        });
        setPhocaInfo(firstPocaInfo);

        const firstPocaID = firstPocaInfo.map((item) => {
          return item.id;
        });
        setPhocaId(firstPocaID);
        setEditId(firstPocaID);
      })
      .catch((error) => {
        console.log('보유 중인 포카 없음', error);
      });

    return () => pb.collection('collectBook').unsubscribe(id);
  }, [id]);

  return (
    <>
      <div className="draggable relative h-[100%]">
        <ConfirmationModal
          isOpen={isSaveModalOpen}
          onClose={() => setIsSaveModalOpen(false)}
          onConfirm={handleSave}
          message="저장하시겠습니까?"
          cancelButtonText="취소"
          confirmButtonText="저장"
        />

        <Toaster />

        <DetailHeader title={title} />
        <ToggleButton />

        <DragonSphere
          group={group}
          phocaData={phocaData}
          phocaInfo={phocaInfo}
          handleOpenModal={handleOpenModal}
          fakeRef={editButton}
          logoImage={logoImage[0].logoImage}
          groupId={logoImage[0].id}
        />

        <CollectBookItemContainer
          title={`${userName}님이 보유 중인 포카️❣️`}
          state={true}
          phocaData={phocaData}
          phocaId={phocaId}
          handleClickCard={handleClickCard}
          handlePressCard={handlePressCard}
          imgFilter="h-full w-full object-cover rounded-xl"
          pb="pb-50pxr"
        />
        <CollectBookItemContainer
          title="갖고 있는 포카를 선택하세요!"
          state={false}
          phocaData={phocaData}
          phocaId={phocaId}
          handleClickCard={handleClickCard}
          handlePressCard={handlePressCard}
          imgFilter="h-full w-full object-cover rounded-xl grayscale"
          pb="pb-10pxr"
        />
      </div>
    </>
  );
}
