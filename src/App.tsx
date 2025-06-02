import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PetInfoForm from "./components/PetInfoForm";
import ResultModal from "./components/ResultModal";
import DiseaseDetail from "./components/DiseaseDetail";
import SimpleMap from "./components/SimpleMap";

export default function App() {
  const [showResult, setShowResult] = useState(false);
  const [resultData, setResultData] = useState<{
    disease: string;
    segmentationImageUrl: string | null;
  } | null>(null);

  const [diseaseInfo, setDiseaseInfo] = useState<any>(null);

  const [petInfo, setPetInfo] = useState({
    age: "",
    gender: "",
    breed: "",
  });

  // 질병 이름 → ID 맵핑
  const diseaseIdMap: { [key: string]: number } = {
    A1: 1,
    A2: 2,
    A3: 3,
    A4: 4,
    A5: 5,
    A6: 6,
    A7: 7,
  };

  // 분석 요청 함수
  const handleAnalyze = async (formData: FormData) => {
    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      setResultData({
        disease: data.disease,
        segmentationImageUrl: data.segmentation_image_url,
      });

      // 질병 상세정보 받아오기
      const diseaseId = diseaseIdMap[data.disease];
      if (diseaseId) {
        const detailRes = await fetch(
          `http://localhost:8000/disease/${diseaseId}`
        );
        if (detailRes.ok) {
          const detailData = await detailRes.json();
          setDiseaseInfo(detailData);
        } else {
          setDiseaseInfo(null);
        }
      } else {
        setDiseaseInfo(null);
      }

      setShowResult(true);
    } catch (error) {
      alert("분석 중 오류가 발생했습니다.");
      setDiseaseInfo(null);
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <PetInfoForm
                petInfo={petInfo}
                setPetInfo={setPetInfo}
                onAnalyze={handleAnalyze}
              />
              {showResult && resultData && (
                <ResultModal
                  disease={resultData.disease}
                  segmentationImageUrl={resultData.segmentationImageUrl}
                  petInfo={petInfo}
                  diseaseInfo={diseaseInfo} // 상세정보 prop 추가
                  onClose={() => {
                    setShowResult(false);
                    setDiseaseInfo(null);
                  }}
                />
              )}
            </>
          }
        />
        <Route path="/disease-detail" element={<DiseaseDetail />} />
        <Route path="/nearby-hospital" element={<SimpleMap />} />
      </Routes>
    </Router>
  );
}
