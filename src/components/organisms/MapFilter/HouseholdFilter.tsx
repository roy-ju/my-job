import { Button as ButtonBase } from '@/components/atoms';
import tw, { styled, theme } from 'twin.macro';
import CheckIcon from '@/assets/icons/check.svg';
import { ButtonProps } from '@/components/atoms/Button';

const StyledButton = styled((props: ButtonProps) => (
  <ButtonBase variant="gray" {...props} />
))(() => [tw`flex h-8 gap-2 py-0 pl-3 pr-4 text-b2`]);

function Button(props: ButtonProps) {
  return (
    <StyledButton {...props}>
      <CheckIcon
        color={props.isSelected ? theme`colors.white` : theme`colors.gray.600`}
      />
      {props.children}
    </StyledButton>
  );
}

export default function HouseholdFilter() {
  return (
    <div tw="py-5">
      <p tw="text-b1 text-gray-1000 font-bold mb-5">세대수</p>
      <div tw="flex flex-wrap gap-2">
        <Button isSelected>전체</Button>
        <Button>20세대~</Button>
        <Button>100세대~</Button>
        <Button>300세대~</Button>
        <Button>500세대~</Button>
        <Button>1,000세대~</Button>
      </div>
    </div>
  );
}
