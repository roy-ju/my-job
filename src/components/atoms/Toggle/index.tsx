import tw, { styled } from 'twin.macro';
import { ChangeEventHandler, forwardRef, useCallback } from 'react';
import { useControlled } from '@/hooks/utils';
import checkURLPath from '@/assets/icons/check.svg?url';

interface Props {
  toggleOn?: boolean;
  defaultToggle?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const ToggleRoot = styled.span<{ checked: boolean }>`
  ${tw`inline-flex relative w-[2.75rem] h-[1.75rem] bg-gray-400 rounded-[34px] py-0.5`}
  ${({ checked }) => checked && tw`bg-gray-1000`}
`;
const Toggle = forwardRef<HTMLInputElement, Props>(
  ({ toggleOn, defaultToggle, onChange }, ref) => {
    const [checked, setChecked] = useControlled({
      controlled: toggleOn,
      default: Boolean(defaultToggle),
    });

    const handleToggleChange = useCallback<
      ChangeEventHandler<HTMLInputElement>
    >(
      (event) => {
        setChecked(event.target.checked);
        if (onChange) {
          onChange(event);
        }
      },
      [onChange, setChecked],
    );

    return (
      <ToggleRoot checked={checked}>
        <input
          role="switch"
          type="checkbox"
          checked={checked}
          onChange={handleToggleChange}
          css={[
            tw`appearance-none w-[1.5rem] h-[1.5rem] bg-white rounded-full absolute top-0 left-0 z-[1] flex items-center justify-center cursor-pointer m-0.5`,
            tw`duration-75 ease-in-out transform translate-x-0`,
            checked && tw`duration-75 ease-in-out transform translate-x-4`,
          ]}
          ref={ref}
          style={{
            backgroundImage: `url('${checkURLPath}')`,
          }}
        />
      </ToggleRoot>
    );
  },
);
export default Toggle;
