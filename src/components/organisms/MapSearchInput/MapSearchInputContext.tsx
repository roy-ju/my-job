import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

type MapSearchInputValueType = {
  isFocused: boolean;
  inputValue: string | undefined;
};

type MapSearchInputActionType = {
  setFocused: (v: boolean) => void;
  setInputValue: (v: string | undefined) => void;
};

const defaultValue = {
  isFocused: false,
  inputValue: undefined,
};

const defaultAction = {
  setFocused: () => {},
  setInputValue: () => {},
};

const MapSearchInputValueContext =
  createContext<MapSearchInputValueType>(defaultValue);

const MapSearchInputActionContext =
  createContext<MapSearchInputActionType>(defaultAction);

export function MapSearchInputProvider({ children }: { children: ReactNode }) {
  const [value, setValue] = useState<MapSearchInputValueType>(defaultValue);
  const actions = useMemo(
    () => ({
      setFocused(v: boolean) {
        setValue((prev: MapSearchInputValueType) => ({
          ...prev,
          isFocused: v,
        }));
      },
      setInputValue(v?: string) {
        setValue((prev: MapSearchInputValueType) => ({
          ...prev,
          inputValue: v,
        }));
      },
    }),
    [],
  );

  return (
    <MapSearchInputValueContext.Provider value={value}>
      <MapSearchInputActionContext.Provider value={actions}>
        {children}
      </MapSearchInputActionContext.Provider>
    </MapSearchInputValueContext.Provider>
  );
}

export const useMapSearchInputAction = () => {
  const value = useContext(MapSearchInputActionContext);
  return value;
};

export const useMapSearchInputValue = () => {
  const value = useContext(MapSearchInputValueContext);
  return value;
};
