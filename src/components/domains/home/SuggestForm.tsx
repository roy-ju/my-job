import { useState } from 'react';

import { useRouter } from 'next/router';

import dynamic from 'next/dynamic';

import tw, { styled } from 'twin.macro';

import { useRouter as useCunstomRouter } from '@/hooks/utils';

import Button from '@/components/atoms/Button';

import ButtonV2 from '@/components/atoms/ButtonV2';

import { describeJeonsaeWolsaeSame } from '@/constants/enums';

import Routes from '@/router/routes';

import useCheckPlatform from '@/hooks/utils/useCheckPlatform';

import { RegionItem } from '@/components/organisms/RegionList';

import FormImage from './FormImage';

import isEqualValue from '../suggest/utils/isEqualValue';

import isNotEqualValue from '../suggest/utils/isNotEqualValue';

const RegionListPopup = dynamic(() => import('@/components/organisms/popups/RegionListPopup'), { ssr: false });

const StyledButton = styled(Button)`
  ${tw`text-gray-700 [border-radius: 100px] hover:border-nego-600`}
  ${({ selected }) => selected && tw`font-bold bg-white text-nego-800 border-nego-800 hover:border-nego-800`}
`;

StyledButton.defaultProps = {
  variant: 'outlined',
  size: 'medium',
};

export default function SuggestForm() {
  const router = useRouter();

  const customRouter = useCunstomRouter(0);

  const { platform } = useCheckPlatform();

  const [property, setProperty] = useState('');

  const [buyOrRent, setBuyOrRent] = useState('');

  const [popup, setPopup] = useState<'' | 'regionList'>('');

  const handleClickProperty = (e?: NegocioMouseEvent<HTMLButtonElement>) => {
    if (e) {
      const { value } = e.currentTarget;

      setProperty(value);
    }
  };

  const handleClickBuyOrRent = (e?: NegocioMouseEvent<HTMLButtonElement>) => {
    if (e) {
      const { value } = e.currentTarget;

      setBuyOrRent(value);
    }
  };

  const isSelected = (request: string, target: string) => {
    if (target === request) {
      return true;
    }
  };

  const handlePopup = (value: '' | 'regionList') => {
    setPopup(value);
  };

  const handleRoute = (from: 'regionListPoup' | 'none', v?: RegionItem) => {
    if (isEqualValue(platform, 'pc')) {
      if (isEqualValue(from, 'none')) {
        customRouter.replace(Routes.RecommendationForm, {
          searchParams: {
            property,
            buyOrRent,
            entry: 'home',
          },
        });
      } else {
        customRouter.replace(Routes.RecommendationForm, {
          searchParams: {
            property,
            buyOrRent,
            entry: 'home',
            ...(v?.name ? { address: v?.name } : {}),
            ...(v?.code ? { bcode: v?.code } : {}),
          },
        });
      }
    }

    if (isEqualValue(platform, 'mobile')) {
      if (isEqualValue(from, 'none')) {
        router.push({
          pathname: `/${Routes.EntryMobile}/${Routes.RecommendationForm}`,
          query: { property, buyOrRent, entry: 'home' },
        });
      } else {
        router.push({
          pathname: `/${Routes.EntryMobile}/${Routes.RecommendationForm}`,
          query: {
            property,
            buyOrRent,
            entry: 'home',
            ...(v?.name ? { address: v?.name } : {}),
            ...(v?.code ? { bcode: v?.code } : {}),
          },
        });
      }
    }
  };

  const handleClickSuggest = () => {
    if (isNotEqualValue(property, '아파트/오피스텔')) {
      return handlePopup('regionList');
    }

    handleRoute('none');
  };

  const handleSummitRegion = (v: RegionItem) => {
    handlePopup('');

    handleRoute('regionListPoup', v);
  };

  return (
    <>
      <section tw="pt-4 px-5">
        <div tw="pt-6 pb-5 px-5 [border-radius: 20px] bg-nego-100">
          <div tw="flex items-center justify-between gap-5 [height: 120px]">
            <div tw="flex flex-col gap-4 whitespace-pre-wrap">
              <h2 tw="text-heading_03">{'어떤 집을\n구하시나요?'}</h2>
              <p tw="text-body_02 text-gray-700">네고해서 집을 구하세요.</p>
            </div>
            <FormImage property={property} buyOrRent={buyOrRent} />
          </div>

          <div tw="min-w-full [min-height: 1px] bg-nego-200 my-6" />

          <div tw="flex flex-col gap-2 mb-6">
            <p tw="text-subhead_02">부동산 종류</p>
            <div tw="flex gap-2">
              {['아파트 / 오피스텔', '원룸 / 투룸', '그외'].map((item) => (
                <StyledButton
                  key={item}
                  value={item.replace(/\s+/g, '')}
                  selected={isSelected(property, item.replace(/\s+/g, ''))}
                  onClick={handleClickProperty}
                  tw="whitespace-nowrap"
                >
                  {item}
                </StyledButton>
              ))}
            </div>
          </div>

          <div tw="flex flex-col gap-2">
            <p tw="text-subhead_02">거래 종류</p>
            <div tw="flex gap-2">
              {['1', '2'].map((item) => (
                <StyledButton
                  key={item}
                  value={item}
                  selected={isSelected(buyOrRent, item)}
                  onClick={handleClickBuyOrRent}
                >
                  {describeJeonsaeWolsaeSame(Number(item))}
                </StyledButton>
              ))}
            </div>
          </div>

          <ButtonV2
            variant="primary"
            size="big"
            tw="w-full mt-6"
            disabled={!property || !buyOrRent}
            onClick={handleClickSuggest}
          >
            구해요
          </ButtonV2>
        </div>
      </section>
      {popup === 'regionList' && <RegionListPopup onSubmit={handleSummitRegion} onClickClose={() => handlePopup('')} />}
    </>
  );
}
