import { useEffect, useRef } from "react";

export const usePortal = () => {
  const portal = useRef(document.createElement("div"));

  useEffect(() => {
    const current = portal.current;
    document.body.appendChild(current);

    return () => {
      document.body.removeChild(current);
    };
  }, []);

  return portal;
};
