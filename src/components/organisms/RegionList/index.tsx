import { NavigationHeader } from '@/components/molecules';
import CloseIcon from '@/assets/icons/close_24.svg';
import tw from 'twin.macro';
import { Button } from '@/components/atoms';

const Container = tw.div`flex flex-col`;

function Header({ title = '지역 선택', onClickClose }: { title?: string; onClickClose?: () => void }) {
  return (
    <section>
      <NavigationHeader tw="bg-transparent">
        <NavigationHeader.Title>{title}</NavigationHeader.Title>
        <NavigationHeader.Button onClick={onClickClose}>
          <CloseIcon />
        </NavigationHeader.Button>
      </NavigationHeader>
    </section>
  );
}

interface BreadcrumbsProps {
  value1?: string;
  value2?: string;
  value3?: string;
}

function Breadcrumbs({ value1, value2, value3 }: BreadcrumbsProps) {
  return (
    <section>
      <div tw="h-14 px-5 flex items-center gap-3 text-b2">
        <span>{value1 ?? '시도'}</span>
        <span tw="w-px h-2 bg-gray-300" />
        <span>{value2 ?? '시군구'}</span>
        <span tw="w-px h-2 bg-gray-300" />
        <span>{value3 ?? '읍면동'}</span>
      </div>
    </section>
  );
}

export interface RegionItem {
  name: string;
  code: string;
}

interface Props {
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

function List({ list1, list2, list3, value1, value2, value3, onChangeValue1, onChangeValue2, onChangeValue3 }: Props) {
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

interface SubmitProps {
  onSubmit?: () => void;
  disabled?: boolean;
}

function Submit({ disabled, onSubmit }: SubmitProps) {
  return (
    <div tw="px-5 pt-4 pb-5">
      <Button disabled={disabled} onClick={onSubmit} tw="w-full" size="bigger">
        선택 완료
      </Button>
    </div>
  );
}

export default Object.assign(Container, { Header, Breadcrumbs, List, Submit });
