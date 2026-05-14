import { useEffect, useRef, useState } from "react";

export const useInView = <T extends HTMLElement>(
  options?: IntersectionObserverInit
) => {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      options
    );

    const node = ref.current;
    if (node) observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [options]);

  return { ref, inView };
};
