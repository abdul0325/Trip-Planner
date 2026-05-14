"use client"
import { Control, FieldValues, Path } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

interface PrimaryFromTextAreaInputProps<T extends FieldValues> {
  control?: Control<T>;
  name: Path<T>;
  label?: string;
  labelIcon?: React.ReactNode;
  placeholder?: string;
  className?: string;
  rows?: number;
  disabled?: boolean;
  multiline?: boolean;
  maxLength?: number;
  labelClassName?: string;
  inputClassName?: string;
  isRequired?: boolean;
  showBorderOnBlur?: boolean
  isReadOnly?: boolean
}

export const PrimaryFromTextAreaInput = <T extends FieldValues>({
  control,
  name,
  label,
  labelIcon,
  placeholder,
  className,
  disabled = false,
  maxLength,
  labelClassName,
  inputClassName,
  isRequired = true,
  showBorderOnBlur = true,
  isReadOnly = false
}: PrimaryFromTextAreaInputProps<T>) => {

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
              className={cn(
                "text-sm flex items-baseline gap-1",
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
            </FormLabel>
          )}
          <FormControl>

            <div className="relative w-full">
              <Textarea
                readOnly={isReadOnly}
                placeholder={placeholder}
                {...field}
                value={field.value || ""}
                className={cn(
                  `focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0`,
                  "text-primary-text dark:bg-transparent disabled:opacity-75",
                  inputClassName,
                  `${!showBorderOnBlur ? "focus:border border-0" : "border"}`,
                  `${isReadOnly && "border-0"}`,
                  fieldState.error &&
                  "border border-red-500 focus-visible:border-red-500"
                )}
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