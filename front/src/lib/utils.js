import {clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {set} from "lodash";

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function createNestedObject(keyString, value) {
  const result = {_keyString: keyString};
  set(result, keyString, value);
  return result;
}