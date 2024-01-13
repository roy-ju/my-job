import { useEffect } from 'react';

import { v4 } from 'uuid';

export default function useNegocioMapEvent(eventName: Negocio.MapEvent, callback?: (...args: any[]) => void) {
  useEffect(() => {
    if (!callback) return;

    // add event listener
    const eventId = v4();

    Object.assign(window.Negocio.mapEventListeners[eventName], {
      [eventId]: callback,
    });

    return () => {
      delete window.Negocio.mapEventListeners[eventName][eventId];
    };
  }, [eventName, callback]);
}
