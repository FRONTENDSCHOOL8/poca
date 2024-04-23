import { useState } from 'react';
import pb from '@/api/pocketbase';
import Button from '../Button/Button';
import { GoTrash, GoPencil } from 'react-icons/go';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

export default function ExchangeArticle({
  users,
  loginUser,
  loginStatus,
  exchangeListData,
  setExchangeListData,
  handleSlangFiltering,
}) {
  const [isEditing, setIsEditing] = useState(null);
  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContent, setEditingContent] = useState('');
  let loggedInUserId = '';
  if (loginStatus === true) loggedInUserId = loginUser.user.id || null;

  const showModal = (message) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 수정
  const handleEdit = (exchangeData) => {
    setIsEditing(exchangeData.id);
    setEditingContent(exchangeData.description);
  };

  // 수정 취소
  const handleEditCancel = () => {
    setIsEditing(null);
    setEditingContent('');
  };

  // 삭제
  const handleDelete = async (exchangeId) => {
    try {
      // DB에서 해당 교환 글을 삭제
      await pb.collection('exchangeList').delete(exchangeId);
      alert('교환 글이 삭제되었습니다.');
      setExchangeListData((prevExchangeList) =>
        prevExchangeList.filter((exchange) => exchange.id !== exchangeId)
      );
    } catch (error) {
      // console.error('교환 글을 삭제하는 중 에러가 발생했습니다:', error);
      alert('교환 글을 삭제하는 데 실패했습니다.');
    }
  };

  // 수정 저장
  const handleEditSubmit = async (exchangeId) => {
    if (handleSlangFiltering(editingContent)) {
      showModal('비속어가 포홤된 글은 작성할 수 없습니다');
      return;
    }
    try {
      if (editingContent)
        await pb
          .collection('exchangeList')
          .update(exchangeId, { description: editingContent });

      // 상태 업데이트 로직 수정
      setExchangeListData((prevData) =>
        prevData.map((data) =>
          data.id === exchangeId
            ? { ...data, description: editingContent }
            : data
        )
      );

      // 수정 상태 종료 및 알림
      setIsEditing(null);
      setEditingContent('');
      alert('교환 글이 수정되었습니다.');
    } catch (error) {
      // console.error('교환 글 수정 중 에러가 발생했습니다:', error);
      alert('교환 글 수정에 실패했습니다.');
    }
  };

  // users 배열을 id를 키로 사용하는 객체로 변환
  const usersById = {};
  users.forEach((user) => {
    usersById[user.id] = user;
  });

  // 날짜 차이를 계산하는 함수
  function timeSince(dateToObject) {
    const date = new Date(Date.parse(dateToObject));
    const seconds = Math.floor((new Date() - date) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) {
      return Math.floor(interval) + '년 전';
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + '달 전';
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + '일 전';
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + '시간 전';
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + '분 전';
    }
    return '방금 전';
  }

  return (
    <>
      <ul className="mt-5">
        {[...exchangeListData].reverse().map((exchangeData) => {
          let isUserTheWriter = '';
          const user = usersById[exchangeData.writer];
          const timeSinceUpdated = timeSince(exchangeData.updated);
          if (
            exchangeData.writer === loggedInUserId ||
            loginUser?.user.username === 'admin'
          )
            isUserTheWriter = exchangeData.writer;
          if (!user) {
            return null;
          }
          return (
            <li
              key={exchangeData.id}
              className="mx-auto mb-3 overflow-hidden rounded-lg bg-white p-5 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-11 w-10  ">
                    <img
                      className="h-full w-full rounded-full border-2 object-cover"
                      src={`https://shoong.pockethost.io/api/files/users/${user.id}/${user.avatar}`}
                      alt={`${user.username} 프로필 사진`}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold">{user.username}</p>
                    <time
                      dateTime={exchangeData.updated}
                      className="text-sm text-gray-500"
                    >
                      {timeSinceUpdated}
                    </time>
                  </div>
                </div>
                {isUserTheWriter && (
                  <div className="flex gap-1">
                    <GoPencil
                      className="mr-1 h-6 w-6 cursor-pointer text-primary"
                      onClick={() => handleEdit(exchangeData)}
                    />
                    <GoTrash
                      className="mr-1 h-6 w-6 cursor-pointer text-primary"
                      onClick={() => handleDelete(exchangeData.id)}
                    />
                  </div>
                )}
              </div>
              {isEditing === exchangeData.id ? (
                <div className="mt-3">
                  <textarea
                    className="w-full rounded border px-2 py-1 text-gray-700"
                    value={editingContent}
                    onChange={(e) => setEditingContent(e.target.value)}
                  />
                  <div className="mt-2 flex justify-end gap-2">
                    <Button
                      type="submit"
                      bgClassName="bg-primary"
                      onClick={() => handleEditSubmit(exchangeData.id)}
                    >
                      저장
                    </Button>
                    <Button
                      type="button"
                      bgClassName="bg-gray-400"
                      onClick={handleEditCancel}
                    >
                      취소
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="mt-3">
                  <p className="text-gray-700">{exchangeData.description}</p>
                </div>
              )}
              <div className="mt-4 flex items-center justify-between">
                <div className="rounded-3xl border border-gray-700 px-2 py-1 text-xs text-gray-700">
                  {exchangeData.status}
                </div>
                <Button
                  type="button"
                  bgClassName="bg-primary"
                  customClassNames="hover:bg-indigo-700 focus:bg-indigo-700 focus:outline-none"
                >
                  대화하기
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        message={modalMessage}
        cancelButtonText="취소"
        confirmButtonText="확인"
      />
    </>
  );
}
