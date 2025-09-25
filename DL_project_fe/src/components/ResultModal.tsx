import React from "react";
import { useNavigate } from "react-router-dom";

// 질병 정보 타입 정의
type DiseaseInfo = {
  summary: string; // 요약 정보
  definition: string; // 상세 정의 (이 컴포넌트에서는 사용 안 함)
  severity: {
    // 중증도별 설명
    경증: string;
    중등도: string;
    중증: string;
  };
  management_common: string; // 공통 관리법
  management_detail: string[]; // 상세 관리법 리스트
};

type Props = {
  disease: string; // 예측된 질병명
  segmentationImageUrl: string | null; // 분할(segmentation) 이미지 URL (없을 수도 있음)
  petInfo: { age: string; gender: string; breed: string }; // 반려견 정보
  diseaseInfo: DiseaseInfo | null; // 질병 상세 정보 (없을 수도 있음)
  onClose: () => void; // 모달 닫기 함수
};

export default function ResultModal({
  disease,
  segmentationImageUrl,
  petInfo,
  diseaseInfo,
  onClose,
}: Props) {
  // react-router-dom 내비게이션 훅 (페이지 이동에 사용)
  const navigate = useNavigate();

  return (
    // 모달 전체 배경: 화면 전체 고정 위치, 반투명 검은 배경
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-auto bg-black bg-opacity-50">
      {/* 모달 박스: 최대 너비 제한, 흰 배경, 그림자, 둥근 모서리 */}
      <div className="relative w-full max-w-xl p-6 bg-white rounded-lg shadow-lg">
        {/* 닫기 버튼: 오른쪽 상단, 클릭 시 onClose 호출 */}
        <button
          onClick={onClose}
          className="absolute text-gray-700 top-2 right-2 hover:text-black"
          aria-label="Close"
        >
          ✕
        </button>

        {/* 분할 이미지가 있으면 보여주기 */}
        {segmentationImageUrl ? (
          <img
            src={`http://localhost:8000${segmentationImageUrl}`} // 서버 주소에 segmentationImageUrl 붙임
            alt="Segmentation"
            className="w-full h-auto mb-4 border rounded" // 가로 꽉 채우고 세로 자동, 테두리, 둥근 모서리
          />
        ) : (
          // 없으면 안내 텍스트 표시
          <div className="flex items-center justify-center w-full h-48 mb-4 text-gray-500 border rounded">
            Segmentation image 없음
          </div>
        )}

        {/* 예측된 질병명 출력 */}
        <h2 className="mb-2 text-xl font-semibold">예측된 질병: {disease}</h2>

        {/* diseaseInfo가 있고 summary가 있으면 요약 설명 출력 */}
        {diseaseInfo && diseaseInfo.summary && (
          <p className="mb-4 whitespace-pre-line">{diseaseInfo.summary}</p>
        )}

        {/* 입력한 반려견 정보 요약 박스 */}
        <div className="p-3 mb-4 text-sm bg-gray-100 rounded">
          <strong>입력된 반려견 정보:</strong>
          {/* 나이, 공백이나 빈 문자열일 경우 "Unknown" 표시 */}
          <div>나이: {petInfo.age.trim() !== "" ? petInfo.age : "Unknown"}</div>
          {/* 성별, 공백이나 빈 문자열일 경우 "Unknown" 표시 */}
          <div>
            성별: {petInfo.gender.trim() !== "" ? petInfo.gender : "Unknown"}
          </div>
          {/* 품종, 공백이나 빈 문자열일 경우 "Unknown" 표시 */}
          <div>
            품종: {petInfo.breed.trim() !== "" ? petInfo.breed : "Unknown"}
          </div>
        </div>

        {/* 버튼 영역: 유동적으로 여러 버튼 나열 */}
        <div className="flex flex-wrap gap-4">
          {/* 질병명이 "무증상 또는 질병 없음"이 아니면 상세 페이지 이동 버튼 표시 */}
          {disease !== "무증상 또는 질병 없음" && (
            <button
              className="flex-grow btn-primary"
              onClick={() =>
                navigate(
                  `/disease-detail?disease=${encodeURIComponent(disease)}` // URL 인코딩해서 쿼리로 전달
                )
              }
            >
              질병 정보 및 관리법
            </button>
          )}

          {/* 항상 표시되는 버튼: 근처 병원 찾기 페이지로 이동 */}
          <button
            className="flex-grow btn-secondary"
            onClick={() => navigate("/nearby-hospital")}
          >
            가까운 병원 알아보기
          </button>
        </div>
      </div>
    </div>
  );
}
