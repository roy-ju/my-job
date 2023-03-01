import { useControlled } from '@/hooks/utils';
import { ChangeEvent, ChangeEventHandler, ReactNode, useMemo } from 'react';
import RadioGroupContext from './RadioGroupContext';

type Props = {
  value?: any;
  defaultValue?: any;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  children?: ReactNode;
};

export default function RadioGroup({
  value: valueProp,
  defaultValue,
  onChange,
  children,
}: Props) {
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
      {children}
    </RadioGroupContext.Provider>
  );
}
