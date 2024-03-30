// 버튼 컴포넌트
export default function Button({
  type,
  isSmall,
  isDisabled,
  bgClassName = '',
  textColorClassName = '',
  customClassNames = '',
  children,
  onClick,
}) {
  let width, height, fontWeight, backgroundColor, textColor;
  if (isSmall) {
    (width = 'w-69pxr'), (height = 'h-28pxr'), (fontWeight = 'medium');
  } else {
    (width = 'w-265pxr'), (height = 'h-44pxr'), (fontWeight = 'semibold');
  }

  bgClassName
    ? (backgroundColor = bgClassName)
    : (backgroundColor = isDisabled ? 'bg-gray-400' : 'bg-primary');

  textColorClassName
    ? (textColor = textColorClassName)
    : (textColor = 'text-white');

  const defaultClassNames = `${width} ${height} ${fontWeight} rounded-[10px] text-sm`;
  const classNames =
    `${textColor} ${backgroundColor} ${customClassNames} ${defaultClassNames}`.trim();

  return (
    <button type={type} className={classNames} onClick={onClick}>
      {children}
    </button>
  );
}
