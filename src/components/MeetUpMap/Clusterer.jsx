import { useEffect, useRef } from 'react';
import { useMap, MarkerClusterer } from 'react-kakao-maps-sdk';
import EventMarker from './EventMarker';

export default function Clusterer({ meetUpData, useMeetUpStore }) {
  const mapRef = useRef();
  const map = useMap();

  useEffect(() => {
    map.pa;
    if (map) {
      mapRef.current = map;
    }
  }, [map]);

  const onClusterclick = (_target, cluster) => {
    const map = mapRef.current;
    // 현재 지도 레벨에서 2레벨 확대한 레벨
    const level = map.getLevel() - 3;

    // 지도를 클릭된 클러스터의 마커의 위치를 기준으로 확대합니다
    map.setLevel(level, { anchor: cluster.getCenter() });
  };
  return (
    <MarkerClusterer
      averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
      minLevel={8}
      disableClickZoom={true}
      onClusterclick={onClusterclick}
    >
      <EventMarker meetUpData={meetUpData} useMeetUpStore={useMeetUpStore} />
    </MarkerClusterer>
  );
}
