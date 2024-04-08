import React, { useState } from 'react';
import DetailHeader from '@/components/DetailHeader/DetailHeader';
import ConfirmationModal from '@/components/ConfirmationModal/ConfirmationModal';

export default function MeetUpSubmit() {
  const [image, setImage] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [memberName, setMemberName] = useState('');
  const [cafeName, setCafeName] = useState('');
  const [cafeAddress, setCafeAddress] = useState('');
  const [cafeDuration, setCafeDuration] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const groups = ['뉴진스', 'bts', '블랙핑크'];

  const handleFileChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleGroupSelect = (groupName) => {
    setSelectedGroup(groupName);
  };

  const isSubmitEnabled =
    image &&
    selectedGroup &&
    memberName &&
    cafeName &&
    cafeAddress &&
    cafeDuration;

  return (
    <div className="flex w-full flex-col items-center pb-24 pt-6">
      <DetailHeader title="제보하기" />
      <h1 className="mb-8 pb-4 pt-16 text-center text-xl font-bold text-gray-600">
        아직 등록되지 않은 생일카페를 알려주세요!
      </h1>
      <div className="mb-8">
        <label className="flex h-96 w-64 cursor-pointer flex-col items-center justify-center rounded-lg bg-gray-200 text-center leading-normal">
          {image ? (
            <img
              src={image}
              alt="Uploaded"
              className="h-full w-full rounded-lg object-contain"
            />
          ) : (
            <div className="flex flex-col">
              <span className="text-xl text-gray-400">+</span>
              <span className="text-gray-400">생일카페 이미지 첨부</span>
            </div>
          )}
          <input type="file" onChange={handleFileChange} className="hidden" />
        </label>
      </div>
      {image && (
        <>
          <h2 className="mb-4 text-center text-lg font-semibold">
            어떤 그룹인가요?
          </h2>
          <div className="mb-8 flex items-center justify-center overflow-x-auto">
            {groups.map((group) => (
              <button
                key={group}
                onClick={() => handleGroupSelect(group)}
                className={`mx-2 rounded-full border ${
                  selectedGroup === group
                    ? 'bg-secondary text-white'
                    : 'border-primary bg-white text-primary'
                } px-4 py-2`}
              >
                {group}
              </button>
            ))}
          </div>
        </>
      )}
      {selectedGroup && (
        <>
          <h2 className="mb-4 text-center text-lg font-semibold">
            멤버 이름을 알려주세요
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
          <h2 className="mb-4 text-center text-lg font-semibold">
            카페 이름을 알려주세요
          </h2>
          <input
            type="text"
            placeholder="카페 이름"
            value={cafeName}
            onChange={(e) => setCafeName(e.target.value)}
            className="mb-8 w-80 border-b-2 border-gray-300 bg-white p-2"
          />
        </>
      )}
      {cafeName && (
        <>
          <h2 className="mb-4 text-center text-lg font-semibold">
            카페 주소를 알려주세요
          </h2>
          <input
            type="text"
            placeholder="카페 주소"
            value={cafeAddress}
            onChange={(e) => setCafeAddress(e.target.value)}
            className="mb-8 w-80 border-b-2 border-gray-300 bg-white p-2"
          />
          <h2 className="mb-4 text-center text-lg font-semibold">
            생일카페의 기간을 알려주세요
          </h2>
          <input
            type="text"
            placeholder="예: 2024년 4월 20일 - 2024년 4월 27일"
            value={cafeDuration}
            onChange={(e) => setCafeDuration(e.target.value)}
            className="mb-8 w-80 border-b-2 border-gray-300 bg-white p-2"
          />
        </>
      )}
      {isSubmitEnabled && (
        <button className="rounded-lg bg-primary px-4 py-2 text-white">
          확인
        </button>
      )}
    </div>
  );
}
