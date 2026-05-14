import React, { useState, KeyboardEvent } from "react";
import { Label } from "./label";

type KeywordsInputProps = {
  label: string;
  value?: string[];
  onChange: (newKeywords: string[]) => void;
  placeholder?: string;
  maxKeywords?: number;
  isError?: boolean;
  errorText?: string;
  preSelectedKeywords?: string[];
};

export const PrimaryKeywordsInput: React.FC<KeywordsInputProps> = ({
  label,
  onChange,
  placeholder = "Type a keyword and press Enter",
  maxKeywords = 20,
  isError,
  errorText,
  preSelectedKeywords = [],
}) => {
  const [inputValue, setInputValue] = useState("");
  const [inputValueArray, setInputValueArray] = useState<string[]>(preSelectedKeywords);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const keyword = inputValue.trim();

      if (
        keyword.length > 0 &&
        !inputValueArray.includes(keyword) &&
        inputValueArray.length < maxKeywords
      ) {
        onChange([...inputValueArray, keyword]);
        setInputValueArray((prev) => [...prev, keyword]);
        setInputValue("");
      }
    }

    if (
      e.key === "Backspace" &&
      inputValue === "" &&
      inputValueArray.length > 0
    ) {
      // remove last keyword if input empty
      onChange(inputValueArray.slice(0, -1));
    }
  };

  const removeKeyword = (keyword: string) => {
    onChange(inputValueArray.filter((k) => k !== keyword));
    setInputValueArray((prev) => prev.filter((k) => k !== keyword));
  };

  return (
    <>
      <Label>{label}</Label>
      <div className="flex flex-wrap items-center gap-2 rounded-md px-2 py-1.5 dark:bg-transparent dark:border-gray-500 border border-gray-200">
        {inputValueArray?.map((keyword) => (
          <div
            key={keyword}
            className="flex items-center gap-1 bg-gray-200 dark:bg-primary/50 px-3 py-1 rounded-2xl text-sm capitalize"
          >
            {keyword}
            <button
              type="button"
              onClick={() => removeKeyword(keyword)}
              className="hover:text-red-500 cursor-pointer ml-1"
            >
              ✕
            </button>
          </div>
        ))}

        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 outline-none border-none p-1 text-sm min-w-[120px]"
        />
      </div>
      {isError && <p className="text-red-500 text-sm">{errorText}</p>}
    </>
  );
};
