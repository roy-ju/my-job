import { Panel } from '@/components/atoms';
import { NextPageWithLayout } from '@/pages/_app';
import Router from '@/router';
import { GetServerSideProps } from 'next';
import type { ReactNode } from 'react';

import PrevPage from '@/pages/[1]';
import { ParsedUrlQuery } from 'querystring';

type Props = {
  query: ParsedUrlQuery;
  children?: ReactNode;
};

const Page: NextPageWithLayout<Props> = ({ query, children }) => (
  <>
    <Panel>
      <Router depth={2} route={query['2'] as string} query={query} />
    </Panel>
    {children}
  </>
);

Page.getLayout = function getLayout(page, pageProps) {
  return PrevPage.getLayout?.(
    <PrevPage query={pageProps.query}>{page}</PrevPage>,
    pageProps,
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: {
    query: context.query,
  },
});

export default Page;
