import { Dropdown } from '@/components/molecules';

export default function ListHeader({
  count,
  value,
  handleChange,
}: {
  count: number;
  value: string;
  handleChange: (v: string) => void;
}) {
  return (
    <div tw="px-5 py-2">
      <div tw="flex items-center">
        <p tw="text-subhead_03 text-gray-800">
          매물 <span tw="text-nego-1000">{count}</span>
        </p>
        <div tw="ml-auto">
          <Dropdown
            size="small"
            variant="outlined"
            tw="[width: 92px] min-w-0 ml-auto"
            value={value}
            onChange={(v) => handleChange(v)}
          >
            <Dropdown.Option tw="[width: 92px]" value="최신순">
              최신순
            </Dropdown.Option>
            <Dropdown.Option tw="[width: 92px]" value="가격순">
              가격순
            </Dropdown.Option>
          </Dropdown>
        </div>
      </div>
      <p tw="text-body_01 text-gray-700">매수인, 임차인의 가격 제안을 기다리고 있는 매물이에요.</p>
    </div>
  );
}
