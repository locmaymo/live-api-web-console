import { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import { useLiveAPIContext } from "../../contexts/LiveAPIContext";

// Define language options based on the supported BCP-47 codes
const languageOptions = [
  { value: "en-US", label: "English (US)" },
  { value: "en-GB", label: "English (United Kingdom)" },
  { value: "en-AU", label: "English (Australia)" },
  { value: "en-IN", label: "English (India)" },
  { value: "de-DE", label: "German (Germany)" },
  { value: "es-US", label: "Spanish (United States)" },
  { value: "es-ES", label: "Spanish (Spain)" },
  { value: "fr-FR", label: "French (France)" },
  { value: "fr-CA", label: "French (Canada)" },
  { value: "hi-IN", label: "Hindi (India)" },
  { value: "pt-BR", label: "Portuguese (Brazil)" },
  { value: "ar-XA", label: "Arabic (Generic)" },
  { value: "id-ID", label: "Indonesian (Indonesia)" },
  { value: "it-IT", label: "Italian (Italy)" },
  { value: "ja-JP", label: "Japanese (Japan)" },
  { value: "tr-TR", label: "Turkish (Turkey)" },
  { value: "vi-VN", label: "Vietnamese (Vietnam)" },
  { value: "bn-IN", label: "Bengali (India)" },
  { value: "gu-IN", label: "Gujarati (India)" },
  { value: "kn-IN", label: "Kannada (India)" },
  { value: "ml-IN", label: "Malayalam (India)" },
  { value: "mr-IN", label: "Marathi (India)" },
  { value: "ta-IN", label: "Tamil (India)" },
  { value: "te-IN", label: "Telugu (India)" },
  { value: "nl-NL", label: "Dutch (Netherlands)" },
  { value: "ko-KR", label: "Korean (South Korea)" },
  { value: "cmn-CN", label: "Mandarin Chinese (China)" },
  { value: "pl-PL", label: "Polish (Poland)" },
  { value: "ru-RU", label: "Russian (Russia)" },
  { value: "th-TH", label: "Thai (Thailand)" },
];

export default function LanguageSelector() {
  const { config, setConfig } = useLiveAPIContext();

  // Initialize the selected language from the current config or default to English (US)
  useEffect(() => {
    const currentLanguage = config.generationConfig?.speechConfig?.languageCode || "en-US";
    const languageOption = languageOptions.find(opt => opt.value === currentLanguage) || 
                          { value: "en-US", label: "English (US)" };
    setSelectedOption(languageOption);
  }, [config]);

  const [selectedOption, setSelectedOption] = useState<{
    value: string;
    label: string;
  } | null>(languageOptions[0]);

  // Update the config when a new language is selected
  const updateConfig = useCallback(
    (languageCode: string) => {
      setConfig({
        ...config,
        generationConfig: {
          ...config.generationConfig,
          speechConfig: {
            ...config.generationConfig?.speechConfig,
            languageCode: languageCode,
          },
        },
      });
    },
    [config, setConfig]
  );

  return (
    <div className="select-group">
      <label htmlFor="language-selector">Language</label>
      <Select
        id="language-selector"
        className="react-select"
        classNamePrefix="react-select"
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            background: "var(--Neutral-15)",
            color: "var(--Neutral-90)",
            minHeight: "33px",
            maxHeight: "33px",
            border: 0,
          }),
          option: (styles, { isFocused, isSelected }) => ({
            ...styles,
            backgroundColor: isFocused
              ? "var(--Neutral-30)"
              : isSelected
              ? "var(--Neutral-20)"
              : undefined,
          }),
        }}
        value={selectedOption}
        defaultValue={selectedOption}
        options={languageOptions}
        onChange={(e) => {
          setSelectedOption(e);
          if (e) {
            updateConfig(e.value);
          }
        }}
      />
    </div>
  );
}