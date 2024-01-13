import { useCallback, useEffect } from 'react';

import { updateFcmToken } from '@/apis/user/updateFcmToken';

import Keys from '@/constants/storage_keys';

const Events = {
  UpdateFcmToken: 'negocio_native_event_session_storage_change',
};

export default function useNativeAppEventListeners() {
  const onRecieveFcmToken = useCallback(() => {
    // Called when fcm token and device id are received from the native app.
    const deviceId = localStorage.getItem(Keys.DEVICE_ID);
    const fcmToken = localStorage.getItem(Keys.FCM_TOKEN);
    const accessToken = localStorage.getItem(Keys.ACCESS_TOKEN);

    if (accessToken && deviceId && fcmToken) {
      updateFcmToken({
        token: fcmToken,
        device_id: deviceId,
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener(Events.UpdateFcmToken, onRecieveFcmToken);
    return () => {
      window.removeEventListener(Events.UpdateFcmToken, onRecieveFcmToken);
    };
  }, [onRecieveFcmToken]);
}
