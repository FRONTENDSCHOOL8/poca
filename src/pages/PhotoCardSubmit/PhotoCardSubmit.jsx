import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoaderData } from 'react-router';
import pb from '@/api/pocketbase';
import DetailHeader from '@/components/DetailHeader/DetailHeader';
import ConfirmationModal from '@/components/ConfirmationModal/ConfirmationModal';
import ImageUploader from '@/components/ImageUploader/ImageUploader';
import GroupSelector from '@/components/GroupSelector/GroupSelector';

export default function PhotoCardSubmit() {
  const groups = useLoaderData();
  // console.log('groups', groups);
  const [image, setImage] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [memberName, setMemberName] = useState('');
  const [cardType, setCardType] = useState('');
  const [cardName, setCardName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('confirm');

  const navigate = useNavigate();
  const memberNameInputRef = useRef(null);
  const cardNameInputRef = useRef(null);

  //그룹 선택에 따른 포커스 관리
  useEffect(() => {
    if (selectedGroup) {
      memberNameInputRef.current.focus();
    }
  }, [selectedGroup]);

  //카드 타입 선택에 따른 포커스 관리
  useEffect(() => {
    if (cardType) {
      cardNameInputRef.current.focus();
    }
  }, [cardType]);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleGroupSelect = (group) => {
    setSelectedGroup(group.id);
  };

  const handleCardTypeSelect = (type) => {
    setCardType(type);
  };

  //제출 버튼 활성화
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

      setModalMessage('포토카드 제보가 성공적으로 등록되었습니다.');
      setModalType('confirm');
      setIsModalOpen(true);
    } catch (error) {
      console.error('포토카드 제출 중 오류가 발생했습니다:', error);
      setModalMessage('포토카드 제출 중 오류가 발생했습니다.');
      setModalType('error');
      setIsModalOpen(true);
    }
  };

  const redirectToInformUs = () => {
    navigate('/informUs');
  };

  return (
    <div className="flex w-full flex-col pb-24 pt-6">
      <DetailHeader title="제보하기" />
      <h1 className="mx-auto mb-8 pb-4 pt-16 text-2xl font-b03 text-indigo-800">
        포토카드를 등록해 주세요 ✍️
      </h1>
      <div className="mb-8 flex justify-center">
        <ImageUploader
          image={image}
          setImage={setImage}
          uploadText={'포토카드 이미지 첨부'}
        />
      </div>

      {image && (
        <>
          <div className="mx-auto">
            <h2 className="mb-4 pb-2 pt-8 text-start text-2xl font-b02 text-gray600">
              어떤 그룹인가요?
            </h2>

            <GroupSelector
              groups={groups}
              selectedGroup={selectedGroup}
              onSelect={handleGroupSelect}
            />
          </div>
        </>
      )}
      {selectedGroup && (
        <>
          <div className="mx-auto">
            <h2 className="mb-4 pb-2 pt-8 text-start text-2xl font-b02 text-gray600">
              어떤 멤버인가요?
            </h2>
            <input
              type="text"
              ref={memberNameInputRef}
              placeholder="멤버 이름"
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
              className="text-md mx-auto mb-8 w-352pxr border-b-2 border-gray-300 bg-transparent p-1"
            />
          </div>
        </>
      )}
      {memberName && (
        <>
          <div className="mx-auto w-352pxr">
            <h2 className="mb-4 pb-2 pt-8 text-start text-2xl font-b02 text-gray600">
              카드 종류를 알려주세요!
            </h2>
            <div className=" mb-6 flex w-352pxr space-x-4 overflow-x-auto whitespace-nowrap">
              {['앨범', '특전', '팬싸', '시즌그리팅', '기타'].map((type) => (
                <button
                  key={type}
                  onClick={(e) => handleCardTypeSelect(type)}
                  className={`rounded-full border hover:bg-secondary hover:text-white ${
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
          <div className="mx-auto">
            <h2 className="mb-4 pb-2 pt-8 text-start text-2xl font-b02 text-gray600">
              카드 이름을 아시나요?
            </h2>
            <input
              type="text"
              ref={cardNameInputRef}
              placeholder="ex) New Jeans 2023 SEASON's GREETINGS"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              className="mx-auto mb-16 w-352pxr border-b-2 border-gray-300 bg-transparent p-1"
            />
          </div>
        </>
      )}
      <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
        {isSubmitEnabled && (
          <button
            type="submit"
            className="mx-auto rounded-lg bg-primary px-6 py-2 text-lg text-white hover:bg-indigo-800 focus:outline-none focus:ring focus:ring-indigo-300"
          >
            제보하기
          </button>
        )}
      </form>

      {/* 데스크톱 화면  */}
      <div className="hidden desktop:flex">
        <div className="w-500pxr">
          <h1 className="mb-8 pb-4 pt-16 text-center text-xl font-b03 text-gray600">
            포토카드를 등록해 주세요!
          </h1>
          {/* <div className="mb-8"> */}
          <div className="flex justify-center">
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
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div className="text-center">
          <>
            <h2 className="mb-4 pt-85pxr text-center text-sb03 font-sb03">
              어떤 그룹인가요?
            </h2>
            <div className="mb-4 flex w-650pxr overflow-x-auto ">
              <div className="flex flex-nowrap whitespace-nowrap">
                {groups.map((group) => (
                  <button
                    key={group}
                    onClick={() => handleGroupSelect(group)}
                    className={`mx-2 w-100pxr rounded-full border ${
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

          <>
            <h2 className="mb-4 pt-8 text-center text-sb03 font-sb03">
              어떤 멤버인가요?
            </h2>
            <input
              type="text"
              placeholder="멤버 이름"
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
              className="mb-4 w-80 border-b-2 border-gray-300 bg-white p-2"
            />
          </>

          <>
            <h2 className="mb-4 pt-8 text-center text-sb03 font-sb03">
              카드 종류를 알려주세요!
            </h2>
            <div className="mb-4 flex justify-center space-x-4 whitespace-nowrap">
              <div className="mb-4 flex gap-4 ">
                {['앨범', '특전', '팬싸', '시즌그리팅', '기타'].map((type) => (
                  <button
                    key={type}
                    onClick={() => handleCardTypeSelect(type)}
                    className={`w-100pxr rounded-full border ${
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

          <>
            <h2 className="mb-4 pt-8 text-center text-sb03 font-sb03">
              이 포토카드의 이름을 알려주세요!
            </h2>
            <input
              type="text"
              placeholder="ex) New Jeans 2023 SEASON's GREETINGS"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              className="mb-4 w-80 border-b-2 border-gray-300 bg-white p-2"
            />
          </>
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
        </div>
      </div>

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
