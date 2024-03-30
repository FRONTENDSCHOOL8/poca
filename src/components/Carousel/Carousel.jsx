import Slider from 'react-slick';
import './slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { GrPrevious, GrNext } from 'react-icons/gr';

const Prev = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        position: 'absolute',
        left: '2px',
        zIndex: 10,
        fontSize: '40px',
        color: 'white',
      }}
      onClick={onClick}
    >
      <GrPrevious />
    </div>
  );
};

const Next = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        position: 'absolute',
        right: '20px',
        zIndex: 10,
        fontSize: '40px',
        color: 'white',
      }}
      onClick={onClick}
    >
      <GrNext />
    </div>
  );
};

export default function Carousel() {
  const settings = {
    arrows: true,
    nextArrow: <Next />,
    prevArrow: <Prev />,
    dots: true,
    // dotsClass: `slick-dots`,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: 'linear',
    pauseOnHover: true,
  };

  return (
    <div className="mx-auto h-360pxr w-full">
      <Slider {...settings}>
        {slides.map(({ order, alt }) => (
          <div key={order}>
            <img
              src={`/carousel/carousel_${order}.jpeg`}
              alt={alt}
              className="mx-auto size-full max-h-360pxr object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

const slides = [
  {
    order: '1',
    alt: '블랙핑크 럭키드로우',
  },
  {
    order: '2',
    alt: '2023 아이유 시즌그리팅',
  },
  {
    order: '3',
    alt: '뉴진스 신상 카드',
  },
  {
    order: '4',
    alt: 'BTS 썸머 포토카드',
  },
];
