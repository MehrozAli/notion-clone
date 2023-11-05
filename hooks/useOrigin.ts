import { useEffect, useState } from "react";

export const useOrigin = () => {
  const [isMounting, setIsMounting] = useState(false);
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  useEffect(() => {
    setIsMounting(true);
  }, []);

  if (!isMounting) {
    return "";
  }

  return origin;
};
