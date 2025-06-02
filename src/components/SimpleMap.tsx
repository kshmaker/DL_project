// import React, { useEffect, useState } from "react";
// import { Map, MapMarker } from "react-kakao-maps-sdk";

// export default function NearbyAnimalHospitalMap() {
//   const [center, setCenter] = useState({ lat: 37.5665, lng: 126.978 }); // 서울 기본 위치
//   const [markers, setMarkers] = useState<
//     { lat: number; lng: number; name: string }[]
//   >([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // 1. 사용자 위치 요청
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const lat = position.coords.latitude;
//           const lng = position.coords.longitude;
//           setCenter({ lat, lng });

//           // 2. 카카오맵 장소 검색 API 사용
//           const ps = new window.kakao.maps.services.Places();
//           const callback = (data: any[], status: string) => {
//             if (status === window.kakao.maps.services.Status.OK) {
//               // 동물병원 리스트 저장
//               const hospitalMarkers = data.map((place) => ({
//                 lat: place.y,
//                 lng: place.x,
//                 name: place.place_name,
//               }));
//               setMarkers(hospitalMarkers);
//             } else {
//               alert("근처 동물병원 검색에 실패했습니다.");
//             }
//             setLoading(false);
//           };

//           ps.keywordSearch("동물병원", callback, {
//             location: new window.kakao.maps.LatLng(lat, lng),
//             radius: 5000, // 반경 5km 내 검색
//           });
//         },
//         (error) => {
//           alert("위치 정보를 가져올 수 없습니다.");
//           setLoading(false);
//         }
//       );
//     } else {
//       alert("이 브라우저는 위치 정보를 지원하지 않습니다.");
//       setLoading(false);
//     }
//   }, []);

//   return (
//     <div>
//       {loading && <p>지도 및 동물병원 정보를 불러오는 중입니다...</p>}
//       <Map center={center} style={{ width: "100%", height: "600px" }} level={5}>
//         {/* 사용자 위치 마커 */}
//         <MapMarker position={center}>
//           <div style={{ padding: "5px", color: "black", fontWeight: "bold" }}>
//             내 위치
//           </div>
//         </MapMarker>

//         {/* 동물병원 마커들 */}
//         {markers.map((marker, i) => (
//           <MapMarker key={i} position={{ lat: marker.lat, lng: marker.lng }}>
//             <div style={{ padding: "5px", color: "blue" }}>{marker.name}</div>
//           </MapMarker>
//         ))}
//       </Map>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { Map, MapMarker } from "react-kakao-maps-sdk";

// export default function NearbyAnimalHospitalMap() {
//   const [center, setCenter] = useState<{ lat: number; lng: number } | null>(
//     null
//   );
//   const [markers, setMarkers] = useState<
//     { lat: number; lng: number; name: string }[]
//   >([]);
//   const [loading, setLoading] = useState(true);
//   const [kakaoReady, setKakaoReady] = useState(false);

//   // 카카오맵 SDK 로드 완료 확인 (window.kakao 체크)
//   useEffect(() => {
//     if (window.kakao && window.kakao.maps) {
//       setKakaoReady(true);
//     } else {
//       const interval = setInterval(() => {
//         if (window.kakao && window.kakao.maps) {
//           setKakaoReady(true);
//           clearInterval(interval);
//         }
//       }, 100);
//       return () => clearInterval(interval);
//     }
//   }, []);

//   useEffect(() => {
//     if (!kakaoReady) return; // SDK 준비 전엔 실행하지 않음

//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const lat = position.coords.latitude;
//           const lng = position.coords.longitude;
//           setCenter({ lat, lng });

//           const ps = new window.kakao.maps.services.Places();

//           const callback = (data: any[], status: string) => {
//             if (status === window.kakao.maps.services.Status.OK) {
//               console.log("검색 결과:", data);
//               const hospitalMarkers = data.map((place) => ({
//                 lat: Number(place.y),
//                 lng: Number(place.x),
//                 name: place.place_name,
//               }));
//               setMarkers(hospitalMarkers);
//             } else {
//               console.error("장소 검색 실패:", status);
//               alert("근처 동물병원 검색에 실패했습니다.");
//             }
//             setLoading(false);
//           };

//           ps.keywordSearch("동물병원", callback, {
//             location: new window.kakao.maps.LatLng(lat, lng),
//             radius: 5000,
//             size: 15, // 한번에 최대 검색 개수 (기본 15)
//           });
//         },
//         (error) => {
//           alert("위치 정보를 가져올 수 없습니다.");
//           setLoading(false);
//         }
//       );
//     } else {
//       alert("이 브라우저는 위치 정보를 지원하지 않습니다.");
//       setLoading(false);
//     }
//   }, [kakaoReady]);

//   // center가 null이면 지도 안 그리기
//   if (!center) return <p>위치 정보를 불러오는 중입니다...</p>;

//   return (
//     <div style={{ width: "100%", maxWidth: 700, margin: "0 auto" }}>
//       {loading && <p>지도 및 동물병원 정보를 불러오는 중입니다...</p>}
//       <Map
//         center={center}
//         style={{
//           width: "100%",
//           height: "500px",
//           margin: "0 auto",
//           display: "block",
//         }}
//         level={4}
//       >
//         <MapMarker position={center}>
//           <div
//             style={{
//               padding: "5px 10px",
//               color: "white",
//               backgroundColor: "#4A90E2",
//               borderRadius: "5px",
//               fontWeight: "bold",
//             }}
//           >
//             내 위치
//           </div>
//         </MapMarker>

//         {markers.map((marker, i) => (
//           <MapMarker key={i} position={{ lat: marker.lat, lng: marker.lng }}>
//             <div
//               style={{
//                 padding: "3px 6px",
//                 backgroundColor: "white",
//                 border: "1px solid #ddd",
//                 borderRadius: "4px",
//                 fontSize: "12px",
//                 color: "#333",
//               }}
//             >
//               {marker.name}
//             </div>
//           </MapMarker>
//         ))}
//       </Map>
//     </div>
//   );
// }
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
