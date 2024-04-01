import { GetServerSideProps } from 'next';

import { NextPageWithLayout } from '@/pages/_app';

import DictionaryDetail from '@/components/pages/DictionaryDetail/DictionaryDetailMobile';

import axios from '@/lib/axios';

const Page: NextPageWithLayout<{ metaTitle?: string | null }> = ({ metaTitle }) => (
  <DictionaryDetail metaTitle={metaTitle} />
);

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let metaTitle: string | null = null;

  if (context.query.dictID) {
    const { data } = await axios.post('/subhome/guide/detail', {
      code: 'DICT',
      guide_id: Number(context.query.dictID),
    });

    metaTitle = `부동산 용어 사전 > ${data?.term?.name ?? ''}`;
  }

  return {
    props: {
      metaTitle,
    },
  };
};

export default Page;
