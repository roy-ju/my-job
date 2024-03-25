import { TermsListItem } from '../types';

const Buy_Special_Terms: TermsListItem[] = [
  {
    index: 0,
    category: '매매',
    middleCategory: '기본',
    smallCategory: '기본 특약',
    title: '현재상태 거래 특약',
    content: '현 시설물 상태에서 매매한다.',
  },
  {
    index: 1,
    category: '매매',
    middleCategory: '기본',
    smallCategory: '기본 특약',
    title: '공과금 부담의무 특약',
    content:
      '잔금 시까지 발생한 각종 공과금은 매도인이 부담하고, 그 다음 날부터는 매수인이 부담하며, 잔금일에 잔금수수와 별도로 이를 정산한다.',
  },
  {
    index: 2,
    category: '매매',
    middleCategory: '기본',
    smallCategory: '기본 특약',
    title: '일반 관례 특약',
    content: '본 계약에서 정하지 않은 사항은 민법 및 부동산 거래 관련 법령 및 부동산 거래 관행을 따른다.',
  },
  {
    index: 3,
    category: '매매',
    middleCategory: '담보권',
    smallCategory: '담보권 관련 특약',
    title: '피담보채무 인수 특약 (& 추가 설정 금지)',
    content:
      '등기사항전부증명서상 근저당권(채권자 000, 채권최고액 금 0원)이 설정된 상태이나, 해당 채무는 매수인이 본 매매계약과 더불어 인수하기로 하며, 매수인은 매도인에게 해당 채무금액만큼 매매대금에서 공제한 금액만을 지급하는 것으로 매매대금 지급 의무는 이행한 것으로 본다.',
  },
  {
    index: 4,
    category: '매매',
    middleCategory: '담보권',
    smallCategory: '담보권 관련 특약',
    title: '담보권 말소 특약',
    content:
      '등기사항전부증명서상 근저당권(채권자 000, 채권최고액 금 0원)이 설정된 상태이나, 잔금일까지 전액 상환하고 소유권 이외의 등기상의 담보권과 부담은 모두 말소하기로 한다.',
  },
  {
    index: 5,
    category: '매매',
    middleCategory: '담보권',
    smallCategory: '담보권 관련 특약',
    title: '추가 담보권 설정 금지 특약',
    content:
      '계약일부터 잔금일 익일까지 등기상의 담보권 및 부담은 설정하지 않으며 제3자나 법원에 의한 설정도 되지 않도록 한다.',
  },
  {
    index: 6,
    category: '매매',
    middleCategory: '임대차 승계',
    smallCategory: '임대차 승계 특약',
    title: '임대차 계약 승계',
    content:
      '계약 체결일 현재 매매대상 건물에 대한 임대차 계약(임차보증금 0원, 계약종료일 2000.01.01)은 매수인이 승계하기로 하며, 매수인은 매도인에게 매매대금에서 임차보증금 채무액 상당을 공제한 금액만을 지급하는 것으로 매매대금 지급 의무는 이행한 것으로 본다.\n\n잔금일에 임대차 계약의 승계로 매도인의 매매대상 건물에 대한 인도의무는 이행된 것으로 본다. ',
  },
  {
    index: 7,
    category: '매매',
    middleCategory: '임대차 승계',
    smallCategory: '임대차 승계 특약',
    title: '임대차 종료 특약',
    content:
      '계약 체결일 현재 매매대상 건물에 임차인이 존재하나, 매도인은 잔금지급일까지 해당 임대차를 적법하게 종료하고, 원상회복이 완료된 상태에서의 깨끗한 건물을 인도하기로 한다.',
  },
  {
    index: 8,
    category: '매매',
    middleCategory: '하자',
    smallCategory: '하자 관련 특약',
    title: '하자 고지 의무 및 보수 부담 특약',
    content:
      '매도인이 계약 당시까지 매수인에게 고지하였거나, 매수인이 명백하게 인지하고 있는 하자는 매도인이 보수의 책임이 있는 하자로 보지 않는다(본 계약에서 별도로 매도인이 보수하기로 약정한 경우는 제외).',
  },
  {
    index: 9,
    category: '매매',
    middleCategory: '특별',
    smallCategory: '특별 특약',
    title: '매매와 동시에 임대차를 하기 위한 특약',
    content:
      '매도인은 매수인이 새로운 임차인을 구하기 위한 절차(집 보여주기, 임대차계약서 작성)에 적극 협조하여야 한다.\n\n본 매매계약의 잔금일 전까지 매도인이 새로운 임차인으로부터 수령하는 임대차보증금(계약금, 중도금, 잔금)은 매매잔금 일부로 본다.\n\n본 매매계약의 잔금일 이후에는 새로운 임차인으로부터 임대차보증금이나 차임 등을 수령할 권한은 모두 매수인에게 귀속되며, 만약 매도인이 수령한 경우 모두 매수인에게 반환하여야 한다.',
  },
  {
    index: 10,
    category: '매매',
    middleCategory: '특별',
    smallCategory: '특별 특약',
    title: '매도인의 임대차(전세)거주 특약',
    content:
      '본 매매계약의 체결과 더불어, 매도인을 임차인으로 하는 별도의 임대차계약(존속기간 : ~부터 ~까지, 전세보증금 : 0원)을 체결하며, 이를 위해 매매대금 중 금 0원은 전세보증금 명목으로 공제하고, 본 매매계약의 잔금일에 보증금이 임대인에게 지급된 것으로 본다.',
  },
  {
    index: 11,
    category: '매매',
    middleCategory: '기타',
    smallCategory: '기타 특약',
    title: '잔금일 조정 특약',
    content: '잔금일은 쌍방 합의로 계약서 잔금일 이전으로 조정할 수 있다.',
  },
  {
    index: 12,
    category: '매매',
    middleCategory: '기타',
    smallCategory: '기타 특약',
    title: '계약금 분할지급 특약',
    content:
      '계약금 중 금 [금액]원은 기 지급되었고, 금 [금액]원은 [날짜], 나머지 금 [금액]원은 [날짜]에 나누어 매도인 계좌로 입금하기로 한다.',
  },
  {
    index: 13,
    category: '매매',
    middleCategory: '기타',
    smallCategory: '기타 특약',
    title: '잔금지연 특약',
    content: '잔금 미지급으로 인한 피해 발생 시 제반 피해 및 이자비용 일체를 매수인이 배상한다.',
  },
  {
    index: 14,
    category: '매매',
    middleCategory: '기타',
    smallCategory: '기타 특약',
    title: '분양권&입주권 특약',
    content:
      '매수자가 조합원 자격을 취득하지 못할 경우 이에 따른 민.형사상 책임을 매도인이 진다.\n\n매도자의 불법 사항으로 인해 입주자격이 상실될 경우 계약 취소 및 거래금액 전액을 매수인에게 반환하기로 한다.',
  },
];

export default Buy_Special_Terms;
