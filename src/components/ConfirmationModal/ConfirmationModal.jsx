import { useEffect, useRef, useState } from 'react';

export default function ConfirmationModal({
  isOpen, //모달 표시 상태 제어
  onClose, //취소 버튼 클릭시 실행되는 함수
  onConfirm, //확인 버튼 클릭시 실행되는 함수
  message, // 모달 내부에 표시될 메세지
  title = '확인',
  cancelButtonText = '취소',
  confirmButtonText = '확인',
  showCancelButton = true,
  showConfirmButton = true,
  useNotification = false, //버튼 클릭 후 알림 메시지 표시 여부
  confirmNotificationMessage = '확인되었습니다.',
  cancelNotificationMessage,
  buttonStyles = {
    cancel: 'rounded bg-gray200 px-4 py-2 hover:bg-gray300',
    confirm: 'rounded bg-primary px-4 py-2 text-white hover:bg-indigo-700',
  },
}) {
  const dialogRef = useRef(null);
  const cancelButtonRef = useRef(null);
  const confirmButtonRef = useRef(null);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    if (isOpen) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
    //키보드 접근성. Tab 키 포커스를 취소와 확인 버튼 사이에서 순환시키는 기능 수행
    const handleKeyDown = (e) => {
      if (e.key !== 'Tab') return;

      const focusableModalElements = [
        cancelButtonRef.current,
        confirmButtonRef.current,
      ].filter((el) => el !== null);

      const firstElement = focusableModalElements[0];
      const lastElement =
        focusableModalElements[focusableModalElements.length - 1];
      //Tab 순환 로직
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, showCancelButton, showConfirmButton]);

  const showTemporaryNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification('');
    }, 2300);
  };

  return (
    <>
      <dialog ref={dialogRef} className={`fixed inset-0 z-50 overflow-y-auto`}>
        <div className={`fixed inset-0 bg-black bg-opacity-50`}>
          <div className="flex min-h-screen items-center justify-center">
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-lg font-bold">{title}</h2>
              <p>{message}</p>
              <div className="mt-6 flex justify-end gap-3">
                {showCancelButton && (
                  <button
                    ref={cancelButtonRef}
                    className={buttonStyles.cancel}
                    onClick={() => {
                      onClose();
                      if (useNotification)
                        showTemporaryNotification(cancelNotificationMessage);
                    }}
                  >
                    {cancelButtonText}
                  </button>
                )}
                {showConfirmButton && (
                  <button
                    ref={confirmButtonRef}
                    className={buttonStyles.confirm}
                    onClick={() => {
                      onConfirm();
                      if (useNotification)
                        showTemporaryNotification(confirmNotificationMessage);
                    }}
                  >
                    {confirmButtonText}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </dialog>

      {notification && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="rounded bg-gray-800 bg-opacity-75 px-4 py-2 text-white">
            {notification}
          </div>
        </div>
      )}
    </>
  );
}
