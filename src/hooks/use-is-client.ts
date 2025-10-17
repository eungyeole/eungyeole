import { useSyncExternalStore } from "react";

const emptySubscribe = () => (): void => void 0;

export const useIsClient = () => {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
};
