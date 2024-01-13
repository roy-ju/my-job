import type { MutableRefObject } from 'react';

import Routes from '@/router/routes';

export {};

declare global {
  interface ErrorResponse {
    error_code: number;
  }

  type MaybeRef<T> = T | MutableRefObject<T>;

  type Nullable<T> = T | null;

  type NegocioChangeEvent<T> = React.ChangeEvent<T>;

  type NegocioMouseEvent<T> = React.MouseEvent<T>;

  type NegocioTouchEvent<T> = React.TouchEvent<T>;

  type Fn = () => void;

  type NegocioPath = keyof typeof Routes;
}
