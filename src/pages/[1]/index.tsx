import { Panel } from '@/components/atoms';
import { MapLayout } from '@/layouts';
import { NextPageWithLayout } from '@/pages/_app';
import Router from '@/router';
import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import type { ReactNode } from 'react';

type Props = {
  query: ParsedUrlQuery;
  children?: ReactNode;
};

const Page: NextPageWithLayout<Props> = ({ query, children }) => (
  <>
    <Panel>
      <Router depth={1} route={query['1'] as string} query={query} />
    </Panel>
    {children}
  </>
);

Page.getLayout = function getLayout(page) {
  return <MapLayout>{page}</MapLayout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: {
    query: context.query,
  },
});

export default Page;
