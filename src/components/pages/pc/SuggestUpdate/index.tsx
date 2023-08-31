/* eslint-disable @typescript-eslint/no-unused-vars */
import { Panel, Loading } from '@/components/atoms';
import { memo } from 'react';
import { SuggestUpdate as SuggestUpdateTemplate } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import useAPI_GetMySuggestDetail from '@/apis/suggest/getMySuggestDetail';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);
  const suggestID = Number(router.query.suggestID) ?? 0;

  const { data, isLoading } = useAPI_GetMySuggestDetail(suggestID);

  /*
  {
  suggest_id: 34,
  danji_id: null,
  suggest_status: 2,
  request_number: 'S16932723584',
  danji_or_regional: 2,
  request_target_text: '경기도 군포시 산본동',
  realestate_types: '10,20,60',
  buy_or_rents: '1',
  trade_or_deposit_price: 100000000,
  monthly_rent_fee: 0,
  pyoung_text: '10~30평',
  pyoungs: '',
  pyoung_from: '10',
  pyoung_to: '30',
  purpose: '투자',
  invest_amount: 100000000,
  quick_sale: null,
  negotiable: true,
  move_in_date: null,
  move_in_date_type: null,
  note: '없습니다',
  updated_time: '2023-08-29T14:17:51+09:00',
  created_time: '2023-08-29T10:25:59+09:00'
}
  */

  if (isLoading) {
    return (
      <Panel width={panelWidth}>
        <div tw="py-20">
          <Loading />
        </div>
      </Panel>
    );
  }

  return (
    <Panel width={panelWidth}>
      <SuggestUpdateTemplate />
    </Panel>
  );
});
