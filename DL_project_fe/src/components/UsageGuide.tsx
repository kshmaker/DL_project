import React from "react";

type Props = {
  language: "ko" | "en";
  onBack: () => void;
};

const texts = {
  ko: {
    title: "사용 설명서",
    content: [
      "반려동물의 나이, 성별, 품종 정보를 입력하세요.",
      "사진 업로드 또는 카메라 촬영을 선택하여 병변 부위를 포함한 이미지를 준비하세요.",
      "촬영 후에는 크롭 영역을 조정할 수 있으며, 다시 촬영도 가능합니다.",
      "모든 필수 정보를 입력한 후 '분석 요청' 버튼을 눌러 결과를 확인하세요.",
      "결과는 예측된 클래스와 확률, 그리고 판단 이유를 포함합니다.",
    ],
    backButton: "뒤로가기",
  },
  en: {
    title: "Usage Guide",
    content: [
      "Enter your pet's age, gender, and breed information.",
      "Choose to upload a photo or take a picture with the camera including the lesion area.",
      "After capturing, adjust the crop area or retake the photo if needed.",
      "After filling all required info, click 'Submit Analysis' to see the results.",
      "Results include predicted class, probability, and reasoning.",
    ],
    backButton: "Back",
  },
};

export default function UsageGuide({ language, onBack }: Props) {
  const t = texts[language];

  return (
    <div className="max-w-md p-6 mx-auto mt-10 space-y-4 bg-white shadow-md rounded-xl">
      <h1 className="mb-4 text-2xl font-bold">{t.title}</h1>
      <ol className="space-y-2 text-sm list-decimal list-inside">
        {t.content.map((line, idx) => (
          <li key={idx}>{line}</li>
        ))}
      </ol>
      <button
        onClick={onBack}
        className="w-full px-4 py-2 mt-6 text-white bg-blue-500 rounded"
      >
        {t.backButton}
      </button>
    </div>
  );
}
