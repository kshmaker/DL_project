import React, { useState, useEffect, useCallback } from "react";
import Cropper, { Area } from "react-easy-crop";
import getCroppedImg from "../utils/cropImage";

type Props = {
  onCropComplete: (blob: Blob) => void;
  initialImageSrc?: string;
};

export default function CropImageUploader({
  onCropComplete,
  initialImageSrc,
}: Props) {
  const [imageSrc, setImageSrc] = useState<string | null>(
    initialImageSrc || null
  );
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [imgDimensions, setImgDimensions] = useState({
    width: 640,
    height: 480,
  });

  useEffect(() => {
    if (initialImageSrc) {
      setImageSrc(initialImageSrc);

      // 이미지 실제 비율에 맞게 크기 계산 (최대 640x480)
      const img = new window.Image();
      img.onload = () => {
        const maxW = 640;
        const maxH = 480;
        const ratio = Math.min(maxW / img.width, maxH / img.height, 1);
        setImgDimensions({
          width: Math.round(img.width * ratio),
          height: Math.round(img.height * ratio),
        });
      };
      img.src = initialImageSrc;
    }
  }, [initialImageSrc]);

  const handleCropComplete = useCallback((_: Area, area: Area) => {
    setCroppedAreaPixels(area);
  }, []);

  const handleCropDone = async () => {
    if (imageSrc && croppedAreaPixels) {
      const blob = await getCroppedImg(imageSrc, croppedAreaPixels, 640, 640);
      onCropComplete(blob);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
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
              width: imgDimensions.width,
              height: imgDimensions.height,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={handleCropComplete}
              minZoom={1}
              maxZoom={3}
              showGrid={true}
            />
          </div>
        </div>
      )}
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
