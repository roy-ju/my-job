/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { useRouter as useNextRouter } from 'next/router';

import { Button, InfiniteScroll } from '@/components/atoms';

import { NavigationHeader } from '@/components/molecules';

import { ILawQnaListItem } from '@/apis/lawQna/getLawQna';

import useScroll from '@/hooks/useScroll';

import { formatCreatedTime } from '@/utils/formatsTime';

import { getDevice } from '@/utils/misc';

import Plus16 from '@/assets/icons/plus_16px.svg';

import DeleteAllIcon from '@/assets/icons/delete_all.svg';

import SearchBlackIcon from '@/assets/icons/search.svg';

import { LegalContent } from './Components/LegalContent';

import Banner from './Components/Banner';

export default function LegalCounseling({
  isLoading,
  qnaLawData,
  onClickBack,
  onClickHome,
  onNext,
  onClickLike,
  onClickSearchPage,
  onClickQnaDetail,
  onClickCreate,
  onClickAllPage,
}: {
  isLoading: boolean;
  qnaLawData: ILawQnaListItem[];
  onClickBack?: () => void;
  onClickHome?: () => void;
  onNext?: () => void;
  onClickLike?: (like?: boolean, qnaId?: number) => Promise<void>;
  onClickSearchPage?: () => void;
  onClickQnaDetail?: (id?: number) => void;
  onClickCreate?: () => void;
  onClickAllPage?: () => void;
}) {
  const nextRouter = useNextRouter();

  const [render, setRender] = useState(false);

  const [isButtonChange, setIsButtonChange] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  const scrollContainer = useRef<HTMLDivElement | null>(null);

  useScroll(scrollContainer, ({ scrollY }) => {
    setIsButtonChange(scrollY > 0);
  });

  useLayoutEffect(() => {
    if (getDevice() === 'Mobile') {
      setIsMobile(true);
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRender(true);
    }, 600);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div tw="flex flex-col h-full">
      {onClickBack ? (
        <NavigationHeader tw="relative">
          {nextRouter?.query?.q ? (
            <>
              <NavigationHeader.BackButton onClick={onClickBack} />
              <NavigationHeader.Title tw="pr-0">
                <div
                  tw="flex items-center px-3 py-2 [line-height: 1] [border: 1px solid #E9ECEF] [border-radius: 8px] w-full"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onClickSearchPage?.();
                  }}
                >
                  <SearchBlackIcon style={{ marginRight: '8px' }} />
                  <span tw="[text-overflow: ellipsis] overflow-hidden whitespace-nowrap text-body_02">
                    {nextRouter.query.q as string}
                  </span>
                  <Button
                    variant="ghost"
                    tw="ml-auto p-0 pl-2 [height: 16px]"
                    onClick={(e) => {
                      e?.preventDefault();
                      e?.stopPropagation();
                      onClickAllPage?.();
                    }}
                  >
                    <DeleteAllIcon />
                  </Button>
                </div>
              </NavigationHeader.Title>
            </>
          ) : (
            <>
              <NavigationHeader.BackButton onClick={onClickBack} />
              <NavigationHeader.Title>부동산 법률 상담</NavigationHeader.Title>
              <Button variant="ghost" tw="absolute right-4 p-0" onClick={onClickSearchPage}>
                <SearchBlackIcon />
              </Button>
            </>
          )}
        </NavigationHeader>
      ) : (
        <NavigationHeader>
          <NavigationHeader.Title>부동산 법률 상담</NavigationHeader.Title>
          <Button variant="ghost" tw="p-0" onClick={onClickSearchPage}>
            {nextRouter?.query?.q ? (
              <SearchBlackIcon style={{ width: '24px', height: '24px', color: '#7048E8' }} />
            ) : (
              <SearchBlackIcon style={{ width: '24px', height: '24px', color: '#343A40' }} />
            )}
          </Button>
        </NavigationHeader>
      )}

      <div tw="flex-1 min-h-0 overflow-auto" ref={scrollContainer}>
        <div tw="bg-white px-5 pt-7">
          <Banner handleClickHome={onClickHome} />
        </div>

        <div tw="bg-white">
          {qnaLawData && qnaLawData.length > 0 && (
            <InfiniteScroll onNext={qnaLawData.length >= 10 ? onNext : undefined}>
              {qnaLawData.map((item) => (
                <LegalContent
                  key={item.id}
                  isMine={item.mine}
                  qnaId={item.id}
                  status={item.status_text}
                  mainText={item.title}
                  subText={item.user_message}
                  likeCount={item.like_count}
                  viewCount={item.view_count}
                  isLike={!!item.liked}
                  createdTime={formatCreatedTime(item.created_time)}
                  onClickLike={onClickLike}
                  onClickQnaDetail={onClickQnaDetail}
                />
              ))}
            </InfiniteScroll>
          )}

          {(!qnaLawData || qnaLawData.length === 0) &&
            (nextRouter?.query?.q ? (
              <>
                <p tw="text-info mt-5 [padding-top: 115px] [padding-bottom: 16px] px-5 text-center text-gray-700 [min-height: 0]">
                  <span tw="text-nego-800 font-bold">{`'${nextRouter.query.q}'`}</span> 에 대한 검색결과가 없습니다.
                </p>
                <Button variant="secondary" size="small" tw="mx-auto" onClick={onClickAllPage}>
                  전체보기
                </Button>
              </>
            ) : (
              <p tw="text-info mt-5 [padding-top: 115px] [padding-bottom: 107px] px-5 text-center text-gray-700 [min-height: 262px]">
                부동산 거래중 궁금한 내용을 작성하시면,
                <br />
                변호사가 직접 답변해 드려요.
              </p>
            ))}
        </div>

        {render ? (
          isButtonChange ? (
            isMobile ? (
              <Button
                variant="secondary"
                onClick={() => onClickCreate?.()}
                tw="[width: 32px] [height: 32px] [border-radius: 50%] flex justify-center items-center [position: fixed] [bottom: 16px] [right: 16px] p-0"
              >
                <Plus16 />
              </Button>
            ) : (
              <Button
                variant="secondary"
                onClick={() => onClickCreate?.()}
                tw="[width: 32px] [height: 32px] [border-radius: 50%] flex justify-center items-center [position: fixed] [bottom: 16px] [left: 400px] p-0"
              >
                <Plus16 />
              </Button>
            )
          ) : isMobile ? (
            <Button
              variant="secondary"
              onClick={() => onClickCreate?.()}
              tw="[max-width: 104px] [border-radius: 30px] flex gap-1 items-center [position: fixed] [bottom: 16px] [right: 16px]"
            >
              <Plus16 />
              <span tw="[min-width: 55px] text-b1 font-bold [letter-spacing: -0.25px]">질문하기</span>
            </Button>
          ) : (
            <Button
              variant="secondary"
              onClick={() => onClickCreate?.()}
              tw="[max-width: 104px] [border-radius: 30px] flex gap-1 items-center [position: fixed] [bottom: 16px] [left: 326px]"
            >
              <Plus16 />
              <span tw="[min-width: 55px] text-b1 font-bold [letter-spacing: -0.25px]">질문하기</span>
            </Button>
          )
        ) : null}
      </div>
    </div>
  );
}
