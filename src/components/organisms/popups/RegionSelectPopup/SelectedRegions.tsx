import { MarginTopTwelve } from '@/components/atoms/Margin';

import DeleteIcon from '@/assets/icons/delete_nego.svg';

import React from 'react';
import {
  SelectedRegionsContainer,
  SelectedRegionsTitleWrraper,
  SelectedRegionText,
  SelectedRegionCountText,
  ScrollContainer,
  SelectedRegionsTag,
} from './widget/RegionSelectWidget';

import useScrolls from './hooks/useScrolls';

import { RegionItem } from './types';

function makeKey(v1: string, v2: string, v3: number) {
  return `${v1}-${v2}-${v3}`;
}

type SelectedRegionsProps = {
  selectedRegions: RegionItem[];
  handleRemoveSelectedRegionItem: (v: RegionItem, isLastRemove: boolean) => void;
};

const SelectedRegions = React.forwardRef<HTMLDivElement, SelectedRegionsProps>(
  ({ selectedRegions, handleRemoveSelectedRegionItem }, ref) => {
    const { refs, onDragStart, onDragEnd, onDragMove } = useScrolls({ scrollRef: ref });

    if (!selectedRegions.length) return null;

    return (
      <SelectedRegionsContainer>
        <SelectedRegionsTitleWrraper tw="flex flex-row items-center gap-4">
          <div>
            <SelectedRegionText>선택한 지역</SelectedRegionText>
            <SelectedRegionCountText>{selectedRegions.length}</SelectedRegionCountText>
          </div>
          <div>지역은 최대 5개까지 선택할 수 있어요!</div>
        </SelectedRegionsTitleWrraper>
        <MarginTopTwelve />

        <ScrollContainer
          ref={ref}
          className="scrollbar-hide"
          role="presentation"
          onMouseDown={onDragStart}
          onMouseMove={onDragMove}
          onMouseUp={onDragEnd}
          onMouseLeave={onDragEnd}
        >
          {selectedRegions.map((item, idx) => (
            <SelectedRegionsTag
              key={makeKey(item.code, item.name, idx)}
              value={item.code}
              selected
              isRightIcon
              ref={(el) => {
                refs.current[idx] = el;
                return null;
              }}
            >
              {item.name}
              <DeleteIcon
                tw="cursor-pointer"
                onClick={() => {
                  let isLastRemove = false;

                  if (selectedRegions.length === idx + 1) {
                    isLastRemove = true;
                  }

                  handleRemoveSelectedRegionItem(item, isLastRemove);
                }}
              />
            </SelectedRegionsTag>
          ))}
        </ScrollContainer>
      </SelectedRegionsContainer>
    );
  },
);

export default SelectedRegions;
