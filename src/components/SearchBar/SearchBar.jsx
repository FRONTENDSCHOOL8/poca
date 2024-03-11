import { searchStore } from '@/store/store';
import { debounce } from 'lodash';
import { BsSearch } from 'react-icons/bs';

// import { useNavigate } from 'react-router';

/**
 * @param {string} props.name
 * @param {string} props.placeholder
 * @returns
 */
export default function SearchBar({ name, placeholder, bgStyle }) {
  const { search, setSearch } = searchStore();
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  console.log(search);
  return (
    <form
      className={`${bgStyle} flex flex-row items-start justify-start gap-2 rounded-[30px] px-4 py-1.5`}
    >
      <BsSearch className="h-6" />
      <label htmlFor={name}></label>
      <input
        type="text"
        id={name}
        placeholder={placeholder}
        className="bg-transparent"
        onChange={debounce(handleSearch, 500)}
        defaultValue={search}
      />
    </form>
  );
}
