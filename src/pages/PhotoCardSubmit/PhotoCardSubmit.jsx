import { useState, useEffect } from 'react';
import pb from '@/api/pocketbase';
import DetailHeader from '@/components/DetailHeader/DetailHeader';
import ConfirmationModal from '@/components/ConfirmationModal/ConfirmationModal';
import { useLoaderData } from 'react-router';

export default function PhotoCardSubmit() {
  const groups = useLoaderData();
  // console.log('groups ', groups);
  const [image, setImage] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [memberName, setMemberName] = useState('');
  const [cardType, setCardType] = useState('');
  const [cardName, setCardName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('confirm');

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleGroupSelect = (group) => {
    setSelectedGroup(group.id);
    // console.log('selected group', group.id);
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

      const response = await pb.collection('informUs').create(formData);
      console.log('Response:', response);

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
    <div className="flex w-full flex-col pb-24 pt-6">
      <DetailHeader title="제보하기" />
      <h1 className="mb-8  pb-4 pl-20pxr pt-16 text-center text-2xl font-b03 text-gray600">
        포토카드를 등록해 주세요 ✍️
      </h1>
      <div className="mb-8 flex justify-center">
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
          <h2 className="mb-4 pb-2 pl-22pxr pt-8 text-start text-xl font-sb03">
            어떤 그룹인가요?
          </h2>
          <div className="mx-auto mb-8 w-352pxr overflow-x-auto ">
            <ul className="mx-auto flex gap-6">
              {groups.map((item, index) => (
                <li key={index} className="flex flex-col items-center">
                  <button
                    onClick={() => handleGroupSelect(item)}
                    className={`flex h-[56px] w-[56px] items-center justify-center overflow-hidden rounded-full transition-transform duration-300 hover:scale-90 ${
                      selectedGroup === item.id
                        ? 'bg-gradient-to-b from-red-400 to-indigo-500 p-1'
                        : 'bg-gray-200 p-0.5'
                    }`}
                  >
                    <img
                      src={`https://shoong.pockethost.io/api/files/groups/${item.id}/${item.logoImage}`}
                      alt={item.groupName}
                      className="h-full w-full rounded-full object-cover"
                    />
                  </button>
                  <span
                    className={`${selectedGroup === item.id ? 'font-black' : 'font-semibold'} mt-2 whitespace-nowrap text-sm text-gray-700`}
                  >
                    {item.groupName}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      {selectedGroup && (
        <>
          <h2 className="mb-4 pb-2 pl-22pxr pt-8 text-start text-xl font-sb03 ">
            어떤 멤버인가요?
          </h2>
          <input
            type="text"
            placeholder="멤버 이름"
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
            className="mx-auto mb-8 w-352pxr border-b-2 border-gray-300 bg-transparent p-2"
          />
        </>
      )}
      {memberName && (
        <>
          <h2 className="mb-4 pb-2 pl-22pxr pt-8 text-start text-xl font-sb03">
            카드 종류를 알려주세요!
          </h2>
          <div className="mb-8 flex justify-center space-x-4 whitespace-nowrap">
            <div className="mb-4 flex w-352pxr gap-4 overflow-x-auto ">
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
          <h2 className="mb-4 pb-2 pl-22pxr pt-4 text-start text-xl font-sb03">
            카드 이름을 아시나요?
          </h2>
          <input
            type="text"
            placeholder="ex) New Jeans 2023 SEASON's GREETINGS"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            className="mx-auto mb-12 w-352pxr border-b-2 border-gray-300 bg-transparent p-2"
          />
        </>
      )}
      <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
        {isSubmitEnabled && (
          <button
            type="submit"
            className="mx-auto rounded-lg bg-primary px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300"
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
