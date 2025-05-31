import React, { useState, useEffect, useRef } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function SimpleMap() {
  const [showMap, setShowMap] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showMap && window.kakao && mapRef.current) {
      const container = mapRef.current;
      const options = {
        center: new window.kakao.maps.LatLng(37.5665, 126.978), // 서울 중심 좌표
        level: 5,
      };
      new window.kakao.maps.Map(container, options);
    }
  }, [showMap]);

  return (
    <div>
      <button
        onClick={() => setShowMap((prev) => !prev)}
        className="px-4 py-2 text-white bg-blue-600 rounded"
      >
        {showMap ? "지도 숨기기" : "지도 보기"}
      </button>

      {showMap && (
        <div
          ref={mapRef}
          style={{ width: "100%", height: "400px", marginTop: "1rem" }}
        />
      )}
    </div>
  );
}
