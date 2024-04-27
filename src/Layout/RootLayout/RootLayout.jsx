import { Outlet } from 'react-router';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import { useLocation } from 'react-router-dom';
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import DesktopHeader from '../Header/DesktopHeader';

export default function RootLayout() {
  const { pathname } = useLocation();

  const isHiddenFooter = pathname === '/meetup';
  const width = window.innerWidth;
  return (
    <>
      <Header />
      <DesktopHeader />
      <ScrollToTop />
      <Outlet />
      {isHiddenFooter ? null : <Footer />}
      <NavBar />
    </>
  );
}
