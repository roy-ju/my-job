declare namespace Negocio {
  type CallbackFunction = (...args: any[]) => void;

  type MapEvent = 'filter' | 'bounds' | 'toggle';
  type MapEventListeners = {
    [id: string]: (...args: any[]) => void;
  };

  const callbacks: Record<string, CallbackFunction>;
  const mapEventListeners: Record<MapEvent, MapEventListeners>;
}
