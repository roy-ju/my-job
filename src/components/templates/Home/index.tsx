import { motion } from 'framer-motion';
import CharacterImage from '@/../public/static/images/character.png';
import MapSearchImage from '@/../public/static/images/map_search.png';
import LogoIcon from '@/assets/icons/home_logo.svg';
import { Button, Chip, HorizontalScroller, Numeral, Separator } from '@/components/atoms';
import { Accordion, Table } from '@/components/molecules';
import ChevronDown from '@/assets/icons/chevron_down_24.svg';
import tw, { styled, css } from 'twin.macro';
import InstagramIcon from '@/assets/icons/instagram.svg';
import YoutubeIcon from '@/assets/icons/youtube.svg';
import NaverBlogIcon from '@/assets/icons/naver_blog.svg';
import HouseIcon from '@/assets/icons/house.svg';
import DocumentIcon from '@/assets/icons/document.svg';
import ChevronLeftIcon from '@/assets/icons/chevron_left_24.svg';
import AppleIcon from '@/assets/icons/apple_store.svg';
import GooglePlayIcon from '@/assets/icons/google_store.svg';
import HoneyJarIcon from '@/assets/icons/honey_jar.svg';
import DirectTransactionIcon from '@/assets/icons/direct_transaction.svg';
import HeartFilledIcon from '@/assets/icons/heart.svg';
import HeartOutlinedIcon from '@/assets/icons/heart_outlined.svg';
import BellIcon from '@/assets/icons/bell.svg';
import { GetRecentRealPricesResponse } from '@/apis/home/getRecentRealPrices';
import { GetMostSuggestsResponse } from '@/apis/home/getMostSuggests';
import { GetMostFavoritesResponse } from '@/apis/home/getMostFavorites';
import {
  BuyOrRentString,
  DefaultListingImage,
  RealestateTypeChipVariant,
  RealestateTypeString,
} from '@/constants/strings';
import { useCallback, useRef, useState } from 'react';
import { useScroll } from '@/hooks/utils';
import { GetListingsForTheLoggedIn } from '@/apis/home/getListingsForTheLoggedIn';
import { GetDanjisForTheLoggedIn } from '@/apis/home/getDanjisForTheLoggedIn';
import { removeFavorite } from '@/apis/listing/removeListingFavorite';
import { addFavorite } from '@/apis/listing/addListingFavroite';
import Slider from './Slider';

function FavoriteButton({
  defaultSelected,
  onToggle,
}: {
  defaultSelected: boolean;
  onToggle?: (value: boolean) => void;
}) {
  const [selected, setSelected] = useState(defaultSelected);

  return (
    <Button
      size="none"
      variant="ghost"
      onClick={(e) => {
        e?.stopPropagation();
        onToggle?.(!selected);
        setSelected(!selected);
      }}
    >
      {selected ? <HeartFilledIcon tw="text-red" /> : <HeartOutlinedIcon tw="text-white" />}
    </Button>
  );
}

const StyledTable = styled.table`
  table-layout: fixed;
  td,
  th {
    ${tw`h-5 py-1 leading-5 text-info`}
    width: initial;
  }
  td {
    padding-left: 16px;
  }
  th {
    white-space: nowrap;
  }

  & > table > tr:not(:first-of-type) {
    ${tw`border-none`}
  }
`;

const informationStringWrapper = css`
  & > div:not(:first-of-type)::before {
    content: ' | ';
    margin: 0 0.25rem;
    color: #e9ecef; // text-gray-300
  }
`;

interface Props {
  user?: { nickname: string } | null;

  unreadNotificationCount?: number;

  recentRealPriceList?: GetRecentRealPricesResponse['list'];
  mostSuggestList?: GetMostSuggestsResponse['list'];
  mostFavoriteList?: GetMostFavoritesResponse['list'];
  listingsForUser?: GetListingsForTheLoggedIn['list'];
  danjisForUser?: GetDanjisForTheLoggedIn['list'];

  onClickLogin?: () => void;
  onClickSuggestion?: () => void;
  onClickBidding?: () => void;
  onClickListingCreate?: () => void;
  onClickHomeRegister?: () => void;
  onClickDanji?: (pnu: string, realestateType: number) => void;
  onClickListing?: (listingID: number) => void;
  onClickAppStore?: () => void;
  onClickGooglePlay?: () => void;
  onClickInstagram?: () => void;
  onClickYoutube?: () => void;
  onClickNaverBlog?: () => void;
  onClickTermsAndPolicy?: () => void;
  onClickPrivacyPolicy?: () => void;
  onClickAgentSite?: () => void;
  onClickNotification?: () => void;
}

export default function Home({
  user,

  unreadNotificationCount = 0,

  recentRealPriceList,
  mostSuggestList,
  mostFavoriteList,
  listingsForUser,
  danjisForUser,

  onClickLogin,
  onClickSuggestion,
  onClickBidding,
  onClickListingCreate,
  onClickHomeRegister,
  onClickDanji,
  onClickListing,
  onClickAppStore,
  onClickGooglePlay,
  onClickInstagram,
  onClickYoutube,
  onClickNaverBlog,
  onClickTermsAndPolicy,
  onClickPrivacyPolicy,
  onClickAgentSite,
  onClickNotification,
}: Props) {
  const [isHeaderActive, setIsHeaderActive] = useState(false);

  const [scrollContainer, setScrollContainer] = useState<HTMLDivElement | null>(null);

  useScroll(scrollContainer, ({ scrollY }) => {
    setIsHeaderActive(scrollY > 0);
  });

  const isDragging = useRef(false);

  const handleDragStart = useCallback(() => {
    isDragging.current = true;
  }, []);

  const handleDragEnd = useCallback(() => {
    setTimeout(() => {
      isDragging.current = false;
    }, 300);
  }, []);

  return (
    <div tw="h-full flex flex-col">
      <div
        tw="h-14 px-4 flex items-center justify-between z-[1000] transition-colors"
        style={{ backgroundColor: isHeaderActive ? 'white' : '#F4F6FA' }}
      >
        <LogoIcon />
        {!user ? (
          <Button
            size="none"
            variant="ghost"
            tw="h-6 px-2.5 rounded-lg border border-nego-1000 text-nego-1000 text-info hover:bg-nego-100"
            onClick={onClickLogin}
          >
            로그인
            <span tw="h-2 w-px bg-nego-1000 mx-1" />
            회원가입
          </Button>
        ) : (
          <button type="button" tw="relative" onClick={onClickNotification}>
            <BellIcon />
            {unreadNotificationCount > 0 && (
              <span tw="absolute top-0 -right-0.5  animate-bounce text-[8px] text-white  font-bold leading-none px-1 h-3 bg-red rounded-full inline-flex items-center justify-center">
                {unreadNotificationCount}
              </span>
            )}
          </button>
        )}
      </div>
      <div ref={setScrollContainer} tw="relative flex-1 min-h-0 overflow-y-auto">
        <div tw="pb-10" style={{ backgroundColor: '#F4F6FA' }}>
          <div tw="pt-4 px-6">
            <p tw="text-h1 font-bold mb-2">
              부동산 네고 전문가
              <br />
              네고시오
            </p>
            <p tw="text-b1">원하는 가격에 거래하세요.</p>
          </div>
          <div tw="flex gap-3 px-5 mt-4">
            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              type="button"
              tw="relative text-start flex-1 rounded-lg h-[164px] px-2 shadow"
              style={{
                backgroundImage: `linear-gradient(90deg, #9368EF -31.1%, #5F52F6 100%)`,
              }}
              onClick={onClickSuggestion}
            >
              <p tw="absolute text-h3 leading-[26px] font-bold text-nego-300 top-4 left-4">
                원하는 가격에
                <br />
                <span tw="text-white">매물 추천</span>받기
              </p>
              <div
                tw="w-full h-full bg-[length:88px_88px] bg-right-bottom bg-no-repeat"
                style={{ backgroundImage: `url('${CharacterImage.src}')` }}
              />
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              type="button"
              tw="relative text-start flex-1 rounded-lg h-[164px] px-2 py-4 shadow"
              style={{
                background: 'linear-gradient(90deg, #9368EF -31.1%, #5F52F6 100%)',
              }}
              onClick={onClickBidding}
            >
              <p tw="absolute text-h3 leading-[26px] font-bold text-nego-300 top-4 left-4">
                매물 찾아서
                <br />
                <span tw="text-white">가격제안</span>하러 가기
              </p>
              <div
                tw="w-full h-full bg-[length:75px_50px] bg-right-bottom bg-no-repeat"
                style={{ backgroundImage: `url('${MapSearchImage.src}')` }}
              />
            </motion.button>
          </div>
        </div>
        {Boolean(recentRealPriceList?.length) && (
          <div>
            <Separator tw="bg-gray-300" />
            <div tw="pt-10 pb-6">
              <div tw="px-5 font-bold text-h3">내 집 마련 시작은 실거래가 확인부터</div>
              <div tw="px-5 text-b2 text-gray-700 mt-1">실거래가 많이 발생한 단지에요.</div>
              <Slider slideWidth={228} length={recentRealPriceList?.length}>
                <HorizontalScroller tw="py-4" onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                  <div tw="flex px-5 gap-5">
                    {Array.from({ length: 3 }, () =>
                      recentRealPriceList?.map((item) => (
                        <motion.div
                          whileHover={{
                            scale: 1.05,
                          }}
                          key={`recentRealPrice${item.danji_id}${item.trade_or_deposit_price}`}
                          tw="w-[208px] px-5 pt-3 pb-2.5 rounded-lg border border-gray-200 hover:border-gray-1000 hover:cursor-pointer"
                          onClick={() => {
                            if (!isDragging.current) onClickDanji?.(item.pnu, item.realestate_type);
                          }}
                        >
                          <div tw="flex gap-1 mb-2">
                            <Chip variant={RealestateTypeChipVariant[item.realestate_type]}>
                              {RealestateTypeString[item.realestate_type]}
                            </Chip>
                            <Chip variant="gray">{item.eubmyundong}</Chip>
                          </div>
                          <div tw="whitespace-nowrap overflow-x-hidden text-ellipsis text-b1 font-bold mb-1">
                            {item.name}
                          </div>
                          <div tw="flex items-center text-b2 mb-1">
                            {item.is_direct_deal && <DirectTransactionIcon tw="mr-1" />}
                            <span tw="mr-3">{BuyOrRentString[item.buy_or_rent]}</span>
                            <Numeral koreanNumber tw="font-bold">
                              {item.trade_or_deposit_price}
                            </Numeral>
                          </div>
                          <div tw="text-info text-gray-700">{item.deal_date} 거래</div>
                        </motion.div>
                      )),
                    )}
                  </div>
                </HorizontalScroller>
              </Slider>
            </div>
          </div>
        )}
        {Boolean(mostSuggestList?.length) && (
          <div>
            <Separator tw="bg-gray-300" />
            <div tw="pt-10 pb-6">
              <div tw="px-5 font-bold text-h3 flex items-center gap-2">
                전국팔도 꿀단지 <HoneyJarIcon />
              </div>
              <div tw="px-5 text-b2 text-gray-700 mt-1">추천 요청이 많은 단지에요.</div>
              <Slider slideWidth={228} length={mostSuggestList?.length}>
                <HorizontalScroller tw="py-4" onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                  <div tw="flex px-5 gap-5">
                    {Array.from({ length: 3 }, () =>
                      mostSuggestList?.map((item) => (
                        <motion.div
                          whileHover={{
                            scale: 1.05,
                          }}
                          key={`mostSuggests${item.danji_id}`}
                          tw="w-[208px] rounded-lg border border-gray-200 hover:border-gray-1000 hover:cursor-pointer"
                          onClick={() => {
                            if (!isDragging.current) onClickDanji?.(item.pnu, item.realestate_type);
                          }}
                        >
                          <div tw="px-4 pt-3 pb-2 border-b border-b-gray-200">
                            <div tw="flex gap-1 mb-2">
                              <Chip variant={RealestateTypeChipVariant[item.realestate_type]}>
                                {RealestateTypeString[item.realestate_type]}
                              </Chip>
                              <Chip variant="gray">{item.eubmyundong}</Chip>
                            </div>
                            <div tw="whitespace-nowrap overflow-x-hidden text-ellipsis text-b1 font-bold mb-1">
                              {item.name}
                            </div>
                            <div tw="flex items-center text-info text-gray-700 whitespace-nowrap">
                              <span>{item.saedae_count}세대</span>
                              <span tw="h-2 w-px bg-gray-300 mx-1" />
                              <span>총 {item.dong_count}동</span>
                            </div>
                            <div tw="flex items-center text-info text-gray-700 whitespace-nowrap">
                              <span>{item.date} 준공</span>
                              <span tw="h-2 w-px bg-gray-300 mx-1" />
                              <span>
                                전용 {item.jeonyong_min}~{item.jeonyong_max}㎡
                              </span>
                            </div>
                          </div>
                          <div tw="py-2 text-center text-info">
                            <span tw="mr-1">최근 추천 요청 건</span>
                            <span tw="font-bold text-blue-1000">{item.total_suggest_count}</span>
                          </div>
                        </motion.div>
                      )),
                    )}
                  </div>
                </HorizontalScroller>
              </Slider>
            </div>
          </div>
        )}
        {Boolean(mostFavoriteList?.length) && (
          <div>
            <Separator tw="bg-gray-300" />
            <div tw="pt-10 pb-6">
              <div tw="px-5 font-bold text-h3">고민하는 사이 거래 종료! 관심 TOP 매물</div>
              <div tw="px-5 text-b2 text-gray-700 mt-1">관심등록이 많은 매물이에요.</div>
              <Slider slideWidth={180} length={mostFavoriteList?.length}>
                <HorizontalScroller tw="py-4" onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                  <div tw="flex px-5 gap-5">
                    {Array.from({ length: 3 }, () =>
                      mostFavoriteList?.map((item) => (
                        <motion.div
                          whileHover={{
                            scale: 1.05,
                          }}
                          key={item.listing_id}
                          tw="w-[160px] hover:cursor-pointer"
                          onClick={() => {
                            if (!isDragging.current) onClickListing?.(item.listing_id);
                          }}
                        >
                          <div
                            tw="w-full h-[120px] rounded-[12px] bg-center bg-cover bg-no-repeat mb-3"
                            style={{
                              backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url('${
                                item.thumbnail_full_path ?? DefaultListingImage[item.realestate_type]
                              }')`,
                            }}
                          >
                            <div tw="flex justify-end p-2">
                              <FavoriteButton
                                defaultSelected={item.is_favorite}
                                onToggle={(selected) =>
                                  !selected ? removeFavorite(item.listing_id) : addFavorite(item.listing_id)
                                }
                              />
                            </div>
                          </div>
                          <div tw="flex gap-1 mb-2">
                            <Chip variant={RealestateTypeChipVariant[item.realestate_type]}>
                              {RealestateTypeString[item.realestate_type]}
                            </Chip>
                            <Chip variant="gray">{item.eubmyundong}</Chip>
                          </div>
                          {/* <div tw="text-info mb-2 h-10 overflow-hidden text-ellipsis">
                          보증금 월차임 둘다 조절 가능 / 각종 대출 가능 / 반려동물 가능 / 주차가능
                        </div> */}
                          <div tw="font-bold text-b1">
                            {BuyOrRentString[item.buy_or_rent]}{' '}
                            <Numeral koreanNumber>{item.trade_or_deposit_price}</Numeral>
                            {Boolean(item.monthly_rent_fee) && (
                              <span>
                                /<Numeral koreanNumber>{item.monthly_rent_fee}</Numeral>
                              </span>
                            )}
                          </div>
                          <div tw="text-info text-gray-1000  whitespace-nowrap overflow-hidden text-ellipsis">
                            {item.listing_title}
                          </div>

                          <div tw="flex text-info text-gray-700" css={informationStringWrapper}>
                            {item.jeonyong_area && <div>{`전용 ${item.jeonyong_area}㎡`}</div>}
                            {item.total_floor !== '0' && (
                              <div>
                                {item.floor_description
                                  ? `${item.floor_description?.[0]}/${item.total_floor}층`
                                  : `${item.total_floor}층`}
                              </div>
                            )}
                            <div>{item.direction}</div>
                          </div>
                        </motion.div>
                      )),
                    )}
                  </div>
                </HorizontalScroller>
              </Slider>
            </div>
          </div>
        )}
        {user && (
          <div>
            {Boolean(listingsForUser?.length) && (
              <div>
                <Separator tw="bg-gray-300" />
                <div tw="pt-10 pb-6">
                  <div tw="px-5 font-bold text-h3">{user?.nickname}님을 위한 새로운 매물</div>
                  <div tw="px-5 text-b2 text-gray-700 mt-1">관심 단지 또는 주소 등록한 지역의 신규 매물이에요.</div>
                  <Slider slideWidth={176} length={listingsForUser?.length}>
                    <HorizontalScroller tw="py-4" onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                      <div tw="flex px-5 gap-5">
                        {Array.from({ length: 3 }, () =>
                          listingsForUser?.map((item) => (
                            <motion.div
                              whileHover={{
                                scale: 1.05,
                              }}
                              key={item.listing_id}
                              tw="w-[160px] hover:cursor-pointer"
                              onClick={() => {
                                if (!isDragging.current) onClickListing?.(item.listing_id);
                              }}
                            >
                              <div
                                tw="w-full h-[120px] rounded-[12px] bg-center bg-cover bg-no-repeat mb-3"
                                style={{
                                  backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url('${
                                    item.thumbnail_full_path ?? DefaultListingImage[item.realestate_type]
                                  }')`,
                                }}
                              >
                                <div tw="flex justify-end p-2">
                                  <FavoriteButton
                                    defaultSelected={item.is_favorite}
                                    onToggle={(selected) =>
                                      !selected ? removeFavorite(item.listing_id) : addFavorite(item.listing_id)
                                    }
                                  />
                                </div>
                              </div>
                              <div tw="flex gap-1 mb-2">
                                <Chip variant={RealestateTypeChipVariant[item.realestate_type]}>
                                  {RealestateTypeString[item.realestate_type]}
                                </Chip>
                                <Chip variant="gray">{item.eubmyundong}</Chip>
                              </div>
                              {/* <div tw="text-info mb-2 h-10 overflow-hidden text-ellipsis">
                              보증금 월차임 둘다 조절 가능 / 각종 대출 가능 / 반려동물 가능 / 주차가능
                            </div> */}
                              <div tw="font-bold text-b1">
                                {BuyOrRentString[item.buy_or_rent]}{' '}
                                <Numeral koreanNumber>{item.trade_or_deposit_price}</Numeral>
                                {Boolean(item.monthly_rent_fee) && (
                                  <span>
                                    /<Numeral koreanNumber>{item.monthly_rent_fee}</Numeral>
                                  </span>
                                )}
                              </div>
                              <div tw="text-info text-gray-1000 whitespace-nowrap overflow-hidden text-ellipsis">
                                {item.listing_title}
                              </div>
                              <div tw="flex text-info text-gray-700" css={informationStringWrapper}>
                                {item.jeonyong_area && <div>{`전용 ${item.jeonyong_area}㎡`}</div>}
                                {item.total_floor !== '0' && (
                                  <div>
                                    {item.floor_description
                                      ? `${item.floor_description?.[0]}/${item.total_floor}층`
                                      : `${item.total_floor}층`}
                                  </div>
                                )}
                                <div>{item.direction}</div>
                              </div>
                            </motion.div>
                          )),
                        )}
                      </div>
                    </HorizontalScroller>
                  </Slider>
                </div>
              </div>
            )}
            {Boolean(danjisForUser?.length) && (
              <div>
                <Separator tw="bg-gray-300" />
                <div tw="pt-10 pb-6">
                  <div tw="px-5 font-bold text-h3">여기 실거래가 얼마더라?</div>
                  <div tw="mt-1 px-5 text-b2 text-gray-700">관심 단지 또는 주소 등록한 지역의 최근 실거래가예요.</div>
                  <Slider slideWidth={224} length={danjisForUser?.length}>
                    <HorizontalScroller tw="py-4" onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                      <div tw="flex px-5 gap-5">
                        {Array.from({ length: 3 }, () =>
                          danjisForUser?.map((item) => (
                            <motion.div
                              whileHover={{
                                scale: 1.05,
                              }}
                              key={`recentRealPrice${item.danji_id}${item.trade_or_deposit_price}`}
                              tw="w-[208px] px-5 pt-3 pb-2.5 rounded-lg border border-gray-200 hover:border-gray-1000 hover:cursor-pointer"
                              onClick={() => {
                                if (!isDragging.current) onClickDanji?.(item.pnu, item.realestate_type);
                              }}
                            >
                              <div tw="flex gap-1 mb-2">
                                <Chip variant={RealestateTypeChipVariant[item.realestate_type]}>
                                  {RealestateTypeString[item.realestate_type]}
                                </Chip>
                                <Chip variant="gray">{item.eubmyundong}</Chip>
                              </div>
                              <div tw="whitespace-nowrap overflow-x-hidden text-ellipsis text-b1 font-bold mb-1">
                                {item.name}
                              </div>
                              <div tw="flex items-center text-b2 mb-1">
                                {item.is_direct_deal && <DirectTransactionIcon tw="mr-1" />}
                                <span tw="mr-3">{BuyOrRentString[item.buy_or_rent]}</span>
                                <Numeral koreanNumber tw="font-bold">
                                  {item.trade_or_deposit_price}
                                </Numeral>
                              </div>
                              <div tw="text-info text-gray-700">{item.deal_date} 거래</div>
                            </motion.div>
                          )),
                        )}
                      </div>
                    </HorizontalScroller>
                  </Slider>
                </div>
              </div>
            )}
          </div>
        )}
        <Separator tw="bg-gray-300" />
        <div tw="py-10 px-5">
          <div tw="mb-6">
            <div tw="pl-1 text-info leading-4 mb-2">우리집 서비스</div>
            <div tw="flex gap-3">
              <Button tw="flex-1" variant="outlined" size="bigger" onClick={onClickHomeRegister}>
                <div tw="flex items-center w-full gap-2">
                  <HouseIcon />
                  <span tw="whitespace-nowrap">집주소 등록</span>
                  <ChevronLeftIcon tw="text-gray-700 w-4 h-4 ml-auto rotate-180" />
                </div>
              </Button>
              <Button tw="flex-1" variant="outlined" size="bigger" onClick={onClickListingCreate}>
                <div tw="flex items-center w-full gap-2">
                  <DocumentIcon />
                  <span tw="whitespace-nowrap">매물등록 신청</span>
                  <ChevronLeftIcon tw="text-gray-700 w-4 h-4 ml-auto rotate-180" />
                </div>
              </Button>
            </div>
          </div>
          <div tw="mb-10">
            <div tw="pl-1 text-info leading-4 mb-2">앱 다운로드</div>
            <div tw="flex gap-3">
              <Button tw="flex-1 p-0" variant="outlined" size="bigger" onClick={onClickAppStore}>
                <AppleIcon tw="w-6 h-6 mr-2" />
                <span tw="whitespace-nowrap">앱스토어에서 설치</span>
              </Button>
              <Button tw="flex-1 p-0" variant="outlined" size="bigger" onClick={onClickGooglePlay}>
                <GooglePlayIcon tw="w-6 h-6 mr-2" />
                <span tw="whitespace-nowrap">구글플레이에서 설치</span>
              </Button>
            </div>
          </div>
          <div tw="flex items-center mb-2">
            <Button size="none" variant="ghost" tw="text-info font-bold text-gray-700" onClick={onClickTermsAndPolicy}>
              이용약관
            </Button>
            <span tw="h-2 w-px bg-gray-300 mx-2" />
            <Button size="none" variant="ghost" tw="text-info font-bold text-gray-700" onClick={onClickPrivacyPolicy}>
              개인정보처리방침
            </Button>
          </div>
          <Accordion>
            <Accordion.Summary hideArrow tw="w-fit">
              <div tw="flex items-center gap-2">
                <span tw="text-info text-gray-700 font-bold">네고시오 사업자정보</span>
                <ChevronDown tw="w-4 h-4 text-gray-700" />
              </div>
            </Accordion.Summary>
            <Accordion.Details>
              <StyledTable tw="mt-1">
                <Table.Body>
                  <Table.Row>
                    <Table.Head>회사명</Table.Head>
                    <Table.Data>주식회사 네고시오</Table.Data>
                  </Table.Row>
                  <Table.Row>
                    <Table.Head>대표</Table.Head>
                    <Table.Data>우성남</Table.Data>
                  </Table.Row>
                  <Table.Row>
                    <Table.Head>개인정보 관리 책임자</Table.Head>
                    <Table.Data>Lee Sam</Table.Data>
                  </Table.Row>
                  <Table.Row>
                    <Table.Head>사업자 등록번호</Table.Head>
                    <Table.Data>130-88-02097</Table.Data>
                  </Table.Row>
                  <Table.Row>
                    <Table.Head>통신판매업 신고번호</Table.Head>
                    <Table.Data>2021-서울강남-04487 호</Table.Data>
                  </Table.Row>
                  <Table.Row>
                    <Table.Head>주소</Table.Head>
                    <Table.Data>서울 강남구 선릉로94번길 11, 4층 (삼성동, 삼성2빌딩)</Table.Data>
                  </Table.Row>
                  <Table.Row>
                    <Table.Head>이메일</Table.Head>
                    <Table.Data>info@negocio.co.kr</Table.Data>
                  </Table.Row>
                  <Table.Row>
                    <Table.Head>전화</Table.Head>
                    <Table.Data>02-6956-0155</Table.Data>
                  </Table.Row>
                </Table.Body>
              </StyledTable>
            </Accordion.Details>
          </Accordion>

          <div tw="flex mt-2 items-center justify-between">
            <Button variant="outlined" size="medium" tw="text-info" onClick={onClickAgentSite}>
              네고시오 중개사
            </Button>
            <div tw="flex gap-3">
              <Button size="none" variant="ghost" onClick={onClickInstagram}>
                <InstagramIcon />
              </Button>
              <Button size="none" variant="ghost" onClick={onClickYoutube}>
                <YoutubeIcon />
              </Button>
              <Button size="none" variant="ghost" onClick={onClickNaverBlog}>
                <NaverBlogIcon />
              </Button>
            </div>
          </div>
          <div tw="mt-2 text-[10px] leading-4 text-gray-700">ⓒ 2023. Negocio All rights reserved.</div>
        </div>
      </div>
    </div>
  );
}
