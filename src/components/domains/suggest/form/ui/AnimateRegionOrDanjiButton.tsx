import { memo } from 'react';

import Image from 'next/image';

import tw, { styled } from 'twin.macro';

import { AnimationSpan } from './AnimationText';

const Button = styled.button<{ selected?: boolean }>`
  ${tw`flex flex-col gap-3 justify-center items-center flex-1 rounded-xl border [height: 162px] [box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.06)]`}

  ${({ selected }) => selected && tw`border-nego-800 [box-shadow: 0px 0px 12px 0px rgba(112, 72, 232, 0.16)]`}

  span {
    ${tw`text-body_01`}
    ${({ selected }) => (selected ? tw`text-nego-800` : tw`text-gray-700`)}
  }

  span:nth-of-type(1) {
    ${({ selected }) => (selected ? tw`text-subhead_02` : tw`text-body_02`)}
  }

  transition: all ease 0.3s;

  :hover {
    scale: 1.05;
  }
`;

type AnimateRegionOrDanjiButtonProps = {
  title: string;
  description: string;
  value: string;
  handleClick?: (e?: NegocioMouseEvent<HTMLButtonElement> | undefined, targetValue?: number | undefined) => void;
  selected?: boolean;
};

function AnimateRegionOrDanjiButton({
  title,
  description,
  value,
  handleClick,
  selected,
}: AnimateRegionOrDanjiButtonProps) {
  return (
    <Button key={value} value={value} onClick={handleClick} selected={selected}>
      <AnimationSpan>{title}</AnimationSpan>
      <Image
        width={56}
        height={56}
        src={value === '2' ? '/static/images/suggest_region.png' : '/static/images/suggest_danji.png'}
        alt={`${title}선택 아이콘`}
        quality={75}
      />
      <AnimationSpan transition={{ duration: 0.5 }}>{description}</AnimationSpan>
    </Button>
  );
}

export default memo(AnimateRegionOrDanjiButton);
