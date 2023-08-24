import { NavigationHeader, TextField } from '@/components/molecules';
import CloseIcon from '@/assets/icons/close_24.svg';
import tw from 'twin.macro';
import { Separator } from '@/components/atoms';
import SearchIcon from '@/assets/icons/search.svg';
import { ChangeEventHandler, FormEventHandler, useCallback } from 'react';
import { useControlled } from '@/hooks/utils';
import { useNegocioAddressAutocomplete } from '@/hooks/services';
import { RealestateTypeString } from '@/constants/strings';

function Guide() {
  return (
    <div tw="py-10 px-5">
      <div tw="text-b1 leading-none font-bold mb-3">이렇게 검색해 보세요</div>
      <div tw="h-14 flex flex-col justify-center">
        <div tw="text-b2 leading-none mb-2">도로명 + 건물번호</div>
        <div tw="text-info leading-none text-gray-700">예) 판교역로 235, 제주 첨단로 242</div>
      </div>
      <div tw="h-14 flex flex-col justify-center">
        <div tw="text-b2 leading-none mb-2">지역명(동/리) + 번지</div>
        <div tw="text-info leading-none text-gray-700">예) 삼평동 681, 제주 영평동 2181</div>
      </div>
      <div tw="h-14 flex flex-col justify-center">
        <div tw="text-b2 leading-none mb-2">아파트 단지명</div>
        <div tw="text-info leading-none text-gray-700">예) 광교중흥S클래스, 한화꿈에그린프레스티지</div>
      </div>
    </div>
  );
}

export interface AddressSearchFormProps {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: number) => void;
}

function AddressSearchForm({ value: valueProp, onChange, onSubmit }: AddressSearchFormProps) {
  const [value, setValueState] = useControlled({
    controlled: valueProp,
    default: '',
  });

  const handleInputValueChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setValueState(e.target.value);
      onChange?.(e.target.value);
    },
    [onChange, setValueState],
  );

  const results = useNegocioAddressAutocomplete(value);

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>((e) => {
    e.preventDefault();
  }, []);

  return (
    <form tw="bg-white h-full flex flex-col" onSubmit={handleSubmit}>
      <div tw="px-5 pt-6 pb-10">
        <div tw="leading-none font-bold mb-4">단지 검색</div>
        <TextField variant="outlined" size="medium">
          <TextField.Leading tw="pl-4 -mr-2">
            <SearchIcon />
          </TextField.Leading>
          <TextField.Input
            placeholder="주소 또는 단지명을 입력하세요."
            value={value}
            onChange={handleInputValueChange}
            autoComplete="off"
          />
        </TextField>
      </div>
      <Separator />
      <div tw="flex-1 flex flex-col min-h-0 overflow-y-auto">
        {!results?.length && <Guide />}
        {results.map((result) => (
          <button
            type="button"
            key={result.danji_id}
            onClick={() => {
              onSubmit?.(result.danji_id);
            }}
            tw="p-4 gap-2 min-h-[74px] hover:bg-gray-200 text-start transition-colors"
          >
            <div tw="flex items-center justify-between">
              <span tw="text-b2 text-gray-1000">{result.name}</span>
              <span tw="text-info text-gray-700">{RealestateTypeString[result.realestate_type]}</span>
            </div>
            {result.name && <div tw="text-info text-gray-700">{result.address}</div>}
          </button>
        ))}
      </div>
    </form>
  );
}

const Container = tw.div`flex flex-col`;

function Header({ title = '단지 검색', onClickClose }: { title?: string; onClickClose?: () => void }) {
  return (
    <div>
      <NavigationHeader tw="bg-transparent px-5">
        <NavigationHeader.Title>{title}</NavigationHeader.Title>
        <NavigationHeader.Button onClick={onClickClose}>
          <CloseIcon />
        </NavigationHeader.Button>
      </NavigationHeader>
    </div>
  );
}

export default Object.assign(Container, { Header, AddressSearchForm });
