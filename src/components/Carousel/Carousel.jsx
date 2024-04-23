import { useRef, useEffect } from 'react';

export default function Carousel() {
  const swiperRef = useRef(null);
  useEffect(() => {
    const swiper = swiperRef.current;
    const swiperParams = {
      ally: {
        prevSlideMessage: '이전',
        nextSlideMessage: '다음',
      },
      effect: 'slide',
      navigation: 'true',
      pagination: 'true',
      keyboard: {
        enabled: 'true',
      },
      loop: 'true',
      autoplay: {
        delay: '3000',
        pauseOnMouseEnter: 'true',
      },
      injectStyles: [
        `
        .swiper-button-next,
        .swiper-button-prev {
          color: rgba(102, 98, 201, 1);
        }
        .swiper-pagination-bullet{
          background-color: rgba(102, 98, 201, 1)
        }
    `,
      ],
    };
    Object.assign(swiper, swiperParams);
    swiper.initialize();
  }, []);
  return (
    <>
      <swiper-container
        ref={swiperRef}
        init="false"
        className="swiper size-min h-200pxr overflow-hidden"
      >
        {slides.map(({ order, alt, bgColor }) => (
          <SwiperSlide key={order} lazy="true" bgColor={bgColor}>
            <img
              src={`/carousel/carousel_${order}.jpeg`}
              alt={alt}
              className="mx-auto block max-w-full object-cover"
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </swiper-container>
    </>
  );
}

const SwiperSlide = ({ children, bgColor }) => {
  return (
    <swiper-slide style={{ backgroundColor: bgColor }}>{children}</swiper-slide>
  );
};

const slides = [
  {
    order: '1',
    alt: '블랙핑크 럭키드로우',
    bgColor: '#F8B7B6',
  },
  {
    order: '2',
    alt: '2023 아이유 시즌그리팅',
    bgColor: 'white',
  },
  {
    order: '3',
    alt: '뉴진스 신상 카드',
    bgColor: '#BED9E2',
  },
  {
    order: '4',
    alt: 'BTS 썸머 포토카드',
    bgColor: '#A3E1FD',
  },
];
