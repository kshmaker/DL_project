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
  onAnalyze: (formData: FormData) => void;
};

const breedOptions = [
  { value: "Pomeranian", label: "포메라니안" },
  { value: "Maltese", label: "말티즈" },
  { value: "Poodle", label: "푸들" },
  { value: "unknown", label: "알 수 없음" },
  { value: "custom", label: "직접 입력" },
];

type Mode = "upload" | "camera";

export default function PetInfoForm({ petInfo, setPetInfo, onAnalyze }: Props) {
  const [mode, setMode] = useState<Mode>("upload");
  const [file, setFile] = useState<File | null>(null); //원본 사진 파일
  const [capturedSrc, setCapturedSrc] = useState<string | null>(null);
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [selectedBreed, setSelectedBreed] = useState("");
  const [customBreed, setCustomBreed] = useState("");
  const [unknownAge, setUnknownAge] = useState(false);

  // breed 자동 업데이트
  useEffect(() => {
    if (selectedBreed === "custom") {
      setPetInfo((prev) => ({ ...prev, breed: customBreed }));
    } else {
      setPetInfo((prev) => ({ ...prev, breed: selectedBreed }));
    }
  }, [selectedBreed, customBreed, setPetInfo]);

  // 미리보기 URL 생성 및 해제
  useEffect(() => {
    if (imageBlob) {
      const url = URL.createObjectURL(imageBlob);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [imageBlob]);

  // 크롭 완료 후 Blob 받기
  const onCropComplete = (blob: Blob) => {
    setImageBlob(blob);
  };

  // 카메라 촬영 완료 시 데이터URL 받기
  const onCapture = (dataUrl: string) => {
    setCapturedSrc(dataUrl);
    setFile(null);
    setImageBlob(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile); //원본 파일 저장
    setCapturedSrc(null);
    setImageBlob(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageBlob) {
      alert("사진을 업로드하거나 촬영 후 크롭을 완료해주세요.");
      return;
    }
    const formData = new FormData();

    if (file) {
      //파일명은 원본 파일명 사용, Blob를 파일처럼 첨부
      formData.append("file", imageBlob, file.name);
    } else {
      //촬영 모드를 택하여 file이 없을 경우 기본 파일명 사용
      formData.append("file", imageBlob, "captured_image.jpg");
    }
    formData.append("age", unknownAge ? "" : petInfo.age);
    formData.append("breed", petInfo.breed);
    formData.append("gender", petInfo.gender);

    onAnalyze(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center max-w-xl p-6 mx-auto mt-10 space-y-4 bg-white rounded shadow-md"
    >
      {/* 나이 입력 및 알 수 없음 체크박스 */}
      <div className="w-full">
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
      <div className="w-full">
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
      <div className="w-full">
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
      <div className="w-full">
        <label className="block mb-1 font-medium">이미지 입력 방식 선택</label>
        <select
          className="w-full p-2 border rounded"
          value={mode}
          onChange={(e) => {
            setMode(e.target.value as Mode);
            setFile(null);
            setCapturedSrc(null);
            setImageBlob(null);
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
            }}
            className="mt-2 text-sm text-red-500"
          >
            다시 촬영/업로드
          </button>
        </>
      )}

      {/* 크롭 미리보기 */}
      {previewUrl && (
        <div className="flex flex-col items-center mt-4">
          <h2 className="mb-2 font-medium text-center">최종 이미지 미리보기</h2>
          <div
            className="flex items-center justify-center overflow-hidden border border-gray-200 rounded bg-gray-50"
            style={{
              width: 640,
              height: 640,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={previewUrl}
              alt="미리보기"
              width={640}
              height={640}
              className="object-contain w-full h-full"
              style={{
                display: "block",
                margin: "auto",
                maxWidth: "90%",
                maxHeight: "90%",
              }}
            />
          </div>
        </div>
      )}

      <button
        type="submit"
        className="w-full max-w-[640px] px-4 py-3 text-lg font-bold text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        분석 요청
      </button>
    </form>
  );
}
