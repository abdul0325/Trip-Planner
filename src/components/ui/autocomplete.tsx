import React, { useState, KeyboardEvent, useRef, useEffect } from "react";
import { Label } from "./label";

type AutoCompleteWithOptionsProps = {
  label: string;
  value?: string[];
  onChange: (newKeywords: string[]) => void;
  placeholder?: string;
  maxKeywords?: number;
  isError?: boolean;
  errorText?: string;
  options: string[]; // the dropdown list
  showSugestionOnClick?:boolean;
  preSelectedKeywords?: string[];
};

export const AutoCompleteWithOptions: React.FC<
  AutoCompleteWithOptionsProps
> = ({
  label,
  onChange,
  placeholder = "Type and select an option",
  maxKeywords = 20,
  isError,
  errorText,
  options,
  showSugestionOnClick = false,
  preSelectedKeywords = []
}) => {
  const [inputValue, setInputValue] = useState("");
  const [inputValueArray, setInputValueArray] = useState<string[]>(preSelectedKeywords);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(preSelectedKeywords.length > 0){
      setInputValueArray(preSelectedKeywords);
    }
  }, [preSelectedKeywords]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
        setHighlightedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredOptions = options.filter(
    (opt) =>
      opt.toLowerCase().includes(inputValue.toLowerCase()) &&
      !inputValueArray.includes(opt)
  );

  const addKeyword = (keyword: string) => {
    if (
      keyword.length > 0 &&
      !inputValueArray.includes(keyword) &&
      inputValueArray.length < maxKeywords &&
      options.includes(keyword) // only allow valid options
    ) {
      onChange([...inputValueArray, keyword]);
      setInputValueArray((prev) => [...prev, keyword]);
      setInputValue("");
      setShowSuggestions(false);
      setHighlightedIndex(-1); // reset highlight
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
        // 👇 NEW: select highlighted option with Enter
        addKeyword(filteredOptions[highlightedIndex]);
      } else {
        addKeyword(inputValue.trim());
      }
    }

    // 👇 NEW: arrow key navigation
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setShowSuggestions(true);
      setHighlightedIndex((prev) =>
        prev < filteredOptions.length - 1 ? prev + 1 : 0
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setShowSuggestions(true);
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredOptions.length - 1
      );
    }

    if (
      e.key === "Backspace" &&
      inputValue === "" &&
      inputValueArray.length > 0
    ) {
      onChange(inputValueArray.slice(0, -1));
      setInputValueArray((prev) => prev.slice(0, -1));
    }
  };

  const removeKeyword = (keyword: string) => {
    onChange(inputValueArray.filter((k) => k !== keyword));
    setInputValueArray((prev) => prev.filter((k) => k !== keyword));
  };

  wrapperRef.current?.addEventListener("click", () => {
    if(showSugestionOnClick) setShowSuggestions(true);
  });

  return (
    <div ref={wrapperRef} className="w-full">
      <Label>{label}</Label>
      <div className="flex flex-wrap items-center gap-2 rounded-md  px-2 py-1.5  bg-primary dark:bg-transparent relative mt-3 dark:border-gray-500 border border-gray-200">
        {inputValueArray.map((keyword) => (
          <div
            key={keyword}
            className="flex items-center gap-1 bg-gray-200 dark:bg-primary/50 px-3 py-2 rounded-2xl text-sm capitalize"
          >
            {keyword}
            <button
              type="button"
              onClick={() => removeKeyword(keyword)}
              className="text-gray-600 hover:text-red-500 cursor-pointer ml-1"
            >
              ✕
            </button>
          </div>
        ))}

        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setShowSuggestions(true);
            setHighlightedIndex(-1); // reset highlight when typing
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 outline-none border-none p-1 text-sm min-w-[120px]"
        />

        {showSuggestions && filteredOptions.length > 0 && (
          <ul className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 border rounded mt-1 max-h-40 overflow-auto z-[99999] shadow">
            {filteredOptions.map((opt, idx) => (
              <li
                key={opt}
                onClick={() => addKeyword(opt)}
                className={`px-3 py-2 cursor-pointer text-sm capitalize
                  ${
                    highlightedIndex === idx
                      ? "bg-gray-200 dark:bg-gray-700"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
              >
                {opt}
              </li>
            ))}
          </ul>
        )}
      </div>
      {isError && <p className="text-red-500 text-sm mt-3">{errorText}</p>}
    </div>
  );
};
