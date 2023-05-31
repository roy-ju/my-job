import getAgentList from '@/apis/listing/getAgentList';
import { Panel } from '@/components/atoms';
import { AgentCarouselItem } from '@/components/organisms/AgentCardCarousel';
import { ListingCreateChooseAgent } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { memo, useCallback, useEffect, useState } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);
  const listingID = Number(router.query.listingID) ?? 0;
  const [index, setIndex] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  const [agents, setAgents] = useState<AgentCarouselItem[]>([]);

  const fetchAgentList = useCallback(async () => {
    setIsLoading(true);
    const res = await getAgentList({ listing_id: listingID });
    setIsLoading(false);
    if (res && res.agent_list) {
      setAgents(
        res.agent_list.map((item) => ({
          id: item.id,
          officeName: item.office_name,
          profileImageFullPath: item.profile_image_full_path,
          name: item.name,
          cellPhone: item.cell_phone,
          officePhone: item.office_phone,
          fullJibunAddress: item.full_jibun_address,
          registrationNumber: item.registration_number,
          description: item.description,
        })),
      );
    }
  }, [listingID]);

  useEffect(() => {
    fetchAgentList();
  }, [fetchAgentList]);

  useEffect(() => {
    const { params } = router.query;
    if (!params) router.pop();
  }, [router]);

  const handleClickBack = useCallback(() => {
    router.replace(Routes.ListingCreateForm, {
      searchParams: {
        listingID: router.query.listingID as string,
      },
      state: {
        params: router.query.params as string,
        addressLine1: router.query.addressLine1 as string,
        addressLine2: router.query.addressLine2 as string,
        addressData: router.query.addressData as string,
        ...(router.query.origin
          ? {
              origin: router.query.origin as string,
            }
          : {}),
      },
    });
  }, [router]);

  const handleClickNext = useCallback(() => {
    const agentId = agents[index]?.id;
    router.replace(Routes.ListingCreateSummary, {
      searchParams: {
        listingID: router.query.listingID as string,
        agentID: `${agentId}`,
      },
      state: {
        params: router.query.params as string,
        addressLine1: router.query.addressLine1 as string,
        addressLine2: router.query.addressLine2 as string,
        addressData: router.query.addressData as string,
        ...(router.query.origin
          ? {
              origin: router.query.origin as string,
            }
          : {}),
      },
    });
  }, [agents, index, router]);

  return (
    <Panel width={panelWidth}>
      <ListingCreateChooseAgent
        agents={agents}
        isLoading={isLoading}
        onClickNext={handleClickNext}
        onClickBack={handleClickBack}
        index={index}
        onChangeIndex={(value) => setIndex(value)}
      />
    </Panel>
  );
});
