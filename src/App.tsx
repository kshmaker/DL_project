// import React, { useState } from "react";
// import CropImageUploader from "./components/CropImageUploader";
// import LoadingSpinner from "./components/LoadingSpinner";
// import LanguageToggle from "./components/LanguageToggle";
// import HomeMenu from "./components/HomeMenu";
// import UsageGuide from "./components/UsageGuide";
// import PetInfoForm from "./components/PetInfoForm";
// import WebcamCapture from "./components/WebcamCapture";

// type Language = "ko" | "en";
// type Mode = "upload" | "camera";
// type Screen = "home" | "use" | "guide" | "new";

// export default function App() {
//   const [language, setLanguage] = useState<Language>("ko");
//   const [screen, setScreen] = useState<Screen>("home");

//   // Pet info states
//   const [age, setAge] = useState("");
//   const [species, setSpecies] = useState("");
//   const [gender, setGender] = useState("unknown");
//   const [selectedBreed, setSelectedBreed] = useState("unknown");
//   const [customBreed, setCustomBreed] = useState("");

//   // Image & upload states
//   const [mode, setMode] = useState<Mode>("upload");
//   const [capturedSrc, setCapturedSrc] = useState<string | null>(null);
//   const [imageBlob, setImageBlob] = useState<Blob | null>(null);
//   const [previewUrl, setPreviewUrl] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [result, setResult] = useState("");

//   // Compose final breed string (custom or selected)
//   const breed =
//     selectedBreed === "custom"
//       ? customBreed.trim()
//       : selectedBreed === "unknown"
//       ? ""
//       : selectedBreed;

//   // Validation check (age non-negative, species selected, breed provided, image exists)
//   const isValid =
//     age !== "" &&
//     Number(age) >= 0 &&
//     species !== "" &&
//     breed !== "" &&
//     imageBlob !== null;

//   const texts = {
//     ko: {
//       actualUse: "실제 사용하기",
//       usageGuide: "사용 설명서",
//       newData: "새로운 사진 데이터 입력하기",
//       enterInfo: "반려동물 정보 입력",
//       imageUploadMethod: "이미지 업로드 방식",
//       uploadFile: "파일 업로드",
//       cameraCapture: "카메라로 촬영",
//       submit: "분석 요청",
//       unknown: "알 수 없음",
//       male: "수컷",
//       female: "암컷",
//       selectSpecies: "동물 종류 선택",
//       selectGender: "성별 선택",
//       selectBreed: "품종 선택",
//       enterBreed: "품종 직접 입력",
//       ageLabel: "나이 (0 이상의 숫자)",
//       errorIncomplete: "모든 필수 정보를 올바르게 입력해주세요.",
//       retake: "다시 촬영/업로드",
//       preview: "최종 이미지 미리보기",
//       result: "결과",
//     },
//     en: {
//       actualUse: "Use App",
//       usageGuide: "Usage Guide",
//       newData: "Input New Photo Data",
//       enterInfo: "Enter Pet Info",
//       imageUploadMethod: "Image Upload Method",
//       uploadFile: "Upload File",
//       cameraCapture: "Capture with Camera",
//       submit: "Submit Analysis",
//       unknown: "Unknown",
//       male: "Male",
//       female: "Female",
//       selectSpecies: "Select Species",
//       selectGender: "Select Gender",
//       selectBreed: "Select Breed",
//       enterBreed: "Enter Breed Manually",
//       ageLabel: "Age (number >= 0)",
//       errorIncomplete: "Please fill all required information correctly.",
//       retake: "Retake / Reupload",
//       preview: "Final Image Preview",
//       result: "Result",
//     },
//   };

//   // Reset image & preview on mode change
//   const handleModeChange = (newMode: Mode) => {
//     setMode(newMode);
//     setCapturedSrc(null);
//     setImageBlob(null);
//     setPreviewUrl("");
//   };

//   // Submit handler
//   const handleSubmit = async () => {
//     if (!isValid) {
//       alert(texts[language].errorIncomplete);
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", imageBlob!);
//     formData.append("age", age);
//     formData.append("species", species);
//     formData.append("gender", gender);
//     formData.append("breed", breed);

//     setIsLoading(true);
//     try {
//       const res = await fetch("http://localhost:8000/predict", {
//         method: "POST",
//         body: formData,
//       });
//       const data = await res.json();
//       setResult(
//         `${texts[language].result}: 클래스 ${
//           data.class
//         } (확률: ${data.probability.toFixed(2)})\n${data.reason}`
//       );
//     } catch (error) {
//       setResult("Error: " + (error as Error).message);
//     }
//     setIsLoading(false);
//   };

//   // 화면 전환 컴포넌트 결정
//   if (screen === "home") {
//     return (
//       <>
//         <LanguageToggle language={language} setLanguage={setLanguage} />
//         <HomeMenu onSelect={setScreen} language={language} />
//       </>
//     );
//   }

//   if (screen === "guide") {
//     return (
//       <>
//         <LanguageToggle language={language} setLanguage={setLanguage} />
//         <UsageGuide language={language} onBack={() => setScreen("home")} />
//       </>
//     );
//   }

//   // screen === 'use' or 'new' 둘 다 정보 입력 화면
//   return (
//     <div className="relative max-w-md p-6 mx-auto mt-10 space-y-6 bg-white shadow-md rounded-xl">
//       <LanguageToggle language={language} setLanguage={setLanguage} />

//       <div className="relative pb-10">
//         <button
//           className="absolute top-0 left-0 z-10 mt-2 ml-2 text-blue-600 underline"
//           onClick={() => setScreen("home")}
//         >
//           ← {language === "ko" ? "뒤로가기" : "Back"}
//         </button>
//         <h1 className="pt-8 text-2xl font-bold text-center">
//           {texts[language].enterInfo}
//         </h1>
//       </div>

//       <PetInfoForm
//         age={age}
//         setAge={setAge}
//         species={species}
//         setSpecies={setSpecies}
//         gender={gender}
//         setGender={setGender}
//         selectedBreed={selectedBreed}
//         setSelectedBreed={setSelectedBreed}
//         customBreed={customBreed}
//         setCustomBreed={setCustomBreed}
//         isValid={isValid}
//         texts={texts[language]}
//       />

//       <div>
//         <label className="block mb-1 font-medium">
//           {texts[language].imageUploadMethod}
//         </label>
//         <select
//           className="w-full p-2 border rounded"
//           value={mode}
//           onChange={(e) => handleModeChange(e.target.value as Mode)}
//         >
//           <option value="upload">{texts[language].uploadFile}</option>
//           <option value="camera">{texts[language].cameraCapture}</option>
//         </select>
//       </div>

//       {mode === "upload" ? (
//         <CropImageUploader
//           onCropComplete={(blob) => {
//             setImageBlob(blob);
//             setPreviewUrl(URL.createObjectURL(blob));
//           }}
//         />
//       ) : !capturedSrc ? (
//         <WebcamCapture onCapture={(dataUrl) => setCapturedSrc(dataUrl)} />
//       ) : (
//         <>
//           <CropImageUploader
//             initialImageSrc={capturedSrc}
//             onCropComplete={(blob) => {
//               setImageBlob(blob);
//               setPreviewUrl(URL.createObjectURL(blob));
//             }}
//           />
//           <button
//             onClick={() => {
//               setCapturedSrc(null);
//               setImageBlob(null);
//               setPreviewUrl("");
//             }}
//             className="mt-2 text-sm text-red-500"
//           >
//             {texts[language].retake}
//           </button>
//         </>
//       )}

//       {previewUrl && (
//         <div>
//           <h2 className="mb-1 font-medium">{texts[language].preview}</h2>
//           <img
//             src={previewUrl}
//             alt="Preview"
//             className="object-cover w-64 h-64 rounded"
//           />
//         </div>
//       )}

//       {isLoading ? (
//         <LoadingSpinner />
//       ) : (
//         <button
//           onClick={handleSubmit}
//           disabled={!isValid}
//           className="w-full px-4 py-2 text-white bg-blue-500 rounded disabled:bg-gray-300"
//         >
//           {texts[language].submit}
//         </button>
//       )}

//       {result && (
//         <pre className="p-2 mt-4 text-sm whitespace-pre-wrap bg-gray-100 rounded">
//           {result}
//         </pre>
//       )}
//     </div>
//   );
// }

// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import PetInfoForm from "./components/PetInfoForm";
// import ResultModal from "./components/ResultModal";
// import DiseaseDetail from "./components/DiseaseDetail";
// import NearbyHospital from "./components/NearbyHospital";

// export default function App() {
//   const [showResult, setShowResult] = useState(false);
//   const [resultData, setResultData] = useState<{
//     inputId: string;
//     disease: string;
//     segmentationImageUrl: string | null;
//   } | null>(null);

//   const [petInfo, setPetInfo] = useState({
//     age: "",
//     species: "",
//     gender: "",
//     breed: "",
//   });

//   const [inputId, setInputId] = useState("");

//   // 예시: 분석 요청 함수
//   const handleAnalyze = async (formData: FormData, selectedInputId: string) => {
//     try {
//       const response = await fetch("http://localhost:8000/predict", {
//         method: "POST",
//         body: formData,
//       });
//       const data = await response.json();
//       setResultData({
//         inputId: selectedInputId,
//         disease: data.disease,
//         segmentationImageUrl: data.segmentation_image_url,
//       });
//       setShowResult(true);
//     } catch (error) {
//       alert("분석 중 오류가 발생했습니다.");
//     }
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <>
//               <PetInfoForm
//                 petInfo={petInfo}
//                 setPetInfo={setPetInfo}
//                 inputId={inputId}
//                 setInputId={setInputId}
//                 onAnalyze={handleAnalyze}
//               />
//               {showResult && resultData && (
//                 <ResultModal
//                   inputId={resultData.inputId}
//                   disease={resultData.disease}
//                   segmentationImageUrl={resultData.segmentationImageUrl}
//                   petInfo={petInfo}
//                   onClose={() => setShowResult(false)}
//                 />
//               )}
//             </>
//           }
//         />
//         <Route path="/disease-detail" element={<DiseaseDetail />} />
//         <Route path="/nearby-hospital" element={<NearbyHospital />} />
//       </Routes>
//     </Router>
//   );
// }

// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import PetInfoForm from "./components/PetInfoForm";
// import ResultModal from "./components/ResultModal";
// import DiseaseDetail from "./components/DiseaseDetail";
// import NearbyHospital from "./components/NearbyHospital";

// export default function App() {
//   const [showResult, setShowResult] = useState(false);
//   const [resultData, setResultData] = useState<{
//     inputId: string;
//     disease: string;
//     segmentationImageUrl: string | null;
//   } | null>(null);

//   const [petInfo, setPetInfo] = useState({
//     age: "",
//     gender: "",
//     breed: "",
//   });

//   // 분석 요청 함수
//   const handleAnalyze = async (formData: FormData, selectedInputId: string) => {
//     try {
//       const response = await fetch("http://localhost:8000/predict", {
//         method: "POST",
//         body: formData,
//       });
//       const data = await response.json();
//       setResultData({
//         inputId: selectedInputId,
//         disease: data.disease,
//         segmentationImageUrl: data.segmentation_image_url,
//       });
//       setShowResult(true);
//     } catch (error) {
//       alert("분석 중 오류가 발생했습니다.");
//     }
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <>
//               <PetInfoForm
//                 petInfo={petInfo}
//                 setPetInfo={setPetInfo}
//                 onAnalyze={handleAnalyze}
//               />
//               {showResult && resultData && (
//                 <ResultModal
//                   inputId={resultData.inputId}
//                   disease={resultData.disease}
//                   segmentationImageUrl={resultData.segmentationImageUrl}
//                   petInfo={petInfo}
//                   onClose={() => setShowResult(false)}
//                 />
//               )}
//             </>
//           }
//         />
//         <Route path="/disease-detail" element={<DiseaseDetail />} />
//         <Route path="/nearby-hospital" element={<NearbyHospital />} />
//       </Routes>
//     </Router>
//   );
// }
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PetInfoForm from "./components/PetInfoForm";
import ResultModal from "./components/ResultModal";
import DiseaseDetail from "./components/DiseaseDetail";
import SimpleMap from "./components/SimpleMap";

export default function App() {
  const [showResult, setShowResult] = useState(false);
  const [resultData, setResultData] = useState<{
    inputId: string;
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
    "구진/플라크": 1,
    "비듬/각질/상피성 잔고리": 2,
    "태선화/과다색소침착": 3,
    "농포/여드름": 4,
    "미란/궤양": 5,
    "결정/종괴": 6,
  };

  // 분석 요청 함수
  const handleAnalyze = async (formData: FormData, selectedInputId: string) => {
    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      setResultData({
        inputId: selectedInputId,
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
                  inputId={resultData.inputId}
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
