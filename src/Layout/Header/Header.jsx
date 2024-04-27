import { BsChat, BsBell } from 'react-icons/bs';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Header() {
  const { pathname } = useLocation();
  const pathnames = [
    '/exchangeDetail',
    '/profileSetting',
    '/alert',
    '/chatting',
    '/collectBook',
    '/myBias',
    '/loginInfo',
    '/meetupDetail',
    '/LikeDetail',
    '/login',
    '/informUs',
    '/photoCardSubmit',
    '/meetUpSubmit',
  ];
  const isDetailHeaderPage = pathnames.includes('/' + pathname.split('/')[1]);
  // console.log('isDetailHeaderPage: ', isDetailHeaderPage);
  return (
    !isDetailHeaderPage && (
      <div className="desktop:hidden">
        <div className="fixed top-0 z-20 flex h-55pxr w-full items-center justify-between bg-white px-3 shadow">
          <Link to="./" className="px-10pxr">
            <img
              className="flex h-36pxr w-100pxr"
              src="/icons/shoongLogo.svg"
            />
          </Link>
          <div className="flex gap-20pxr px-10pxr">
            <Link to="/chatting">
              <BsChat className="h-26pxr w-26pxr"></BsChat>
            </Link>
            <Link to="/alerts">
              <BsBell className="h-26pxr w-26pxr"></BsBell>
            </Link>
          </div>
        </div>
      </div>
    )
  );
}
