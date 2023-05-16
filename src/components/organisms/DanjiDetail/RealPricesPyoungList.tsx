import { GetDanjiRealPricesPyoungListResponse } from '@/apis/danji/danjiRealPricesPyoungList';
import { Button, Checkbox } from '@/components/atoms';
import { BuyOrRent } from '@/constants/enums';
import { cuttingDot } from '@/utils/fotmat';
import { motion } from 'framer-motion';
import { useMemo, useRef, useState, MouseEvent, TouchEvent, useEffect } from 'react';
import { Wrraper } from './ButtonWrraper';

export default function RealPricesPyoungList({
  buyOrRent,
  danjiRealPricesPyoungList,
  selectedArea,
  selectedIndex,
  checked,
  onChangeChecked,
  onChangeSelectedIndex,
  onChangeSelectedArea,
  onChangeSelectedJeonyongArea,
  onChangeSelectedJeonyongAreaMax,
}: {
  buyOrRent?: number;
  danjiRealPricesPyoungList?: GetDanjiRealPricesPyoungListResponse['list'];
  selectedArea?: string;
  selectedIndex?: number;
  checked?: boolean;
  onChangeChecked?: () => void;
  onChangeSelectedIndex?: (value: number) => void;
  onChangeSelectedArea?: (value: string) => void;
  onChangeSelectedJeonyongArea?: (valul: string) => void;
  onChangeSelectedJeonyongAreaMax?: (value: string) => void;
}) {
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
      !onChangeSelectedJeonyongAreaMax
    )
      return;

    onChangeSelectedIndex(index);
    onChangeSelectedArea(value.gonggeup_pyoung.toString());
    onChangeSelectedJeonyongArea(value.min_jeonyong.toString());
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

  if (!danjiRealPricesPyoungList) return null;

  return danjiRealPricesPyoungList?.length > 0 ? (
    <div tw="px-5 mt-10">
      <div tw="flex items-center justify-between mb-3">
        <span tw="text-b1 font-bold [line-height: 1.25rem] [letter-spacing: -0.4px]">평형별 실거래 내역</span>
        {buyOrRent === BuyOrRent.Buy && (
          <div tw="flex items-center gap-2">
            <Checkbox onChange={onChangeChecked} checked={checked || false} />
            <span tw="text-b2 [line-height: 16px]">직거래 제외</span>
          </div>
        )}
      </div>
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
        {danjiRealPricesPyoungList.map((item, index) => (
          <div key={item.avg_jeonyong}>
            {item.gonggeup_pyoung.toString() === selectedArea?.toString() ? (
              <Button
                ref={(element) => {
                  refs.current[index] = element;
                }}
                variant="ghost"
                tw="relative z-20 [min-width: 4.375rem] h-9 font-bold text-gray-1000 whitespace-nowrap shadow-[0px_6px_12px_rgba(0,0,0,0.08)]"
                value={item.gonggeup_pyoung.toString()}
                onClick={() => {
                  handleClick(item, index);
                }}
              >
                <motion.div layoutId="danji-indicator" tw="absolute top-0 left-0 pointer-events-none z-10">
                  <div tw="w-full h-full [min-width: 4.375rem] [min-height: 36px] bg-white rounded-lg shadow-[0px_6px_12px_rgba(0,0,0,0.08)] flex justify-center items-center">
                    {item.gonggeup_pyoung}평
                  </div>
                </motion.div>
              </Button>
            ) : (
              <Button
                ref={(element) => {
                  refs.current[index] = element;
                }}
                variant="ghost"
                tw="relative z-20 [min-width: 4.375rem] h-9 text-gray-700 whitespace-nowrap"
                value={item.gonggeup_pyoung.toString()}
                onClick={() => {
                  handleClick(item, index);
                }}
              >
                {item.gonggeup_pyoung}평
              </Button>
            )}
          </div>
        ))}
      </Wrraper>
      <div tw="flex justify-center items-center gap-2 bg-gray-100 mt-4 py-[9px] [border-radius: 0.5rem]">
        <span tw="text-info text-gray-700 [line-height: 0.875rem] [letter-spacing: -0.4px]">
          {`공급 ${
            danjiRealPricesPyoungList.find((ele) => selectedArea?.toString() === ele.gonggeup_pyoung.toString())
              ?.gonggeup_pyoung || '-'
          }평`}
        </span>
        <div tw="w-px h-2 bg-gray-300" />
        <span tw="text-info text-gray-700 [line-height: 0.875rem] [letter-spacing: -0.4px]">
          {cuttingDot(
            danjiRealPricesPyoungList.find((ele) => selectedArea?.toString() === ele.gonggeup_pyoung.toString())
              ?.min_jeonyong,
          ) ===
          cuttingDot(
            danjiRealPricesPyoungList.find((ele) => selectedArea?.toString() === ele.gonggeup_pyoung.toString())
              ?.max_jeonyong,
          )
            ? `전용 ${cuttingDot(
                danjiRealPricesPyoungList.find((ele) => selectedArea?.toString() === ele.gonggeup_pyoung.toString())
                  ?.min_jeonyong,
              )}㎡`
            : `전용 ${cuttingDot(
                danjiRealPricesPyoungList.find((ele) => selectedArea?.toString() === ele.gonggeup_pyoung.toString())
                  ?.min_jeonyong,
              )}㎡ ~ ${cuttingDot(
                danjiRealPricesPyoungList.find((ele) => selectedArea?.toString() === ele.gonggeup_pyoung.toString())
                  ?.max_jeonyong,
              )}㎡`}
        </span>
        <div tw="w-px h-2 bg-gray-300" />
        <span tw="text-info text-gray-700 [line-height: 0.875rem] [letter-spacing: -0.4px]">
          {`${
            danjiRealPricesPyoungList.find((ele) => selectedArea?.toString() === ele.gonggeup_pyoung.toString())
              ?.saedae_count || '-'
          }세대
            `}
        </span>
      </div>

      {isShowWolsaeText && (
        <span tw="mt-3 text-gray-700 [font-size: 10px] [line-height: 1]">월세는 환산보증금으로 표시됩니다.</span>
      )}
    </div>
  ) : null;
}
