import { useEffect, useState } from "react";

export const useScroll = () => {
  const [state, setState] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const onScroll = () => {
      setState({ x: window.scrollX, y: window.scrollY });
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return state;
};
