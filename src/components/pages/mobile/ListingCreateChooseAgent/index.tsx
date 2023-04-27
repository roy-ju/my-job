/* eslint-disable @typescript-eslint/no-unused-vars */
import getAgentList from '@/apis/listing/getAgentList';

import { AgentCarouselItem } from '@/components/organisms/AgentCardCarousel';
import { MobListingCreateChooseAgent } from '@/components/templates';
import { useRouter } from 'next/router';
import Routes from '@/router/routes';
import { useCallback, useEffect, useState } from 'react';

const ListingCreateChooseAgent = () => {
  const router = useRouter();
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
  }, [router]);

  const handleClickBack = useCallback(() => {
    router.replace(
      {
        pathname: `/${Routes.EntryMobile}/${Routes.ListingCreateForm}`,
        query: {
          listingID: router.query.listingID as string,
          params: router.query.params as string,
          addressLine1: router.query.addressLine1 as string,
          addressLine2: router.query.addressLine2 as string,
          addressData: router.query.addressData as string,
        },
      },
      `/${Routes.EntryMobile}/${Routes.ListingCreateForm}?listingID=${router.query.listingID}`,
    );
  }, [router]);

  const handleClickNext = useCallback(() => {
    const agentId = agents[index]?.id;

    router.replace(
      {
        pathname: `/${Routes.EntryMobile}/${Routes.ListingCreateSummary}`,
        query: {
          listingID: router.query.listingID as string,
          agentID: `${agentId}`,
          params: router.query.params as string,
          addressLine1: router.query.addressLine1 as string,
          addressLine2: router.query.addressLine2 as string,
          addressData: router.query.addressData as string,
        },
      },
      `/${Routes.EntryMobile}/${Routes.ListingCreateSummary}?listingId=${router.query.listingID}&${router.query.listingID}`,
    );
  }, [agents, index, router]);

  return (
    <MobListingCreateChooseAgent
      agents={agents}
      isLoading={isLoading}
      onClickNext={handleClickNext}
      onClickBack={handleClickBack}
      index={index}
      onChangeIndex={(value) => setIndex(value)}
    />
  );
};

export default ListingCreateChooseAgent;
