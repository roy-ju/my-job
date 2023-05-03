export type TooltipType = 'debtSuccessions' | 'rentArea';

const Tooltips: Record<
  TooltipType,
  {
    title: string;
    body: string;
  }
> = {
  debtSuccessions: {
    title: '채무승계 희망금액',
    body: '전세금, 임차보증금 등 매수인에게 자동승계가 되거나 승계하기를 희망하는 채무가 있을 경우 기입합니다.',
  },
  rentArea: {
    title: '임대할 부분',
    body: '매물 전체가 아닌 부분을 임대하고 싶으시다면 해당부분을 기입합니다.\n다가구 주택의 경우, 임대할 부분(호수, 면적 등)을 반드시 입력하셔야 합니다. ',
  },
};

export default Tooltips;
