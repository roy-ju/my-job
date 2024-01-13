import React, { useCallback, useState } from 'react';

import { AnimatePresence } from 'framer-motion';

import { v4 as uuidv4 } from 'uuid';

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

import useControlled from '@/hooks/useControlled';

import CarouselItem from './Item';

import Button from './Button';

import Indicator from './Indicator';

import AgentCardItem from '../AgentCardItem';

export interface ListProps {
  index?: number;
  onChangeIndex?: (index: number) => void;
  data: {
    officeName: string;
    profileImageFullPath: string;
    name: string;
    officePhone: string;
    fullJibunAddress: string;
    registrationNumber: string;
    description: string;
  }[];
}

export default function List({ index: i, onChangeIndex, data }: ListProps) {
  const [currentIndex, setCurrentIndex] = useControlled({
    controlled: i,
    default: 0,
  });
  const [showItem, setShowItem] = useState(true);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('left');

  const handleChangeIndex = useCallback(
    (value: number) => {
      setCurrentIndex(value);
      onChangeIndex?.(value);
    },
    [onChangeIndex, setCurrentIndex],
  );

  const handlePrevClick = () => {
    // setCurrentIndex((prev) => (currentIndex === 0 ? data.length - 1 : prev - 1));
    handleChangeIndex(currentIndex === 0 ? data.length - 1 : currentIndex - 1);
    setSlideDirection('left');
  };

  const handleNextClick = () => {
    // setCurrentIndex((prev) => (currentIndex === data.length - 1 ? 0 : prev + 1));
    handleChangeIndex(currentIndex === data.length - 1 ? 0 : currentIndex + 1);
    setSlideDirection('right');
  };

  const handleIndicator = (e: React.MouseEventHandler<HTMLButtonElement>, index: number) => () => {
    setCurrentIndex(index);
    if (currentIndex > index) {
      setSlideDirection('left');
    } else {
      setSlideDirection('right');
    }
  };

  useIsomorphicLayoutEffect(() => {
    const timer = setTimeout(() => {
      setShowItem(true);
    }, 1);

    return () => {
      setShowItem(false);
      clearTimeout(timer);
    };
  }, [currentIndex]);

  return (
    <AnimatePresence initial={false}>
      {showItem ? (
        <div tw="relative">
          <CarouselItem key={uuidv4()} slideDirection={slideDirection}>
            <AgentCardItem defaultExpanded>
              <AgentCardItem.Profile
                officeName={data[currentIndex].officeName}
                profileImageFullPath={data[currentIndex].profileImageFullPath}
                name={data[currentIndex].name}
              />
              <AgentCardItem.Detail
                officePhone={data[currentIndex].officePhone}
                fullJibunAddress={data[currentIndex].fullJibunAddress}
                registrationNumber={data[currentIndex].registrationNumber}
                description={data[currentIndex].description}
              />
            </AgentCardItem>
          </CarouselItem>

          <Button
            onClick={handlePrevClick}
            direction="left"
            tw="absolute top-1/2 left-[1.65rem] -translate-x-1/2 -translate-y-1/2"
          />
          <Button
            onClick={handleNextClick}
            direction="right"
            tw="absolute top-1/2 right-[1.65rem] translate-x-1/2 -translate-y-1/2"
          />
          <Indicator dataLength={data.length} currentIndex={currentIndex} handleIndicator={handleIndicator} />
        </div>
      ) : null}
    </AnimatePresence>
  );
}
