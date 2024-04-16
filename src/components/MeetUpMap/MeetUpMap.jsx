import EventMarker from './EventMarker';
import UserLocation from './UserLocation';
import { useEffect, useState } from 'react';
import { useMeetUpStore } from '@/store/store';
import { Map, ZoomControl } from 'react-kakao-maps-sdk';

export default function MeetUpMap({ meetUpData }) {
  const [userLocation, setUserLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState({
    lat: 37.556944,
    lng: 126.923917,
  });

  useEffect(() => {
    if (userLocation) {
      // 사용자의 현재 위치로 지도 중심을 이동합니다.
      setMapCenter(userLocation);
    }
  }, [userLocation]);

  return (
    <Map
      center={mapCenter}
      isPanto={true}
      className="relative h-full w-full"
      level={5}
    >
      <ZoomControl />
      <EventMarker meetUpData={meetUpData} useMeetUpStore={useMeetUpStore} />
      {userLocation && (
        <UserLocation
          position={userLocation}
          setMapCenter={setMapCenter}
          setUserLocation={setUserLocation}
          image={{
            src: '/icons/marker.svg',
            size: { width: 40, height: 40 },
            options: {
              alt: '내 위치',
            },
          }}
        />
      )}
    </Map>
  );
}
