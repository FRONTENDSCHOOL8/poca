import pb from '@/api/pocketbase';
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function VerticalCarousel() {
  const [meetUps, setMeetups] = useState([]);
  const swiperRef = useRef(null);

  useEffect(() => {
    const getMeetupData = async () => {
      try {
        pb.autoCancellation(false);
        const records = await pb.collection('MeetUps').getFullList();
        setMeetups(records);
      } catch (error) {
        console.log('Error getting meetup data:', error);
      }
    };
    getMeetupData();
  }, []);

  useEffect(() => {
    if (!meetUps.length) return;

    const swiper = swiperRef.current;
    const swiperParams = {
      slidesPerView: '1',
      effect: 'flip',
      flipEffect: {
        slideShadows: false,
      },
      loop: 'true',
      autoplay: {
        delay: '3000',
        pauseOnMouseEnter: true,
      },
      preventClicks: 'false',
      preventClicksPropagation: 'false',
    };
    Object.assign(swiper, swiperParams);
    swiper.initialize();
  }, [meetUps]);

  return (
    <section className="mx-auto mt-10 w-5/6 rounded-3xl  border border-primary  bg-white py-2 pt-1 text-center text-contentPrimary shadow-md">
      <swiper-container ref={swiperRef} init="false">
        {meetUps.map((meetUp) => (
          <swiper-slide key={meetUp.id}>
            <div className="link-wrapper">
              <Link to={`/meetupDetail/${meetUp.id}`}>
                <p className="ext-r02 truncate px-3 text-primary">
                  {meetUp.eventTitle}
                  <span className="x-2 text-10pxr text-contentSecondary">
                    {meetUp.date}
                  </span>
                </p>
              </Link>
            </div>
          </swiper-slide>
        ))}
      </swiper-container>
    </section>
  );
}
