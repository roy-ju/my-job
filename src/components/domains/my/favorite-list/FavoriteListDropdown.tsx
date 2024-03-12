import { Dropdown } from '@/components/molecules';

type FavoriteListDropdownProps = {
  value?: string;
  handleChange?: (sortingType: string) => void;
};

export default function FavoriteListDropdown({ value, handleChange }: FavoriteListDropdownProps) {
  return (
    <Dropdown size="small" tw="mt-5 ml-5 [width: 92px] " value={value} onChange={handleChange}>
      <Dropdown.Option tw="py-0.5 whitespace-pre text-info [width: 92px]" value="등록일순">
        등록일순
      </Dropdown.Option>
      <Dropdown.Option tw="py-0.5 whitespace-pre text-info [width: 92px]" value="조회순">
        조회순
      </Dropdown.Option>
      <Dropdown.Option tw="py-0.5 whitespace-pre text-info [width: 92px]" value="참여자순">
        참여자순
      </Dropdown.Option>
    </Dropdown>
  );
}
