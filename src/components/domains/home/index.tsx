import { MarginTopSixteen } from '@/components/atoms/Margin';

import { useScrollPosition } from '@/providers/ScrollProvider';

import { useEffect } from 'react';

import Header from './Header';

import Contents from './Contents';

import Footer from './Footer';

export default function Home() {
  const { scrollPosition, setScrollPosition } = useScrollPosition();

  useEffect(() => {
    console.log(scrollPosition);
  }, [scrollPosition]);

  return (
    <>
      <div tw="h-full flex flex-col">
        <Header />
        <MarginTopSixteen />
        <div tw="relative flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
          <Contents />
          <Footer />
        </div>
      </div>
    </>
  );
}
