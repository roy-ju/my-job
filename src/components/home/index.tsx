import Header from './Header';

import Contents from './Contents';

import Footer from './Footer';

export default function Home() {
  return (
    <>
      <div tw="h-full flex flex-col">
        <Header />
        <div tw="relative flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
          <Contents />
          <Footer />
        </div>
      </div>
    </>
  );
}
