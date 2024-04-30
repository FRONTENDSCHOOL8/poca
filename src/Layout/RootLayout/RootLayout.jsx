import { Outlet } from 'react-router';
import { useLocation } from 'react-router-dom';
import Footer from '../Footer/Footer';
import DesktopHeader from '../Header/DesktopHeader';
import Header from '../Header/Header';
import NavBar from '../NavBar/NavBar';
import ScrollToTop from '../ScrollToTop/ScrollToTop';

export default function RootLayout() {
  const { pathname } = useLocation();

  const isHiddenFooter = pathname === '/meetup';
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
