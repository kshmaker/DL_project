// import React, { useState, useEffect } from "react";

// type Props = {
//   petInfo: { age: string; breed: string; gender: string };
//   setPetInfo: React.Dispatch<
//     React.SetStateAction<{
//       age: string;
//       breed: string;
//       gender: string;
//     }>
//   >;
//   onAnalyze: (formData: FormData, selectedInputId: string) => void;
// };

// const breedOptions = [
//   { value: "Pomeranian", label: "포메라니안" },
//   { value: "Maltese", label: "말티즈" },
//   { value: "Poodle", label: "푸들" },
//   { value: "unknown", label: "알 수 없음" },
//   { value: "custom", label: "직접 입력" },
// ];

// const sampleInputs = [
//   { id: "input1", label: "사진 1" },
//   { id: "input2", label: "사진 2" },
//   { id: "input3", label: "사진 3" },
//   { id: "input4", label: "사진 4" },
//   { id: "input5", label: "사진 5" },
//   { id: "input6", label: "사진 6" },
//   { id: "input7", label: "무증상" },
// ];

// export default function PetInfoForm({ petInfo, setPetInfo, onAnalyze }: Props) {
//   const [file, setFile] = useState<File | null>(null);
//   const [selectedBreed, setSelectedBreed] = useState("");
//   const [customBreed, setCustomBreed] = useState("");
//   const [unknownAge, setUnknownAge] = useState(false);
//   const [inputId, setInputId] = useState("");

//   // selectedBreed 또는 customBreed가 변경되면 petInfo.breed 자동 업데이트
//   useEffect(() => {
//     if (selectedBreed === "custom") {
//       setPetInfo((prev) => ({ ...prev, breed: customBreed }));
//     } else {
//       setPetInfo((prev) => ({ ...prev, breed: selectedBreed }));
//     }
//   }, [selectedBreed, customBreed, setPetInfo]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!file) {
//       alert("사진을 선택해주세요");
//       return;
//     }
//     if (!inputId) {
//       alert("사진 종류를 선택해주세요");
//       return;
//     }
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("input_id", inputId);
//     formData.append("age", unknownAge ? "" : petInfo.age);
//     formData.append("breed", petInfo.breed);

//     onAnalyze(formData, inputId);
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-md p-6 mx-auto mt-10 space-y-4 bg-white rounded shadow-md"
//     >
//       {/* 나이 입력 및 알 수 없음 체크박스 */}
//       <div>
//         <label>반려견 나이</label>
//         <input
//           type="number"
//           min={0}
//           value={unknownAge ? "" : petInfo.age}
//           onChange={(e) => {
//             setPetInfo({ ...petInfo, age: e.target.value });
//             setUnknownAge(false);
//           }}
//           className="w-full p-2 border rounded"
//           disabled={unknownAge}
//           placeholder="나이를 입력하세요"
//         />
//         <label className="inline-flex items-center ml-2 text-sm cursor-pointer">
//           <input
//             type="checkbox"
//             checked={unknownAge}
//             onChange={() => {
//               setUnknownAge(!unknownAge);
//               if (!unknownAge) setPetInfo({ ...petInfo, age: "" });
//             }}
//             className="mr-2"
//           />
//           알 수 없음
//         </label>
//       </div>

//       <div>
//         <label>성별</label>
//         <select
//           value={petInfo.gender}
//           onChange={(e) => setPetInfo({ ...petInfo, gender: e.target.value })}
//           className="w-full p-2 border rounded"
//         >
//           <option value="">알 수 없음</option>
//           <option value="Male">수컷</option>
//           <option value="Female">암컷</option>
//         </select>
//       </div>

//       {/* 품종 선택 및 직접입력 */}
//       <div>
//         <label>품종</label>
//         <select
//           value={selectedBreed}
//           onChange={(e) => {
//             setSelectedBreed(e.target.value);
//             if (e.target.value !== "custom") setCustomBreed("");
//           }}
//           className="w-full p-2 border rounded"
//         >
//           <option value="">선택하세요</option>
//           {breedOptions.map((b) => (
//             <option key={b.value} value={b.value}>
//               {b.label}
//             </option>
//           ))}
//         </select>
//         {selectedBreed === "custom" && (
//           <input
//             type="text"
//             value={customBreed}
//             onChange={(e) => setCustomBreed(e.target.value)}
//             placeholder="품종을 직접 입력하세요"
//             className="w-full p-2 mt-1 border rounded"
//           />
//         )}
//       </div>

//       {/* 사진 업로드 */}
//       <div>
//         <label>사진 선택</label>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => {
//             if (e.target.files) setFile(e.target.files[0]);
//           }}
//           className="w-full p-2 border rounded"
//         />
//       </div>
//       {/* 사진 종류 선택 */}
//       <div>
//         <label>사진 종류 선택</label>
//         <select
//           value={inputId}
//           onChange={(e) => setInputId(e.target.value)}
//           className="w-full p-2 border rounded"
//         >
//           <option value="">선택하세요</option>
//           {sampleInputs.map(({ id, label }) => (
//             <option key={id} value={id}>
//               {label}
//             </option>
//           ))}
//         </select>
//       </div>
//       <button
//         type="submit"
//         className="w-full px-4 py-2 text-white bg-blue-600 rounded"
//       >
//         분석 요청
//       </button>
//     </form>
//   );
// }

import React, { useState, useEffect } from "react";
import CropImageUploader from "./CropImageUploader";
import WebcamCapture from "./WebcamCapture";

type Props = {
  petInfo: { age: string; breed: string; gender: string };
  setPetInfo: React.Dispatch<
    React.SetStateAction<{
      age: string;
      breed: string;
      gender: string;
    }>
  >;
  onAnalyze: (formData: FormData, selectedInputId: string) => void;
};

const breedOptions = [
  { value: "Pomeranian", label: "포메라니안" },
  { value: "Maltese", label: "말티즈" },
  { value: "Poodle", label: "푸들" },
  { value: "unknown", label: "알 수 없음" },
  { value: "custom", label: "직접 입력" },
];

const sampleInputs = [
  { id: "input1", label: "사진 1" },
  { id: "input2", label: "사진 2" },
  { id: "input3", label: "사진 3" },
  { id: "input4", label: "사진 4" },
  { id: "input5", label: "사진 5" },
  { id: "input6", label: "사진 6" },
  { id: "input7", label: "무증상" },
];

type Mode = "upload" | "camera";

export default function PetInfoForm({ petInfo, setPetInfo, onAnalyze }: Props) {
  const [mode, setMode] = useState<Mode>("upload");
  const [file, setFile] = useState<File | null>(null);
  const [capturedSrc, setCapturedSrc] = useState<string | null>(null);
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);

  const [selectedBreed, setSelectedBreed] = useState("");
  const [customBreed, setCustomBreed] = useState("");
  const [unknownAge, setUnknownAge] = useState(false);
  const [inputId, setInputId] = useState("");

  // selectedBreed 또는 customBreed가 변경되면 petInfo.breed 자동 업데이트
  useEffect(() => {
    if (selectedBreed === "custom") {
      setPetInfo((prev) => ({ ...prev, breed: customBreed }));
    } else {
      setPetInfo((prev) => ({ ...prev, breed: selectedBreed }));
    }
  }, [selectedBreed, customBreed, setPetInfo]);

  // 업로드된 파일명에 따라 inputId 자동 설정
  useEffect(() => {
    if (file) {
      const fileNameLower = file.name.toLowerCase();
      console.log("file name:", fileNameLower);
      const matched = sampleInputs.find((item) =>
        fileNameLower.includes(item.id.toLowerCase())
      );
      console.log("matched inputId:", matched);

      if (matched && typeof matched.id === "string") {
        setInputId(matched.id);
      } else {
        setInputId("");
      }
    } else {
      setInputId("");
    }
  }, [file]);

  // 촬영된 데이터URL에 대한 파일명 매핑 (inputId 수동 설정 필요할 경우 UI에서 선택하도록 처리 권장)

  // 크롭 완료 후 Blob 받기
  const onCropComplete = (blob: Blob) => {
    setImageBlob(blob);
    // 크롭된 이미지로부터 파일명 기반 분류 불가하므로 inputId는 기존값 유지
  };

  // 카메라 촬영 완료 시 데이터URL 받기
  const onCapture = (dataUrl: string) => {
    setCapturedSrc(dataUrl);
    setFile(null);
    setImageBlob(null);
    setInputId(""); // 촬영시 inputId 수동선택 필요 (UI에서 선택하도록)
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setCapturedSrc(null);
    setImageBlob(null);
    // inputId는 useEffect에서 자동 설정됨
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(
      "Submitting with inputId:",
      inputId,
      "file:",
      file,
      "imageBlob:",
      imageBlob
    );

    if (!imageBlob) {
      alert("사진을 업로드하거나 촬영 후 크롭을 완료해주세요.");
      return;
    }
    if (!inputId) {
      alert("사진 종류가 파일명과 매칭되지 않아 선택해주세요.");
      return;
    }
    const formData = new FormData();
    formData.append("file", imageBlob);
    formData.append("input_id", inputId);
    formData.append("age", unknownAge ? "" : petInfo.age);
    formData.append("breed", petInfo.breed);
    formData.append("gender", petInfo.gender);

    onAnalyze(formData, inputId);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md p-6 mx-auto mt-10 space-y-4 bg-white rounded shadow-md"
    >
      {/* 나이 입력 및 알 수 없음 체크박스 */}
      <div>
        <label>반려견 나이</label>
        <input
          type="number"
          min={0}
          value={unknownAge ? "" : petInfo.age}
          onChange={(e) => {
            setPetInfo({ ...petInfo, age: e.target.value });
            setUnknownAge(false);
          }}
          className="w-full p-2 border rounded"
          disabled={unknownAge}
          placeholder="나이를 입력하세요"
        />
        <label className="inline-flex items-center ml-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={unknownAge}
            onChange={() => {
              setUnknownAge(!unknownAge);
              if (!unknownAge) setPetInfo({ ...petInfo, age: "" });
            }}
            className="mr-2"
          />
          알 수 없음
        </label>
      </div>

      {/* 성별 선택 */}
      <div>
        <label>성별</label>
        <select
          value={petInfo.gender}
          onChange={(e) => setPetInfo({ ...petInfo, gender: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="">알 수 없음</option>
          <option value="Male">수컷</option>
          <option value="Female">암컷</option>
        </select>
      </div>

      {/* 품종 선택 및 직접입력 */}
      <div>
        <label>품종</label>
        <select
          value={selectedBreed}
          onChange={(e) => {
            setSelectedBreed(e.target.value);
            if (e.target.value !== "custom") setCustomBreed("");
          }}
          className="w-full p-2 border rounded"
        >
          <option value="">선택하세요</option>
          {breedOptions.map((b) => (
            <option key={b.value} value={b.value}>
              {b.label}
            </option>
          ))}
        </select>
        {selectedBreed === "custom" && (
          <input
            type="text"
            value={customBreed}
            onChange={(e) => setCustomBreed(e.target.value)}
            placeholder="품종을 직접 입력하세요"
            className="w-full p-2 mt-1 border rounded"
          />
        )}
      </div>

      {/* 이미지 업로드 / 촬영 모드 선택 */}
      <div>
        <label className="block mb-1 font-medium">이미지 입력 방식 선택</label>
        <select
          className="w-full p-2 border rounded"
          value={mode}
          onChange={(e) => {
            setMode(e.target.value as Mode);
            setFile(null);
            setCapturedSrc(null);
            setImageBlob(null);
            setInputId("");
          }}
        >
          <option value="upload">파일 업로드</option>
          <option value="camera">카메라 촬영</option>
        </select>
      </div>

      {/* 업로드 모드 */}
      {mode === "upload" && (
        <>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <CropImageUploader
            initialImageSrc={file ? URL.createObjectURL(file) : undefined}
            onCropComplete={onCropComplete}
          />
        </>
      )}

      {/* 카메라 모드 */}
      {mode === "camera" && !capturedSrc && (
        <WebcamCapture onCapture={onCapture} />
      )}

      {/* 카메라 촬영 후 크롭 */}
      {mode === "camera" && capturedSrc && (
        <>
          <CropImageUploader
            initialImageSrc={capturedSrc}
            onCropComplete={onCropComplete}
          />
          <button
            type="button"
            onClick={() => {
              setCapturedSrc(null);
              setImageBlob(null);
              setInputId("");
            }}
            className="mt-2 text-sm text-red-500"
          >
            다시 촬영/업로드
          </button>
        </>
      )}

      {/* 크롭 미리보기 */}
      {imageBlob && (
        <div>
          <h2 className="mb-1 font-medium">최종 이미지 미리보기</h2>
          <img
            src={URL.createObjectURL(imageBlob)}
            alt="Preview"
            className="object-cover w-64 h-64 rounded"
          />
        </div>
      )}

      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-600 rounded"
      >
        분석 요청
      </button>
    </form>
  );
}
