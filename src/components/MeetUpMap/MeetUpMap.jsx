import { useEffect, useState } from 'react';
import { CustomOverlayMap, Map } from 'react-kakao-maps-sdk';
import EventMarker from './EventMarker';
import { useMeetUpStore, meetUpDataStore } from '@/store/store';

export default function MeetUpMap() {
  return (
    <>
      <Map
        center={{ lat: 37.556944, lng: 126.923917 }}
        // className="relative h-full"
        level={5}
        className="h-screen-nav w-screen"
      >
        <EventMarker />
      </Map>
    </>
  );
}
