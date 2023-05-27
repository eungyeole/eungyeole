import debounce from "lodash/debounce";
import { useEffect } from "react";

export const useDebounceEffect = (
  callback: () => void,
  deps: any[],
  delay: number
) => {
  useEffect(() => {
    const handler = debounce(() => callback(), delay);
    handler();
    return () => handler.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, delay, ...deps]);
};
