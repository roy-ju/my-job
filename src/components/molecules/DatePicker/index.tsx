import { useControlled } from '@/hooks/utils';
import { forwardRef, HTMLProps, useCallback } from 'react';
import RDatePicker from 'react-datepicker';
import TextField from '../TextField';

const Input = forwardRef<HTMLInputElement, any>((props, ref) => (
  <TextField variant="outlined">
    <TextField.Input placeholder={props.placeholder} value={props.value} onClick={props.onClick} ref={ref} />
  </TextField>
));

export interface DatePickerProps extends Omit<HTMLProps<HTMLDivElement>, 'value' | 'onChange' | 'children'> {
  placeholder?: string;
  value?: Date | null;
  onChange?: (value: Date | null) => void;
}

export default function DatePicker({ placeholder, value: valueProp, onChange, ...others }: DatePickerProps) {
  const [value, setValue] = useControlled<Date | null>({
    controlled: valueProp,
    default: null,
  });

  const handleChangeValue = useCallback(
    (v: Date) => {
      setValue(v);
      onChange?.(v);
    },
    [setValue, onChange],
  );

  return (
    <div {...others}>
      <RDatePicker
        placeholderText={placeholder}
        dateFormat="yyyy-MM-dd"
        selected={value}
        onChange={handleChangeValue}
        customInput={<Input />}
        showPopperArrow={false}
      />
    </div>
  );
}
