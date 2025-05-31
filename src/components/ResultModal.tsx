// import React, { useEffect, useState } from "react";

// type DiseaseInfo = {
//   summary: string;
//   definition: string;
//   severity: {
//     경증: string;
//     중등도: string;
//     중증: string;
//   };
//   management_common: string;
//   management_detail: string[];
// };

// type Props = {
//   inputId: string;
//   disease: string;
//   segmentationImageUrl: string | null;
//   petInfo: { age: string; gender: string; breed: string };
//   onClose: () => void;
// };

// export default function ResultModal({
//   inputId,
//   disease,
//   segmentationImageUrl,
//   petInfo,
//   onClose,
// }: Props) {
//   const [diseaseInfo, setDiseaseInfo] = useState<DiseaseInfo | null>(null);

//   useEffect(() => {
//     if (disease && disease !== "무증상 또는 질병 없음") {
//       const diseaseIdMap: { [key: string]: number } = {
//         "구진/플라크": 1,
//         "비듬/각질/상피성 잔꼬리": 2,
//         "태선화/과다색소침착": 3,
//         "농포/여드름": 4,
//         "미란/궤양": 5,
//         "결정/종괴": 6,
//       };
//       const id = diseaseIdMap[disease];
//       if (!id) {
//         setDiseaseInfo(null);
//         return;
//       }
//       fetch(`http://localhost:8000/disease/${id}`)
//         .then((res) => res.json())
//         .then((data) => setDiseaseInfo(data))
//         .catch(() => setDiseaseInfo(null));
//     }
//   }, [disease]);

//   return (
//     <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-auto bg-black bg-opacity-50">
//       <div className="relative w-full max-w-xl p-6 bg-white rounded-lg shadow-lg">
//         <button
//           onClick={onClose}
//           className="absolute text-gray-700 top-2 right-2 hover:text-black"
//           aria-label="Close"
//         >
//           ✕
//         </button>

//         {segmentationImageUrl ? (
//           <img
//             src={`http://localhost:8000${segmentationImageUrl}`}
//             alt="Segmentation"
//             className="w-full h-auto mb-4 border rounded"
//           />
//         ) : (
//           <div className="flex items-center justify-center w-full h-48 mb-4 text-gray-500 border rounded">
//             Segmentation image 없음
//           </div>
//         )}

//         <h2 className="mb-2 text-xl font-semibold">예측된 질병: {disease}</h2>

//         {diseaseInfo && diseaseInfo.summary && (
//           <p className="mb-4 whitespace-pre-line">{diseaseInfo.summary}</p>
//         )}

//         <div className="p-3 mb-4 text-sm bg-gray-100 rounded">
//           <strong>입력된 반려견 정보:</strong>
//           <div>나이: {petInfo.age}</div>
//           <div>성별: {petInfo.gender}</div>
//           <div>품종: {petInfo.breed}</div>
//         </div>

//         <div className="flex flex-wrap gap-4">
//           {disease !== "무증상 또는 질병 없음" && (
//             <button
//               className="flex-grow btn-primary"
//               onClick={() =>
//                 window.open(
//                   `/disease-detail?disease=${encodeURIComponent(disease)}`,
//                   "_blank"
//                 )
//               }
//             >
//               질병 정보 및 관리법
//             </button>
//           )}
//           <button
//             className="flex-grow btn-secondary"
//             onClick={() => window.open(`/nearby-hospital`, "_blank")}
//           >
//             가까운 병원 알아보기
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
import React from "react";

type DiseaseInfo = {
  summary: string;
  definition: string;
  severity: {
    경증: string;
    중등도: string;
    중증: string;
  };
  management_common: string;
  management_detail: string[];
};

type Props = {
  inputId: string;
  disease: string;
  segmentationImageUrl: string | null;
  petInfo: { age: string; gender: string; breed: string };
  diseaseInfo: DiseaseInfo | null;
  onClose: () => void;
};

export default function ResultModal({
  inputId,
  disease,
  segmentationImageUrl,
  petInfo,
  diseaseInfo,
  onClose,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-auto bg-black bg-opacity-50">
      <div className="relative w-full max-w-xl p-6 bg-white rounded-lg shadow-lg">
        <button
          onClick={onClose}
          className="absolute text-gray-700 top-2 right-2 hover:text-black"
          aria-label="Close"
        >
          ✕
        </button>

        {segmentationImageUrl ? (
          <img
            src={`http://localhost:8000${segmentationImageUrl}`}
            alt="Segmentation"
            className="w-full h-auto mb-4 border rounded"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-48 mb-4 text-gray-500 border rounded">
            Segmentation image 없음
          </div>
        )}

        <h2 className="mb-2 text-xl font-semibold">예측된 질병: {disease}</h2>

        {diseaseInfo && diseaseInfo.summary && (
          <p className="mb-4 whitespace-pre-line">{diseaseInfo.summary}</p>
        )}

        <div className="p-3 mb-4 text-sm bg-gray-100 rounded">
          <strong>입력된 반려견 정보:</strong>
          <div>나이: {petInfo.age}</div>
          <div>성별: {petInfo.gender}</div>
          <div>품종: {petInfo.breed}</div>
        </div>

        <div className="flex flex-wrap gap-4">
          {disease !== "무증상 또는 질병 없음" && (
            <button
              className="flex-grow btn-primary"
              onClick={() =>
                window.open(
                  `/disease-detail?disease=${encodeURIComponent(disease)}`,
                  "_blank"
                )
              }
            >
              질병 정보 및 관리법
            </button>
          )}
          <button
            className="flex-grow btn-secondary"
            onClick={() => window.open(`/nearby-hospital`, "_blank")}
          >
            가까운 병원 알아보기
          </button>
        </div>
      </div>
    </div>
  );
}
