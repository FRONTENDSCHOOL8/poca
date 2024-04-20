import { useEffect, useRef, useState } from 'react';

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  message,
  title = '확인',
  cancelButtonText = '취소',
  confirmButtonText = '확인',
  showCancelButton = true,
  showConfirmButton = true,
  useNotification = false,
  confirmNotificationMessage = '확인되었습니다.',
  cancelNotificationMessage = '취소되었습니다.',
  buttonStyles = {
    cancel: 'rounded bg-gray200 px-4 py-2 hover:bg-gray300',
    confirm: 'rounded bg-primary px-4 py-2 text-white hover:bg-indigo-700',
  },
  modalStyles = '   ',
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
      <dialog ref={dialogRef} className={`fixed inset-0 z-50 overflow-y-auto`}>
        <div className={`fixed inset-0 bg-black bg-opacity-50 ${modalStyles}`}>
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
          <div className="rounded bg-black bg-opacity-75 px-4 py-2 text-white">
            {notification}
          </div>
        </div>
      )}
    </>
  );
}
