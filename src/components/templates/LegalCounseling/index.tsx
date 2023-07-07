import { NavigationHeader } from '@/components/molecules';

import SearchBlackIcon from '@/assets/icons/search_black_24px.svg';
import { ILawQnaListItem } from '@/apis/lawQna/getLawQna';
import { Button, InfiniteScroll } from '@/components/atoms';
import Plus16 from '@/assets/icons/plus_16px.svg';
import { useRef, useState } from 'react';
import { useScroll } from '@/hooks/utils';
import { useRouter as useNextRouter } from 'next/router';
import Routes from '@/router/routes';
import { LegalPageBanner } from '../Home/Components/Banner';
import { LegalContent } from './Components/LegalContent';

export default function LeagalCounseling({
  qnaLawData,
  onClickBack,
  onClickHome,
  onNext,
  onClickLike,
  onClickSearchPage,
}: {
  qnaLawData: ILawQnaListItem[];
  onClickBack?: () => void;
  onClickHome?: () => void;
  onNext?: () => void;
  onClickLike?: (like?: boolean, qnaId?: number) => Promise<void>;
  onClickSearchPage?: () => void;
}) {
  const nextRouter = useNextRouter();

  const [isButtonChange, setIsButtonChange] = useState(false);

  const scrollContainer = useRef<HTMLDivElement | null>(null);

  useScroll(scrollContainer, ({ scrollY }) => {
    setIsButtonChange(scrollY > 0);
  });

  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        {onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}
        <NavigationHeader.Title>부동산 법률 상담</NavigationHeader.Title>
        <Button variant="ghost" tw="p-0" onClick={onClickSearchPage}>
          <SearchBlackIcon />
        </Button>
      </NavigationHeader>

      <div tw="flex-1 min-h-0 overflow-auto" ref={scrollContainer}>
        <div tw="px-5 bg-white pt-7">
          <LegalPageBanner handleClickHome={onClickHome} />
        </div>

        <div tw="bg-white">
          {qnaLawData && qnaLawData.length > 0 && (
            <InfiniteScroll onNext={onNext}>
              {qnaLawData.map((item) => (
                <LegalContent
                  key={item.id}
                  qnaId={item.id}
                  status={item.status_text}
                  mainText={item.title}
                  subText={item.user_message}
                  likeCount={item.like_count}
                  viewCount={item.view_count}
                  isLike={!!item.liked}
                  createdTime="4일 전"
                  onClickLike={onClickLike}
                />
              ))}
            </InfiniteScroll>
          )}

          {(!qnaLawData || qnaLawData.length === 0) &&
            (nextRouter?.query?.search ? (
              <>
                <p tw="text-b1 mt-5 [padding-top: 107px] [padding-bottom: 16px] px-5 text-center [min-height: 0]">
                  {`'${nextRouter.query.search}' 에 대한 검색결과`}
                  <br />가 없습니다.
                </p>
                <Button
                  variant="secondary"
                  size="small"
                  tw="mx-auto"
                  onClick={() => {
                    nextRouter.replace(`/${Routes.LawQna}`);
                  }}
                >
                  전체보기
                </Button>
              </>
            ) : (
              <p tw="text-b1 mt-5 [padding-top: 107px] [padding-bottom: 107px] px-5 text-center [min-height: 262px]">
                부동산 거래중 궁금한 내용을 작성하시면,
                <br />
                변호사가 직접 답변해 드려요.
              </p>
            ))}
        </div>

        {isButtonChange ? (
          <Button
            variant="secondary"
            tw="[width: 32px] [height: 32px] [border-radius: 50%] flex justify-center items-center [position: fixed] [bottom: 16px] [left: 400px] p-0"
          >
            <Plus16 />
          </Button>
        ) : (
          <Button
            variant="secondary"
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
