import SuccessIcon from '@/assets/icons/success.svg';

import CancelIcon from '@/assets/icons/cancel.svg';

type ListItemStatusMessageProps = {
  status: 'success' | 'cancel';
};

export default function ListItemStatusMessage({ status }: ListItemStatusMessageProps) {
  if (status === 'success') {
    return (
      <div tw="flex gap-1 items-center text-info text-green-800 font-bold">
        <SuccessIcon />
        <p>거래성사가 완료되었습니다.</p>
      </div>
    );
  }

  if (status === 'cancel') {
    return (
      <div tw="flex gap-1 items-center text-info text-gray-700 font-bold">
        <CancelIcon />
        <p>거래 성사가 취소되었습니다.</p>
      </div>
    );
  }

  return null;
}
