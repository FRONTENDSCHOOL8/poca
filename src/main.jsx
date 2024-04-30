import '@/styles/tailwind.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './Layout/RootLayout/RootLayout';
import Exchange from './pages/Exchange/Exchange';
import { phocaData } from './loader/index';
import exchangeDetailData from './loader/exchangeDetailData';
import MeetUp from './pages/MeetUp/MeetUp';
import Profile from './pages/Profile/Profile';
import Home from './pages/Home/Home';
import Chatting from './pages/Chatting/Chatting';
import Alerts from './pages/Alerts/Alerts';
import LikeDetail from './pages/LikeDetail/LikeDetail';
import Login from './pages/Login/Login';
import ColloectBookDetail from './pages/ColloectBookDetail/ColloectBookDetail';
import userData from './loader/userData';
import ExchangeDetail from './pages/ExchangeDetail/ExchangeDetail';
import MeetUpDetail from './components/MeetUpDetail/MeetUpDetail';
import meetUpData from './loader/meetUpData';
import { meetUpDetail } from './loader/meetUpDetailData';
import ProfileSetting from './pages/ProfileSetting/ProfileSetting';
import LoginInfo from './pages/ProfileSetting/LoginInfo';
import MyBias from './pages/MyBias/MyBias';
import NotFound from './pages/NotFound/NotFound';
import Register from './pages/Register/Register';
import CollectBookAdd from './pages/CollectBookAdd/CollectBookAdd';
import InformUs from './pages/InformUs/InformUs';
import PhotoCardSubmit from './pages/PhotoCardSubmit/PhotoCardSubmit';
import MeetUpSubmit from './pages/MeetUpSubmit/MeetUpSubmit';
import KakaoRedirect from './pages/Login/KakaoRedirect';
// import NaverRedirect from './pages/Login/NaverRedirect';
import InstaRedirect from './pages/Login/InstaRedirect';
import { register } from 'swiper/element/bundle';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

register();

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Home />,
        loader: phocaData,
      },
      {
        path: '/exchange',
        element: <Exchange />,
        loader: phocaData,
      },
      {
        path: '/exchangeDetail/:id',
        element: <ExchangeDetail />,
        loader: exchangeDetailData,
      },
      {
        path: '/meetup',
        element: <MeetUp />,
        loader: meetUpData,
      },
      {
        path: '/meetupDetail/:id',
        element: <MeetUpDetail />,
        loader: meetUpDetail,
      },
      {
        path: '/profile',
        element: <Profile />,
        loader: phocaData,
      },
      {
        path: '/profileSetting',
        element: <ProfileSetting />,
      },
      {
        path: '/loginInfo',
        element: <LoginInfo />,
        loader: userData,
      },
      {
        path: '/informUs/photoCardSubmit',
        element: <PhotoCardSubmit />,
        loader: phocaData,
      },
      {
        path: '/informUs/meetUpSubmit',
        element: <MeetUpSubmit />,
        loader: phocaData,
      },
      {
        path: '/informUs',
        element: <InformUs />,
        loader: userData,
      },
      {
        path: '/collectBook/:group/:id/:title',
        element: <ColloectBookDetail />,
        loader: phocaData,
      },
      {
        path: '/collectBook/collectBookAdd',
        element: <CollectBookAdd />,
        loader: phocaData,
      },
      {
        path: '/myBias',
        element: <MyBias />,
        loader: phocaData,
      },
      {
        path: '/likeDetail',
        element: <LikeDetail />,
      },
      {
        path: '/Login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
        loader: userData,
      },
      {
        path: '/api/oauth2-redirect',
        element: <KakaoRedirect />,
      },
      {
        // path: '/authNaver',
        // element: <NaverRedirect />,
      },
      {
        path: '/api/oauth2-redirect',
        element: <InstaRedirect />,
      },
    ],
  },
  {
    path: '/chatting',
    element: <Chatting />,
  },
  {
    path: '/alerts',
    element: <Alerts />,
  },
]);

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
    <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
  </QueryClientProvider>
);
