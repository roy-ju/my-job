import { MapLayout } from '@/layouts';
import { NextPageWithLayout } from '@/pages/_app';
import Router from '@/router';
import getHtmlMetas from '@/utils/getHtmlMetas';
import { GetServerSideProps } from 'next';

const Page: NextPageWithLayout = () => null;

Page.getComponent = function getComponent(pageProps) {
  return <Router key={pageProps.route} {...pageProps} />;
};

Page.getLayout = function getLayout(page) {
  return <MapLayout>{page}</MapLayout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const metas = await getHtmlMetas(context.query);
  const forwarded = context.req.headers['x-forwarded-for'];
  const ip = typeof forwarded === 'string' ? forwarded.split(/, /)[0] : context.req.socket.remoteAddress;

  return {
    props: {
      ...metas,
      ipAddress: ip,
      query: context.query,
      route: context.query.depth1,
      depth: 1,
    },
  };
};

export default Page;
