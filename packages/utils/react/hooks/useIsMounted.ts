import { useEffect, useRef, useState } from "react";

export const useIsMounted = () => {
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return isMounted;
};
