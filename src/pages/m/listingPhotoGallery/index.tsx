import { NextPageWithLayout } from '@/pages/_app';

import ListingPhotoGallery from '@/components/pages/mobile/ListingPhotoGallery';

const Page: NextPageWithLayout = () => <ListingPhotoGallery />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
