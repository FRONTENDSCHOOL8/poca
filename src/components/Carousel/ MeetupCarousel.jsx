import { useId } from 'react';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { useLoaderData } from 'react-router';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import './slick-theme.css';

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

export default function MeetupCarousel() {
  const imgkey = useId();
  const { eventImg, eventTitle, collectionId, id } = useLoaderData();
  const record = useLoaderData();
  console.log(record);
  const settings = {
    arrows: true,
    nextArrow: <Next />,
    prevArrow: <Prev />,
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: 'linear',
    pauseOnHover: true,
  };

  return (
    <div className="mx-auto -mb-4 h-400pxr w-full">
      <Slider {...settings}>
        {eventImg.map((fileName) => (
          <div key={imgkey}>
            <img
              src={`https://shoong.pockethost.io/api/files/${collectionId}/${id}/${fileName}`}
              alt={eventTitle}
              className="mx-auto size-full max-h-360pxr object-contain"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
