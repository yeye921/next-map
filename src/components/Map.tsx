/* global kakao */
import Script from 'next/script';
import { Dispatch, SetStateAction } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

const DEFAULT_LAT = 37.497625203;
const DEFAULT_LNG = 127.03088379;

interface MapProps {
  setMap: Dispatch<SetStateAction<any>>;
}

export default function Map({ setMap }: MapProps) {
  // kakao map 로드
  const loadKakaoMap = () => {
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
      const mapOption = {
        center: new window.kakao.maps.LatLng(DEFAULT_LAT, DEFAULT_LNG), //지도의 중심좌표.
        level: 3,
      };

      const map = new window.kakao.maps.Map(mapContainer, mapOption);
      setMap(map);
    });
  };
  return (
    <>
      <Script
        strategy='afterInteractive'
        type='text/javascript'
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
        onReady={loadKakaoMap}
      />
      <div id='map' className='w-full h-screen'></div>
    </>
  );
}
