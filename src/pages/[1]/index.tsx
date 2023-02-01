import { MapLayout } from '@/layouts';
import {
  NextPageWithLayout,
  PanelBasedPage,
  PanelBasedPageProps,
} from '@/pages/_app';
import { GetServerSideProps } from 'next';

const Page: NextPageWithLayout<PanelBasedPageProps> = () => null;

Page.getComponent = function getComponent(pageProps) {
  return <PanelBasedPage key={pageProps.route} {...pageProps} />;
};

Page.getLayout = function getLayout(page) {
  return <MapLayout>{page}</MapLayout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: {
    query: context.query,
    route: context.query['1'],
    depth: 1,
  },
});

export default Page;
