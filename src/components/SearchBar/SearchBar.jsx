import { searchStore } from '@/store/store';
import { debounce } from 'lodash';
import { BsSearch } from 'react-icons/bs';

/**
 * @param {{
 * name:string,
 * placeholder:string,
 * bgStyle:string}} props
 * @returns
 */
export default function SearchBar({ name, placeholder, bgStyle }) {
  const { search, setSearch } = searchStore();
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  // console.log(search);
  return (
    <form
      className={`${bgStyle} mx-4 inline-flex w-4/5 flex-row items-start justify-start gap-2 rounded-[30px] px-4 py-1.5`}
    >
      <label htmlFor={name}>
        <BsSearch className="h-6" />
      </label>
      <input
        type="search"
        id={name}
        placeholder={placeholder}
        className="w-full bg-transparent"
        onChange={debounce(handleSearch, 500)}
        defaultValue={search}
      />
    </form>
  );
}
