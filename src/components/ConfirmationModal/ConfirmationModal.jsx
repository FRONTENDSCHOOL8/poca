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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className={modalStyles}>
        <h2 className="mb-4 text-lg font-bold">확인</h2>
        <p>{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button className={buttonStyles.cancel} onClick={onClose}>
            {cancelButtonText}
          </button>
          <button className={buttonStyles.confirm} onClick={onConfirm}>
            {confirmButtonText}
          </button>
        </div>
      </div>
    </div>
  );
}
