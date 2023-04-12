import { MobTransactionHistory } from '@/components/templates';
import { useRouter } from 'next/router';

export default function TransactionHistoryWrraper() {
  const router = useRouter();
  const handleClickBack = () => {
    router.back();
  };

  return <MobTransactionHistory list={[]} onClickBack={handleClickBack} />;
}
