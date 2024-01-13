import { useCallback, useRef, useState } from 'react';

import useLatest from './useLatest';

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
  const onOpen = useLatest(options.onOpen);
  const onClose = useLatest(options.onClose);
  const onMessage = useLatest(options.onMessage);
  const onError = useLatest(options.onError);

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
      onError.current?.(event, webSocket);
      setReadyState(webSocket.readyState || WebSocketReadyState.Closed);
      console.error('Websocket Error', event);
    };

    webSocket.onopen = (event) => {
      if (unmountedRef.current) {
        return;
      }
      onOpen.current?.(event, webSocket);
      setReadyState(webSocket.readyState || WebSocketReadyState.Open);

      // console.log('Websocket connection opened', event); => log추적
    };

    webSocket.onmessage = (event) => {
      if (unmountedRef.current) {
        return;
      }
      onMessage.current?.(event, webSocket);
    };

    webSocket.onclose = (event) => {
      if (unmountedRef.current) {
        return;
      }
      onClose.current?.(event, webSocket);
      setReadyState(webSocket.readyState || WebSocketReadyState.Closed);

      // console.log('Websocket connection closed', event); => log추적
    };

    webSocketRef.current = webSocket;
  }, [socketUrl, onOpen, onError, onMessage, onClose]);

  const sendMessage = useCallback<WebSocket['send']>(
    (message) => {
      if (readyState === WebSocketReadyState.Open) {
        webSocketRef.current?.send(message);
      } else {
        console.error(`Failed to send message, ${message}. WebSocket is not connected.`);
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
