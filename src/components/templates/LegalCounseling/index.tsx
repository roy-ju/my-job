import { NavigationHeader } from '@/components/molecules';

import SearchBlackIcon from '@/assets/icons/search_black_24px.svg';
import { ILawQnaListItem } from '@/apis/lawQna/getLawQna';
import { Button, InfiniteScroll } from '@/components/atoms';
import Plus16 from '@/assets/icons/plus_16px.svg';
import { useLayoutEffect, useRef, useState } from 'react';
import { useScroll } from '@/hooks/utils';
import { useRouter as useNextRouter } from 'next/router';
import { formatCreatedTime } from '@/utils/formatLastMessageTime';
import { getDevice } from '@/utils/misc';
import { LegalPageBanner } from '../Home/Components/Banner';
import { LegalContent } from './Components/LegalContent';

export default function LegalCounseling({
  qnaLawData,
  onClickBack,
  onClickHome,
  onNext,
  onClickLike,
  onClickSearchPage,
  onClickQnaDetail,
  onClickWritingPage,
  onClickAllPage,
}: {
  qnaLawData: ILawQnaListItem[];
  onClickBack?: () => void;
  onClickHome?: () => void;
  onNext?: () => void;
  onClickLike?: (like?: boolean, qnaId?: number) => Promise<void>;
  onClickSearchPage?: () => void;
  onClickQnaDetail?: (id?: number) => void;
  onClickWritingPage?: () => void;
  onClickAllPage?: () => void;
}) {
  const nextRouter = useNextRouter();

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

  return (
    <div tw="flex flex-col h-full">
      {onClickBack ? (
        <NavigationHeader tw="relative">
          <NavigationHeader.BackButton onClick={onClickBack} title="서비스 홈" />
          <NavigationHeader.Title tw="absolute [left: 38%] text-center">부동산 법률 상담</NavigationHeader.Title>
          <Button variant="ghost" tw="absolute right-4 p-0" onClick={onClickSearchPage}>
            <SearchBlackIcon />
          </Button>
        </NavigationHeader>
      ) : (
        <NavigationHeader>
          <NavigationHeader.Title tw="text-center">부동산 법률 상담</NavigationHeader.Title>
          <Button variant="ghost" tw="p-0" onClick={onClickSearchPage}>
            <SearchBlackIcon />
          </Button>
        </NavigationHeader>
      )}

      <div tw="flex-1 min-h-0 overflow-auto" ref={scrollContainer}>
        <div tw="bg-white px-5 pt-7">
          <LegalPageBanner handleClickHome={onClickHome} />
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
            (nextRouter?.query?.search ? (
              <>
                <p tw="text-info mt-5 [padding-top: 115px] [padding-bottom: 16px] px-5 text-center text-gray-700 [min-height: 0]">
                  {`'${nextRouter.query.search}' 에 대한 검색결과`}
                  <br />가 없습니다.
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

        {isButtonChange ? (
          isMobile ? (
            <Button
              variant="secondary"
              onClick={() => onClickWritingPage?.()}
              tw="[width: 32px] [height: 32px] [border-radius: 50%] flex justify-center items-center [position: fixed] [bottom: 16px] [right: 16px] p-0"
            >
              <Plus16 />
            </Button>
          ) : (
            <Button
              variant="secondary"
              onClick={() => onClickWritingPage?.()}
              tw="[width: 32px] [height: 32px] [border-radius: 50%] flex justify-center items-center [position: fixed] [bottom: 16px] [left: 400px] p-0"
            >
              <Plus16 />
            </Button>
          )
        ) : isMobile ? (
          <Button
            variant="secondary"
            onClick={() => onClickWritingPage?.()}
            tw="[max-width: 90px] [border-radius: 30px] flex gap-1 items-center [position: fixed] [bottom: 16px] [right: 16px]"
          >
            <Plus16 />
            <span tw="[min-width: 41px] text-b1 font-bold [letter-spacing: -0.25px]">글쓰기</span>
          </Button>
        ) : (
          <Button
            variant="secondary"
            onClick={() => onClickWritingPage?.()}
            tw="[max-width: 90px] [border-radius: 30px] flex gap-1 items-center [position: fixed] [bottom: 16px] [left: 340px]"
          >
            <Plus16 />
            <span tw="[min-width: 41px] text-b1 font-bold [letter-spacing: -0.25px]">글쓰기</span>
          </Button>
        )}
      </div>
    </div>
  );
}
