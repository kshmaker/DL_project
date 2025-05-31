import React from "react";

type Props = {
  language: "ko" | "en";
  setLanguage: (lang: "ko" | "en") => void;
};

export default function LanguageToggle({ language, setLanguage }: Props) {
  return (
    <div className="absolute top-4 right-4 flex space-x-2">
      <button
        onClick={() => setLanguage("ko")}
        className={`px-3 py-1 rounded ${
          language === "ko" ? "bg-blue-600 text-white" : "bg-gray-200"
        }`}
      >
        한국어
      </button>
      <button
        onClick={() => setLanguage("en")}
        className={`px-3 py-1 rounded ${
          language === "en" ? "bg-blue-600 text-white" : "bg-gray-200"
        }`}
      >
        English
      </button>
    </div>
  );
}
