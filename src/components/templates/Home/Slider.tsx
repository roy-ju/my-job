import ArrowIcon from '@/assets/icons/chevron_left_24.svg';
import React, { useLayoutEffect, useRef, useState } from 'react';

export interface SliderProps {
  children?: React.ReactNode;
  slideWidth?: number;
  panelWidth?: number;
  length?: number;
}

export default function Slider({ children, slideWidth = 380, panelWidth = 380, length = 0 }: SliderProps) {
  const [sliderIndex, setSliderIndex] = useState(0);
  const [isLastSlide, setIsLastSlide] = useState(false);
  const [clickedButton, setClickedButton] = useState<'left' | 'right'>();

  const startIndex = length;
  const lastIndex = length + length - 1;

  const sliderRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (sliderRef.current === null) return;
    sliderRef.current.style.transitionDuration = '150ms';
    if (!isLastSlide) {
      return;
    }
    let timer: number;

    function lastSlideHandler() {
      return new Promise((resolve) => {
        timer = window.setTimeout(resolve, 150);
      });
    }
    lastSlideHandler().then(() => {
      if (sliderRef.current === null) return;
      sliderRef.current.style.transitionDuration = '0ms';

      if (clickedButton === 'left') {
        sliderRef.current.style.transform = `translateX(-${lastIndex * slideWidth}px)`;
        setSliderIndex(lastIndex);
      }
      if (clickedButton === 'right') {
        sliderRef.current.style.transform = `translateX(-${startIndex * slideWidth}px)`;
        setSliderIndex(startIndex);
      }
    });

    return () => clearTimeout(timer);
  }, [isLastSlide, slideWidth, startIndex, lastIndex, clickedButton]);

  /* set position in first-render */
  useLayoutEffect(() => {
    if (sliderRef.current === null) return;
    if (!clickedButton) {
      sliderRef.current.style.transitionDuration = '0ms';
      setSliderIndex(startIndex);
    }
  }, [startIndex, clickedButton]);

  /* slide handler */
  const handleClickSlideToPrev = () => {
    setClickedButton('left');
    setIsLastSlide(false);
    setSliderIndex((prevIndex) => {
      if (prevIndex === startIndex) {
        setIsLastSlide(true);
        return prevIndex - 1;
      }
      return prevIndex - 1;
    });
  };

  const handleClickSlideToNext = () => {
    setClickedButton('right');
    setIsLastSlide(false);
    setSliderIndex((prevIndex) => {
      if (prevIndex === lastIndex) {
        setIsLastSlide(true);

        return prevIndex + 1;
      }
      return prevIndex + 1;
    });
  };

  return (
    <div tw="relative flex" style={{ width: panelWidth }}>
      <div
        ref={sliderRef}
        tw="shrink-0 transition-transform"
        style={{
          transform: `translateX(-${sliderIndex * slideWidth}px)`,
        }}
      >
        {children}
      </div>
      {length > 1 && (
        <>
          <button
            tw="shadow bg-white py-1 px-2 absolute border border-l-0 rounded-r-full border-gray-300 left-0 top-1/2 -translate-y-1/2 transition-all hover:bg-gray-100 hover:scale-105"
            type="button"
            onClick={handleClickSlideToPrev}
          >
            <ArrowIcon />
          </button>
          <button
            tw="shadow bg-white py-1 px-2 absolute right-0 border border-r-0 rounded-l-full top-1/2  border-gray-300 -translate-y-1/2 transition-all hover:bg-gray-100 hover:scale-105"
            type="button"
            onClick={handleClickSlideToNext}
          >
            <ArrowIcon tw="rotate-180" />
          </button>
        </>
      )}
    </div>
  );
}
