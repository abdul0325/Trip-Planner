"use client"
import { cn } from "@/lib/utils";

interface PrimaryFromInputReadOnlyProps {
  label: string;
  labelIcon?: React.ReactNode;
  className?: string;
  labelClassName?: string;
  paragraphClassName?: string;
  isRequired?: boolean;
  showBorderOnBlur?: boolean
  value: string,
}

export const PrimaryFromInputReadOnly = ({
  label,
  labelIcon,
  className,
  labelClassName,
  value,
  isRequired,
  paragraphClassName
}: PrimaryFromInputReadOnlyProps) => {

  return (
    <div
      className={cn(className, "flex-1")}
    >
      {label && (
        <p
          className={cn(
            "text-sm font-medium text-gray-500",
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
        </p>
      )}

      <p
        className={cn(
          `text-base mt-1`,
          paragraphClassName,
        )}
      >{value}</p>
    </div>
  );
};