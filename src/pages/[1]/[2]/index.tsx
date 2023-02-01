import {
  NextPageWithLayout,
  PanelBasedPage,
  PanelBasedPageProps,
} from '@/pages/_app';
import { GetServerSideProps } from 'next';

import { MapLayout } from '@/layouts';
import PrevPage from '@/pages/[1]';

const Page: NextPageWithLayout<PanelBasedPageProps> = () => null;

Page.getComponent = function getComponent(pageProps) {
  return <PanelBasedPage key={pageProps.route} {...pageProps} />;
};

Page.getLayout = function getLayout(page, pageProps) {
  return (
    <MapLayout>
      {PrevPage.getComponent?.({
        query: pageProps.query,
        route: pageProps.query['1'],
        depth: 1,
      })}
      {page}
    </MapLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: {
    query: context.query,
    route: context.query['2'],
    depth: 2,
  },
});

export default Page;
