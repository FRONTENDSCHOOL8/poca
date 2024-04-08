import { useState, useEffect } from 'react';
import pb from '@/api/pocketbase';
import DetailHeader from '@/components/DetailHeader/DetailHeader';
import ConfirmationModal from '@/components/ConfirmationModal/ConfirmationModal';

export default function PhotoCardSubmit() {
  const [image, setImage] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [memberName, setMemberName] = useState('');
  const [cardType, setCardType] = useState('');
  const [cardName, setCardName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('confirm');

  const groups = [
    '뉴진스',
    'BTS',
    '블랙핑크',
    'SuperM',
    'ITZY',
    '샤이니',
    '에스파',
    'NCT',
    'MonstaX',
    'TXT',
    '르세라핌',
    '레드벨벳',
    '아이유',
    '(G)I-DLE',
    '라이즈',
  ];

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleGroupSelect = (groupName) => {
    setSelectedGroup(groupName);
  };

  const handleCardTypeSelect = (type) => {
    setCardType(type);
  };

  const isSubmitEnabled =
    image && selectedGroup && memberName && cardType && cardName;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userInfo = JSON.parse(localStorage.getItem('auth')).user;
      const formData = new FormData();
      formData.append('user', userInfo.id);
      formData.append('type', 'phoca');
      formData.append('group', selectedGroup);
      formData.append('artistName', memberName);
      formData.append('phocaType', cardType);
      formData.append('phocaTitle', cardName);
      formData.append('phocaImg', image);

      await pb.collection('informUs').create(formData);

      setModalMessage('포토카드가 성공적으로 등록되었습니다.');
      setModalType('confirm');
      setIsModalOpen(true);
    } catch (error) {
      console.error('포토카드 제출 중 오류가 발생했습니다:', error);
      setModalMessage('포토카드 제출 중 오류가 발생했습니다.');
      setModalType('error');
      setIsModalOpen(true);
    }
  };

  return (
    <div className="flex w-full flex-col items-center pb-24 pt-6">
      <DetailHeader title="제보하기" />
      <h1 className="mb-8 pb-4 pt-16 text-center text-xl font-b03 text-gray600">
        포토카드를 등록해 주세요!
      </h1>
      <div className="mb-8">
        <label className="flex h-96 w-64 cursor-pointer flex-col items-center justify-center rounded-lg bg-gray-200 text-center leading-normal">
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="Uploaded"
              className="h-full w-full rounded-lg object-cover object-center"
            />
          ) : (
            <div className="flex flex-col">
              <span className="text-xl text-gray400">+</span>
              <span className="text-gray400">포토카드 이미지 첨부</span>
            </div>
          )}
          <input type="file" onChange={handleFileChange} className="hidden" />
        </label>
      </div>
      {image && (
        <>
          <h2 className="mb-4 pb-4 pt-8 text-center text-sb03 font-sb03">
            어떤 그룹인가요?
          </h2>
          <div className="mb-8 flex w-80 overflow-x-auto ">
            <div className="flex flex-nowrap whitespace-nowrap">
              {groups.map((group) => (
                <button
                  key={group}
                  onClick={() => handleGroupSelect(group)}
                  className={`mx-2 rounded-full border ${
                    selectedGroup === group
                      ? 'whitespace-nowrap bg-secondary text-white'
                      : 'whitespace-nowrap border-primary bg-white text-primary'
                  } px-4 py-2`}
                >
                  {group}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
      {selectedGroup && (
        <>
          <h2 className="mb-4 pb-4 pt-8 text-center text-sb03 font-sb03">
            어떤 멤버인가요?
          </h2>
          <input
            type="text"
            placeholder="멤버 이름"
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
            className="mb-8 w-80 border-b-2 border-gray-300 bg-white p-2"
          />
        </>
      )}
      {memberName && (
        <>
          <h2 className="mb-4 pb-4 pt-8 text-center text-sb03 font-sb03">
            카드 종류를 알려주세요!
          </h2>
          <div className="mb-8 flex justify-center space-x-4 whitespace-nowrap">
            <div className="mb-8 flex w-80 gap-4 overflow-x-auto ">
              {['앨범', '특전', '팬싸', '시즌그리팅', '기타'].map((type) => (
                <button
                  key={type}
                  onClick={() => handleCardTypeSelect(type)}
                  className={`rounded-full border ${
                    cardType === type
                      ? 'bg-secondary text-white'
                      : 'border-primary bg-white text-primary'
                  } px-4 py-2`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
      {cardType && (
        <>
          <h2 className="mb-4 pb-4 pt-8 text-center text-sb03 font-sb03">
            이 포토카드의 이름을 알려주세요!
          </h2>
          <input
            type="text"
            placeholder="ex) New Jeans 2023 SEASON's GREETINGS"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            className="mb-8 w-80 border-b-2 border-gray-300 bg-white p-2"
          />
        </>
      )}
      <form onSubmit={handleSubmit}>
        {isSubmitEnabled && (
          <button
            type="submit"
            className="rounded-lg bg-primary px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300"
          >
            확인
          </button>
        )}
      </form>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={modalMessage}
        confirmButtonText="확인"
        onConfirm={() => setIsModalOpen(false)}
        showCancelButton={false}
        useNotification={modalType === 'confirm'}
      />
    </div>
  );
}
