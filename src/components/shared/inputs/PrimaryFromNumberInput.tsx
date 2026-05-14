"use client"
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";

interface PrimaryFormNumberInputProps<T extends FieldValues> {
  control?: Control<T>;
  name: Path<T>;
  label?: string;
  labelIcon?: React.ReactNode;
  placeholder?: string;
  className?: string;
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
}

export const PrimaryFormNumberInput = <T extends FieldValues>({
  control,
  name,
  label,
  labelIcon,
  placeholder,
  className,
  min = 0,
  max,
  step,
  disabled = false,
  maxLength,
  labelClassName,
  inputClassName,
  isRequired = true,
}: PrimaryFormNumberInputProps<T>) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem
          className={cn(className, "flex-1", {
            "mb-1": !fieldState.error,
          })}
        >
          {label && (
            <FormLabel
              className={cn("text-sm flex items-baseline gap-1", labelClassName)}
            >
              {labelIcon && (
                <span className="flex items-center justify-center w-4 h-4">
                  {labelIcon}
                </span>
              )}
              {label} 
              {isRequired && <span className="text-red-500">*</span>}
            </FormLabel>
          )}
          <FormControl>

            <div className="relative w-full">
              <Input
                type={"number"}
                placeholder={placeholder}
                {...field}
                value={field.value || ""}
                className={cn(
                  "focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0  text-primary-text dark:bg-transparent disabled:opacity-75",
                  inputClassName,
                  fieldState.error &&
                  "border border-red-500 focus-visible:border-red-500"
                )}
                min={min}
                max={max}
                step={step}
                disabled={disabled}
                maxLength={maxLength}
              />
            </div>
          </FormControl>
          {name !== "message_body" && (
            <FormMessage className="text-red-500 text-sm font-normal" />
          )}
        </FormItem>
      )}
    />
  );
};