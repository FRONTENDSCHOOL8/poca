import { MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';

export default function EventMarker({ meetUpData, useMeetUpStore }) {
  const handleClickMarker = (title) => {
    useMeetUpStore.setState({ selectedCafe: title });
    // useMeetUpStore.getState((state) => state.selectedLocation);
  };

  return (
    <>
      {meetUpData.map((data) => {
        return (
          data.lat &&
          data.lng && (
            <div
              className="border border-red-50 shadow-md"
              key={data.id}
              onClick={() => handleClickMarker(data.cafeName)}
            >
              <MapMarker
                position={{
                  lat: data.lat,
                  lng: data.lng,
                }}
                // onClick={() => handleClickMarker(data.lat, data.lng)}
              />
              <CustomOverlayMap
                position={{ lat: data.lat, lng: data.lng }}
                yAnchor={1}
              >
                <div className="group relative h-60pxr w-60pxr cursor-pointer">
                  {/* 이미지를 원형으로 만듭니다 */}
                  <img
                    src={`https://shoong.pockethost.io/api/files/meetUps/${data.id}/${data.artistImg}`}
                    alt={data.cafeName}
                    className="absolute left-0.5 top-1.5 z-10 h-55pxr w-55pxr rounded-full object-cover group-hover:scale-110"
                  />
                  <img
                    src="/icons/markerBorder.png"
                    alt=""
                    className="markerBorder group-hover:scale-110"
                  />
                  <span className="absolute bottom-16 left-2 hidden rounded-md border border-primary bg-white px-2 font-semibold text-primary group-hover:block">
                    {data.artistName}
                  </span>
                </div>
              </CustomOverlayMap>
            </div>
          )
        );
      })}
    </>
  );
}
