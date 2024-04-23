import { searchStore } from '@/store/store';
import { debounce } from 'lodash';
import { useEffect, useRef } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useLocation } from 'react-router-dom';

/**
 * @param {{
 * name:string,
 * placeholder:string,
 * bgStyle:string}} props
 * @returns
 */
export default function SearchBar({ name, placeholder, bgStyle }) {
  const { search, setSearch, resetSearch } = searchStore();
  const location = useLocation();
  const inputRef = useRef();

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    resetSearch();
    const unmount = () => {
      resetSearch();
    };
    return unmount;
  }, []);

  useEffect(() => {
    resetSearch();
  }, [location]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, [search]);

  return (
    <form className="absolute left-5 top-2 z-20 mx-4 inline-flex w-4/5 flex-row items-start justify-start gap-2 rounded-[30px] bg-white px-4 py-1.5 py-3 shadow-meetUp">
      <label htmlFor={name}>
        <BsSearch className="h-6" />
      </label>
      <input
        type="search"
        id={name}
        ref={inputRef}
        placeholder={placeholder}
        className="w-full bg-transparent"
        onChange={debounce(handleSearch, 500)}
        defaultValue={search}
      />
    </form>
  );
}
