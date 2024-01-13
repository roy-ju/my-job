import useControlled from '@/hooks/useControlled';
import { forwardRef, HTMLProps, useCallback, useMemo } from 'react';
import RDatePicker, { ReactDatePickerCustomHeaderProps } from 'react-datepicker';
// import CalendarIcon from '@/assets/icons/calendar.svg';
import ChevronDown from '@/assets/icons/chevron_down.svg';

import { Moment } from '@/components/atoms';
import tw, { styled } from 'twin.macro';
import TextField, { TextFieldProps } from '../TextField';

const StyleOverride = styled.div`
  .react-datepicker {
    ${tw`rounded-lg shadow text-gray-1000 border-gray-1000`}
  }
  .react-datepicker__header {
    ${tw`bg-gray-100 rounded-t-lg border-gray-1000`}
  }
  .react-datepicker__day,
  .react-datepicker__day-name {
    ${tw`w-8 h-8 m-0.5 leading-8 text-b2`}
  }
`;

const weekDays: Record<string, string> = {
  Monday: '월',
  Tuesday: '화',
  Wednesday: '수',
  Thursday: '목',
  Friday: '금',
  Saturday: '토',
  Sunday: '일',
};

type CustomInputProps = TextFieldProps &
  Omit<HTMLProps<HTMLInputElement>, 'value' | 'size'> & {
    value?: string;
    label?: string;
  };

const Input = forwardRef<HTMLInputElement, CustomInputProps>(({ variant, label, size, hasError, ...props }, ref) => (
  <TextField variant={variant} size={size} hasError={hasError}>
    {/* <TextField.Leading tw="pl-4 -mr-2">
      <CalendarIcon tw="text-gray-1000" />
    </TextField.Leading> */}
    <TextField.Input
      {...props}
      placeholder={props.placeholder}
      readOnly
      label={label}
      value={props.value}
      onClick={props.onClick}
      ref={ref}
    />
    <TextField.Trailing tw="pr-4 -ml-2">
      <ChevronDown tw="text-gray-1000" />
    </TextField.Trailing>
  </TextField>
));

function Header({ date, increaseMonth, decreaseMonth }: ReactDatePickerCustomHeaderProps) {
  return (
    <div tw="text-start py-1 px-5 flex items-center justify-between">
      <button
        onClick={decreaseMonth}
        type="button"
        tw="w-8 h-8 flex items-center justify-center hover:bg-gray-400 rounded-lg"
      >
        <ChevronDown tw="rotate-90" />
      </button>
      <div tw="pt-1">
        <Moment format="yyyy년 M월" tw="text-b1 leading-4 font-bold">
          {date.toISOString()}
        </Moment>
      </div>
      <button
        onClick={increaseMonth}
        type="button"
        tw="w-8 h-8 flex items-center justify-center hover:bg-gray-400 rounded-lg"
      >
        <ChevronDown tw="rotate-[270deg]" />
      </button>
    </div>
  );
}

export interface DatePickerProps extends Omit<TextFieldProps, 'value' | 'onChange' | 'children'> {
  placeholder?: string;
  value?: Date | null;
  onChange?: (value: Date | null) => void;
  minDate?: Date | null;
  maxDate?: Date | null;
  dateFormat?: string | string[];
}

export default function DatePicker({
  placeholder,
  value: valueProp,
  onChange,
  variant,
  size,
  hasError,
  minDate,
  maxDate,
  disabled,
  dateFormat = 'yyyy.MM.dd',
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
    <StyleOverride {...others}>
      <RDatePicker
        minDate={minDate}
        maxDate={maxDate}
        disabledKeyboardNavigation
        formatWeekDay={(day) => weekDays[day as unknown as string]}
        placeholderText={placeholder}
        dateFormat={dateFormat}
        selected={value}
        onChange={handleChangeValue}
        customInput={customInput}
        renderCustomHeader={Header}
        showPopperArrow={false}
        tw="cursor-pointer"
        disabled={disabled}
      />
    </StyleOverride>
  );
}
