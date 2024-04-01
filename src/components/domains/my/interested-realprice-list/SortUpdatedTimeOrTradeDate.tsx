import tw, { styled } from 'twin.macro';

import { Dropdown } from '@/components/molecules';

type SortUpdatedTimeOrTradeDateProps = {
  value: string;
  handleChange: (value: string) => void;
};

const Container = styled.div`
  ${tw`flex justify-end py-4`}
`;

const Wrraper = styled.div`
  ${tw`w-[110px]`}
`;

export default function SortUpdatedTimeOrTradeDate({ value, handleChange }: SortUpdatedTimeOrTradeDateProps) {
  return (
    <Container>
      <Wrraper>
        <Dropdown size="small" value={value} onChange={handleChange}>
          <Dropdown.Option tw="py-0.5 whitespace-pre text-info" value="업데이트 순">
            업데이트 순
          </Dropdown.Option>
          <Dropdown.Option tw="py-0.5 whitespace-pre text-info" value="거래일 순">
            거래일 순
          </Dropdown.Option>
        </Dropdown>
      </Wrraper>
    </Container>
  );
}
