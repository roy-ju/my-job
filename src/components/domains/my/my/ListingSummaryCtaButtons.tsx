import ChevronIcon from '@/assets/icons/my_chevron_16.svg';

import OfferIcon from '@/assets/icons/my_offer_24.svg';

import SaveIcon from '@/assets/icons/my_save_24.svg';

import SearchIcon from '@/assets/icons/my_search_24.svg';

interface CTAButton {
  type?: 'requestedSuggests' | 'myParticipatingListings' | 'myRegisterdListings' | 'suggestRecommendedList';
  count?: number;
  onClickRequestedSuggestsCTA?: () => void;
  onClickMyParticipatingListingsCTA?: () => void;
  onClickMyRegisterdListingsCTA?: () => void;
  onClickSuggestRecommendedListCTA?: () => void;
}

interface GuideType {
  [key: string]: { title: string; info: string; onClickHanlder?: () => void; icon: 'save' | 'offer' | 'search' };
}

export default function ListingSummaryCtaButtons({
  type,
  count,
  onClickRequestedSuggestsCTA,
  onClickMyParticipatingListingsCTA,
  onClickMyRegisterdListingsCTA,
  onClickSuggestRecommendedListCTA,
}: CTAButton) {
  const CTAGuide: GuideType = {
    requestedSuggests: {
      title: '나의 구해요 목록',
      info: '구하기 게시하고, 매물을 추천받아요.',
      onClickHanlder: onClickRequestedSuggestsCTA,
      icon: 'search',
    },
    myParticipatingListings: {
      title: '가격 제안 내역',
      info: '등록된 매물에 원하는 가격을 제안해요.',
      onClickHanlder: onClickMyParticipatingListingsCTA,
      icon: 'offer',
    },
    myRegisterdListings: {
      title: '매물 등록 내역',
      info: '우리집을 매물로 등록해서 가격제안 받아요.',
      onClickHanlder: onClickMyRegisterdListingsCTA,
      icon: 'save',
    },
    suggestRecommendedList: {
      title: '우리집 추천 내역',
      info: '집을 구하는 사람에게 우리집을 추천해 거래를 제안해요.',
      onClickHanlder: onClickSuggestRecommendedListCTA,
      icon: 'offer',
    },
  };

  if (!type) return null;

  return (
    <button
      tw="w-full rounded-lg bg-gray-100 text-gray-1000 h-[66px] px-5 py-3 justify-between hover:bg-gray-200 transition-colors flex items-center"
      type="button"
      onClick={CTAGuide[type].onClickHanlder}
    >
      <div tw="flex flex-col gap-1">
        <div tw="flex gap-2 items-center">
          {CTAGuide[type].icon === 'save' && <SaveIcon />}
          {CTAGuide[type].icon === 'offer' && <OfferIcon />}
          {CTAGuide[type].icon === 'search' && <SearchIcon />}
          <span tw="text-b2 text-gray-1000">{CTAGuide[type].title}</span>
        </div>

        <div tw="flex gap-2 items-center">
          <span tw="text-info text-gray-700">{CTAGuide[type].info}</span>
        </div>
      </div>

      <div tw="flex gap-1 items-center">
        <span tw="text-b1 font-bold text-nego-1000 min-w-[12px] text-center">{count}</span>
        <ChevronIcon tw="mb-[2px]" />
      </div>
    </button>
  );
}
