import { Link } from 'react-router-dom';

export default function ImageLink({ type }) {
  const banners = {
    collectBook: {
      src: '/banner_11.png',
      alt: '콜렉트북 바로가기',
      to: '/profile',
    },
    faq: {
      src: '/banner_faq.png',
      alt: '자주하는 질문 페이지로 이동하기',
      to: '/profileSetting',
    },
  };
  const bannerData = banners[type];
  const { src, alt, to } = bannerData;
  return (
    <Link to={to} className="mb-10 cursor-pointer overflow-hidden">
      <img
        src={src}
        alt={alt}
        className="h-[215px] w-full object-cover md:h-[395px]"
      />
    </Link>
  );
}
