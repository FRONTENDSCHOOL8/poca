import { useEffect, useState } from 'react';
import pb from '@/api/pocketbase';
import DetailHeader from '@/components/DetailHeader/DetailHeader';
import SearchBar from '@/components/SearchBar/SearchBar';
import ConfirmationModal from '@/components/ConfirmationModal/ConfirmationModal';
import { useLoaderData } from 'react-router';
import { globalState } from '@/store/store';
import { useNavigate } from 'react-router-dom';

export default function PickMyBias() {
  const group = useLoaderData();
  // console.log('groups ', group);
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGroupName, setSelectedGroupName] = useState('');
  const [selectedGroupId, setSelectedGroupId] = useState('');

  useEffect(() => {
    const authDataString = localStorage.getItem('auth');
    if (!authDataString) return;
    try {
      const authData = JSON.parse(authDataString);
      if (!authData.user || !authData.user.id) return;
      setUserId(authData.user.id);
    } catch (error) {
      console.error('Parsing authData error:', error);
    }
  }, []);

  const toggleModal = (groupName, groupId) => {
    setSelectedGroupName(groupName);
    setSelectedGroupId(groupId);
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    setIsModalOpen(false);
    // Zustand 스토어를 사용하여 전역 상태 업데이트
    globalState.getState().change(selectedGroupName);

    if (!userId) {
      console.error('User ID is missing');
      return;
    }

    try {
      await pb.collection('users').update(userId, {
        biasGroup: selectedGroupName,
      });
      console.log('biasGroup updated successfully');
      navigate('/profile');
    } catch (error) {
      console.error('Failed to update biasGroup', error);
    }
  };

  return (
    <div className="flex flex-col items-center px-6 pt-8">
      <DetailHeader title="내 최애" />
      <SearchBar
        name="search"
        placeholder="최애 그룹을 검색해 보세요!"
        bgStyle="bg-white mt-16 mb-10"
      />
      <div className="mx-auto max-w-6xl">
        <ul className="mb-16 grid grid-cols-3 gap-12">
          {group.map((item, index) => (
            <li
              key={index}
              className="flex flex-col items-center justify-center"
            >
              <button
                onClick={() => toggleModal(item.groupName, item.id)}
                className={`flex h-[68px] w-[68px] items-center justify-center overflow-hidden rounded-full transition-transform duration-300 hover:scale-90 ${selectedGroupId === item.id ? 'bg-gradient-to-b from-red-400 to-indigo-500 p-1' : 'bg-gray-200 p-1'}`}
              >
                <img
                  src={`https://shoong.pockethost.io/api/files/groups/${item.id}/${item.logoImage}`}
                  alt={item.groupName}
                  className="h-full w-full rounded-full object-cover"
                />
              </button>
              <span className="mt-2 text-sm font-medium text-gray-700">
                {item.groupName}
              </span>
            </li>
          ))}
        </ul>
      </div>
      {isModalOpen && (
        <ConfirmationModal
          // modalStyles="bg-black rounded-lg" 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirm}
          message={`'${selectedGroupName}'(을)를 최애 그룹으로 선택하시겠습니까?`}
          cancelButtonText="취소"
          confirmButtonText="확인"
          useNotification={false}
          buttonStyles={{
            cancel: 'rounded bg-gray-200 px-4 py-2 hover:bg-gray-300',
            confirm:
              'rounded bg-primary px-4 py-2 text-white hover:bg-indigo-700',
          }}
        />
      )}
    </div>
  );
}
