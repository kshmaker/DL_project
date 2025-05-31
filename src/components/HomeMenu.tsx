import React from "react";

type Props = {
  onStartDiagnosis: () => void;
  onShowGuide: () => void;
  language: "ko" | "en";
};

const texts = {
  ko: {
    diagnosis: "질병 진단하기",
    guide: "사용자 가이드",
  },
  en: {
    diagnosis: "Start Diagnosis",
    guide: "User Guide",
  },
};

export default function HomeScreen({
  onStartDiagnosis,
  onShowGuide,
  language,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6">
      <button
        onClick={onStartDiagnosis}
        className="px-6 py-3 text-lg text-white bg-blue-600 rounded-lg"
      >
        {texts[language].diagnosis}
      </button>
      <button
        onClick={onShowGuide}
        className="px-6 py-3 text-lg text-gray-800 bg-gray-300 rounded-lg"
      >
        {texts[language].guide}
      </button>
    </div>
  );
}
