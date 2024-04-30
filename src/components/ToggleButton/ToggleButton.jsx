export default function ToggleButton({ style }) {
  return (
    <div
      className={
        style ? style : 'm-auto mt-48pxr h-28pxr w-144pxr pb-50pxr pt-30pxr'
      }
    >
      <div className="h-7 w-36 rounded-full bg-primary">
        <button
          type="button"
          className="ml-2pxr mr-5pxr h-6 w-73pxr rounded-full bg-white text-sm font-medium leading-25pxr text-indigo-500 text-primary"
        >
          나만 보기
        </button>
        <button
          type="button"
          className="h-7 text-sm font-medium leading-25pxr text-zinc-300 text-opacity-80"
        >
          자랑 하기
        </button>
      </div>
    </div>
  );
}
