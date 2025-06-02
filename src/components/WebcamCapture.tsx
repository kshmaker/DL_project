import React, { useRef } from "react";
import Webcam from "react-webcam";

type Props = {
  onCapture: (dataUrl: string) => void; // 촬영된 이미지 데이터 URL을 부모 컴포넌트로 전달하는 콜백 함수
};

export default function WebcamCapture({ onCapture }: Props) {
  // react-webcam 컴포넌트에 대한 ref 생성 (카메라 스트림과 스크린샷 기능 접근용)
  const webcamRef = useRef<Webcam>(null);

  // '사진 촬영' 버튼 클릭 시 호출되는 함수
  const handleCapture = () => {
    // webcamRef를 통해 현재 화면 스냅샷 (이미지 데이터 URL) 얻기
    const screenshot = webcamRef.current?.getScreenshot();
    // 스크린샷이 존재하면 부모 콜백에 전달
    if (screenshot) {
      onCapture(screenshot);
    }
  };

  return (
    <div className="space-y-2">
      {/* 카메라 비디오 스트림을 표시하는 영역 */}
      <div className="relative w-full h-64 overflow-hidden bg-black rounded">
        <Webcam
          ref={webcamRef} // ref 할당
          screenshotFormat="image/jpeg" // 캡처 시 이미지 포맷 지정
          videoConstraints={{ facingMode: "environment" }} // 후면 카메라 사용 (스마트폰 등)
          className="object-cover w-full h-full" // 비디오 영역을 꽉 채우며 자름
        />

        {/* 256x256 정사각형 크롭 영역 표시를 위한 중앙 오버레이 (실제로는 1920x1080이라 크기 다시 확인 필요) */}
        <div
          className="absolute border-4 border-gray-300 pointer-events-none"
          style={{
            width: 1920,
            height: 1080,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)", // 중앙 정렬
          }}
        />
      </div>

      {/* 촬영 버튼 */}
      <button
        onClick={handleCapture} // 클릭 시 사진 촬영 함수 실행
        className="w-full px-4 py-2 text-white bg-gray-700 rounded"
      >
        사진 촬영
      </button>
    </div>
  );
}
