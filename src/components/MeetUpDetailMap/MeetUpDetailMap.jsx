import { StaticMap } from 'react-kakao-maps-sdk';

export default function MeetUpDetailMap({ lat, lng, cafeName }) {
  return (
    <StaticMap
      center={{
        lat: lat,
        lng: lng,
      }}
      level={3}
      marker={[
        {
          position: {
            lat: lat,
            lng: lng,
          },
          text: `${cafeName}`,
        },
      ]}
      style={{
        width: '100%',
        height: '450px',
      }}
    ></StaticMap>
  );
}
