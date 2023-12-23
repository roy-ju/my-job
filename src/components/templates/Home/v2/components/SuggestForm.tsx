import { Button as StyledButton } from '@/components/atoms';

import { useState } from 'react';

import tw, { styled } from 'twin.macro';

import FormImage from './FormImage';

const Button = styled(StyledButton)`
  ${tw`transition-all`}
  ${tw`text-gray-700 [border-radius: 100px] hover:border-nego-600`}
  ${({ selected }) => selected && tw`font-bold bg-white text-nego-800 border-nego-800 hover:border-nego-800`}
`;

StyledButton.defaultProps = {
  variant: 'outlined',
  size: 'medium',
};

export default function SuggestForm() {
  const [realestateTypes, setRealestateTypes] = useState('');
  const [buyOrRents, setBuyOrRents] = useState('');

  const handleClickRealestateType = (e?: NegocioMouseEvent<HTMLButtonElement>) => {
    if (e) {
      const { value } = e.currentTarget;

      setRealestateTypes(value);
    }
  };

  const handleClickBuyOrRents = (e?: NegocioMouseEvent<HTMLButtonElement>) => {
    if (e) {
      const { value } = e.currentTarget;

      setBuyOrRents(value);
    }
  };

  const isSelected = (request: string, target: string) => {
    if (target === request) {
      return true;
    }
  };

  return (
    <div tw="pt-4 px-5">
      <div tw="pt-6 pb-5 px-5 [border-radius: 20px] bg-nego-100">
        <div tw="flex items-center justify-between gap-5 [height: 120px]">
          <div tw="flex flex-col gap-4 whitespace-pre-wrap">
            <h2 tw="text-heading_03">{'어떤 집을\n구하시나요?'}</h2>
            <p tw="text-body_02 text-gray-700">네고해서 집을 구하세요.</p>
          </div>
          <FormImage realestateTypes={realestateTypes} buyOrRents={buyOrRents} />
        </div>

        <div tw="min-w-full [min-height: 1px] bg-nego-200 my-6" />

        <div tw="flex flex-col gap-2 mb-6">
          <p tw="text-subhead_02">부동산 종류</p>
          <div tw="flex gap-2">
            {['아파트 / 오피스텔', '원룸 / 투룸', '그외'].map((item) => (
              <Button
                key={item}
                value={item.replace(/\s+/g, '')}
                selected={isSelected(realestateTypes, item.replace(/\s+/g, ''))}
                onClick={handleClickRealestateType}
                tw="whitespace-nowrap"
              >
                {item}
              </Button>
            ))}
          </div>
        </div>

        <div tw="flex flex-col gap-2">
          <p tw="text-subhead_02">거래 종류</p>
          <div tw="flex gap-2">
            {['매매', '전월세'].map((item) => (
              <Button key={item} value={item} selected={isSelected(buyOrRents, item)} onClick={handleClickBuyOrRents}>
                {item}
              </Button>
            ))}
          </div>
        </div>

        <StyledButton variant="secondary" tw="w-full mt-6" disabled={!realestateTypes || !buyOrRents}>
          구해요
        </StyledButton>
      </div>
    </div>
  );
}
