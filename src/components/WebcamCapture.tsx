// import React, { useRef } from "react";
// import Webcam from "react-webcam";

// type Props = {
//   onCapture: (dataUrl: string) => void; // 캡처된 이미지 데이터 URL 전달
// };

// export default function WebcamCapture({ onCapture }: Props) {
//   const webcamRef = useRef<Webcam>(null);

//   const handleCapture = () => {
//     const screenshot = webcamRef.current?.getScreenshot();
//     if (screenshot) {
//       onCapture(screenshot);
//     }
//   };

//   return (
//     <div className="space-y-2">
//       <div className="relative w-full h-64 overflow-hidden bg-black rounded">
//         <Webcam
//           ref={webcamRef}
//           screenshotFormat="image/jpeg"
//           videoConstraints={{ facingMode: "environment" }}
//           className="object-cover w-full h-full"
//         />
//         {/* 256x256 정사각형 중앙 오버레이 */}
//         <div
//           className="absolute border-4 border-gray-300 pointer-events-none"
//           style={{
//             width: 1920,
//             height: 1080,
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//           }}
//         />
//       </div>
//       <button
//         onClick={handleCapture}
//         className="w-full px-4 py-2 text-white bg-gray-700 rounded"
//       >
//         사진 촬영
//       </button>
//     </div>
//   );
// }

import React, { useRef } from "react";
import Webcam from "react-webcam";

type Props = {
  onCapture: (dataUrl: string) => void; // 캡처된 이미지 데이터 URL 전달
};

export default function WebcamCapture({ onCapture }: Props) {
  const webcamRef = useRef<Webcam>(null);

  const handleCapture = () => {
    const screenshot = webcamRef.current?.getScreenshot();
    if (screenshot) {
      onCapture(screenshot);
    }
  };

  return (
    <div className="space-y-2">
      <div className="relative w-full h-64 overflow-hidden bg-black rounded">
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{ facingMode: "environment" }}
          className="object-cover w-full h-full"
        />
        {/* 256x256 정사각형 중앙 오버레이 */}
        <div
          className="absolute border-4 border-gray-300 pointer-events-none"
          style={{
            width: 1920,
            height: 1080,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
      <button
        onClick={handleCapture}
        className="w-full px-4 py-2 text-white bg-gray-700 rounded"
      >
        사진 촬영
      </button>
    </div>
  );
}
