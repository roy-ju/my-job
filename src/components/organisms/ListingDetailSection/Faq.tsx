import useAPI_Internal_GetFaqList from '@/apis/internal/getFaq';
import FaqList from '../FaqList';

export default function Faq() {
  const { data } = useAPI_Internal_GetFaqList('거래에 참여하고 싶어요.');

  return (
    <div>
      <div tw="text-b1 font-bold">거래가이드 & FAQ</div>
      <div tw="mt-5 -mx-5">
        <FaqList list={data} />
      </div>
    </div>
  );
}
