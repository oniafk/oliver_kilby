import type { MutableRefObject, RefCallback, RefObject } from "react";

type ReactRef<T> = RefCallback<T> | MutableRefObject<T | null> | RefObject<T | null> | null;

export function mergeRefs<T>(...refs: ReactRef<T>[]): RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") ref(value);
      else if (ref != null) (ref as MutableRefObject<T | null>).current = value;
    });
  };
}
