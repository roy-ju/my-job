import tw, { styled } from 'twin.macro';

type SelectAddressHeaderProps = {
  handleClick: () => void;
};

const SelectAddressHeaderContainer = styled.div`
  ${tw`flex flex-col gap-1 px-5`}

  span {
    ${tw`text-gray-700 text-body_02`}
  }
`;

const Row = styled.div`
  ${tw`flex flex-row justify-between`}

  p {
    ${tw`text-gray-800 text-subhead_03`}
  }
`;

const SearchButton = styled.button`
  ${tw`text-gray-600 underline text-body_01`}
`;

export default function SelectAddressHeader({ handleClick }: SelectAddressHeaderProps) {
  return (
    <SelectAddressHeaderContainer>
      <Row>
        <p>주소 선택</p>
        <SearchButton onClick={handleClick}>다른 주소 검색</SearchButton>
      </Row>
      <span>원하시는 주소를 선택해 주세요.</span>
    </SelectAddressHeaderContainer>
  );
}
