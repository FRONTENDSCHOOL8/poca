import { useEffect, useRef } from 'react';

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  message,
  cancelButtonText = '취소',
  confirmButtonText = '확인',
  buttonStyles = {
    cancel: 'rounded bg-gray200 px-4 py-2 hover:bg-gray300',
    confirm: 'rounded bg-primary px-4 py-2 text-white hover:bg-indigo-700',
  },
  modalStyles = 'rounded-lg bg-white p-6 shadow-lg',
}) {
  const cancelButtonRef = useRef(null);
  const confirmButtonRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen || e.key !== 'Tab') return;

      // Shift + Tab을 눌렀을 때 이전 요소로 포커스 이동
      const isShiftPressed = e.shiftKey;
      const currentFocusIsCancelBtn =
        document.activeElement === cancelButtonRef.current;
      const currentFocusIsConfirmBtn =
        document.activeElement === confirmButtonRef.current;

      if (isShiftPressed && currentFocusIsCancelBtn) {
        e.preventDefault();
        confirmButtonRef.current.focus();
      } else if (!isShiftPressed && currentFocusIsConfirmBtn) {
        e.preventDefault();
        cancelButtonRef.current.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className={modalStyles}>
        <h2 className="mb-4 text-lg font-bold">확인</h2>
        <p>{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            ref={cancelButtonRef}
            className={buttonStyles.cancel}
            onClick={onClose}
          >
            {cancelButtonText}
          </button>
          <button
            ref={confirmButtonRef}
            className={buttonStyles.confirm}
            onClick={onConfirm}
          >
            {confirmButtonText}
          </button>
        </div>
      </div>
    </div>
  );
}
