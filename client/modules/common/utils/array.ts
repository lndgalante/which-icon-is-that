import { nanoid } from "nanoid";

export function getArray(length) {
  return Array.from({ length }, () => nanoid());
}
