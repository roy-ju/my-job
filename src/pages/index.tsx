import { MapLayout } from '@/layouts';
import Link from 'next/link';
import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => (
  <div className="absolute z-10 h-full w-[375px] bg-white">
    <Link href="/listings">listings</Link>
  </div>
);

Home.getLayout = function getLayout(page) {
  return <MapLayout>{page}</MapLayout>;
};

export default Home;
