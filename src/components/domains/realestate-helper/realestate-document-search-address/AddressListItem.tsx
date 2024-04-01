import { KakaoAddressAutocompleteResponseItem } from '@/hooks/services/useKakaoAddressAutocomplete';
import tw, { styled } from 'twin.macro';

type AddressListItemProps = {
  item: KakaoAddressAutocompleteResponseItem;
  handleClickItem: (value: KakaoAddressAutocompleteResponseItem) => void;
};

const ListItemButton = styled.button`
  ${tw`px-5 [min-height: 72px] [height: 72px] text-start transition-colors flex flex-col justify-center hover:bg-gray-100`}
`;

const ListItemTop = styled.div`
  ${tw`flex items-center justify-between w-full`}

  span:nth-of-type(1) {
    ${tw`text-gray-900 text-body_02`}
  }

  span:nth-of-type(2) {
    ${tw`text-gray-700 text-body_01`}
  }
`;

export default function AddressListItem({ item, handleClickItem }: AddressListItemProps) {
  return (
    <ListItemButton
      value={item.placeName}
      onClick={() => {
        handleClickItem(item);
      }}
    >
      <ListItemTop>
        <span>{item?.placeName || item?.roadAddressName || item?.addressName || ''}</span>
        <span>{item?.categoryName}</span>
      </ListItemTop>

      {item.placeName && <div tw="text-info text-gray-700">{item?.roadAddressName || item?.addressName}</div>}
    </ListItemButton>
  );
}
