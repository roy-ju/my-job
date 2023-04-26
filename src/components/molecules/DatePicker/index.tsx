import { useControlled } from '@/hooks/utils';
import { forwardRef, HTMLProps, useCallback, useMemo } from 'react';
import RDatePicker from 'react-datepicker';
import TextField, { TextFieldProps } from '../TextField';

type CustomInputProps = TextFieldProps &
  Omit<HTMLProps<HTMLInputElement>, 'value' | 'size'> & {
    value?: string;
    label?: string;
  };

const Input = forwardRef<HTMLInputElement, CustomInputProps>(({ variant, label, size, hasError, ...props }, ref) => (
  <TextField variant={variant} size={size} hasError={hasError}>
    <TextField.Input
      {...props}
      placeholder={props.placeholder}
      label={label}
      value={props.value}
      onClick={props.onClick}
      ref={ref}
    />
  </TextField>
));

export interface DatePickerProps extends Omit<TextFieldProps, 'value' | 'onChange' | 'children'> {
  placeholder?: string;
  value?: Date | null;
  onChange?: (value: Date | null) => void;
}

export default function DatePicker({
  placeholder,
  value: valueProp,
  onChange,
  variant,
  size,
  hasError,
  ...others
}: DatePickerProps) {
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

  const customInput = useMemo(
    () => <Input variant={variant} size={size} hasError={hasError} />,
    [variant, size, hasError],
  );

  return (
    <div {...others}>
      <RDatePicker
        placeholderText={placeholder}
        dateFormat="yyyy-MM-dd"
        selected={value}
        onChange={handleChangeValue}
        customInput={customInput}
        showPopperArrow={false}
        tw="cursor-pointer"
      />
    </div>
  );
}
