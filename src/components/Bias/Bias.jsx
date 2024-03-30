export default function Bias({
  alt = '내 최애 로고',
  src = '/myBias.jpg',
  style = 'h-60pxr m-auto rounded-full shadow-lg border',
  value,
  groupName,
  handle,
  fakeRef,
  children,
  tabIndex,
}) {
  return (
    <>
      <figure>
        <button
          tabIndex={tabIndex}
          type="button"
          value={value}
          onClick={handle}
          id={groupName}
        >
          <img
            ref={fakeRef}
            className={style}
            src={src}
            alt={alt}
            title={groupName}
          />
        </button>
        <figcaption className="w-100pxr text-center text-sb02 font-sb02 text-gray600">
          {children}
        </figcaption>
      </figure>
    </>
  );
}
