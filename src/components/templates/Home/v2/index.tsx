import Header from './components/Header';

import Contents from './components/Contents';

import Footer from './components/Footer';

export default function HomeV2Template() {
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
