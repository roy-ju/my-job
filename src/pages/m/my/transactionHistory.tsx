import MobTransactionHistory from '@/components/templates/MobTransactionHistory';
import { NextPageWithLayout } from '@/pages/_app';

function MobTransactionHistoryWrraper() {
  return <MobTransactionHistory list={[]} />;
}

const Page: NextPageWithLayout = () => <MobTransactionHistoryWrraper />;

Page.getLayout = function getLayout(page) {
  return (
    <>
      <div tw="w-[100%] absolute bg-nego-1300 h-full [z-index: -1]" />
      {page}
    </>
  );
};

export default Page;
