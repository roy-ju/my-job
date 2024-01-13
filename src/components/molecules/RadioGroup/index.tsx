import useControlled from '@/hooks/useControlled';
import { ChangeEvent, ChangeEventHandler, HTMLProps, ReactNode, useMemo } from 'react';
import RadioGroupContext from './RadioGroupContext';

interface Props extends HTMLProps<HTMLDivElement> {
  value?: any;
  defaultValue?: any;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  children?: ReactNode;
}

export default function RadioGroup({ value: valueProp, defaultValue, onChange, children, ...others }: Props) {
  const [value, setValueState] = useControlled({
    controlled: valueProp,
    default: defaultValue,
  });

  const context = useMemo(
    () => ({
      value,
      onChange(event: ChangeEvent<HTMLInputElement>) {
        setValueState(event.target.value);

        if (onChange) {
          onChange(event);
        }
      },
    }),
    [onChange, setValueState, value],
  );

  return (
    <RadioGroupContext.Provider value={context}>
      <div {...others}>{children}</div>
    </RadioGroupContext.Provider>
  );
}
