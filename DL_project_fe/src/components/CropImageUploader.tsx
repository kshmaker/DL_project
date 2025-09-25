import React, { useState, useEffect, useCallback } from "react";
import Cropper, { Area } from "react-easy-crop";
import getCroppedImg from "../utils/cropImage";

type Props = {
  onCropComplete: (blob: Blob) => void; // 크롭 완료 시 Blob 객체를 부모에 전달하는 콜백
  initialImageSrc?: string; // 초기 이미지 경로 (base64 또는 URL)
};

export default function CropImageUploader({
  onCropComplete,
  initialImageSrc,
}: Props) {
  // 크롭할 이미지 소스 (초기값은 props로 받음)
  const [imageSrc, setImageSrc] = useState<string | null>(
    initialImageSrc || null
  );

  // 이미지 내에서 크롭 영역의 중심 좌표 (x, y)
  const [crop, setCrop] = useState({ x: 0, y: 0 });

  // 이미지 확대/축소 비율 (zoom level)
  const [zoom, setZoom] = useState(1);

  // 크롭된 영역의 픽셀 좌표값 (실제 이미지 기준)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  // 이미지 뷰어에 맞춰 조절된 이미지 실제 가로/세로 크기
  const [imgDimensions, setImgDimensions] = useState({
    width: 640,
    height: 480,
  });

  // initialImageSrc가 변경되면 실행
  useEffect(() => {
    if (initialImageSrc) {
      setImageSrc(initialImageSrc);

      // 이미지 로드 후 원본 비율에 맞춰 최대 640x480 사이즈로 리사이즈
      const img = new window.Image();
      img.onload = () => {
        const maxW = 640;
        const maxH = 480;
        // 원본 이미지 가로/세로에 맞춘 비율 계산, 1보다 크면 1로 고정(축소만)
        const ratio = Math.min(maxW / img.width, maxH / img.height, 1);
        setImgDimensions({
          width: Math.round(img.width * ratio),
          height: Math.round(img.height * ratio),
        });
      };
      img.src = initialImageSrc;
    }
  }, [initialImageSrc]);

  // 크롭 영역이 변경되어 크롭 완료 시 호출되는 콜백
  // 첫 번째 인자는 원본 대비 비율 영역, 두 번째는 픽셀 단위 영역
  const handleCropComplete = useCallback((_: Area, area: Area) => {
    setCroppedAreaPixels(area); // 실제 픽셀 영역 저장
  }, []);

  // 크롭 완료 버튼 클릭 시 호출되는 함수
  // getCroppedImg 유틸로 이미지 잘라내고 Blob 반환 후 부모에 전달
  const handleCropDone = async () => {
    if (imageSrc && croppedAreaPixels) {
      // 640x640 크기로 크롭 이미지 Blob 생성
      const blob = await getCroppedImg(imageSrc, croppedAreaPixels, 640, 640);
      onCropComplete(blob);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* 이미지가 있을 때만 크롭퍼 렌더링 */}
      {imageSrc && (
        <div
          className="relative flex items-center justify-center mx-auto bg-gray-200 rounded"
          style={{
            width: 640,
            height: 640,
            maxWidth: "100%",
            maxHeight: "100%",
            background: "#eee",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: imgDimensions.width, // 이미지 실제 크기 반영
              height: imgDimensions.height,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative", // Cropper는 position:relative 내부에서 절대 위치로 작동
            }}
          >
            {/* react-easy-crop 컴포넌트 */}
            <Cropper
              image={imageSrc} // 크롭할 이미지 src
              crop={crop} // 크롭 중심 좌표
              zoom={zoom} // 확대 비율
              aspect={1} // 1:1 정사각형 크롭 고정
              onCropChange={setCrop} // 크롭 이동 시 상태 변경
              onZoomChange={setZoom} // 줌 변경 시 상태 변경
              onCropComplete={handleCropComplete} // 크롭 완료 시 콜백
              minZoom={1} // 최소 확대 배율
              maxZoom={3} // 최대 확대 배율
              showGrid={true} // 크롭 영역에 격자 표시
            />
          </div>
        </div>
      )}

      {/* 크롭 완료 버튼 */}
      <button
        type="button"
        onClick={handleCropDone}
        className="mt-6 w-full max-w-[640px] py-3 text-lg font-semibold rounded bg-blue-600 text-white hover:bg-blue-700 transition-all"
        style={{ margin: "0 auto" }}
      >
        크롭 완료
      </button>
    </div>
  );
}
