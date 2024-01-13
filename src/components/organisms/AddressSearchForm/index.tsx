import { TextField } from '@/components/molecules';
import SearchIcon from '@/assets/icons/search.svg';
import { Separator } from '@/components/atoms';
import { ChangeEventHandler, FormEventHandler, useCallback } from 'react';
import useKakaoAddressAutocomplete, {
  KakaoAddressAutocompleteResponseItem,
} from '@/hooks/services/useKakaoAddressAutocomplete';
import useControlled from '@/hooks/useControlled';

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
  onSubmit?: (value: KakaoAddressAutocompleteResponseItem) => void;
}

export default function AddressSearchForm({ value: valueProp, onChange, onSubmit }: AddressSearchFormProps) {
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

  const results = useKakaoAddressAutocomplete(value);

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>((e) => {
    e.preventDefault();
    // 엔터키를 이용한 submit 이 사용자에게 어색한 경험을 주는듯하여 뺀다

    // if (results && results.length > 0) {
    //   onSubmit?.(results[0]);
    // }
  }, []);

  return (
    <form tw="bg-white h-full flex flex-col" onSubmit={handleSubmit}>
      <div tw="px-5 pt-6 pb-10">
        <div tw="leading-none font-bold mb-4">주소 검색</div>
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
        {!results.length && <Guide />}
        {results.map((result) => (
          <button
            type="button"
            key={result.id}
            value={result.placeName}
            onClick={() => {
              onSubmit?.(result);
            }}
            tw="p-4 gap-2 min-h-[74px] hover:bg-gray-200 text-start transition-colors"
          >
            <div tw="flex items-center justify-between">
              <span tw="text-b2 text-gray-1000">
                {result.placeName || result.roadAddressName || result.addressName}
              </span>
              <span tw="text-info text-gray-700">{result.categoryName}</span>
            </div>
            {result.placeName && <div tw="text-info text-gray-700">{result.roadAddressName || result.addressName}</div>}
          </button>
        ))}
      </div>
    </form>
  );
}
