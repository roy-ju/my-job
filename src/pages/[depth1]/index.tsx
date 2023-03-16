import { MapLayout } from '@/layouts';
import { NextPageWithLayout } from '@/pages/_app';
import Router from '@/router';
import { GetServerSideProps } from 'next';

const Page: NextPageWithLayout = () => null;

Page.getComponent = function getComponent(pageProps) {
  return <Router key={pageProps.route} {...pageProps} />;
};

Page.getLayout = function getLayout(page) {
  return <MapLayout>{page}</MapLayout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: {
    query: context.query,
    route: context.query.depth1,
    depth: 1,
  },
});

export default Page;
