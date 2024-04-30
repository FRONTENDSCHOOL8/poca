import { useEffect, useRef } from 'react';
import { TbCurrentLocation } from 'react-icons/tb';
import { useMap } from 'react-kakao-maps-sdk';

export default function UserLocation({
  setMapCenter,
  userLocation,
  setUserLocation,
}) {
  const map = useMap();

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          // 사용자 위치를 상태에 저장합니다.
          setUserLocation(currentLocation);
        },
        (error) => {
          console.error(error);
          alert('위치 정보를 가져오는 데 실패했습니다.');
        }
      );
    } else {
      // Geolocation API를 지원하지 않는 경우의 처리
      alert('이 브라우저에서는 Geolocation이 지원되지 않습니다.');
    }
  };
  return (
    <TbCurrentLocation
      className="absolute bottom-150pxr left-6 z-20 h-10 w-10 rounded-full border border-primary bg-white px-1 py-1 text-primary hover:cursor-pointer"
      onClick={handleCurrentLocation}
    />
  );
}
