import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import pb from '@/api/pocketbase';
import DetailHeader from '@/components/DetailHeader/DetailHeader';
import ConfirmationModal from '@/components/ConfirmationModal/ConfirmationModal';
import { useLoaderData } from 'react-router';

export default function MeetUpSubmit() {
  const groups = useLoaderData();
  const [image, setImage] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [memberName, setMemberName] = useState('');
  const [cafeName, setCafeName] = useState('');
  const [cafeAddress, setCafeAddress] = useState('');
  const [cafeDuration, setCafeDuration] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('confirm');
  const navigate = useNavigate();

  const memberNameInputRef = useRef(null);
  const cardNameInputRef = useRef(null);

  useEffect(() => {
    if (selectedGroup) {
      memberNameInputRef.current.focus();
    }
  }, [selectedGroup]);

  // useEffect(() => {
  //   if (cardType) {
  //     cardNameInputRef.current.focus();
  //   }
  // }, [cardType]);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleGroupSelect = (group) => {
    setSelectedGroup(group.id);
  };

  // const handleCardTypeSelect = (type, e) => {
  //   setCardType(type);
  // };

  const isSubmitEnabled =
    image &&
    selectedGroup &&
    memberName &&
    cafeName &&
    cafeAddress &&
    cafeDuration;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userInfo = JSON.parse(localStorage.getItem('auth')).user;
      const formData = new FormData();
      formData.append('user', userInfo.id);
      formData.append('type', 'meetup');
      formData.append('group', selectedGroup);
      formData.append('artistName', memberName);
      formData.append('meetUpImg', image);
      formData.append('cafeName', cafeName);
      formData.append('cafeAddress', cafeAddress);
      formData.append('meetUpDuration', cafeDuration);

      const response = await pb.collection('informUs').create(formData);
      console.log('Response:', response);

      setModalMessage('밋업 제보가 성공적으로 등록되었습니다.');
      setModalType('confirm');
      setIsModalOpen(true);
    } catch (error) {
      console.error('밋업 제출 중 오류가 발생했습니다:', error);
      setModalMessage('밋업 제출 중 오류가 발생했습니다.');
      setModalType('error');
      setIsModalOpen(true);
    }
  };

  const redirectToInformUs = () => {
    setTimeout(() => {
      navigate('/informUs');
    }, 50);
  };

  return (
    <div className="flex w-full flex-col pb-24 pt-6">
      <DetailHeader title="제보하기" />
      <h1 className="mx-auto mb-8 pb-4 pl-20pxr pt-16 text-2xl font-b03 text-gray600">
        생일카페를 추가해 주세요! 🥳
      </h1>
      <div className="mb-8 flex justify-center">
        <label
          className="flex h-96 w-64 cursor-pointer flex-col items-center justify-center rounded-lg bg-gray-200 text-center leading-normal"
          tabIndex="0"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              document.getElementById('file-input').click();
            }
          }}
        >
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="Uploaded"
              className="h-full w-full rounded-lg object-cover object-center"
            />
          ) : (
            <div className="flex flex-col">
              <span className="text-xl text-gray400">+</span>
              <span className="text-gray400">생일카페 관련 이미지 첨부</span>
            </div>
          )}
          <input
            type="file"
            id="file-input"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      {image && (
        <>
          <div className="mx-auto">
            <h2 className="mb-4 pb-2 pt-8 text-start text-xl font-sb03">
              어떤 그룹인가요?
            </h2>

            <div className="mx-auto mb-8 w-352pxr overflow-x-auto px-1 pt-1">
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
          </div>
        </>
      )}
      {selectedGroup && (
        <>
          <div className="mx-auto">
            <h2 className="mb-4 pb-2 pt-8 text-start text-xl font-sb03 ">
              어떤 멤버인가요?
            </h2>
            <input
              type="text"
              ref={memberNameInputRef}
              placeholder="멤버 이름"
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
              className="mx-auto mb-8 w-352pxr border-b-2 border-gray-300 bg-transparent p-2"
            />
          </div>
        </>
      )}

      {memberName && (
        <>
          <div className="mx-auto">
            <h2 className="mb-4 pb-2 pt-4 text-start text-xl font-sb03">
              카페 이름을 알려주세요!
            </h2>
            <input
              type="text"
              // ref={cardNameInputRef}
              placeholder="카페 이름"
              value={cafeName}
              onChange={(e) => setCafeName(e.target.value)}
              className="mx-auto mb-12 w-352pxr border-b-2 border-gray-300 bg-transparent p-2"
            />
          </div>
        </>
      )}
      {cafeName && (
        <>
          <div className="mx-auto">
            <h2 className="mb-4 pb-2 pt-4 text-start text-xl font-sb03">
              카페 주소를 알려주세요!
            </h2>
            <input
              type="text"
              // ref={cardNameInputRef}
              placeholder="카페 주소"
              value={cafeAddress}
              onChange={(e) => setCafeAddress(e.target.value)}
              className="mx-auto mb-12 w-352pxr border-b-2 border-gray-300 bg-transparent p-2"
            />
          </div>
        </>
      )}
      {cafeAddress && (
        <>
          <div className="mx-auto">
            <h2 className="mb-4 pb-2 pt-4 text-start text-xl font-sb03">
              생일카페 기간을 알려주세요
            </h2>
            <input
              type="text"
              // ref={cardNameInputRef}
              placeholder="예: 2024년 4월 20일 - 2024년 4월 27일"
              value={cafeDuration}
              onChange={(e) => setCafeDuration(e.target.value)}
              className="mx-auto mb-12 w-352pxr border-b-2 border-gray-300 bg-transparent p-2"
            />
          </div>
        </>
      )}
      <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
        {isSubmitEnabled && (
          <button
            type="submit"
            className="mx-auto rounded-lg bg-primary px-4 py-2 text-white hover:bg-indigo-800 focus:outline-none focus:ring focus:ring-indigo-300"
          >
            제보하기
          </button>
        )}
      </form>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={modalMessage}
        onConfirm={() => {
          setIsModalOpen(false);
          redirectToInformUs();
        }}
        showCancelButton={false}
        title="✔️"
      />
    </div>
  );
}
