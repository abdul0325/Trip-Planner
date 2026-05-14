"use client"
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { FieldValues, Path } from "react-hook-form";
import { FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

interface PrimaryFormInputProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  labelIcon?: React.ReactNode;
  placeholder?: string;
  className?: string;
  type?: string;
  min?: number;
  max?: number;
  step?: number;
  rows?: number;
  disabled?: boolean;
  multiline?: boolean;
  maxLength?: number;
  labelClassName?: string;
  inputClassName?: string;
  isRequired?: boolean;
  showBorderOnBlur?: boolean
  isReadOnly?: boolean
  value: string,
  onChangeValue: (val: string) => void
}

export const PrimaryFromInputWithNoControls = <T extends FieldValues>({
  label,
  labelIcon,
  placeholder,
  className,
  type,
  min = 0,
  max,
  step,
  disabled = false,
  maxLength,
  labelClassName,
  inputClassName,
  isRequired = true,
  showBorderOnBlur = true,
  isReadOnly = false,
  onChangeValue,
  value
}: PrimaryFormInputProps<T>) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div
      className={cn(className, "flex-1")}
    >
      {label && (
        <Label
          className={cn(
            "text-sm flex items-baseline gap-1 mb-2 ",
            "",
            labelClassName)}
        >
          {labelIcon && (
            <span className="flex items-center justify-center w-4 h-4">
              {labelIcon}
            </span>
          )}
          {label}
          {isRequired && <span className="text-red-500">*</span>}
        </Label>
      )}

        <div className="relative w-full">
          <Input
            readOnly={isReadOnly}
            value={value}
            onChange={(e) => {
              const value = e.target.value;
              console.log({value})
              onChangeValue(value)
            }}
            type={
              type === "password"
                ? passwordVisible
                  ? "text"
                  : "password"
                : type
            }
            // type={type}
            placeholder={placeholder}
            className={cn(
              `focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0`,
              "text-primary-text dark:bg-transparent disabled:opacity-75",
              inputClassName,
              `${!showBorderOnBlur ? "focus:border border-0" : "border"}`,
              `${isReadOnly && "border-0"}`,
              // "border border-red-500 focus-visible:border-red-500"
            )}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            maxLength={maxLength}
          />
        </div>
    </div>
  );
};