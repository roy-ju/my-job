import { Button } from '@/components/atoms';
import { ButtonProps } from '@/components/atoms/Button';
import tw, { styled } from 'twin.macro';
import FilterIcon from '@/assets/icons/filter.svg';
import { useControlled, useIsomorphicLayoutEffect } from '@/hooks/utils';
import { useCallback, useState } from 'react';
import ChevronDownIcon from '@/assets/icons/chevron_down.svg';
import { isOverflown as checkOverflow } from '@/utils';
import { motion } from 'framer-motion';

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
  const [filterContainer, setFilterContainer] = useState<HTMLDivElement | null>(
    null,
  );
  const [realestateType, setRealestateTypeState] = useControlled({
    controlled: realestateTypeProp,
    default: 'apt,oftl',
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflown, setIsOverflown] = useState(false);

  const handleRealestateTypeChange = useCallback(
    (value: string) => {
      setRealestateTypeState(value);
      onChangeRealestateType?.(value);
    },
    [setRealestateTypeState, onChangeRealestateType],
  );

  const handleToggleFilterExpansion = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (filterContainer) {
      setIsOverflown(checkOverflow(filterContainer));
    }
  }, [filterContainer, isExpanded]);

  return (
    <motion.div layout="size" tw="bg-white shadow rounded-lg overflow-hidden">
      <motion.div layout="preserve-aspect">
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
        <div tw="flex relative">
          <div
            ref={setFilterContainer}
            css={[
              tw`flex items-center gap-2 p-4 overflow-x-hidden`,
              isExpanded && tw`flex-wrap`,
            ]}
          >
            <FilterButton isSelected tw="p-2">
              <FilterIcon />
            </FilterButton>
            <FilterButton isSelected>유형</FilterButton>
            <FilterButton>거래종류</FilterButton>
            <FilterButton>가격</FilterButton>
            <FilterButton>세대수</FilterButton>
            <FilterButton>기타</FilterButton>
          </div>
          {isExpanded && (
            <Button
              onClick={handleToggleFilterExpansion}
              size="none"
              variant="ghost"
              tw="w-10 h-12 pt-4 pr-2 bg-white shrink-0"
            >
              <ChevronDownIcon
                style={{
                  transform: 'rotate(180deg)',
                }}
              />
            </Button>
          )}
          {filterContainer && !isExpanded && isOverflown && (
            <div tw="absolute top-0 right-0 h-full flex items-center">
              <div tw="w-10 h-full bg-gradient-to-l from-white to-transparent" />
              <Button
                onClick={handleToggleFilterExpansion}
                size="none"
                variant="ghost"
                tw="w-10 h-full pr-2 bg-white"
              >
                <ChevronDownIcon />
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
