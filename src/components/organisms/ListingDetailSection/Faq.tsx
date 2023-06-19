import useAPI_Internal_GetFaqList from '@/apis/internal/getFaq';
import FaqList from '../FaqList';

export default function Faq() {
  const { data } = useAPI_Internal_GetFaqList();

  return (
    <div>
      <div tw="text-b1 font-bold">
        <h2>거래가이드 & FAQ</h2>
      </div>
      <div tw="mt-5 -mx-5">
        <FaqList list={data?.['[매수인/임차인] 거래 방법이 궁금해요.'] ?? []} />
      </div>
    </div>
  );
}
