import { NextPageWithLayout } from '@/pages/_app';

import ListingPhotoGallery from '@/components/pages/ListingPhotoGallery/ListingPhotoGalleryMobile';

const Page: NextPageWithLayout = () => <ListingPhotoGallery />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
