import { useCallback, useRef, useState } from 'react';

export default function useControlled<T>({
  controlled,
  default: defaultProp,
}: {
  controlled?: T;
  default: T;
}): [T, (_: T | ((prev: T) => T)) => void] {
  
  const { current: isControlled } = useRef(controlled !== undefined);
  
  const [valueState, setValue] = useState(defaultProp);
  
  const value = isControlled ? controlled! : valueState;

  const setValueIfUncontrolled = useCallback(
    (newValue: T | ((prev: T) => T)) => {
      if (!isControlled) {
        setValue(newValue);
      }
    },
    [isControlled],
  );

  return [value, setValueIfUncontrolled];
}
