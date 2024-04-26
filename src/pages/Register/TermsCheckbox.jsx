export default function TermsCheckbox({
  name,
  checkedList,
  onChange,
  children,
}) {
  const checked = checkedList.includes(name);

  const checkboxStyle = checked
    ? { background: "url('/checkboxChecked.svg') no-repeat" }
    : { background: "url('/checkboxUnchecked.svg') no-repeat" };

  return (
    <label className="relative flex justify-between">
      <span className="text-xs font-medium leading-none text-zinc-800">
        {children}
      </span>
      <input
        name={name}
        checked={checked}
        onChange={onChange}
        type="checkbox"
        className="absolute right-0 h-3 w-3 appearance-none"
      />
      <span className="h-3 w-3" style={checkboxStyle}></span>
    </label>
  );
}
