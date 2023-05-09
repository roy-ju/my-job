import { Separator } from '@/components/atoms';
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useOutsideClick } from '@/hooks/utils';
import { css } from 'twin.macro';
import ChatRoomListingListItem from '@/components/organisms/ChatRoomListingListItem';

export interface ListingCardProps {
  listingId: number;
  listingStatus: number;
  biddingId: number;
  buyOrRent: number;
  tradeOrDepositPrice: number;
  monthlyRentFee: number;
  listingTitle: string;
  jeonyongArea: string;
  thumbnailFullPath: string;
  floorDescription: string;
  totalFloor: string;
  direction: string;
  labelText: string;
}

interface Props {
  setShowListingList: React.Dispatch<React.SetStateAction<boolean>>;
  sellerList: ListingCardProps[];
  buyerContractList: ListingCardProps[];
  buyerActiveList: ListingCardProps[];
  chatUserType: number;
  agentName: string;
  officeName: string;
  onClickNavigateToListingDetail?: (listingId: number) => () => void;
  onClickNavigateToListingDetailHistory?: (listingId: number, biddingId: number) => () => void;
}

const ListingListDivider = css`
  & > div:not(:last-of-type)::after {
    content: '';
    display: block;
    border-bottom: 1px solid #e9ecef; // text-gray-300
    margin-bottom: 28px;
  }
`;

export default function ListingList({
  setShowListingList,
  sellerList,
  buyerContractList,
  buyerActiveList,

  agentName,
  officeName,

  onClickNavigateToListingDetail,
  onClickNavigateToListingDetailHistory,
}: Props) {
  const outsideRef = useRef<HTMLDivElement>(null);

  useOutsideClick({
    ref: outsideRef,
    handler: () => setShowListingList(false),
  });

  return (
    <motion.div
      tw="flex flex-1 flex-col items-center justify-center absolute left-0 w-full min-h-full z-50"
      initial={{ opacity: 0, x: '100%', backgroundColor: 'rgba(0,0,0,0)' }}
      animate={{ opacity: 1, x: 0, backgroundColor: 'rgba(0,0,0,0.6)' }}
      transition={{ duration: 0.3 }}
    >
      <div ref={outsideRef} tw="w-[312px] bg-white self-end flex-1">
        <div tw="px-5 py-4">
          <div tw="mb-1 text-b1 font-bold">{agentName} 공인중개사</div>
          <div tw="text-info text-gray-700">{officeName}</div>
        </div>
        <Separator />
        <div css={ListingListDivider} tw="py-4">
          {buyerContractList?.length > 0 && (
            <div>
              {buyerContractList?.map((args, i) => (
                <React.Fragment key={args.listingId}>
                  {i === 0 && <div tw="px-5 text-b1 font-bold ">거래성사 매물</div>}
                  {i !== 0 && <div tw="border-t border-gray-300" />}
                  <ChatRoomListingListItem
                    onClickNavigateToListingDetail={onClickNavigateToListingDetail}
                    onClickNavigateToListingDetailHistory={onClickNavigateToListingDetailHistory}
                    {...args}
                  />
                </React.Fragment>
              ))}
            </div>
          )}
          {buyerActiveList?.length > 0 && (
            <div>
              {buyerActiveList?.map((args, i) => (
                <React.Fragment key={args.listingId}>
                  {i === 0 && <div tw="px-5 text-b1 font-bold ">협의중 매물</div>}
                  {i !== 0 && <div tw="border-t border-gray-300" />}
                  <ChatRoomListingListItem
                    onClickNavigateToListingDetail={onClickNavigateToListingDetail}
                    onClickNavigateToListingDetailHistory={onClickNavigateToListingDetailHistory}
                    {...args}
                  />
                </React.Fragment>
              ))}
            </div>
          )}
          {sellerList?.length > 0 && (
            <div>
              {sellerList?.map((args, i) => (
                <React.Fragment key={args.listingId}>
                  {i === 0 && <div tw="px-5 text-b1 font-bold ">등록한 매물</div>}
                  {i !== 0 && <div tw="border-t border-gray-300" />}
                  <ChatRoomListingListItem
                    onClickNavigateToListingDetail={onClickNavigateToListingDetail}
                    onClickNavigateToListingDetailHistory={onClickNavigateToListingDetailHistory}
                    {...args}
                  />
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
