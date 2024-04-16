import Button from '@/components/atoms/Button';

import { RegionItem } from './types';

interface ListProps {
  list1?: RegionItem[];
  list2?: RegionItem[];
  list3?: RegionItem[];

  value1?: RegionItem | null;
  value2?: RegionItem | null;
  value3?: RegionItem | null;

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
  onChangeValue1,
  onChangeValue2,
  onChangeValue3,
}: ListProps) {
  return (
    <section tw="flex-1 min-h-0">
      <div tw="h-full flex min-h-0">
        <div tw="flex-1 h-full min-h-0 overflow-auto">
          {list1?.map((item) => (
            <Button
              selected={value1?.code === item.code}
              onClick={() => onChangeValue1?.(item)}
              tw="w-full h-10 border-none rounded-none hover:bg-gray-50"
              key={item.code}
              size="none"
              variant="outlined"
            >
              {item.name}
            </Button>
          ))}
        </div>
        <div tw="h-full w-px bg-gray-300" />
        <div tw="flex-1 h-full min-h-0 overflow-auto">
          {list2?.map((item) => (
            <Button
              selected={value2?.code === item.code}
              onClick={() => onChangeValue2?.(item)}
              tw="w-full h-10 border-none rounded-none hover:bg-gray-50"
              key={item.code}
              size="none"
              variant="outlined"
            >
              {item.name}
            </Button>
          ))}
        </div>
        <div tw="h-full w-px bg-gray-300" />
        <div tw="flex-1 h-full min-h-0 overflow-auto">
          {list3?.map((item) => (
            <Button
              selected={value3?.code === item.code}
              onClick={() => onChangeValue3?.(item)}
              tw="w-full h-10 border-none rounded-none hover:bg-gray-50"
              key={item.code}
              size="none"
              variant="outlined"
            >
              {item.name}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
