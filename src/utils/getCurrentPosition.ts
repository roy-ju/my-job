type SuccessCallback = (position: { lat: number; lng: number }) => void;

type ErrorCallback = () => void;

export default function getCurrentPosition(onSuccess: SuccessCallback, onError: ErrorCallback) {
  if (typeof navigator === 'undefined') return;
  window.onReceiveCurrentPosition = (location) => {
    if (location) {
      onSuccess(location);
    } else {
      onError();
    }
  };

  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      onSuccess({
        lat: coords.latitude,
        lng: coords.longitude,
      });
    },
    () => {
      if (navigator.userAgent.includes('(NegocioUserApp)')) {
        const permissionState = window.Android?.getCurrentPositionPermissionState?.();
        if (permissionState === -1) {
          window.Android?.requestCurrentPositionPermission?.();
        }
        if (permissionState === 0) {
          window.Android?.requestCurrentPosition?.();
        }
      } else {
        onError();
      }
    },
  );
}
