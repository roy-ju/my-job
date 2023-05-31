import { ListingPhotoGallery } from '@/components/pages/mobile';
import { NextPageWithLayout } from '@/pages/_app';

const Page: NextPageWithLayout = () => <ListingPhotoGallery />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
