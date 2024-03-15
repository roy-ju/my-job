interface Android {
  cancelAllNotifications?: () => void;
  cancelAllNotificationsByTag?: (tag: string) => void;
  cancelAllNotificationsByTagContains?: (tagContains: string) => void;
  goToAppPermissionSettings?: () => void;
  getCurrentPositionPermissionState?: () => number;
  requestCurrentPosition?: () => number;
  requestCurrentPositionPermission?: () => void;
}

interface WebKit {
  messageHandlers?: WebKitMessageHandlers;
}

interface WebKitMessageHandlers {
  cancelAllNotificationsByTagContains?: WebKitMessageHandler;
  goToAppPermissionSettings?: WebKitMessageHandler;
  checkCameraPermission?: WebKitMessageHandler;
  showKeyboard?: WebKitMessageHandler;
  noneApplySafeArea?: WebKitMessageHandler;
  downloadFile?: WebKitMessageHandler;
}

interface WebKitMessageHandler {
  postMessage?: (body: string) => void;
}

interface NegocioWeb {
  readNotificationByID?: (id: number) => void;
}

declare interface Window {
  Android?: Android;
  webkit?: WebKit;
  NegocioWeb?: NegocioWeb;
  trends?: any;

  onReceiveCurrentPosition?: (
    position: {
      lat: number;
      lng: number;
    } | null,
  ) => void;
}
