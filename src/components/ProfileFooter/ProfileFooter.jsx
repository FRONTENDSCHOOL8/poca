import { Link } from 'react-router-dom';

export default function ProfileFooter({ desktop }) {
  return (
    <div>
      <div
        className={`flex flex-col space-y-1 bg-white bg-opacity-50 p-6 ${desktop}`}
      >
        <div className="pb-1 text-b03 font-sb03 text-gray500">고객센터</div>
        <div className="text-m03 font-m03 text-gray400">
          평일 9:00 - 16:00 (주말, 공휴일 제외)
        </div>
        <div className="pb-3 text-m03 font-m03 text-gray400">
          점심 13:00 - 14:00
        </div>

        <div className="mt-4 flex flex-row justify-start  space-x-2 pb-2">
          <Link
            to="/"
            className="hover:primary rounded border border-gray600 px-4 py-1 text-m03 font-m03 hover:border-primary  hover:text-primary"
          >
            공지사항
          </Link>
          <Link
            to="/"
            className="hover:primary rounded border border-gray600 px-4 py-1 text-m03 font-m03 hover:border-primary  hover:text-primary "
          >
            자주 묻는 질문
          </Link>
        </div>
      </div>
    </div>
  );
}
