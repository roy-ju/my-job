const JeonWolsae_Process = [
  {
    order: 1,
    title: '매물 후보 선정',
    thumbnail: '나에게 맞는 매물을 구하는 단계예요.',
    contents: '다양한 방법으로 입지와 가격을 고려하여 나에게 맞는 매물을 물색하는 단계에요.',
    tip: '네고시오로 쉽고 편하게 집을 구해보세요\n‘구해요’ 기능을 통해 중개사님의 추천을 받거나, 집주인 또는 중개사가 등록한 매물에 직접 가격을 제안해 원하는 매물을 쉽게 찾아볼 수 있어요.',
    caution: '',
  },
  {
    order: 2,
    title: '매물 방문',
    thumbnail: '직접 매물에 방문하여 집 상태를 파악해야 해요.',
    contents:
      '원하는 매물이 결정되었다면, 직접 매물에 방문(임장)하여 매물의 위치, 구조, 상태 등을 살펴보고 매물의 장단점을 파악해야 해요.',
    tip: '원하는 집을 임대(전세/월세)할 때는 입지와 집 상태가 매우 중요해요. 그렇기에 매물의 입지와 상태를 확인하고 하자와 요구사항을 꼼꼼하게 정리해야 해요!',
    caution: '',
  },
  {
    order: 3,
    title: '상세 가격 / 조건 협상',
    thumbnail: '계약에 필요한 세부사항을 확정하고 합의해요.',
    contents:
      '매물 계약을 원한다면 최종 거래 가격, 대금 지급 계획, 입주일(잔금일) 확정, 하자 처리 등 세부사항을 확정해야 해요.\n\n또한, 중개사님을 통해 해당 매물의 근저당, 가압류, 가처분 등 권리의 하자도 꼭 확인해야 해요.\n\n모든 사항을 확인했다면, 상세조건을 합의해야 해요. 합의는 집주인과 직접 하기보다는 중개사님과 하는 것이 가장 일반적이며 안전해요.',
    tip: '',
    caution: '등기상 담보 등 권리의 하자가 있다면 그 처리 방법도 꼭 합의해야만 해요!',
  },
  {
    order: 4,
    title: '가계약금(이행증거금) 입금',
    thumbnail: '계약서 작성 전 가계약금을 입금하는 단계예요.',
    contents:
      '상세 조건 합의 후, 가계약금(이행증거금)을 입금해야 해요.\n\n가계약금은 계약서 작성하기 전 계약에 대한 책임감을 갖기 위한 목적으로 실제 계약 체결 시에는 ‘계약금’의 일부가 돼요.',
    tip: '상대방의 약정 불이행이나 설명부족 등의 이유로 가계약금을 포기하지 않아 분쟁이 일어나는 경우도 있어요. 이를 방지하기 위해서 가계약금 지급 전 주요한 계약 내용은 문서 또는 문자로 꼭 저장하는 걸 추천해 드려요.',
    caution:
      '가계약금을 지급할 때는 반드시 ‘등기상 소유자’ 명의의 계좌로 입금해야 하며, 계좌번호는 중개사님께 전달받아요. 이때 중개사 또는 소유자의 가족, 대리인 계좌로 입금하지 않도록 주의해야 해요.\n\n계약을 취소하고 싶다면?\n계약 체결 의사가 없다면, 가계약금을 포기하고 계약을 파기할 수 있어요.\n만약, 집주인이 계약 체결의 의사가 없어 계약을 파기하는 경우 매수인에게 가계약금의 배액을 상환해야 해요.',
  },
  {
    order: 5,
    title: '계약서 작성',
    thumbnail: '부동산에 방문하여 계약서를 작성해요.',
    contents: '계약서 작성은 중개사님을 통해 진행하는 것이 가장 안전해요.',
    tip: '계약서에 어떤 내용이 있고, 어떤 내용을 추가로 넣어야 할지 사전에 미리 파악하고 부동산 가는 것을 추천해 드려요.',
    caution: '',
  },
  {
    order: 6,
    title: '계약금 지급',
    thumbnail: '계약서를 작성하고 계약금을 지급해요.',
    contents:
      '보통은 계약서 작성일에 계약금을 지급하며, 가계약금은 ‘계약금’의 일부이기에 나머지 잔여 계약금을 지급하면 돼요. (통상 계약금은 총 대금의 10%)',
    tip: '',
    caution:
      '계약을 취소하고 싶다면?\n계약서 작성으로 계약은 최종 체결되기에, 계약 해제를 원한다면 계약금 전액을 포기해야 해제할 수 있어요.\n\n만약, 아직 계약금을 입금하지 않았다 하여도 계약금을 온전히 지급 후 계약을 해제할 수 있어요.\n\n반대로 집주인이 계약 해제를 원한다면 계약금 반환은 물론 상당 부분을 추가로 지급해야만 계약을 해제할 수 있어요.',
  },
  {
    order: 7,
    title: '거래 신고',
    thumbnail: '계약한 부동산의 거래를 신고해요.',
    contents:
      '부동산 거래를 체결할 때는 계약일로부터 30일 이내 거래 신고를 해야 하며, 임대차는 거래당사자가 신고해야만 해요.(‘부동산 거래신고 등에 관한 법률’에는 거래당사자가 ‘공동’으로 신고해야 한다는 규정이 있지만, 시행규칙에 따라 당사자 중 일방이라도 ‘계약서’를 함께 제출할 경우 공동신고한 것으로 인정)',
    tip: '거래 신고는 1)주민센터에서 전입신고와 동시에 하는 방법과 2)국토부의 ‘부동산거래관리시스템’(http://rtms.molit.go.kr)에서 신고하는 방법이 있어요.\n\n경매 시 우선변제권의 순서를 정하는 가장 중요한 요소인 ‘확정일자’는 거래신고를 해야만 받을 수 있으니, 적어도 입주일 전까지는 신고하는 것을 추천해 드려요.',
    caution: '',
  },
  {
    order: 8,
    title: '중도금 입금',
    thumbnail: '보증금이 고액일 경우 중도금을 지급해요.',
    contents: '전세금이나 보증금이 고액이면 중도금을 지급하도록 계약을 하는 경우도 있어요.',
    tip: '',
    caution:
      '중도금 지급 또는 수령 이후에는 계약금을 포기한다고 하더라도 계약 해제가 어려우니, 이 점을 꼭 주의하세요.(별도의 절차에 따름)',
  },
  {
    order: 9,
    title: '잔금 입금',
    thumbnail: '잔금을 입금하고, 부동산을 인도받아요.',
    contents:
      '잔금을 입금(지급)함으로써 ‘임차인’과 ‘임대인’의 의무가 동시에 이행되어야 해요. (동시이행의무)\n\n임차인의 의무는 ‘잔금 입금’이며, 임대인의 의무는 ‘부동산 인도’에요. 물론 그 밖에 특약상의 의무가 있다면 그것도 함께 이행되어야 해요.',
    tip: '집주인의 의무이행 준비를 모두 확인 후 잔금을 지급하는게 가장 좋은 방법이에요.\n\n또한, 최종적으로 매물 상태를 체크하여 협의된 내용과 다름이 없는지, 청소나 폐기물 처리는 완벽한지 잔금 지급 전에 꼭 확인해야 해요.',
    caution: '',
  },
  {
    order: 10,
    title: '입주',
    thumbnail: '부동산을 인도받고 입주해요.',
    contents: '잔금을 처리함과 동시에 부동산을 인도받을 수 있어, 보통 잔금일에 입주를 해요.',
    tip: '일반적으로 입주날에 맞춰 이사하므로 그 전에 이사 준비를 해야 해요. 특히 고층인 경우, 크레인이 필요할 수 있으니 꼼꼼하게 체크해야 해요.',
    caution: '',
  },
  {
    order: 11,
    title: '전입신고',
    thumbnail: '전입신고를 완료하여 대항력을 확보해요.',
    contents:
      '임대차는 반드시 전입신고해야만 해요. 입주와 전입신고를 모두 완료해야만 임차인 대항력을 확보할 수 있어요.\n\n대항력이 발생하는 시점은 입주와 전입신고가 모두 완료된 다음날 0시부터예요.',
    tip: '임차인 대항력 발생 시점은 다음과 같아요.\n\n1. 전입신고를 늦게 한 경우\n예) 24년 1월 1일 입주 후, 24년 1월 2일에 전입신고를 완료하였다면 임차인 대항력 발생 시점은 24년 1월 3일 0시부터예요.\n\n2. 입주를 늦게 한 경우\n예) 24년 1월 1일 전입신고 완료 후, 24년 1월 2일에 입주하였다면 임차인 대항력 발생 시점은 24년 1월 3일 0시부터예요.\n\n3. 입주와 전입신고를 동시에 한 경우\n예) 24년 1월 1일 입주 및 전입신고를 완료하였다면 임차인 대항력 발생 시점은 24년 1월 2일 0시부터예요.',
    caution: '',
  },
];

export default JeonWolsae_Process;
