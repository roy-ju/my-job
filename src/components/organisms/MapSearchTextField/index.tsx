import SearchIcon from '@/assets/icons/search.svg';
import { Autocomplete, TextField } from '@/components/molecules';

export default function MapSearchTextField() {
  return (
    <Autocomplete>
      <TextField tw="shadow">
        <TextField.Input placeholder="주소 또는 단지명을 입력하세요" />
        <TextField.Trailing>
          <button
            type="button"
            tw="inline-flex items-center justify-center w-9 h-9 bg-nego rounded-lg"
          >
            <SearchIcon color="#fff" />
          </button>
        </TextField.Trailing>
      </TextField>
      <Autocomplete.Popper>
        <div tw="flex flex-col mt-2 w-full bg-white shadow rounded-lg">
          <Autocomplete.Option
            value="판교역"
            tw="p-4 gap-2 hover:bg-gray-200 rounded-lg text-start"
          >
            <div tw="flex items-center justify-between">
              <span tw="text-b2 text-gray-1000">판교역</span>
              <span tw="text-info text-gray-700">기차역</span>
            </div>
            <div tw="text-info text-gray-700">경기 성남시 분당구 현암로 3</div>
          </Autocomplete.Option>
          <Autocomplete.Option
            value="판교역 신분당선"
            tw="p-4 gap-2 hover:bg-gray-200 rounded-lg text-start"
          >
            <div tw="flex items-center justify-between">
              <span tw="text-b2 text-gray-1000">판교역 신분당선</span>
              <span tw="text-info text-gray-700">신분당선</span>
            </div>
            <div tw="text-info text-gray-700">경기 성남시 분당구 현암로 3</div>
          </Autocomplete.Option>
          <Autocomplete.Option
            value="판교역 경강선"
            tw="p-4 gap-2 hover:bg-gray-200 rounded-lg text-start"
          >
            <div tw="flex items-center justify-between">
              <span tw="text-b2 text-gray-1000">판교역 경강선</span>
              <span tw="text-info text-gray-700">경강선</span>
            </div>
            <div tw="text-info text-gray-700">경기 성남시 분당구 현암로 3</div>
          </Autocomplete.Option>
        </div>
      </Autocomplete.Popper>
    </Autocomplete>
  );
}
