import ChevronDown from '@/assets/icons/chevron_down.svg';
import { motion } from 'framer-motion';
import { useState } from 'react';
import tw from 'twin.macro';
import { Button, Checkbox, Chip, Moment, Numeral } from '@/components/atoms';
import { ButtonGroup } from '@/components/molecules';
import { GetMySuggestRecommendsResponse } from '@/apis/suggest/getMySuggestRecommends';
import { SuggestRecommendStatus } from '@/constants/enums';
import {
  BuyOrRentString,
  DefaultListingImage,
  RealestateTypeChipVariant,
  RealestateTypeString,
} from '@/constants/strings';
import { Avatar } from '../ChatMessage/Avatar';

interface Props {
  showCheckbox?: boolean;
  item?: NonNullable<GetMySuggestRecommendsResponse['list']>[0];
  onClickListing?: () => void;
  onClickChat?: () => void;
  onClickNotInterested?: () => void;
  onClickRecommendAccept?: () => void;
}

export default function ListingRecommendListItem({
  showCheckbox = false,
  item,
  onClickListing,
  onClickChat,
  onClickNotInterested,
  onClickRecommendAccept,
}: Props) {
  const [expanded, setExpanded] = useState(false);

  const listingImagePath = item?.thumbnail_full_path ?? DefaultListingImage[item?.realestate_type ?? 0];

  const renderStatusChip = () => {
    if (item?.suggest_recommend_status === SuggestRecommendStatus.Sent) {
      return <Chip tw="rounded-bl-none rounded-tr-none bg-blue-600 text-white font-bold">신규</Chip>;
    }
    if (item?.suggest_recommend_status === SuggestRecommendStatus.Accepted) {
      return <Chip tw="rounded-bl-none rounded-tr-none bg-nego-600 text-white font-bold">협의중</Chip>;
    }
    if (item?.suggest_recommend_status === SuggestRecommendStatus.NotInterested) {
      return <Chip tw="rounded-bl-none rounded-tr-none bg-gray-600 text-white font-bold">관심 없음</Chip>;
    }
  };

  const renderCtas = () => {
    if (item?.suggest_recommend_status === SuggestRecommendStatus.Sent) {
      return (
        <ButtonGroup tw="w-full border-t border-t-gray-300">
          <Button onClick={onClickNotInterested} tw="flex-1 rounded-t-none bg-white text-gray-1000 hover:bg-gray-200">
            관심 없음
          </Button>
          <Button onClick={onClickRecommendAccept} tw="flex-1 rounded-t-none">
            네고 협의
          </Button>
        </ButtonGroup>
      );
    }
    if (item?.suggest_recommend_status === SuggestRecommendStatus.Accepted) {
      return (
        <ButtonGroup tw="w-full border-t border-t-gray-300">
          <Button onClick={onClickChat} tw="flex-1 rounded-t-none">
            채팅 바로가기
          </Button>
        </ButtonGroup>
      );
    }
    if (item?.suggest_recommend_status === SuggestRecommendStatus.NotInterested) {
      return (
        <ButtonGroup tw="w-full border-t border-t-gray-300">
          <Button onClick={onClickRecommendAccept} tw="flex-1 rounded-t-none">
            네고 협의
          </Button>
        </ButtonGroup>
      );
    }
  };

  return (
    <div tw="bg-white rounded-lg border border-gray-300 shadow">
      <div tw="flex items-center gap-2 px-4 pt-4 pb-3 border-b border-b-gray-300">
        {showCheckbox && <Checkbox />}
        <Avatar size={24} alt="alt" src={item?.agent_profile_image_url} />
        <div tw="text-b2 font-bold mr-auto">{item?.agent_name} 중개사의 추천</div>
        <div tw="text-info text-gray-700">
          추천일 <Moment format="yyyy.MM.DD">{item?.created_time}</Moment>
        </div>
      </div>
      <div tw="flex flex-col">
        <button type="button" tw="text-start pt-3.5 pb-1.5 px-4 flex hover:bg-gray-200" onClick={onClickListing}>
          <div tw="flex-1">
            <div tw="flex gap-1 items-center">
              {renderStatusChip()}
              <Chip variant={RealestateTypeChipVariant[item?.realestate_type ?? 0]}>
                {RealestateTypeString[item?.realestate_type ?? 0]}
              </Chip>
              <Chip variant="gray">{item?.eubmyundong}</Chip>
            </div>
            <div tw="flex items-center mt-1 gap-1">
              {item?.quick_sale && (
                <div tw="w-4 pt-px h-4 leading-4 text-[11px] text-center rounded-full font-bold text-white bg-red-700">
                  급
                </div>
              )}
              <div tw="text-b1 font-bold pt-0.5">
                {BuyOrRentString[item?.buy_or_rent ?? 0]} <Numeral koreanNumber>{item?.trade_or_deposit_price}</Numeral>
                {Boolean(item?.monthly_rent_fee) && (
                  <span>
                    {' / '}
                    <Numeral koreanNumber>{item?.monthly_rent_fee}</Numeral>
                  </span>
                )}
              </div>
            </div>
            <div tw="text-info">{item?.listing_title}</div>
            <div tw="text-info text-gray-700 flex items-center gap-1">
              <span>전용 {item?.jeonyong_area}㎡</span>
              <span>
                {item?.floor_description}/{item?.total_floor}층
              </span>
              <span>{item?.direction}</span>
            </div>
          </div>
          <div>
            <div
              tw="w-16 h-16 rounded-lg"
              style={{
                backgroundImage: `url('${listingImagePath}')`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}
            />
          </div>
        </button>
        {item?.note && (
          <button type="button" tw="text-start block" onClick={() => setExpanded((prev) => !prev)}>
            <div tw="px-4 py-2 mb-2 flex hover:bg-gray-200">
              <motion.div
                tw="flex-1 text-info leading-[20px] overflow-hidden"
                initial={{ height: '20px' }}
                animate={{ height: !expanded ? '20px' : 'auto' }}
              >
                {item?.note}
              </motion.div>
              <div tw="shrink-0 pl-1 pt-px">
                <ChevronDown css={[tw`text-gray-700 transition-transform`, expanded && tw`rotate-180`]} />
              </div>
            </div>
          </button>
        )}
      </div>
      <div>{renderCtas()}</div>
    </div>
  );
}
