import React, { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const KAKAO_APP_KEY = "e5585f255fbdc92284e1ed5a385f1bdb"; // 본인의 카카오 앱키로 교체하세요

export default function NearbyAnimalHospitalMap() {
  const [kakaoReady, setKakaoReady] = useState(false);
  const [center, setCenter] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [markers, setMarkers] = useState<
    { lat: number; lng: number; name: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  // 1. 카카오 맵 스크립트를 동적으로 로드
  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      setKakaoReady(true);
      return;
    }
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_APP_KEY}&libraries=services`;
    script.async = true;
    script.onload = () => {
      // SDK 로드 완료 후 맵 API 초기화 콜백 실행
      window.kakao.maps.load(() => {
        setKakaoReady(true);
      });
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // 2. SDK 로드 완료되면 현재 위치 가져와서 검색 실행
  useEffect(() => {
    if (!kakaoReady) return;

    if (!navigator.geolocation) {
      alert("이 브라우저는 위치 정보를 지원하지 않습니다.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setCenter({ lat, lng });

        const ps = new window.kakao.maps.services.Places();

        ps.keywordSearch(
          "동물병원",
          (data, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const hospitalMarkers = data.map((place) => ({
                lat: Number(place.y),
                lng: Number(place.x),
                name: place.place_name,
              }));
              setMarkers(hospitalMarkers);
            } else {
              alert("근처 동물병원 검색에 실패했습니다.");
            }
            setLoading(false);
          },
          {
            location: new window.kakao.maps.LatLng(lat, lng),
            radius: 5000,
            size: 15,
          }
        );
      },
      (error) => {
        alert("위치 정보를 가져올 수 없습니다.");
        setLoading(false);
      }
    );
  }, [kakaoReady]);

  if (!center) return <p>위치 정보를 불러오는 중입니다...</p>;

  return (
    <div style={{ width: "100%", maxWidth: 700, margin: "0 auto" }}>
      {loading && <p>지도 및 동물병원 정보를 불러오는 중입니다...</p>}
      <Map
        center={center}
        style={{
          width: "100%",
          height: "500px",
          margin: "0 auto",
          display: "block",
        }}
        level={4}
      >
        <MapMarker position={center}>
          <div
            style={{
              padding: "5px 10px",
              color: "white",
              backgroundColor: "#4A90E2",
              borderRadius: "5px",
              fontWeight: "bold",
            }}
          >
            내 위치
          </div>
        </MapMarker>
        {markers.map((marker, i) => (
          <MapMarker key={i} position={{ lat: marker.lat, lng: marker.lng }}>
            <div
              style={{
                padding: "3px 6px",
                backgroundColor: "white",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "12px",
                color: "#333",
              }}
            >
              {marker.name}
            </div>
          </MapMarker>
        ))}
      </Map>
    </div>
  );
}
