import { useEffect } from 'react';
import { NaverMap } from '../types';

export default function useNaverMapEvent(
  target: NaverMap | undefined,
  eventName: string,
  callback?: (t: NaverMap, ...args: any[]) => void,
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
