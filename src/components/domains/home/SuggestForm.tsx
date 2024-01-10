import { useState } from 'react';

import { useRouter } from 'next/router';

import dynamic from 'next/dynamic';

import { styled } from 'twin.macro';

import { useRouter as useCunstomRouter } from '@/hooks/utils';

import ButtonV2 from '@/components/atoms/ButtonV2';

import { RealestateType, describeJeonsaeWolsaeSame, describeRealestateType } from '@/constants/enums';

import Routes from '@/router/routes';

import useCheckPlatform from '@/hooks/utils/useCheckPlatform';

import { RegionItem } from '@/components/organisms/RegionList';

import FormImage from './FormImage';

import isEqualValue from '../suggest/utils/isEqualValue';

import getIncludeValue from '../suggest/utils/getIncludeValue';

const RegionListPopup = dynamic(() => import('@/components/organisms/popups/RegionListPopup'), { ssr: false });

const StyledButton = styled(ButtonV2)``;

StyledButton.defaultProps = {
  size: 'medium',
  radius: 'r100',
};

export default function SuggestForm() {
  const router = useRouter();

  const customRouter = useCunstomRouter(0);

  const { platform } = useCheckPlatform();

  const [property, setProperty] = useState<string[]>([]);

  const [buyOrRent, setBuyOrRent] = useState('');

  const [popup, setPopup] = useState<'' | 'regionList'>('');

  const handleClickProperty = (e?: NegocioMouseEvent<HTMLButtonElement>) => {
    if (e) {
      const { value } = e.currentTarget;

      if (getIncludeValue(value, property)) {
        setProperty((prev) => prev.filter((ele) => ele !== value));
      } else {
        setProperty((prev) => [...prev, value]);
      }
    }
  };

  const handleClickBuyOrRent = (e?: NegocioMouseEvent<HTMLButtonElement>) => {
    if (e) {
      const { value } = e.currentTarget;

      if (value === buyOrRent) return;

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
        customRouter.replace(Routes.SuggestForm, {
          searchParams: {
            // 아파트 또는 오피스텔
            property: describeRealestateType(Number(property[0])),
            buyOrRent,
            entry: 'home',
          },
        });
      } else {
        customRouter.replace(Routes.SuggestForm, {
          searchParams: {
            // 복수 선택밖에 없다.
            property: property.map((item) => describeRealestateType(Number(item))).join(),
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
          pathname: `/${Routes.EntryMobile}/${Routes.SuggestForm}`,
          query: { property: describeRealestateType(Number(property[0])), buyOrRent, entry: 'home' },
        });
      } else {
        // 복수 선택밖에 없다.
        router.push({
          pathname: `/${Routes.EntryMobile}/${Routes.SuggestForm}`,
          query: {
            property: property.map((item) => describeRealestateType(Number(item))).join(),
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
    if (
      isEqualValue(property.length, 1) &&
      (isEqualValue(property[0], RealestateType.Apartment.toString()) ||
        isEqualValue(property[0], RealestateType.Officetel.toString()))
    ) {
      handleRoute('none');
      return;
    }

    return handlePopup('regionList');
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
              <p tw="text-body_02 text-gray-700">
                이젠, 집 구할때도
                <br />
                추천받아 네고하며 구해요.
              </p>
            </div>
            <FormImage property={property} buyOrRent={buyOrRent} />
          </div>

          <div tw="min-w-full [min-height: 1px] bg-nego-200 my-6" />

          <div tw="flex flex-col gap-2 mb-6">
            <p tw="text-subhead_02">부동산 종류</p>
            <div tw="flex flex-wrap gap-2 pr-4">
              {['10', '20', '30', '60', '50'].map((item) => (
                <StyledButton
                  variant={getIncludeValue(item, property) ? 'primary' : 'grayOutline'}
                  radius="r100"
                  key={item}
                  value={item}
                  selected={getIncludeValue(item, property)}
                  onClick={handleClickProperty}
                  tw="whitespace-nowrap"
                >
                  {describeRealestateType(Number(item))}
                </StyledButton>
              ))}
            </div>
          </div>

          <div tw="flex flex-col gap-2">
            <p tw="text-subhead_02">거래 종류</p>
            <div tw="flex gap-2">
              {['1', '2'].map((item) => (
                <StyledButton
                  variant={isSelected(buyOrRent, item) ? 'primary' : 'grayOutline'}
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
