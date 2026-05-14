import { useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDebounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
) {
  const timer = useRef<NodeJS.Timeout | null>(null);

  return (...args: Parameters<T>) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => fn(...args), delay);
  };
}