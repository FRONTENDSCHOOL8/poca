import { useState } from 'react';
import pb from '@/api/pocketbase';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

export default function ExchangeEdit({
  loginUser,
  loginStatus,
  photoCardData,
  exchangeListData,
  setExchangeListData,
  handleSlangFiltering,
}) {
  const [comment, setComment] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();
  const userId = loginStatus ? loginUser.user.id : null;

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCancel = () => {
    setComment('');
  };

  const showModal = (message) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmModal = () => {
    if (modalMessage === '로그인이 필요한 서비스입니다.') {
      navigate('/login');
    }
    closeModal();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!loginUser) {
      showModal('로그인이 필요한 서비스입니다.');
      navigate('/login');
      return;
    }

    if (handleSlangFiltering(comment)) {
      showModal('비속어가 포홤된 글은 작성할 수 없습니다');
      return;
    }

    if (!comment.trim()) {
      showModal('교환 글 내용을 입력해주세요.');
      return;
    }

    const newExchangeData = {
      writer: userId,
      description: comment,
      status: '교환대기중',
      chatContent: null,
    };

    try {
      // exchangeList에 새로운 교환 글을 추가
      const newRecord = await pb
        .collection('exchangeList')
        .create(newExchangeData);

      // 현재 포토카드의 exchangeList 필드에 새 레코드 ID 추가
      if (newRecord) {
        await pb.collection('photoCards').update(photoCardData.id, {
          'exchangeList+': newRecord.id,
        }),
          await pb.collection('users').update(loginUser.user.id, {
            'exchangeStatus+': newRecord.id,
          });
      }

      setExchangeListData([...exchangeListData, newRecord]);
      setComment(''); // 코멘트 초기화
      showModal('교환 글이 성공적으로 저장되었습니다.');
    } catch (error) {
      showModal('데이터를 저장하는 데 실패했습니다.');
      console.error('데이터를 저장하는 중 에러가 발생했습니다:', error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleSubmit(event);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mx-auto overflow-hidden rounded-xl bg-white p-5 shadow-meetUp"
      >
        <fieldset>
          <legend className="sr-only">교환글 작성 폼</legend>
          <div className="flex w-full items-start space-x-4">
            <div className="relative flex-1">
              <label htmlFor="exchangeArticle" className="sr-only">
                교환 글을 입력하세요
              </label>
              <textarea
                id="exchangeArticle"
                name="exchangeArticle"
                className="relative h-60pxr w-full rounded border border-gray-300 p-2 text-sm"
                placeholder="코멘트를 입력하세요"
                rows={3}
                maxLength={150}
                value={comment}
                onChange={handleCommentChange}
                onKeyDown={handleKeyDown}
                aria-required="true"
              ></textarea>
              <span className="absolute bottom-60pxr right-2 text-xs text-gray-500">
                {comment.length}/150
              </span>
              <div className="mt-2 flex items-center justify-end">
                <div className="flex space-x-2">
                  <Button
                    type="submit"
                    isDisabled={true}
                    bgClassName="buttonStyle bg-primary hover:bg-indigo-700"
                    textColorClassName="text-white"
                    customClassNames="focus:outline-none"
                    onClick={handleSubmit}
                  >
                    저장
                  </Button>
                  <Button
                    type="button"
                    bgClassName="bg-gray-400 hover:bg-gray-500"
                    textColorClassName="text-white"
                    customClassNames="focus:outline-none"
                    onClick={handleCancel}
                  >
                    취소
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </fieldset>
      </form>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleConfirmModal}
        message={modalMessage}
        cancelButtonText="취소"
        confirmButtonText="확인"
      />
    </>
  );
}
