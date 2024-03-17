import {clsx} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function createNestedObject(keyString, value) {
  const keys = keyString.split('.');
  const result = {};

  let currentLevel = result;
  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      currentLevel[key] = value;
    } else {
      currentLevel[key] = {};
      currentLevel = currentLevel[key];
    }
  });

  return result;
}