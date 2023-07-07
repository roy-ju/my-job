import { NavigationHeader } from '@/components/molecules';
import { GetLawQnaDetailResponse } from '@/apis/lawQna/getLawQnaDetail';
import { formatCreatedTime } from '@/utils/formatLastMessageTime';
import { useOutsideClick } from '@/hooks/utils';
import { useState, useRef, useCallback } from 'react';
import { usePopper } from 'react-popper';
import TripleDotsIcon from '@/assets/icons/triple_dots_gray.svg';
import Image from 'next/image';
import defaultAvatar from '@/../public/static/images/default_avatar.png';
import { Button, Separator } from '@/components/atoms';
import { styled } from 'twin.macro';
import ShareIcon from '@/assets/icons/share_another.svg';
import ThumbIcon from '@/assets/icons/thumb_big.svg';
import ThumbRedIcon from '@/assets/icons/thumb_big_red.svg';

const ButtomWrraper = styled.div``;

export interface LegalCounselingDetailProps {
  lawQnaDetailData?: GetLawQnaDetailResponse;
  onClickBack?: () => void;
  onClickDetail?: (id?: number) => void;
  onClickLike?: (like?: boolean, qnaId?: number) => Promise<void>;
}

interface MoreButtonProps {
  items: string[];
  onClickItem?: (index: number, item: string) => void;
}

function MoreButton({ items, onClickItem }: MoreButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const outsideRef = useRef<HTMLDivElement | null>(null);
  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-end',
    modifiers: [{ name: 'offset', options: { offset: [0, 8] } }],
  });

  useOutsideClick({ ref: outsideRef, handler: () => setIsOpen(false) });

  const handleMoreButtonClick = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <>
      <button ref={setReferenceElement} type="button" tw="relative h-full ml-2" onClick={handleMoreButtonClick}>
        <TripleDotsIcon />
      </button>
      {isOpen && (
        <div ref={setPopperElement} style={styles.popper} {...attributes.popper} tw="z-[110]">
          <div ref={outsideRef} tw="bg-white [border: 1px solid #212529] rounded-lg py-1 flex flex-col shadow">
            {items.map((item, index) => (
              <button
                key={item}
                type="button"
                tw="[width: 92px] py-3 px-4 text-b2 text-gray-1000 leading-4 [text-align: left] hover:bg-gray-100"
                onClick={() => {
                  onClickItem?.(index, item);
                  setIsOpen(false);
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default function LegalCounselingDetail({
  lawQnaDetailData,
  onClickBack,
  onClickDetail,
  onClickLike,
}: LegalCounselingDetailProps) {
  const headerItems = [
    { label: '수정', onClick: () => {} },
    {
      label: '삭제',
      onClick: () => {},
    },
  ];

  if (!lawQnaDetailData) return null;

  return (
    <div tw="h-full flex flex-col">
      <NavigationHeader>
        {onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}
        <NavigationHeader.Title>부동산 법률 상담</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="flex-1 min-h-0 pt-7">
        <div tw="px-5 pb-10">
          <h1 tw="text-b2 font-bold">
            {lawQnaDetailData.admin_message && <span tw="text-blue">Q.</span>} {lawQnaDetailData.title}
          </h1>

          <div tw="flex items-center mt-2">
            <p tw="text-gray-700 text-info [letter-spacing: -0.4px]">{lawQnaDetailData.user_nickname}</p>
            <p tw="ml-auto text-gray-700 text-info [letter-spacing: -0.4px]">
              {formatCreatedTime(lawQnaDetailData.created_time)}
            </p>
            {lawQnaDetailData.mine && (
              <MoreButton
                onClickItem={(index) => headerItems[index]?.onClick?.()}
                items={headerItems.map((item) => item.label)}
              />
            )}
          </div>

          <div tw="mt-2">
            <p tw="text-info text-gray-700 [text-align: justify]">{lawQnaDetailData.user_message}</p>
          </div>

          {lawQnaDetailData.admin_message && (
            <div tw="px-5 py-4 mt-2 [background-color: #F8F9FA] [border-radius: 8px]">
              <div tw="mb-2 flex items-center">
                <Image
                  tw="rounded-full w-6 h-6 object-cover aspect-square bg-gray-400"
                  src={defaultAvatar}
                  height={24}
                  width={24}
                  alt=""
                />
                <p tw="ml-3 text-b2 font-bold">우성남 변호사님 답변</p>
                <p tw="text-gray-700 text-info ml-auto [letter-spacing: -0.4px]">
                  {formatCreatedTime(lawQnaDetailData.admin_updated_time)}
                </p>
              </div>

              <p tw="text-b2 text-gray-700 [text-align: justify]">
                <span tw="text-blue font-bold">A. </span>
                {lawQnaDetailData.admin_message}
              </p>
            </div>
          )}

          <div tw="w-full pt-4 flex items-center justify-center">
            <Button
              variant="ghost"
              tw="flex gap-2 h-6 p-0"
              onClick={() => {
                onClickLike?.(lawQnaDetailData.liked, lawQnaDetailData.id);
              }}
            >
              {lawQnaDetailData.liked ? <ThumbRedIcon /> : <ThumbIcon />}
              <p tw="text-b2 text-gray-700">도움돼요 {lawQnaDetailData.like_count}</p>
            </Button>
            <div tw="[min-width: 1px] [max-width: 1px] [min-height: 12px] bg-gray-300 mx-4" />
            <Button variant="ghost" tw="flex gap-2 h-6 p-0">
              <ShareIcon />
              <p tw="text-b2 text-gray-700">공유하기</p>
            </Button>
          </div>
        </div>

        <Separator tw="min-h-[8px] min-w-[1px] bg-gray-300" />

        {lawQnaDetailData.prev?.id && (
          <ButtomWrraper
            onClick={() => {
              onClickDetail?.(lawQnaDetailData.prev?.id);
            }}
            style={lawQnaDetailData.prev?.id && lawQnaDetailData.next?.id ? { borderBottom: '1px solid #E9ECEF' } : {}}
            tw="flex gap-3 items-center px-5 py-4 cursor-pointer"
          >
            <span tw="text-info text-gray-700">이전</span>
            <span tw="text-info [max-width: 300px] [text-overflow: ellipsis] overflow-hidden whitespace-nowrap">
              {lawQnaDetailData.prev.title}
            </span>
          </ButtomWrraper>
        )}

        {lawQnaDetailData.next?.id && (
          <ButtomWrraper
            onClick={() => {
              onClickDetail?.(lawQnaDetailData.next?.id);
            }}
            tw="flex gap-3 items-center px-5 py-4 cursor-pointer"
          >
            <span tw="text-info text-gray-700">다음</span>
            <span tw="text-info [max-width: 300px] [text-overflow: ellipsis] overflow-hidden whitespace-nowrap">
              {lawQnaDetailData.next.title}
            </span>
          </ButtomWrraper>
        )}
      </div>
    </div>
  );
}
