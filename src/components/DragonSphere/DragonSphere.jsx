import { Circle } from 'rc-progress';

export default function DragonSphere({
  ownedPhotoCards,
  phocaData,
  group,
  handleOpenModal,
  fakeRef,
  logoImage,
  groupId,
  style,
}) {
  return (
    <>
      <div
        className={`m-auto mb-27pxr flex h-100pxr w-340pxr rounded-xl border-2 border-slate-300 bg-white ${style}`}
      >
        <div className="relative flex items-center pl-15pxr">
          <Circle
            percent={Math.round(
              (ownedPhotoCards.length / phocaData.length) * 100
            )}
            strokeWidth={10}
            trailColor="#DCD6FA"
            trailWidth={10}
            strokeColor="#6662C9"
            className="absolute left-8pxr top-21pxr z-0 h-54pxr w-55pxr"
          />
          <img
            src={`https://shoong.pockethost.io/api/files/groups/${groupId}/${logoImage}`}
            className="h-50pxr w-50pxr object-scale-down"
            alt="드볼 이미지"
          />
        </div>

        <div className="flex w-full items-center justify-between px-15pxr">
          <div className="flex flex-col gap-8pxr">
            <div className="text-base font-extrabold leading-snug text-indigo-500">
              {group} 드볼{' '}
              {Math.round((ownedPhotoCards.length / phocaData.length) * 100)}%
            </div>

            <div className="text-sm font-bold leading-tight text-neutral-800">
              {ownedPhotoCards.length}/{phocaData.length} 개
            </div>
          </div>

          <button
            ref={fakeRef}
            onClick={handleOpenModal}
            className="'flex duration-200'; h-7 w-64pxr items-center justify-center rounded-md bg-zinc-400 text-sm font-semibold text-white hover:bg-primary hover:text-white"
          >
            완료
          </button>
        </div>
      </div>
    </>
  );
}
