import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import pb from '@/api/pocketbase';
import DetailHeader from '@/components/DetailHeader/DetailHeader';
import ConfirmationModal from '@/components/ConfirmationModal/ConfirmationModal';
import { useLoaderData } from 'react-router';
import ImageUploader from '@/components/ImageUploader/ImageUploader';
import GroupSelector from '@/components/GroupSelector/GroupSelector';
import { useAddressSearch } from './useAddressSearch';

export default function MeetUpSubmit() {
  const groups = useLoaderData();

  const [image, setImage] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [memberName, setMemberName] = useState('');
  const [cafeName, setCafeName] = useState('');
  const [cafeAddress, setCafeAddress] = useState('');
  const [cafeAddressDetail, setCafeAddressDetail] = useState('');
  const [cafeDuration, setCafeDuration] = useState('');
  const [sourceURL, setSourceURL] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('confirm');
  const navigate = useNavigate();

  const elementWrap = useRef(null);
  const [address, setAddress, handleAddressSearch] = useAddressSearch(
    elementWrap,
    setCafeAddress
  );
  const memberNameInputRef = useRef(null);
  const cafeNameInputRef = useRef(null);

  useEffect(() => {
    if (selectedGroup) {
      cafeNameInputRef.current.focus();
    }
  }, [selectedGroup]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    document.body.appendChild(script);
  }, []);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleGroupSelect = (group) => {
    setSelectedGroup(group.id);
  };

  const handleFocus = (e) => {
    e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullAddress = `${cafeAddress} ${cafeAddressDetail}`.trim();
    try {
      const userInfo = JSON.parse(localStorage.getItem('auth')).user;
      const formData = new FormData();
      formData.append('user', userInfo.id);
      formData.append('type', 'meetup');
      formData.append('group', selectedGroup);
      formData.append('artistName', memberName);
      formData.append('meetUpImg', image);
      formData.append('cafeName', cafeName);
      formData.append('cafeAddress', fullAddress);
      formData.append('meetUpDuration', cafeDuration);
      formData.append('SourceURL_', sourceURL);

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
    navigate('/informUs');
  };

  const isSubmitEnabled =
    image &&
    selectedGroup &&
    memberName &&
    cafeName &&
    cafeAddress &&
    cafeDuration &&
    sourceURL;

  return (
    <div className="flex w-full flex-col pb-24 pt-6 desktop:flex-row desktop:items-center desktop:bg-white desktop:pb-20">
      <DetailHeader title="제보하기" desktop="desktop:hidden" />
      <h1 className="mx-auto mb-8 pb-4 pl-20pxr pt-16 text-2xl font-b02 text-indigo-800 desktop:hidden">
        생일카페를 추가해 주세요! 🥳
      </h1>
      <div className="mb-8 flex justify-center desktop:hidden">
        <ImageUploader
          image={image}
          setImage={setImage}
          uploadText={'생일카페 관련 이미지 첨부'}
        />
      </div>

      {image && (
        <>
          <div className="mx-auto desktop:hidden">
            <h2 className="mb-4 pb-3 pt-8 text-start text-2xl font-b02 text-gray600 ">
              생일의 주인공은?🎂
            </h2>
            <input
              type="text"
              ref={memberNameInputRef}
              placeholder="멤버 이름"
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
              onFocus={handleFocus}
              className="mx-auto mb-12 w-352pxr border-b-2 border-gray-300 bg-transparent p-1 text-lg"
            />
          </div>
        </>
      )}
      {memberName && (
        <>
          <div className="mx-auto mb-4 desktop:hidden">
            <h2 className="mb-4 pb-2 pt-6 text-start text-2xl font-b02 text-gray600">
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
          <div className="mx-auto desktop:hidden">
            <h2 className="mb-4 pb-3 pt-2 text-start text-2xl font-b02 text-gray600">
              카페 이름이 궁금해요
            </h2>
            <input
              type="text"
              ref={cafeNameInputRef}
              placeholder="카페 이름"
              value={cafeName}
              onChange={(e) => setCafeName(e.target.value)}
              onFocus={handleFocus}
              className="mx-auto mb-12 w-352pxr border-b-2 border-gray-300 bg-transparent p-1 text-lg desktop:hidden"
            />
          </div>
        </>
      )}
      {cafeName && (
        <>
          <div className="mx-auto mb-4 flex w-352pxr items-center justify-between pb-3 pt-4 desktop:hidden">
            <h2 className="text-start text-2xl font-b02 text-gray600">
              카페 주소가 어디인가요?
            </h2>
            <button
              onClick={handleAddressSearch}
              onFocus={handleFocus}
              className="button rounded border-2 px-2 py-2 text-start text-sm hover:border-primary focus:border-primary focus:outline-none"
            >
              🔍 주소 찾기
            </button>
          </div>

          <div
            className="desktop:hidden"
            ref={elementWrap}
            style={{
              display: 'none',
              position: 'relative',
              height: '400px',
              width: '352px',
              margin: 'auto',
            }}
          >
            <img
              src="//t1.daumcdn.net/postcode/resource/images/close.png"
              onClick={() => {
                elementWrap.current.style.display = 'none';
              }}
              onFocus={handleFocus}
              style={{
                cursor: 'pointer',
                position: 'absolute',
                right: '0px',
                top: '0px',
                zIndex: 1,
              }}
              alt="Close"
            />
          </div>

          <input
            type="text"
            value={cafeAddress}
            onFocus={handleFocus}
            readOnly
            placeholder="생일 카페 주소"
            className="input text-md mx-auto mb-4 w-352pxr border-b-2 border-gray-300 bg-transparent p-1 text-start desktop:hidden"
          />
          <input
            type="text"
            value={cafeAddressDetail}
            onChange={(e) => setCafeAddressDetail(e.target.value)}
            onFocus={handleFocus}
            placeholder="세부 주소 입력 (선택 사항)"
            className="input text-md mx-auto mb-12 w-352pxr border-b-2 border-gray-300 bg-transparent p-1 text-start desktop:hidden"
          />
        </>
      )}
      {cafeAddress && (
        <>
          <div className="mx-auto desktop:hidden">
            <h2 className="mb-4 pb-3 pt-4 text-start text-2xl font-b02 text-gray600">
              생일카페 기간을 알려주세요
            </h2>
            <input
              type="text"
              placeholder="예: 2024년 4월 20일 - 2024년 4월 27일"
              value={cafeDuration}
              onChange={(e) => setCafeDuration(e.target.value)}
              onFocus={handleFocus}
              className="mx-auto mb-12 w-352pxr border-b-2 border-gray-300 bg-transparent p-1"
            />
          </div>
          <div className="mx-auto desktop:hidden">
            <h2 className="mb-4 pb-3 pt-4 text-start text-2xl font-b02 text-gray600">
              관련 링크를 추가해주세요
            </h2>
            <input
              type="url"
              placeholder="예: https://example.com"
              value={sourceURL}
              onChange={(e) => setSourceURL(e.target.value)}
              onFocus={handleFocus}
              className="mx-auto mb-12 w-352pxr border-b-2 border-gray-300 bg-transparent p-1 text-lg"
            />
          </div>
        </>
      )}

      <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
        {isSubmitEnabled && (
          <button
            type="submit"
            onFocus={handleFocus}
            className="mx-auto rounded-lg bg-primary px-6 py-2 text-lg text-white hover:bg-indigo-800 focus:outline-none focus:ring focus:ring-indigo-300 desktop:hidden"
          >
            제보하기
          </button>
        )}
      </form>

      {/* 데스크톱 화면 */}
      <div className="hidden desktop:flex">
        <div className="w-600pxr">
          <h1 className="mx-auto mb-4 pb-4 pl-20pxr pt-16 text-center text-2xl font-b02 text-indigo-800">
            생일카페를 추가해 주세요! 🥳
          </h1>
          <div className="mb-8 flex justify-center">
            <ImageUploader
              image={image}
              setImage={setImage}
              uploadText={'생일카페 관련 이미지 첨부'}
            />
          </div>
          <>
            <div className="mx-auto text-center">
              <h2 className="mb-4 text-center text-2xl font-b02 text-gray600 ">
                생일의 주인공은?🎂
              </h2>
              <input
                type="text"
                // ref={memberNameInputRef}
                placeholder="멤버 이름"
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
                onFocus={handleFocus}
                className="mx-auto mb-12 w-352pxr border-b-2 border-gray-300 bg-transparent p-1 text-center text-lg"
              />
            </div>
          </>
          <>
            <div className="mx-auto mb-4">
              <h2 className="mb-4 text-center text-2xl font-b02 text-gray600">
                어떤 그룹인가요?
              </h2>
              <GroupSelector
                groups={groups}
                selectedGroup={selectedGroup}
                onSelect={handleGroupSelect}
                desktop="desktop: w-480pxr"
              />
            </div>
          </>
        </div>

        <div className="mt-115pxr w-680pxr text-center">
          <>
            <div className="mx-auto">
              <h2 className="mb-4 pb-3 pt-2 text-center text-2xl font-b02 text-gray600">
                카페 이름이 궁금해요
              </h2>
              <input
                type="text"
                ref={cafeNameInputRef}
                placeholder="카페 이름"
                value={cafeName}
                onChange={(e) => setCafeName(e.target.value)}
                onFocus={handleFocus}
                className="mx-auto mb-12 w-352pxr border-b-2 border-gray-300 bg-transparent p-1 text-lg"
              />
            </div>
          </>
          <>
            <div className="mx-auto mb-4 flex w-352pxr items-center justify-between pb-3 pt-4">
              <h2 className="text-center text-2xl font-b02 text-gray600">
                카페 주소가 어디인가요?
              </h2>
              <button
                onClick={handleAddressSearch}
                onFocus={handleFocus}
                className="button rounded border-2 px-2 py-2 text-start text-sm hover:border-primary focus:border-primary focus:outline-none"
              >
                🔍 주소 찾기
              </button>
            </div>
            <div
              ref={elementWrap}
              style={{
                display: 'none',
                position: 'relative',
                height: '400px',
                width: '352px',
                margin: 'auto',
              }}
            >
              <img
                src="//t1.daumcdn.net/postcode/resource/images/close.png"
                onClick={() => {
                  elementWrap.current.style.display = 'none';
                }}
                onFocus={handleFocus}
                style={{
                  cursor: 'pointer',
                  position: 'absolute',
                  right: '0px',
                  top: '0px',
                  zIndex: 1,
                }}
                alt="Close"
              />
            </div>
            <input
              type="text"
              value={cafeAddress}
              onFocus={handleFocus}
              readOnly
              placeholder="생일 카페 주소"
              className="input text-md mx-auto mb-4 w-352pxr border-b-2 border-gray-300 bg-transparent p-1 text-start"
            />
            <input
              type="text"
              value={cafeAddressDetail}
              onChange={(e) => setCafeAddressDetail(e.target.value)}
              onFocus={handleFocus}
              placeholder="세부 주소 입력 (선택 사항)"
              className="input text-md mx-auto mb-12 w-352pxr border-b-2 border-gray-300 bg-transparent p-1 text-start"
            />
          </>
          <>
            <div className="mx-auto">
              <h2 className="mb-4 pb-3 pt-4 text-center text-2xl font-b02 text-gray600">
                생일카페 기간을 알려주세요
              </h2>
              <input
                type="text"
                placeholder="예: 2024년 4월 20일 - 2024년 4월 27일"
                value={cafeDuration}
                onChange={(e) => setCafeDuration(e.target.value)}
                onFocus={handleFocus}
                className="mx-auto mb-12 w-352pxr border-b-2 border-gray-300 bg-transparent p-1"
              />
            </div>
            <div className="mx-auto">
              <h2 className="mb-4 pb-3 pt-4 text-center text-2xl font-b02 text-gray600">
                관련 링크를 추가해주세요
              </h2>
              <input
                type="url"
                placeholder="예: https://example.com"
                value={sourceURL}
                onChange={(e) => setSourceURL(e.target.value)}
                onFocus={handleFocus}
                className="mx-auto mb-12 w-352pxr border-b-2 border-gray-300 bg-transparent p-1 text-lg"
              />
            </div>
          </>
          <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
            {isSubmitEnabled && (
              <button
                type="submit"
                onFocus={handleFocus}
                className="mx-auto rounded-lg bg-primary px-6 py-2 text-lg text-white hover:bg-indigo-800 focus:outline-none focus:ring focus:ring-indigo-300"
              >
                제보하기
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
          if (modalType === 'error') {
            setIsModalOpen(false);
          } else {
            redirectToInformUs();
          }
        }}
        confirmButtonText={modalType === 'confirm' ? '확인' : 'OK'}
      />
    </div>
  );
}
