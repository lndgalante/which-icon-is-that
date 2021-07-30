import { md5 } from "pure-md5";

export function createHash(value: string): string {
  const parsedValue = value.replace(/\s|\n/g, "");
  return md5(parsedValue);
}
