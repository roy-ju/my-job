import { Accordion } from '@/components/molecules';

export default function FAQListItem() {
  return (
    <Accordion>
      <Accordion.Summary tw="py-5 px-5">
        <p tw="text-b2 mb-2">네고와 입찰의 차이를 알고 싶어요!</p>
        <p tw="text-gray-700 text-mobCaption text-left">2022.10.10</p>
      </Accordion.Summary>
      <Accordion.Details tw="text-b2 break-words px-5 py-4">
        1. 네고 정해진 시간이 없이 거래 상대방 간의 협상(네고)에 의하여 거래 가격을 결정하는 거래 유형입니다. - 집주인의
        희망가를 수락하는 매수(임차)인이 나타나거나, 매수(임차)인의 제안가를 집주인이 수락하게 되는 경우 거래가
        체결됩니다. - 가격합의(거래 가격 결정)가 되기 전에는 누구든지 제안가를 제시할 수 있으며, 집주인 또한 희망가를
        수정할 수 있습니다. 2. 입찰 특정한 기간 내의 매수(임차)인의 경쟁입찰에 의하여 거래 가격을 결정하는 거래
        유형입니다. - 가장 높은 가격을 제시한 매수(임차)인과 거래가 체결됩니다. - 다만, 최고 입찰가가 집주인이 설정한
        낙찰기준가 보다 낮은 경우에는 거래가 체결되지 않으며, 이 경우 입찰 기간 종료 시 거래 유형이 네고거래로 전환되게
        됩니다. - 네고로 전환 시, 기존의 입찰내역은 제안내역으로 자동으로 전환됩니다.
      </Accordion.Details>
    </Accordion>
  );
}

// border-t-white border-t not-first-of-type:border-t-gray-100
