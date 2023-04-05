declare namespace Negocio {
  type CallbackFunction = (...args: any[]) => void;
  const callbacks: Record<string, CallbackFunction>;
}
