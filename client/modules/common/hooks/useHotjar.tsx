import { useEffect } from "react";
import { hotjar } from "react-hotjar";

const HJSV = 6;
const HJID = 2725156;

export function useHotjar() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      hotjar.initialize(HJID, HJSV);
    }
  }, []);
}
