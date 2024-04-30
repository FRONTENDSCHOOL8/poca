import { isLogin } from '@/store/store';
import { useState } from 'react';
import { useEffect } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

export default function CollectBook() {
  const [book, setBook] = useState([]);
  const { collectBook } = isLogin(); // 유저의 콜렉트북 정보

  useEffect(() => {
    setBook(collectBook);
  }, [collectBook]);

  return (
    <>
      <ul className="flex h-145pxr min-w-500pxr gap-2">
        {book.length !== 0
          ? book.map((item) => {
              return (
                <li
                  key={item.id}
                  className="flex max-h-135pxr min-h-135pxr min-w-100pxr max-w-100pxr cursor-pointer items-center justify-center overflow-hidden rounded-[5px] bg-zinc-300"
                >
                  <Link
                    to={`/collectBook/${item.group}/${item.id}/${item.title}`}
                  >
                    <img
                      className="h-full w-full rounded object-contain"
                      src={`https://shoong.pockethost.io/api/files/collectBook/${item.id}/${item.thumbNail}`}
                      alt={`제목이 ${item.title}인 콜렉트북 커버 사진`}
                      title={item.title}
                    />
                  </Link>
                </li>
              );
            })
          : null}
        <li className="flex max-h-135pxr min-h-135pxr min-w-100pxr max-w-100pxr items-center justify-center rounded-[5px] bg-zinc-300">
          <Link to="/collectBook/collectBookAdd" className="h-full w-full">
            <FaPlus size={25} className="mx-auto mt-[50%] text-zinc-500" />
          </Link>
        </li>
      </ul>
    </>
  );
}
