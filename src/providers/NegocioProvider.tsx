import { isClient } from '@/utils/is';
import { ReactNode } from 'react';

export default function NegocioProvider({ children }: { children?: ReactNode }) {
  if (isClient && typeof window.Negocio === 'undefined') {
    window.Negocio = {
      callbacks: {},
      mapEventListeners: {
        filter: {},
        bounds: {},
        toggle: {},
      },
    };
  }

  return children as JSX.Element;
}
