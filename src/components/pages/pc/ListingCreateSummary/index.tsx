import getAgentList, { GetAgentListResponse } from '@/apis/listing/getAgentList';
import { Loading, Panel } from '@/components/atoms';
import { ListingCreateSummary } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);
  const listingID = Number(router.query.listingID) ?? 0;
  const agentID = Number(router.query.agentID) ?? 0;
  const [agent, setAgent] = useState<GetAgentListResponse['agent_list'][0] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useMemo(() => {
    if (typeof router.query.params === 'string') {
      return JSON.parse(router.query.params);
    }
    return null;
  }, [router.query.params]);

  const fetchAgentList = useCallback(async () => {
    if (!agentID || !listingID) return;
    setIsLoading(true);
    const res = await getAgentList({ listing_id: listingID });
    if (res && res.agent_list) {
      const a = res.agent_list.filter((item) => item.id === agentID)[0];
      setAgent(a ?? null);
    }
    setIsLoading(false);
  }, [listingID, agentID]);

  useEffect(() => {
    fetchAgentList();
  }, [fetchAgentList]);

  useEffect(() => {
    if (params === null || !listingID || !agentID) {
      router.pop();
    }
  }, [params, listingID, agentID, router]);

  return (
    <Panel width={panelWidth}>
      {isLoading || !agent ? (
        <div tw="py-20">
          <Loading />
        </div>
      ) : (
        <ListingCreateSummary
          agentOfficeName={agent.office_name}
          agentProfileImageFullPath={agent.profile_image_full_path}
          agentName={agent.name}
          agentCellPhone={agent.cell_phone}
          agentJibunAddress={agent.full_jibun_address}
          agentDescription={agent.description}
          agentRegistrationNumber={agent.registration_number}
          buyOrRent={params.buy_or_rent}
          tradePrice={params.trade_price}
          deposit={params.deposit}
          monthlyRentFee={params.monthly_rent_fee}
          contractAmount={params.contract_amount}
          remainingAmount={params.remaining_amount}
          interimAmount1={params.interim_amount1}
          interimAmount2={params.interim_amount2}
          interimAmount3={params.interim_amount3}
          specialTerms={params.specialTerms}
        />
      )}
    </Panel>
  );
});
