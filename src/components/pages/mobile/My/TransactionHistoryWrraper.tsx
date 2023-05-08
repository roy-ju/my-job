import { TransactionHistory } from '@/components/templates';

import { useRouter } from 'next/router';

export default function TransactionHistoryWrraper() {
  const router = useRouter();

  const handleClickBack = () => {
    router.back();
  };

  return <TransactionHistory list={[]} onClickBack={handleClickBack} />;
}
