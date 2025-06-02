import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// 질병 상세 정보 타입 정의
type DiseaseInfo = {
  summary: string; // 요약 정보 (사용하지 않음)
  definition: string; // 질병 정의 및 설명
  severity: {
    // 중증도 별 설명
    경증: string;
    중등도: string;
    중증: string;
  };
  management_common: string; // 공통 관리법
  management_detail: string[]; // 상세 관리법 목록
};

export default function DiseaseDetail() {
  // 상태: 질병 상세 정보 저장 (초기값 null)
  const [diseaseInfo, setDiseaseInfo] = useState<DiseaseInfo | null>(null);

  // react-router 훅: 현재 URL의 쿼리 파라미터를 읽기 위한 객체
  const location = useLocation();

  // react-router 훅: 이전 페이지로 이동하기 위한 함수
  const navigate = useNavigate();

  // URL 쿼리에서 disease 파라미터 읽기 (예: ?disease=구진/플라크)
  const params = new URLSearchParams(location.search);
  const diseaseName = params.get("disease");

  // diseaseName이 변경될 때마다 실행되는 useEffect
  useEffect(() => {
    if (diseaseName) {
      // diseaseName 문자열 → 내부 ID 번호 매핑 테이블
      const diseaseIdMap: { [key: string]: number } = {
        "구진/플라크": 1,
        "비듬/각질/상피성 잔꼬리": 2,
        "태선화/과다색소침착": 3,
        "농포/여드름": 4,
        "미란/궤양": 5,
        "결정/종괴": 6,
      };

      // diseaseName에 해당하는 ID 찾기
      const id = diseaseIdMap[diseaseName];

      // ID가 없으면 종료
      if (!id) return;

      // 백엔드 API에서 해당 질병 ID 정보 요청
      fetch(`http://localhost:8000/disease/${id}`)
        .then((res) => res.json())
        .then((data) => setDiseaseInfo(data)) // 받아온 데이터 상태에 저장
        .catch(() => setDiseaseInfo(null)); // 에러 시 null 처리
    }
  }, [diseaseName]);

  // 아직 데이터가 없으면 로딩 메시지 표시
  if (!diseaseInfo) return <div>정보를 불러오는 중입니다...</div>;

  return (
    <div className="max-w-3xl p-6 mx-auto mt-10 space-y-6 bg-white shadow-md rounded-xl">
      {/* 뒤로가기 버튼: 클릭 시 이전 페이지로 */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 underline"
      >
        ← 뒤로가기
      </button>

      {/* 질병 이름 (쿼리 파라미터에서 받은 문자열) */}
      <h1 className="mb-4 text-3xl font-bold">{diseaseName}</h1>

      {/* 질병 정의 설명 */}
      <p>{diseaseInfo.definition}</p>

      {/* 중증도별 설명 섹션 */}
      <h2 className="mt-6 text-xl font-semibold">중증도</h2>
      <table className="w-full border border-collapse border-gray-400 table-auto">
        <thead>
          <tr>
            {/* 표 헤더: 경증, 중등도, 중증 */}
            <th className="p-2 bg-green-300 border border-gray-400">경증</th>
            <th className="p-2 bg-yellow-300 border border-gray-400">중등도</th>
            <th className="p-2 text-white bg-red-600 border border-gray-400">
              중증
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {/* 중증도별 상세 설명 데이터 */}
            <td className="p-2 border border-gray-400">
              {diseaseInfo.severity.경증}
            </td>
            <td className="p-2 border border-gray-400">
              {diseaseInfo.severity.중등도}
            </td>
            <td className="p-2 border border-gray-400">
              {diseaseInfo.severity.중증}
            </td>
          </tr>
        </tbody>
      </table>

      {/* 공통 관리법 섹션 */}
      <h2 className="mt-6 text-xl font-semibold">관리법 (공통)</h2>
      <p className="whitespace-pre-line">{diseaseInfo.management_common}</p>

      {/* 상세 관리법 목록 섹션 */}
      <h2 className="mt-6 text-xl font-semibold">관리법 (상세)</h2>
      <ul className="list-disc list-inside">
        {/* 배열을 map으로 돌면서 리스트 출력 */}
        {diseaseInfo.management_detail.map((step, idx) => (
          <li key={idx}>{step}</li>
        ))}
      </ul>
    </div>
  );
}
