import type { MutableRefObject } from 'react';

export {};

declare global {
  interface ErrorResponse {
    error_code: number;
  }

  type MaybeRef<T> = T | MutableRefObject<T>;

  type Fn = () => void;
}
