/* eslint-disable no-redeclare */
import { useEffect, useRef } from 'react';

import { isClient, isString, noop } from '@/utils/is';

import { unRef } from '@/utils/unRef';

import { _window } from '@/config/ssr_config';

export type WindowEventName = keyof WindowEventMap;

export type DocumentEventName = keyof DocumentEventMap;

export type GeneralEventListener<E = Event> = {
  (evt: E): void;
};

// interface InferEventTarget<Events> {
//   addEventListener(event: Events, fn?: any, options?: any): any;
//   removeEventListener(event: Events, fn?: any, options?: any): any;
// }

// export function useEventListener<E extends keyof WindowEventMap>(
//   event: E,
//   listener: (this: Window, ev: WindowEventMap[E]) => any,
//   options?: boolean | AddEventListenerOptions,
// ): Fn;

// export function useEventListener<E extends keyof WindowEventMap>(
//   target: Window,
//   event: E,
//   listener: (this: Window, ev: WindowEventMap[E]) => any,
//   options?: boolean | AddEventListenerOptions,
// ): Fn;

// export function useEventListener<E extends keyof DocumentEventMap>(
//   target: Document,
//   event: E,
//   listener: (this: Document, ev: DocumentEventMap[E]) => any,
//   options?: boolean | AddEventListenerOptions,
// ): Fn;

// export function useEventListener<Names extends string, EventType = Event>(
//   target: InferEventTarget<Names>,
//   event: Names,
//   listener: GeneralEventListener<EventType>,
//   options?: boolean | AddEventListenerOptions,
// ): Fn;

export default function useEventListener(...args: any[]) {
  let target: MaybeRef<EventTarget | null | undefined> = _window;
  let event: string;
  let listener: EventListener;
  let options: boolean | AddEventListenerOptions;

  if (isString(args[0])) {
    [event, listener, options] = args;
  } else {
    [target, event, listener, options] = args;
  }

  const savedListener = useRef<EventListener>(listener);
  const cleanup = useRef(noop);

  useEffect(() => {
    savedListener.current = listener;
  }, [listener]);

  useEffect(() => {
    const el = unRef(target);

    if (!isClient || !el) return;

    el.addEventListener(event, savedListener.current, options);
    cleanup.current = () => {
      el.removeEventListener(event, savedListener.current, options);
    };

    return cleanup.current;
  }, [event, target, options]);

  return cleanup.current;
}
