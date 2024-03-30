import { useState } from 'react';
import pb from '@/api/pocketbase';
import { useNavigate } from 'react-router-dom';

/**
 * 포토카드와 관련된 새로운 교환 글을 작성하고 저장하는 폼 컴포넌트입니다.
 * 사용자는 이 폼을 통해 교환 글의 내용을 입력하고, '저장' 버튼을 클릭하여 교환 글을 추가할 수 있습니다.
 * 입력된 교환 글은 포토카드의 교환 글 목록에 추가되며, 새로운 교환 글은 데이터베이스에 저장됩니다.
 *
 * @param {Object} props 컴포넌트의 props 객체입니다.
 * @param {Object} props.photoCardData 현재 선택된 포토카드의 데이터 객체입니다. 포토카드의 id를 포함합니다.
 * @param {Object[]} props.exchangeListData 현재 포토카드에 연관된 교환 글 목록의 데이터 배열입니다.
 * @param {object} props.loginUser
 * @param {object} props.loginStatus
 * @param {Function} props.setExchangeListData 교환 글 목록 데이터를 업데이트하는 함수입니다. 새로운 교환 글이 추가될 때 사용됩니다.
 *
 * @returns {React.ReactNode} 교환 글 작성 폼을 렌더링하는 React 컴포넌트입니다.
 */

export default function ExchangeEdit({
  photoCardData,
  exchangeListData,
  setExchangeListData,
  loginUser,
  loginStatus,
}) {
  const [comment, setComment] = useState('');
  const navigate = useNavigate();

  const userId = loginStatus ? loginUser.user.id : null;

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCancel = () => {
    setComment('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!loginUser) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/login');
      return;
    }

    if (!comment.trim()) {
      alert('교환 글 내용을 입력해주세요.');
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
      alert('교환 글이 성공적으로 저장되었습니다.');
    } catch (error) {
      // console.error('데이터를 저장하는 중 에러가 발생했습니다:', error);
      alert('데이터를 저장하는 데 실패했습니다.');
    }
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleSubmit(event);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto overflow-hidden rounded-xl bg-white p-5 shadow-meetUp"
    >
      <fieldset>
        <legend className="sr-only">교환글 작성 폼</legend>
        <div className="flex items-start space-x-4">
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
                <button
                  type="submit"
                  className="buttonStyle hover:bg-indigo-700 focus:bg-indigo-700 focus:outline-none"
                >
                  저장
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="buttonStyle hover:bg-gray-500"
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
      </fieldset>
    </form>
  );
}
