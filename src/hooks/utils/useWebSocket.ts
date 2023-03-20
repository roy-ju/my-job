import { useCallback, useRef, useState } from 'react';
import useCallbackRef from './useCallbackRef';
import useUnmount from './useUnmount';

export enum WebSocketReadyState {
  Connecting = 0,
  Open = 1,
  Closing = 2,
  Closed = 3,
}

export interface UseWebSocketOptions {
  onOpen?: (event: WebSocketEventMap['open'], instance: WebSocket) => void;
  onClose?: (event: WebSocketEventMap['close'], instance: WebSocket) => void;
  onMessage?: (message: WebSocketEventMap['message'], instance: WebSocket) => void;
  onError?: (event: WebSocketEventMap['error'], instance: WebSocket) => void;
}

export default function useWebSocket(socketUrl: string, options: UseWebSocketOptions = {}) {
  const onOpen = useCallbackRef(options.onOpen);
  const onClose = useCallbackRef(options.onClose);
  const onMessage = useCallbackRef(options.onMessage);
  const onError = useCallbackRef(options.onError);

  const webSocketRef = useRef<WebSocket>();
  const unmountedRef = useRef(false);

  const [readyState, setReadyState] = useState<WebSocketReadyState>(WebSocketReadyState.Closed);

  const connectWebSocket = useCallback(() => {
    if (webSocketRef.current) {
      webSocketRef.current.close();
    }
    const webSocket = new WebSocket(socketUrl);
    setReadyState(WebSocketReadyState.Connecting);

    webSocket.onerror = (event) => {
      if (unmountedRef.current) {
        return;
      }
      onError(event, webSocket);
      setReadyState(webSocket.readyState || WebSocketReadyState.Closed);
    };

    webSocket.onopen = (event) => {
      if (unmountedRef.current) {
        return;
      }
      onOpen(event, webSocket);
      setReadyState(webSocket.readyState || WebSocketReadyState.Open);
    };

    webSocket.onmessage = (event) => {
      if (unmountedRef.current) {
        return;
      }
      onMessage(event, webSocket);
    };

    webSocket.onclose = (event) => {
      if (unmountedRef.current) {
        return;
      }
      onClose(event, webSocket);
      setReadyState(webSocket.readyState || WebSocketReadyState.Closed);
    };
  }, [socketUrl, onOpen, onClose, onMessage, onError]);

  const sendMessage = useCallback<WebSocket['send']>(
    (message) => {
      if (readyState === WebSocketReadyState.Open) {
        webSocketRef.current?.send(message);
      } else {
        throw new Error('WebSocket disconnected');
      }
    },
    [readyState],
  );

  const connect = useCallback(() => {
    connectWebSocket();
  }, [connectWebSocket]);

  const disconnect = useCallback(() => {
    webSocketRef.current?.close();
  }, []);

  useUnmount(() => {
    webSocketRef.current?.close();
  });

  return {
    connect,
    disconnect,
    sendMessage,
    readyState,
  };
}
