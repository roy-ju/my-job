import { Button as ButtonBase } from '@/components/atoms';
import tw, { styled, theme } from 'twin.macro';
import CheckIcon from '@/assets/icons/check.svg';
import { ButtonProps } from '@/components/atoms/Button';
import useControlled from '@/hooks/useControlled';
import { useCallback } from 'react';
import { MinHousehold } from './types';

const StyledButton = styled((props: ButtonProps) => <ButtonBase variant="gray" {...props} />)(() => [
  tw`flex h-8 gap-2 py-0 pl-3 pr-4 text-b2`,
]);

function Button(props: ButtonProps) {
  return (
    <StyledButton {...props}>
      <CheckIcon color={props.selected ? theme`colors.white` : theme`colors.gray.600`} />
      {props.children}
    </StyledButton>
  );
}

interface HouseholdFilterProps {
  value?: MinHousehold;
  onChange?: (newValue: MinHousehold) => void;
}

export default function HouseholdFilter({ value: valueProp, onChange }: HouseholdFilterProps) {
  const [value, setValue] = useControlled({
    controlled: valueProp,
    default: '0' as MinHousehold,
  });

  const handleChangeValue = useCallback(
    (newValue: MinHousehold) => {
      setValue(newValue);
      onChange?.(newValue);
    },
    [setValue, onChange],
  );

  return (
    <div tw="py-5">
      <p tw="text-b1 text-gray-1000 font-bold mb-5">세대수</p>
      <div tw="flex flex-wrap gap-2">
        <Button selected={value === '0'} onClick={() => handleChangeValue('0')}>
          전체
        </Button>
        <Button selected={value === '20'} onClick={() => handleChangeValue('20')}>
          20세대~
        </Button>
        <Button selected={value === '100'} onClick={() => handleChangeValue('100')}>
          100세대~
        </Button>
        <Button selected={value === '300'} onClick={() => handleChangeValue('300')}>
          300세대~
        </Button>
        <Button selected={value === '500'} onClick={() => handleChangeValue('500')}>
          500세대~
        </Button>
        <Button selected={value === '1000'} onClick={() => handleChangeValue('1000')}>
          1,000세대~
        </Button>
      </div>
    </div>
  );
}
