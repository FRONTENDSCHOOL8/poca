export default function GroupSelector({ groups, selectedGroup, onSelect }) {
  return (
    <div className="mx-auto mb-8 w-352pxr overflow-x-auto px-1 pt-1">
      <ul className="mx-auto flex gap-6">
        {groups.map((group, index) => (
          <li key={index} className="flex flex-col items-center">
            <button
              onClick={() => onSelect(group)}
              className={`flex h-[54px] w-[54px] items-center justify-center overflow-hidden rounded-full transition-transform duration-300 hover:scale-90 ${
                selectedGroup === group.id
                  ? 'bg-gradient-to-b from-red-400 to-indigo-500 p-1'
                  : 'bg-gray-200 p-0.5'
              }`}
            >
              <img
                src={`https://shoong.pockethost.io/api/files/groups/${group.id}/${group.logoImage}`}
                alt={group.groupName}
                className="h-full w-full rounded-full object-cover"
              />
            </button>
            <span
              className={`${selectedGroup === group.id ? 'font-black' : 'font-semibold'} mt-2 whitespace-nowrap text-sm text-gray-700`}
            >
              {group.groupName}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
