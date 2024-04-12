import { useEffect, useRef, useState } from 'react';

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  message,
  cancelButtonText = '취소',
  confirmButtonText = '확인',
  showCancelButton = true,
  showConfirmButton = true,
  useNotification = false, // 선택적으로 알림 기능을 사용할지 여부를 결정하는 prop
  confirmNotificationMessage = '확인되었습니다.',
  cancelNotificationMessage = '취소되었습니다.',
  buttonStyles = {
    cancel: 'rounded bg-gray200 px-4 py-2 hover:bg-gray300',
    confirm: 'rounded bg-primary px-4 py-2 text-white hover:bg-indigo-700',
  },
  modalStyles = 'rounded-lg shadow-lg bg-black bg-opacity-75',
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

    const handleKeyDown = (e) => {
      if (e.key !== 'Tab') return;

      const focusableModalElements = [
        cancelButtonRef.current,
        confirmButtonRef.current,
      ].filter((el) => el !== null);

      const firstElement = focusableModalElements[0];
      const lastElement =
        focusableModalElements[focusableModalElements.length - 1];

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
    }, 2000);
  };

  return (
    <>
      <dialog
        ref={dialogRef}
        className={`fixed inset-0 ${modalStyles}  bg-black bg-opacity-75`}
      >
        <div className="flex items-center justify-center bg-white ">
          <div className=" p-6">
            <h2 className="mb-4 text-lg font-bold">확인</h2>
            <p>{message}</p>
            <div className="mt-6 flex justify-end gap-3">
              {showCancelButton && (
                <button
                  ref={cancelButtonRef}
                  className={buttonStyles.cancel}
                  onClick={() => {
                    onClose();
                    dialogRef.current.close(); // dialog를 명시적으로 닫습니다.
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
                    dialogRef.current.close(); // dialog를 명시적으로 닫습니다.
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
      </dialog>

      {notification && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="rounded bg-black bg-opacity-75 px-4 py-2 text-white">
            {notification}
          </div>
        </div>
      )}
    </>
  );
}
