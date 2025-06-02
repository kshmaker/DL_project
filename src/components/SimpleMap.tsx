import React, { useState } from "react";
import { Map } from "react-kakao-maps-sdk";
export default function KakaoMapToggle() {
  const [showMap, setShowMap] = useState(false);

  return (
    <div>
      <button
        onClick={() => setShowMap((prev) => !prev)}
        className="px-4 py-2 mb-4 text-white bg-blue-600 rounded"
      >
        {showMap ? "지도 숨기기" : "지도 보기"}
      </button>

      {showMap && (
        <Map
          center={{ lat: 33.450701, lng: 126.570667 }}
          style={{ width: "1000px", height: "600px" }}
          level={3}
        />
      )}
    </div>
  );
}
