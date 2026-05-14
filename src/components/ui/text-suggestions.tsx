"use client"

import React, { useState, useMemo } from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "./form";
import { Input } from "./input";
import { cn } from "@/lib/utils";

type TextSuggestInputProps<T extends FieldValues> = {
  label?: string;
  value?: string;
  options?: string[];
  placeholder?: string;
  // React Hook Form support
  control: Control<T>;
  name: Path<T>;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  isRequired?: boolean;
};

export const TextSuggestInput = <T extends FieldValues>({
  label,
  options = [],
  placeholder = "Start typing…",
  control,
  name,
  className,
  labelClassName,
  inputClassName,
  isRequired = true,
}: TextSuggestInputProps<T>) => {
  const [open, setOpen] = useState(false);

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
              {label}
              {isRequired && <span className="text-red-500">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <div className="relative w-full">
              <Input
                type="text"
                placeholder={placeholder}
                {...field}
                value={field.value || ""}
                onMouseDown={() => setOpen(true)}
                onBlur={() => setTimeout(() => setOpen(false), 150)}
                className={cn(
                  "focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 text-primary-text dark:bg-transparent disabled:opacity-75",
                  inputClassName,
                  fieldState.error &&
                  "border border-red-500 focus-visible:border-red-500"
                )}
              />

              {open && options.length > 0 && (
                <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-md dark:bg-black dark:border-gray-600">
                  {options.map((opt) => (
                    <div
                      key={opt}
                      // onMouseDown is used instead of onClick to prevent the input from losing focus before the click event fires
                      onMouseDown={(e) => {
                        e.preventDefault(); // prevents input blur
                        field.onChange(opt);
                        setOpen(false);
                      }}

                      className="cursor-pointer px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage className="text-red-500 text-sm font-normal" />
        </FormItem>
      )}
    />
  );
};
