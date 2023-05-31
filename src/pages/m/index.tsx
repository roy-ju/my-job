/* eslint-disable @typescript-eslint/no-unused-vars */
// import { Home } from '@/components/pages/mobile';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';

// const Page: NextPage = () => <Home />;

const Maintenence = dynamic(() => import('@/layouts/Maintenence'), { ssr: false });

const Page: NextPage = () => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <Maintenence />
  </>
);

export default Page;
