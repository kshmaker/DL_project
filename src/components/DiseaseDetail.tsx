import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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

export default function DiseaseDetail() {
  const [diseaseInfo, setDiseaseInfo] = useState<DiseaseInfo | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const diseaseName = params.get("disease");

  useEffect(() => {
    if (diseaseName) {
      // diseaseName → id 변환
      const diseaseIdMap: { [key: string]: number } = {
        "구진/플라크": 1,
        "비듬/각질/상피성 잔꼬리": 2,
        "태선화/과다색소침착": 3,
        "농포/여드름": 4,
        "미란/궤양": 5,
        "결정/종괴": 6,
      };
      const id = diseaseIdMap[diseaseName];
      if (!id) return;

      fetch(`http://localhost:8000/disease/${id}`)
        .then((res) => res.json())
        .then((data) => setDiseaseInfo(data))
        .catch(() => setDiseaseInfo(null));
    }
  }, [diseaseName]);

  if (!diseaseInfo) return <div>정보를 불러오는 중입니다...</div>;

  return (
    <div className="max-w-3xl p-6 mx-auto mt-10 space-y-6 bg-white shadow-md rounded-xl">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 underline"
      >
        ← 뒤로가기
      </button>
      <h1 className="mb-4 text-3xl font-bold">{diseaseName}</h1>
      <p>{diseaseInfo.definition}</p>

      <h2 className="mt-6 text-xl font-semibold">중증도</h2>
      <table className="w-full border border-collapse border-gray-400 table-auto">
        <thead>
          <tr>
            <th className="p-2 bg-green-300 border border-gray-400">경증</th>
            <th className="p-2 bg-yellow-300 border border-gray-400">중등도</th>
            <th className="p-2 text-white bg-red-600 border border-gray-400">
              중증
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
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

      <h2 className="mt-6 text-xl font-semibold">관리법 (공통)</h2>
      <p className="whitespace-pre-line">{diseaseInfo.management_common}</p>

      <h2 className="mt-6 text-xl font-semibold">관리법 (상세)</h2>
      <ul className="list-disc list-inside">
        {diseaseInfo.management_detail.map((step, idx) => (
          <li key={idx}>{step}</li>
        ))}
      </ul>
    </div>
  );
}
