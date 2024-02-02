import type { NextPage } from 'next';

import dynamic from 'next/dynamic';

const HomeMobile = dynamic(() => import('@/components/pages/Home/HomeMobile'), { ssr: false });

const Page: NextPage = () => <HomeMobile />;

export default Page;
