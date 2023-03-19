import { useCallback, useEffect, useRef } from "react";

export function useOutsideClickEffect(
  refs: React.RefObject<HTMLElement>[],
  callback: () => void
) {
  const handleOutsideClick = useCallback(
    ({ target }: MouseEvent | TouchEvent) => {
      if (target === null) {
        return;
      }

      if (refs.length === 0) {
        return;
      }

      if (refs.some((x) => x.current?.contains(target as Node))) {
        return;
      }

      callback();
    },
    [callback, refs]
  );

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  });
}
