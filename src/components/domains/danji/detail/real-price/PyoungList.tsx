import { useMemo, useRef, useState, MouseEvent, TouchEvent, useEffect, memo } from 'react';

import tw from 'twin.macro';

import { Checkbox } from '@/components/atoms';

import { BuyOrRent } from '@/constants/enums';

import { cuttingDot } from '@/utils/fotmat';

import { customAlphabet } from 'nanoid';

import { DanjiRealPricesPyoungListResponse } from '@/services/danji/types';

import {
  Container,
  TitleWrraper,
  AverageText,
  ButtonWrraper,
  IndicatorUi,
  PyoungListButton,
  PyoungListButtonIndicator,
  Wrraper,
  Title,
  BuyUi,
  PyoungListButtonWithJyb,
  PyoungListButtonWithJybIndicator,
  IndicatorWithJybUi,
  GonggeupText,
  ContentsWrraper,
  WolsaeText,
  Seperator,
  ContentText,
} from './widget/PyoungListWidget';

type PyoungListProps = {
  buyOrRent?: number;
  pyoungList?: DanjiRealPricesPyoungListResponse['list'];
  selectedArea?: string;
  selectedJeonyongArea?: string;
  selectedIndex?: number;
  checked?: boolean;
  hasJyb?: boolean;
  onChangeChecked?: () => void;
  onChangeSelectedIndex?: (value: number) => void;
  onChangeSelectedArea?: (value: string) => void;
  onChangeSelectedJeonyongArea?: (valul: string) => void;
  onChangeSelectedJeonyongAreaMin?: (value: string) => void;
  onChangeSelectedJeonyongAreaMax?: (value: string) => void;
};

function PyoungList({
  buyOrRent,
  pyoungList,
  selectedArea,
  selectedJeonyongArea,
  selectedIndex,
  checked,
  hasJyb,
  onChangeChecked,
  onChangeSelectedIndex,
  onChangeSelectedArea,
  onChangeSelectedJeonyongArea,
  onChangeSelectedJeonyongAreaMin,
  onChangeSelectedJeonyongAreaMax,
}: PyoungListProps) {
  const nanoId = customAlphabet('0123456789abcdefghij');
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const refs = useRef<any>([]);

  const [isDrag, setIsDrag] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>();

  const handleClick = (
    value: {
      min_jeonyong: number;
      max_jeonyong: number;
      avg_jeonyong: number;
      gonggeup_pyoung: number;
      saedae_count: number;
    },
    index: number,
  ) => {
    if (
      !onChangeSelectedIndex ||
      !onChangeSelectedArea ||
      !onChangeSelectedJeonyongArea ||
      !onChangeSelectedJeonyongAreaMax ||
      !onChangeSelectedJeonyongAreaMin
    )
      return;
    onChangeSelectedIndex(index);
    onChangeSelectedArea(value.gonggeup_pyoung.toString());
    onChangeSelectedJeonyongArea(value.avg_jeonyong.toString());
    onChangeSelectedJeonyongAreaMin(value.min_jeonyong.toString());
    onChangeSelectedJeonyongAreaMax(value.max_jeonyong.toString());
  };

  const onDragStart = (e: MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;

    e.preventDefault();
    setIsDrag(true);
    setStartX(e.pageX + scrollRef.current.scrollLeft);
  };

  const onDragEnd = () => {
    setIsDrag(false);
  };

  const onDragMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDrag) return;

    if (isDrag && scrollRef.current && startX) {
      const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;

      scrollRef.current.scrollLeft = startX - e.pageX;

      if (scrollLeft === 0) {
        setStartX(e.pageX);
      } else if (scrollWidth <= clientWidth + scrollLeft) {
        setStartX(e.pageX + scrollLeft);
      }
    }
  };

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;

    e.preventDefault();
    setIsDrag(true);
    setStartX(e.touches[0].pageX + scrollRef.current.scrollLeft);
  };

  const onTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!isDrag) return;

    if (isDrag && scrollRef.current && startX) {
      const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;

      scrollRef.current.scrollLeft = startX - e.touches[0].pageX;

      if (scrollLeft === 0) {
        setStartX(e.touches[0].pageX);
      } else if (scrollWidth <= clientWidth + scrollLeft) {
        setStartX(e.touches[0].pageX + scrollLeft);
      }
    }
  };

  const onTouchEnd = () => {
    setIsDrag(false);
  };

  const isShowWolsaeText = useMemo(() => {
    if (buyOrRent === BuyOrRent.Wolsae || buyOrRent === BuyOrRent.Jeonsae) {
      return true;
    }

    return false;
  }, [buyOrRent]);

  useEffect(() => {
    if (typeof selectedIndex === 'number' && selectedIndex >= 0) {
      const selectedElement = refs.current[selectedIndex];

      if (scrollRef.current && selectedElement) {
        const { offsetLeft } = scrollRef.current;
        const { offsetLeft: childOffsetLeft, offsetWidth } = selectedElement;

        const scrollLeft = childOffsetLeft - offsetLeft - scrollRef.current.offsetWidth / 2 + offsetWidth / 2;

        scrollRef.current.scrollTo({
          left: scrollLeft,
          behavior: 'smooth',
        });
      }
    }
  }, [selectedIndex]);

  const selectedPyoung = useMemo(() => {
    // 전유부 존재할때
    if (hasJyb && pyoungList) {
      const pyoung = pyoungList.find(
        (ele) => selectedArea?.toString() === ele.gonggeup_pyoung.toString(),
      )?.gonggeup_pyoung;

      return typeof pyoung === 'number' ? (pyoung === 0 ? (1 * 3.3058).toFixed(0) : (pyoung * 3.3058).toFixed(0)) : '-';
    }

    return '-';
  }, [pyoungList, hasJyb, selectedArea]);

  if (!pyoungList) return null;

  return pyoungList?.length > 0 ? (
    <Container>
      <TitleWrraper>
        <Title>평형별 실거래 내역</Title>
        {buyOrRent === BuyOrRent.Buy && (
          <BuyUi>
            <Checkbox onChange={onChangeChecked} checked={checked || false} />
            <span tw="text-b2 [line-height: 16px]">직거래 제외</span>
          </BuyUi>
        )}
      </TitleWrraper>

      <Wrraper
        ref={scrollRef}
        onMouseDown={onDragStart}
        onMouseMove={onDragMove}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {pyoungList.map((item, index) => {
          if (!hasJyb) {
            return (
              <ButtonWrraper key={item.avg_jeonyong}>
                <PyoungListButton
                  ref={(element) => {
                    refs.current[index] = element;
                  }}
                  variant="ghost"
                  value={item.avg_jeonyong.toString()}
                  onClick={() => {
                    handleClick(item, index);
                  }}
                >
                  {item.avg_jeonyong.toString() === selectedJeonyongArea?.toString() && (
                    <PyoungListButtonIndicator layoutId={`danji-indicator-${nanoId()}`}>
                      <IndicatorUi />
                    </PyoungListButtonIndicator>
                  )}
                  <AverageText
                    css={[
                      item.avg_jeonyong.toString() === selectedJeonyongArea?.toString() && tw`font-bold text-gray-1000`,
                    ]}
                  >
                    전용 {item.avg_jeonyong}㎡
                  </AverageText>
                </PyoungListButton>
              </ButtonWrraper>
            );
          }

          return (
            <ButtonWrraper key={item.gonggeup_pyoung}>
              <PyoungListButtonWithJyb
                ref={(element) => {
                  refs.current[index] = element;
                }}
                variant="ghost"
                value={item.gonggeup_pyoung.toString()}
                onClick={() => {
                  handleClick(item, index);
                }}
              >
                {item.gonggeup_pyoung.toString() === selectedArea?.toString() && (
                  <PyoungListButtonWithJybIndicator layoutId={`danji-indicator-${nanoId()}`}>
                    <IndicatorWithJybUi />
                  </PyoungListButtonWithJybIndicator>
                )}
                <GonggeupText
                  css={[item.gonggeup_pyoung.toString() === selectedArea?.toString() && tw`font-bold text-gray-1000`]}
                >
                  공급 {item.gonggeup_pyoung === 0 ? '1' : item.gonggeup_pyoung}평
                </GonggeupText>
              </PyoungListButtonWithJyb>
            </ButtonWrraper>
          );
        })}
      </Wrraper>

      {hasJyb && (
        <ContentsWrraper>
          <ContentText tw="whitespace-nowrap">{`공급 ${selectedPyoung}㎡`}</ContentText>
          <Seperator />
          <ContentText>
            {cuttingDot(
              pyoungList.find((ele) => selectedArea?.toString() === ele.gonggeup_pyoung.toString())?.min_jeonyong,
            ) ===
            cuttingDot(
              pyoungList.find((ele) => selectedArea?.toString() === ele.gonggeup_pyoung.toString())?.max_jeonyong,
            )
              ? `전용 ${cuttingDot(
                  pyoungList.find((ele) => selectedArea?.toString() === ele.gonggeup_pyoung.toString())?.min_jeonyong,
                )}㎡`
              : `전용 ${cuttingDot(
                  pyoungList.find((ele) => selectedArea?.toString() === ele.gonggeup_pyoung.toString())?.min_jeonyong,
                )}㎡ ~ ${cuttingDot(
                  pyoungList.find((ele) => selectedArea?.toString() === ele.gonggeup_pyoung.toString())?.max_jeonyong,
                )}㎡`}
          </ContentText>
          <Seperator />
          <ContentText tw="whitespace-nowrap">
            {`${
              pyoungList.find((ele) => selectedArea?.toString() === ele.gonggeup_pyoung.toString())?.saedae_count || '-'
            }세대
            `}
          </ContentText>
        </ContentsWrraper>
      )}

      {!hasJyb && (
        <ContentsWrraper>
          <ContentText>
            {cuttingDot(
              pyoungList.find((ele) => selectedJeonyongArea?.toString() === ele.avg_jeonyong.toString())?.min_jeonyong,
            ) ===
            cuttingDot(
              pyoungList.find((ele) => selectedJeonyongArea?.toString() === ele.avg_jeonyong.toString())?.max_jeonyong,
            )
              ? `전용 ${cuttingDot(
                  pyoungList.find((ele) => selectedJeonyongArea?.toString() === ele.avg_jeonyong.toString())
                    ?.min_jeonyong,
                )}㎡`
              : `전용 ${cuttingDot(
                  pyoungList.find((ele) => selectedJeonyongArea?.toString() === ele.avg_jeonyong.toString())
                    ?.min_jeonyong,
                )}㎡ ~ ${cuttingDot(
                  pyoungList.find((ele) => selectedJeonyongArea?.toString() === ele.avg_jeonyong.toString())
                    ?.max_jeonyong,
                )}㎡`}
          </ContentText>
          <Seperator />
          <ContentText tw="whitespace-nowrap">- 세대</ContentText>
        </ContentsWrraper>
      )}

      {isShowWolsaeText && <WolsaeText>월세는 환산보증금으로 표시됩니다.</WolsaeText>}
    </Container>
  ) : null;
}

export default memo(PyoungList);
