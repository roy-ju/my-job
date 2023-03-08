import { Button } from '@/components/atoms';
import { ButtonProps } from '@/components/atoms/Button';
import tw, { styled } from 'twin.macro';
import FilterIcon from '@/assets/icons/filter.svg';
import { useControlled } from '@/hooks/utils';
import { useCallback } from 'react';

const RealestateTypeTabButton = styled(
  ({ size = 'bigger', variant = 'ghost', ...props }: ButtonProps) => (
    <Button size={size} variant={variant} {...props} />
  ),
)(({ isSelected }) => [
  tw`px-2 font-bold text-gray-600 text-b1`,
  isSelected && tw`text-gray-1000`,
]);

const FilterButton = styled(
  ({ size = 'small', variant = 'outlined', ...props }: ButtonProps) => (
    <Button size={size} variant={variant} {...props} />
  ),
)(() => [tw`text-b2 shrink-0`]);

const Separator = tw.div`w-px h-2 bg-gray-300 mx-2`;

interface MapFilterProps {
  realestateType?: string;
  onChangeRealestateType?: (realestateType: string) => void;
}

export default function MapFilter({
  realestateType: realestateTypeProp,
  onChangeRealestateType,
}: MapFilterProps) {
  const [realestateType, setRealestateTypeState] = useControlled({
    controlled: realestateTypeProp,
    default: 'apt,oftl',
  });

  const handleRealestateTypeChange = useCallback(
    (value: string) => {
      setRealestateTypeState(value);
      onChangeRealestateType?.(value);
    },
    [setRealestateTypeState, onChangeRealestateType],
  );

  return (
    <div tw="bg-white shadow rounded-lg">
      <div tw="flex items-center px-2">
        <RealestateTypeTabButton
          isSelected={realestateType === 'apt,oftl'}
          onClick={() => handleRealestateTypeChange('apt,oftl')}
        >
          아파트 · 오피스텔
        </RealestateTypeTabButton>
        <Separator />
        <RealestateTypeTabButton
          isSelected={realestateType === 'villa,dandok'}
          onClick={() => handleRealestateTypeChange('villa,dandok')}
        >
          빌라 · 주택
        </RealestateTypeTabButton>
        <Separator />
        <RealestateTypeTabButton
          isSelected={realestateType === 'one,two'}
          onClick={() => handleRealestateTypeChange('one,two')}
        >
          원룸 · 투룸
        </RealestateTypeTabButton>
      </div>
      <div tw="w-full h-px bg-gray-300" />
      <div tw="flex items-center gap-2 p-4 overflow-x-hidden">
        <FilterButton isSelected tw="p-2">
          <FilterIcon />
        </FilterButton>
        <FilterButton isSelected>유형</FilterButton>
        <FilterButton>거래종류</FilterButton>
        <FilterButton>가격</FilterButton>
      </div>
    </div>
  );
}
