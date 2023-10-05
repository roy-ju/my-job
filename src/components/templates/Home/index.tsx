/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { motion } from 'framer-motion';
import CharacterImage from '@/../public/static/images/character.png';
import HomeSearchImage from '@/../public/static/images/home_search.png';
import HomeBookImage from '@/../public/static/images/home_book.png';
import LogoIcon from '@/assets/icons/home_logo.svg';
import { Button, Chip, Numeral, Separator } from '@/components/atoms';
import { Accordion, Carousel, Table } from '@/components/molecules';
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
import { GetMostTradeCountResponse } from '@/apis/home/getMostTradeCount';
import { GetMostSuggestsResponse } from '@/apis/home/getMostSuggests';
import { GetMostFavoritesResponse } from '@/apis/home/getMostFavorites';
import {
  BuyOrRentString,
  DefaultListingImage,
  RealestateTypeChipVariant,
  RealestateTypeString,
} from '@/constants/strings';
import { useCallback, useRef, useState } from 'react';
import { useIsomorphicLayoutEffect, useScroll } from '@/hooks/utils';
import { GetListingsForTheLoggedIn } from '@/apis/home/getListingsForTheLoggedIn';
import { GetDanjisForTheLoggedIn } from '@/apis/home/getDanjisForTheLoggedIn';
import { removeFavorite } from '@/apis/listing/removeListingFavorite';
import { addFavorite } from '@/apis/listing/addListingFavroite';
import { BuyOrRent } from '@/constants/enums';
import { checkPlatform } from '@/utils/checkPlatform';
import Routes from '@/router/routes';
import { GetLawQnaListResponse } from '@/apis/lawQna/getLawQna';
import { Banner } from './Components/Banner';

function renderLeftButton(props: any) {
  return (
    <button
      type="button"
      {...props}
      tw="absolute top-1/2 left-0 -translate-y-1/2 bg-white z-10 px-1.5 py-1 rounded-r-[32px] border-r border-b border-t border-gray-300"
      style={{
        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.14)',
      }}
    >
      <ChevronLeftIcon />
    </button>
  );
}

function renderRightButton(props: any) {
  return (
    <button
      type="button"
      {...props}
      tw="absolute top-1/2 right-0 -translate-y-1/2 bg-white z-10 px-1.5 py-1 rounded-l-[32px] border-l border-b border-t border-gray-300"
      style={{
        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.14)',
      }}
    >
      <ChevronLeftIcon tw="rotate-180" />
    </button>
  );
}

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
      {selected ? <HeartFilledIcon tw="text-red" /> : <HeartOutlinedIcon tw="text-gray-700" />}
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
  & > p:not(:first-of-type)::before {
    content: ' | ';
    margin: 0 0.25rem;
    color: #e9ecef; // text-gray-300
  }
`;

interface Props {
  carouselType?: 'pc' | 'mobile';

  user?: { nickname: string; isVerified: boolean } | null;

  unreadNotificationCount?: number;
  activeListingCount?: number;
  suggestAssignedAgentCount?: number;
  tradeCountList?: GetMostTradeCountResponse['list'];
  mostSuggestList?: GetMostSuggestsResponse['list'];
  mostFavoriteList?: GetMostFavoritesResponse['list'];
  listingsForUser?: GetListingsForTheLoggedIn['list'];
  danjisForUser?: GetDanjisForTheLoggedIn['list'];
  qnaLawData?: GetLawQnaListResponse['list'];
  hasAddress?: boolean;
  hasFavoriteDanji?: boolean;
  regionName?: string;

  onClickLogin?: () => void;
  onClickSuggestion?: () => void;
  onClickBidding?: () => void;
  onClickListingCreate?: () => void;
  onClickHomeRegister?: () => void;
  onClickDanji?: (danjiID: number) => void;
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
  onClickGuide?: () => void;
  onClickCounseling?: () => void;

  onClickLawQna?: (id?: number) => void;
  onFavoritelistingsForUserMutate?: () => void;
  onClickFavoriteButton?: (selected: boolean, listingId: number) => Promise<void>;
}

export default function Home({
  carouselType,

  user,
  activeListingCount = 0,
  suggestAssignedAgentCount = 0,
  unreadNotificationCount = 0,

  tradeCountList,
  mostSuggestList,
  mostFavoriteList,
  listingsForUser,
  danjisForUser,
  qnaLawData,
  hasAddress,
  hasFavoriteDanji,
  regionName,

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
  onClickGuide,
  onClickCounseling,

  onClickLawQna,
  onFavoritelistingsForUserMutate,
  onClickFavoriteButton,
}: Props) {
  const [isHeaderActive, setIsHeaderActive] = useState(false);

  const [scrollContainer, setScrollContainer] = useState<HTMLDivElement | null>(null);

  const [mobileOrPc, setMobileOrPc] = useState<string>('');

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

  useIsomorphicLayoutEffect(() => {
    if (checkPlatform() === 'pc') {
      setMobileOrPc('pc');
    } else if (checkPlatform() === 'mobile') {
      setMobileOrPc('mobile');
    }
  }, []);

  // const whereSectionTop = useMemo(() => {
  //   if (listingsForUser?.length) {
  //     return 1;
  //   }

  //   if (danjisForUser?.length) {
  //     return 2;
  //   }

  //   if (mostSuggestList?.length) {
  //     return 3;
  //   }

  //   if (mostFavoriteList?.length) {
  //     return 4;
  //   }

  //   if (tradeCountList?.length) {
  //     return 5;
  //   }
  // }, [
  //   danjisForUser?.length,
  //   listingsForUser?.length,
  //   mostFavoriteList?.length,
  //   mostSuggestList?.length,
  //   tradeCountList?.length,
  // ]);

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
      <div ref={setScrollContainer} tw="relative flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
        <div tw="pb-10" style={{ backgroundColor: '#F4F6FA' }}>
          <div tw="pt-4 px-6">
            <h1 tw="text-h1 font-bold mb-2">
              추천받고.︎ 비교하고. 네고하고.︎
              <br />
              네고시오
            </h1>
            <div tw="flex flex-row items-center gap-2">
              <div tw="flex flex-row items-center gap-1">
                <p tw="text-b2">추천대기 중인 중개사</p>
                <p tw="text-b2 font-semibold text-nego-800">{suggestAssignedAgentCount}명</p>
              </div>
              <div tw="min-h-[8px] min-w-[1px] bg-gray-500" />
              <div tw="flex flex-row items-center gap-1">
                <p tw="text-b2">네고 진행 중</p>
                <p tw="text-b2 font-semibold text-blue-800">{activeListingCount}건</p>
              </div>
            </div>
          </div>
          <div tw="flex gap-2 px-5 mt-4">
            <motion.button
              whileHover={{
                scale: mobileOrPc === 'pc' ? 1.05 : 'none',
              }}
              type="button"
              name="suggestRegionalForm"
              tw="relative text-start flex-1 rounded-lg h-[160px] min-w-[166px] px-2 shadow"
              style={{
                backgroundImage: `linear-gradient(90deg, #7B68EF -31.1%, #5E48E8 100%)`,
              }}
              onClick={onClickSuggestion}
            >
              <a
                onClick={(e) => {
                  e.preventDefault();
                  onClickSuggestion?.();
                }}
                href={
                  mobileOrPc === 'pc'
                    ? `/${Routes.RecommendationForm}`
                    : `/${Routes.EntryMobile}/${Routes.RecommendationForm}`
                }
                target="_self"
                tw="absolute text-h3 leading-[26px] font-semibold text-white top-4 left-4"
              >
                <h2>
                  숨은 네고 매물
                  <br />
                  추천받기
                </h2>
              </a>
              <div
                tw="w-full h-full bg-[length:88px_88px] bg-right-bottom bg-no-repeat"
                style={{ backgroundImage: `url('${CharacterImage.src}')` }}
              />
            </motion.button>
            <div tw="flex flex-col gap-2 flex-1 min-w-[166px]">
              <motion.button
                whileHover={{
                  scale: mobileOrPc === 'pc' ? 1.05 : 'none',
                }}
                type="button"
                name="map"
                tw="relative text-start flex-1 rounded-lg h-[76px] px-2 pr-3 py-4 shadow"
                style={{
                  background: 'linear-gradient(90deg, #5C7CFA -31.1%, #3B5BDB 100%)',
                }}
                onClick={onClickBidding}
              >
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    onClickBidding?.();
                  }}
                  href={mobileOrPc === 'pc' ? `/${Routes.Map}` : `/${Routes.EntryMobile}/${Routes.Map}`}
                  target="_self"
                  tw="absolute text-b2 font-bold text-white top-4 left-3"
                >
                  <h2>
                    지도에서
                    <br />
                    매물 검색
                  </h2>
                </a>
                <div
                  tw="w-full h-full bg-[length:36px_36px] bg-right bg-no-repeat"
                  style={{ backgroundImage: `url('${HomeSearchImage.src}')` }}
                />
              </motion.button>

              <motion.button
                whileHover={{
                  scale: mobileOrPc === 'pc' ? 1.05 : 'none',
                }}
                type="button"
                name="intro"
                tw="relative text-start flex-1 rounded-lg h-[76px] px-2 pr-3 py-4 [border: 1px dashed #7950F2]"
                style={{
                  background: 'transparent',
                }}
                onClick={onClickGuide}
              >
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    onClickGuide?.();
                  }}
                  href={mobileOrPc === 'pc' ? `/${Routes.Intro}` : `/${Routes.EntryMobile}/${Routes.Intro}`}
                  target="_blank"
                  tw="absolute text-b2 font-bold text-nego top-4 left-3"
                  rel="noreferrer"
                >
                  <h2>
                    네고시오가
                    <br />
                    궁금하다면?
                  </h2>
                </a>
                <div
                  tw="w-full h-full bg-[length:36px_36px] bg-right bg-no-repeat"
                  style={{ backgroundImage: `url('${HomeBookImage.src}')` }}
                />
              </motion.button>
            </div>
          </div>
        </div>

        <div>
          <Separator tw="bg-gray-300" />

          <div tw="py-10">
            <div tw="px-5">
              <h2 tw="text-h3 font-bold mb-1">부동산 법률상담</h2>
              <p tw="text-b2 mb-4 text-gray-700">안전한 부동산 거래를 위해 변호사가 상담해 드려요.</p>
              <Banner mobileOrPc={mobileOrPc} handleClickCounseling={onClickCounseling} />
            </div>

            {qnaLawData && qnaLawData.length > 0
              ? qnaLawData.map((item, index) => (
                  <div
                    tw="py-4 px-5 hover:bg-gray-200 cursor-pointer"
                    key={item.id}
                    onClick={() => onClickLawQna?.(item.id)}
                    style={qnaLawData.length === index + 1 ? {} : { borderBottom: '1px solid #E9ECEF' }}
                  >
                    {mobileOrPc === 'mobile' && (
                      <h1 tw="text-b2 [text-overflow: ellipsis] overflow-hidden whitespace-nowrap">
                        <span tw="font-bold text-nego-1000">Q. </span>
                        {item.title}
                      </h1>
                    )}

                    {mobileOrPc === 'pc' && (
                      <h1 tw="text-b2 [text-overflow: ellipsis] overflow-hidden whitespace-nowrap">
                        <a
                          onClick={(e) => {
                            e.preventDefault();
                            onClickLawQna?.(item.id);
                          }}
                          href={`/${Routes.LawQnaDetail}?qnaID=${item.id}`}
                          tw="font-bold text-nego-1000"
                        >
                          Q.{' '}
                        </a>
                        {item.title}
                      </h1>
                    )}
                  </div>
                ))
              : null}
          </div>
        </div>

        {user && (
          <div>
            {Boolean(listingsForUser?.length) && (
              <div>
                <Separator tw="bg-gray-300" />
                <div tw="pt-10 pb-6">
                  <div tw="px-5 font-bold text-h3">{user?.nickname}님을 위한 새로운 매물</div>
                  <div tw="px-5 text-b2 text-gray-700 mt-1">관심 단지 또는 주소 등록한 지역의 신규 매물이에요.</div>
                  <Carousel
                    gap={16}
                    trackStyle={{ padding: '16px 20px' }}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    renderLeftButton={carouselType === 'pc' ? renderLeftButton : undefined}
                    renderRightButton={carouselType === 'pc' ? renderRightButton : undefined}
                  >
                    {listingsForUser?.map((item) => (
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
                        />
                        <div tw="flex gap-1 mb-2">
                          <Chip variant={RealestateTypeChipVariant[item.realestate_type]}>
                            {RealestateTypeString[item.realestate_type]}
                          </Chip>
                          <Chip variant="gray">{item.eubmyundong}</Chip>
                        </div>
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
                          {item.jeonyong_area && <p>{`전용 ${item.jeonyong_area}㎡`}</p>}
                          {item.total_floor !== '0' && (
                            <p>
                              {item.floor_description
                                ? `${item.floor_description?.[0]}/${item.total_floor}층`
                                : `${item.total_floor}층`}
                            </p>
                          )}
                          <p>{item.direction}</p>
                        </div>
                        <div tw="flex flex-row gap-1 justify-start items-center pl-0 mt-1">
                          <FavoriteButton
                            defaultSelected={item.is_favorite}
                            onToggle={async (selected) => {
                              if (!selected) {
                                await removeFavorite(item.listing_id);
                                onFavoritelistingsForUserMutate?.();
                              } else {
                                await addFavorite(item.listing_id);
                                onFavoritelistingsForUserMutate?.();
                              }
                            }}
                          />
                          <span tw="text-info text-gray-700">{item.favorite_count || 0}</span>
                        </div>
                      </motion.div>
                    ))}
                  </Carousel>
                </div>
              </div>
            )}

            {Boolean(danjisForUser?.length) && (
              <div>
                <Separator tw="bg-gray-300" />
                <div tw="pt-10 pb-6">
                  <div tw="px-5 font-bold text-h3">{user?.nickname}님을 위한 최근 실거래가</div>
                  <div tw="mt-1 px-5 text-b2 text-gray-700">
                    {hasFavoriteDanji
                      ? '관심 설정 단지 및 주변 단지의 최근 실거래가예요.'
                      : hasAddress
                      ? '주소 등록 단지 및 주변 단지의 최근 실거래가예요.'
                      : ''}
                  </div>
                  <Carousel
                    gap={16}
                    trackStyle={{ padding: '16px 20px' }}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    renderLeftButton={carouselType === 'pc' ? renderLeftButton : undefined}
                    renderRightButton={carouselType === 'pc' ? renderRightButton : undefined}
                  >
                    {danjisForUser?.map((item) => (
                      <motion.div
                        whileHover={{
                          scale: 1.05,
                        }}
                        key={`recentRealPrice${item.danji_id}${item.trade_or_deposit_price}`}
                        tw="w-[208px] px-5 pt-3 pb-2.5 rounded-lg border border-gray-200 hover:border-gray-1000 hover:cursor-pointer"
                        onClick={() => {
                          if (!isDragging.current) onClickDanji?.(item.danji_id);
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
                          {item.buy_or_rent === BuyOrRent.Wolsae && item.monthly_rent_fee > 0 && (
                            <>
                              <span>&nbsp;/&nbsp;</span>
                              <Numeral koreanNumber tw="font-bold">
                                {item.monthly_rent_fee}
                              </Numeral>
                            </>
                          )}
                        </div>
                        <div tw="text-info text-gray-700">{item.deal_date} 신고</div>
                      </motion.div>
                    ))}
                  </Carousel>
                </div>
              </div>
            )}
          </div>
        )}

        {Boolean(mostSuggestList?.length) && (
          <div>
            <Separator tw="bg-gray-300" />
            <div tw="pt-10 pb-6">
              <div tw="px-5 font-bold text-h3 flex items-center gap-2">
                <h2>추천 요청 많은 단지</h2> <HoneyJarIcon />
              </div>
              <div tw="px-5 text-b2 text-gray-700 mt-1">
                <p>중개사님에게 추천 요청이 많은 매물이에요.</p>
              </div>
              <Carousel
                gap={16}
                trackStyle={{ padding: '16px 20px' }}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                renderLeftButton={carouselType === 'pc' ? renderLeftButton : undefined}
                renderRightButton={carouselType === 'pc' ? renderRightButton : undefined}
              >
                {mostSuggestList?.map((item) => (
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                    }}
                    key={`mostSuggests${item.danji_id}`}
                    tw="w-[208px] rounded-lg border border-gray-200 hover:border-gray-1000 hover:cursor-pointer"
                    onClick={() => {
                      if (!isDragging.current) onClickDanji?.(item.danji_id);
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
                        <a
                          onClick={(e) => {
                            e.preventDefault();
                            onClickDanji?.(item.danji_id);
                          }}
                          href={
                            mobileOrPc === 'pc'
                              ? `/${Routes.DanjiDetail}?danjiID=${item.danji_id}`
                              : `/${Routes.EntryMobile}/${Routes.DanjiDetail}?danjiID=${item.danji_id}`
                          }
                          target="_self"
                        >
                          <h1>{item.name}</h1>
                        </a>
                      </div>
                      <div tw="flex items-center text-info text-gray-700 whitespace-nowrap">
                        <p>{item.saedae_count}세대</p>
                        <p tw="h-2 w-px bg-gray-300 mx-1" />
                        <p>총 {item.dong_count}동</p>
                      </div>
                      <div tw="flex items-center text-info text-gray-700 whitespace-nowrap">
                        <p>{item.date} 준공</p>
                        <p tw="h-2 w-px bg-gray-300 mx-1" />
                        <p>
                          전용 {item.jeonyong_min}~{item.jeonyong_max}㎡
                        </p>
                      </div>
                    </div>
                    <div tw="py-2 text-center text-info">
                      <p tw="mr-1 [display: inline]">최근 추천 요청 건</p>
                      <p tw="font-bold text-blue-1000 [display: inline]">{item.total_suggest_count}</p>
                    </div>
                  </motion.div>
                ))}
              </Carousel>
            </div>
          </div>
        )}
        {Boolean(mostFavoriteList?.length) && (
          <div>
            <Separator tw="bg-gray-300" />
            <div tw="pt-10 pb-6">
              <div tw="px-5 font-bold text-h3">
                <h2>관심 등록 많은 매물</h2>
              </div>
              <div tw="px-5 text-b2 text-gray-700 mt-1">
                <p>네고시오만의 매물정보를 확인해 보세요.</p>
              </div>
              <Carousel
                gap={16}
                trackStyle={{ padding: '16px 20px' }}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                renderLeftButton={carouselType === 'pc' ? renderLeftButton : undefined}
                renderRightButton={carouselType === 'pc' ? renderRightButton : undefined}
              >
                {mostFavoriteList?.map((item) => (
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
                    />
                    <div tw="flex gap-1 mb-2">
                      <Chip variant={RealestateTypeChipVariant[item.realestate_type]}>
                        {RealestateTypeString[item.realestate_type]}
                      </Chip>
                      <Chip variant="gray">{item.eubmyundong}</Chip>
                    </div>
                    <h1 tw="font-bold text-b1">
                      {BuyOrRentString[item.buy_or_rent]} <Numeral koreanNumber>{item.trade_or_deposit_price}</Numeral>
                      {Boolean(item.monthly_rent_fee) && (
                        <span>
                          /<Numeral koreanNumber>{item.monthly_rent_fee}</Numeral>
                        </span>
                      )}
                    </h1>
                    <div tw="text-info text-gray-1000 line-clamp-1">
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          onClickListing?.(item.listing_id);
                        }}
                        href={
                          mobileOrPc === 'pc'
                            ? `/${Routes.ListingDetail}?listingID=${item.listing_id}`
                            : `/${Routes.EntryMobile}/${Routes.ListingDetail}?listingID=${item.listing_id}`
                        }
                        target="_self"
                      >
                        <h1 tw="">{item.listing_title}</h1>
                      </a>
                    </div>

                    <div tw="flex text-info text-gray-700" css={informationStringWrapper}>
                      {item.jeonyong_area && <p>{`전용 ${Math.floor(Number(item.jeonyong_area))}㎡`}</p>}
                      {item.total_floor !== '0' && (
                        <p>
                          {item.floor_description
                            ? `${item.floor_description?.[0]}/${item.total_floor}층`
                            : `${item.total_floor}층`}
                        </p>
                      )}
                      <p>{item.direction}</p>
                    </div>

                    <div tw="flex flex-row gap-1 justify-start items-center pl-0 mt-1">
                      <FavoriteButton
                        defaultSelected={item.is_favorite}
                        onToggle={(selected) => onClickFavoriteButton?.(selected, item.listing_id)}
                      />
                      <p tw="text-info text-gray-700">{item.favorite_count || 0}</p>
                    </div>
                  </motion.div>
                ))}
              </Carousel>
            </div>
          </div>
        )}

        {Boolean(tradeCountList?.length) && (
          <div>
            <Separator tw="bg-gray-300" />
            <div tw="pt-10 pb-6">
              <h2 tw="px-5 font-bold text-h3">{regionName || ''} 월간 거래량 TOP</h2>
              <p tw="px-5 text-b2 text-gray-700 mt-1">최신 관심단지나 우리집 주소 등록 기준으로 지역이 선정됩니다.</p>
              <Carousel
                gap={16}
                trackStyle={{ padding: '16px 20px' }}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                renderLeftButton={carouselType === 'pc' ? renderLeftButton : undefined}
                renderRightButton={carouselType === 'pc' ? renderRightButton : undefined}
              >
                {tradeCountList?.map((item) => (
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                    }}
                    key={`recentRealPrice${item.danji_id}${item.danji_id}${item.realestate_type}`}
                    tw="w-[208px] px-5 pt-3 pb-3 rounded-lg border border-gray-200 hover:border-gray-1000 hover:cursor-pointer overflow-hidden"
                    onClick={() => {
                      if (!isDragging.current) onClickDanji?.(item.danji_id);
                    }}
                  >
                    <div tw="flex gap-1 mb-2">
                      <Chip variant={RealestateTypeChipVariant[item.realestate_type]}>
                        {RealestateTypeString[item.realestate_type]}
                      </Chip>
                      <Chip variant="gray">{item.eubmyundong}</Chip>
                    </div>
                    <div tw="whitespace-nowrap overflow-x-hidden text-ellipsis text-b1 font-bold mb-1">
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          onClickDanji?.(item.danji_id);
                        }}
                        href={
                          mobileOrPc === 'pc'
                            ? `/${Routes.DanjiDetail}?danjiID=${item.danji_id}`
                            : `/${Routes.EntryMobile}/${Routes.DanjiDetail}?danjiID=${item.danji_id}`
                        }
                        target="_self"
                      >
                        <h1>{item.name}</h1>
                      </a>
                    </div>

                    <div tw="flex items-center text-info text-gray-700 whitespace-nowrap">
                      {item.saedae_count && <p>{item.saedae_count}세대</p>}
                      {item.saedae_count && item.dong_count && <span tw="h-2 w-px bg-gray-300 mx-1" />}
                      {item.dong_count && <p>총 {item.dong_count}동</p>}
                    </div>
                    <div tw="flex items-center text-info text-gray-700 whitespace-nowrap">
                      {item.date && <p>{item.date} 준공</p>}
                      {item.date && item.jeonyong_max && item.jeonyong_min && <span tw="h-2 w-px bg-gray-300 mx-1" />}
                      {item.jeonyong_min && item.jeonyong_max && (
                        <p>
                          전용 {item.jeonyong_min}~{item.jeonyong_max}㎡
                        </p>
                      )}
                    </div>
                    <div tw="mt-2">
                      <div tw="flex items-center">
                        <p tw="text-b2 min-w-[36px]">전체</p>
                        <p tw="text-b2 font-bold text-blue-1000">
                          {(item.trade_count || 0) + (item.rent_count || 0)} 건
                        </p>
                      </div>

                      <div tw="flex items-center gap-2 mt-0.5">
                        {typeof item.trade_count === 'number' && (
                          <div tw="flex items-center flex-1">
                            <p tw="text-b2 min-w-[36px]">매매</p>
                            <p tw="text-b2 whitespace-nowrap">{item.trade_count} 건</p>
                          </div>
                        )}

                        {typeof item.rent_count === 'number' && (
                          <div tw="flex items-center flex-1 justify-between">
                            <p tw="text-b2 min-w-[36px]">전월세</p>
                            <p tw="text-b2 whitespace-nowrap">{item.rent_count} 건</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </Carousel>
            </div>
          </div>
        )}

        <Separator tw="bg-gray-300" />
        <div tw="py-10 px-5">
          <div tw="mb-6">
            <div tw="pl-1 text-info leading-4 mb-2">
              <p>우리집 서비스</p>
            </div>
            <div tw="flex gap-3">
              <Button tw="flex-1" variant="outlined" size="bigger" onClick={onClickHomeRegister}>
                <div tw="flex items-center w-full gap-2">
                  <HouseIcon />
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      onClickHomeRegister?.();
                    }}
                    href={mobileOrPc === 'pc' ? `/${Routes.MyAddress}` : `/${Routes.EntryMobile}/${Routes.MyAddress}`}
                    target="_self"
                  >
                    <h2 tw="whitespace-nowrap">집주소 등록</h2>
                  </a>
                  <ChevronLeftIcon tw="text-gray-700 w-4 h-4 ml-auto rotate-180" />
                </div>
              </Button>
              <Button tw="flex-1 [display: none]" variant="outlined" size="bigger" onClick={onClickListingCreate}>
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
                    <Table.Data>SAM LEE</Table.Data>
                  </Table.Row>
                  <Table.Row>
                    <Table.Head>사업자 등록번호</Table.Head>
                    <Table.Data>130-88-02097</Table.Data>
                  </Table.Row>
                  <Table.Row>
                    <Table.Head>통신판매업 신고번호</Table.Head>
                    <Table.Data>2021-서울강남-04487호</Table.Data>
                  </Table.Row>
                  <Table.Row>
                    <Table.Head>주소</Table.Head>
                    <Table.Data>서울시 강남구 선릉로94길 11, 4층(삼성동, 삼성2빌딩) (주)네고시오</Table.Data>
                  </Table.Row>
                  <Table.Row>
                    <Table.Head>이메일</Table.Head>
                    <Table.Data>info@negocio.co.kr</Table.Data>
                  </Table.Row>
                  <Table.Row>
                    <Table.Head>고객센터</Table.Head>
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
