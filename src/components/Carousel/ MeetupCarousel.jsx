import { useId, useRef, useEffect } from 'react';
import { useLoaderData } from 'react-router';

export default function MeetupCarousel() {
  const swiperRef = useRef(null);
  const imgkey = useId();
  const { eventImg, eventTitle, collectionId, id } = useLoaderData();

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
    <swiper-container ref={swiperRef} init="false" className="w-full">
      {eventImg.map((fileName) => (
        <swiper-slide key={imgkey}>
          <img
            src={`https://shoong.pockethost.io/api/files/${collectionId}/${id}/${fileName}`}
            alt={eventTitle}
            className="size-full max-h-[50vh] object-contain"
          />
        </swiper-slide>
      ))}
    </swiper-container>
  );
}
