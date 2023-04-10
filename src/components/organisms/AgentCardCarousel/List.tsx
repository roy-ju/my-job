import { AnimatePresence } from 'framer-motion';
import React, { useLayoutEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AgentCardItem } from '@/components/organisms';
import CarouselItem from './Item';
import Button from './Button';
import Indicator from './Indicator';

export interface ListProps {
  data: {
    officeName: string;
    profileImageFullPath: string;
    name: string;
    cellPhone: string;
    fullJibunAddress: string;
    registrationNumber: string;
    description: string;
  }[];
}

export default function List({ data }: ListProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showItem, setShowItem] = useState(true);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('left');

  const handlePrevClick = () => {
    setCurrentIndex((prev) => (currentIndex === 0 ? data.length - 1 : prev - 1));
    setSlideDirection('left');
  };
  const handleNextClick = () => {
    setCurrentIndex((prev) => (currentIndex === data.length - 1 ? 0 : prev + 1));
    setSlideDirection('right');
  };

  useLayoutEffect(() => {
    setShowItem(false);
    const timer = setTimeout(() => {
      setShowItem(true);
    }, 1);

    return () => {
      setShowItem(false);
      clearTimeout(timer);
    };
  }, [currentIndex]);

  return (
    <>
      {showItem ? (
        <div tw="relative">
          <AnimatePresence>
            <CarouselItem key={uuidv4()} slideDirection={slideDirection}>
              <AgentCardItem defaultExpanded>
                <AgentCardItem.Profile
                  officeName={data[currentIndex].officeName}
                  profileImageFullPath={data[currentIndex].profileImageFullPath}
                  name={data[currentIndex].name}
                />
                <AgentCardItem.Detail
                  cellPhone={data[currentIndex].cellPhone}
                  fullJibunAddress={data[currentIndex].fullJibunAddress}
                  registrationNumber={data[currentIndex].registrationNumber}
                  description={data[currentIndex].description}
                />
              </AgentCardItem>
            </CarouselItem>
          </AnimatePresence>

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
          <Indicator dataLength={data.length} currentIndex={currentIndex} />
        </div>
      ) : null}
    </>
  );
}
