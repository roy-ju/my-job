import CheckboxButton from '@/components/atoms/CheckboxButton';

import {
  ListContainer,
  ListVerticalHorizontalSeperator,
  ListOuterWrraper,
  ListInnerWrraper,
} from './widget/RegionSelectWidget';

import { RegionItem } from './types';

interface ListProps {
  list1?: RegionItem[];
  list2?: RegionItem[];
  list3?: RegionItem[];

  value1?: RegionItem | null;
  value2?: RegionItem | null;
  value3?: RegionItem | null;

  values1: string[];
  values2: string[];
  values3: string[];

  onChangeValue1?: (value: RegionItem) => void;
  onChangeValue2?: (value: RegionItem) => void;
  onChangeValue3?: (value: RegionItem) => void;
}

export default function List({
  list1,
  list2,
  list3,
  value1,
  value2,
  value3,
  values1,
  values2,
  values3,
  onChangeValue1,
  onChangeValue2,
  onChangeValue3,
}: ListProps) {
  return (
    <ListContainer>
      <ListOuterWrraper>
        <ListInnerWrraper id="negocio-region-sido-wrraper">
          {list1?.map((item) => (
            <CheckboxButton
              key={item.code}
              id={`negocio-region-sido-${item.code}`}
              variant="primary"
              selected={value1?.code === item.code}
              active={value1?.code !== item.code && values1.includes(item.name)}
              onClick={() => onChangeValue1?.(item)}
            >
              {item.name}
            </CheckboxButton>
          ))}
        </ListInnerWrraper>
        <ListVerticalHorizontalSeperator />
        <ListInnerWrraper id="negocio-region-sigungu-wrraper">
          {list2?.map((item) => (
            <CheckboxButton
              key={item.code}
              id={`negocio-region-sigungu-${item.code}`}
              variant="primary"
              selected={value2?.code === item.code}
              active={value2?.code !== item.code && values2.includes(item.name)}
              onClick={() => onChangeValue2?.(item)}
            >
              {item.name}
            </CheckboxButton>
          ))}
        </ListInnerWrraper>
        <ListVerticalHorizontalSeperator />
        <ListInnerWrraper id="negocio-region-eubmyeondong-wrraper">
          {list3?.map((item) => (
            <CheckboxButton
              key={item.code}
              id={`negocio-region-eubmyeondong-${item.code}`}
              variant="primary"
              selected={value3?.code === item.code}
              active={value3?.code !== item.code && values3.includes(item.name)}
              onClick={() => onChangeValue3?.(item)}
            >
              {item.name}
            </CheckboxButton>
          ))}
        </ListInnerWrraper>
      </ListOuterWrraper>
    </ListContainer>
  );
}
