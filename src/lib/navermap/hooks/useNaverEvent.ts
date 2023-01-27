import { useEffect } from 'react';

export default function useNaverMapEvent(
  target: naver.maps.Map | undefined,
  eventName: string,
  callback?: (t: naver.maps.Map, ...args: any[]) => void,
) {
  useEffect(() => {
    if (!naver.maps) {
      return () => {};
    }

    if (!target || !callback) {
      return () => {};
    }
    const wrapCallback = (...arg: any[]) => {
      if (arg === undefined) return callback(target);
      return callback(target, ...arg);
    };

    const listener = naver.maps.Event.addListener(
      target,
      eventName,
      wrapCallback,
    );

    return () => {
      naver.maps?.Event.removeListener(listener);
    };
  }, [target, eventName, callback]);
}
