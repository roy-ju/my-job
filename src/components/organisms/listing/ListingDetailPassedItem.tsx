import { useMemo } from 'react';

import Image from 'next/image';

import Paths from '@/constants/paths';

import tw, { css, styled } from 'twin.macro';

import { Button } from '@/components/atoms';

export interface IListingDetailPassedItem {
  listingTitle: string;
  address: string;
  area: string;
  floorDescription: string;
  floor: string;
  direction: string;
  listingImagePath?: string;
  onClick?: () => void;
}

const informationStringWrapper = css`
  ${tw`flex h-full text-gray-700 text-info`}

  & > div:not(:first-of-type)::before {
    content: ' | ';
    margin: 0 0.25rem;
    color: #e9ecef; // text-gray-300
  }
`;

const Wrraper = styled.div`
  ${tw`flex justify-between w-full`}
`;

const Inner = styled.div`
  ${tw`flex items-center w-full gap-3`}
`;

const Contents = styled.div`
  ${tw`w-full overflow-hidden`}
`;

const Address = styled.div`
  ${tw`text-left truncate text-info`}
`;

const ListingTitle = styled.div`
  ${tw`font-bold truncate text-b1`}
`;

const FlexRowGap3 = styled.div`
  ${tw`flex justify-between w-full gap-3`}
`;

const NowrapDiv = styled.div`
  ${tw`whitespace-nowrap`}
`;

export default function ListingDetailPassedItem({
  listingTitle,
  address,
  area,
  floorDescription,
  floor,
  direction,
  listingImagePath,
  onClick,
}: IListingDetailPassedItem) {
  const floorString = useMemo(() => {
    const arr: string[] = [];
    if (floorDescription) {
      arr.push(floorDescription);
    }
    if (floor) {
      arr.push(`${floor}층`);
    }
    return arr.join('/');
  }, [floorDescription, floor]);

  return (
    <Wrraper>
      <Inner>
        <Image
          src={listingImagePath || Paths.DEFAULT_APARTMENT_IMAGE_PATH}
          alt=""
          width={64}
          height={64}
          tw="rounded-lg"
        />

        <Contents>
          <FlexRowGap3>
            <ListingTitle className="iphone-se-mobile-listingTitle">{listingTitle}</ListingTitle>
            <Button onClick={onClick} variant="outlined" tw="h-8 shrink-0">
              매물 상세
            </Button>
          </FlexRowGap3>

          <Address>{address}</Address>

          <div css={informationStringWrapper}>
            {area && <NowrapDiv>전용 {area}㎡</NowrapDiv>}
            {floorString && <NowrapDiv tw="whitespace-nowrap">{floorString}</NowrapDiv>}
            {direction && <NowrapDiv tw="whitespace-nowrap">{direction}</NowrapDiv>}
          </div>
        </Contents>
      </Inner>
    </Wrraper>
  );
}
