import { MapLayout } from '@/layouts';
import { NextPageWithLayout } from '../_app';

const Listings: NextPageWithLayout = () => (
  <div className="absolute z-10 h-full w-[375px] bg-white" />
);

Listings.getLayout = function getLayout(page) {
  return <MapLayout>{page}</MapLayout>;
};

export default Listings;
