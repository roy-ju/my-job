/* eslint-disable @typescript-eslint/no-unused-vars */
import getAgentList from '@/apis/listing/getAgentList';

import { AgentCarouselItem } from '@/components/organisms/AgentCardCarousel';
import { ListingCreateChooseAgent as ListingCreateChooseAgentTemplate } from '@/components/templates';
import { useRouter } from 'next/router';
import Routes from '@/router/routes';
import { useCallback, useEffect, useState } from 'react';
import { Loading, MobileContainer } from '@/components/atoms';

const ListingCreateChooseAgent = () => {
  const router = useRouter();

  const userAddressID = Number(router.query.userAddressID) ?? 0;

  const [index, setIndex] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  const [agents, setAgents] = useState<AgentCarouselItem[]>([]);

  const fetchAgentList = useCallback(async () => {
    setIsLoading(true);

    const res = await getAgentList({ user_address_id: userAddressID });

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
  }, [userAddressID]);

  const handleClickBack = useCallback(() => {
    router.replace({
      pathname: `/${Routes.EntryMobile}/${Routes.ListingCreateForm}`,
      query: {
        params: router.query.params as string,
        ...(router?.query?.origin ? { origin: router.query.origin as string } : {}),
        ...(router?.query?.danjiID ? { danjiID: router.query.danjiID as string } : {}),
        ...(router?.query?.userAddressID ? { userAddressID: router.query.userAddressID as string } : {}),
      },
    });
  }, [router]);

  const handleClickNext = useCallback(() => {
    const agentId = agents[index]?.id;

    router.replace({
      pathname: `/${Routes.EntryMobile}/${Routes.ListingCreateSummary}`,
      query: {
        params: router.query.params as string,
        agentID: `${agentId}`,
        ...(router?.query?.origin ? { origin: router.query.origin as string } : {}),
        ...(router?.query?.danjiID ? { danjiID: router.query.danjiID as string } : {}),
        ...(router?.query?.userAddressID ? { userAddressID: router.query.userAddressID as string } : {}),
      },
    });
  }, [agents, index, router]);

  useEffect(() => {
    fetchAgentList();
  }, [fetchAgentList]);

  useEffect(() => {
    if (!router?.query?.userAddressID || !router?.query?.params) {
      router.replace(`/${Routes.EntryMobile}/${Routes.My}?default=2`);
    }
  }, [router]);

  if (!router?.query?.userAddressID || !router?.query?.params) {
    return (
      <MobileContainer>
        <div tw="py-20">
          <Loading />
        </div>
      </MobileContainer>
    );
  }

  return (
    <MobileContainer>
      <ListingCreateChooseAgentTemplate
        agents={agents}
        isLoading={isLoading}
        onClickNext={handleClickNext}
        onClickBack={handleClickBack}
        index={index}
        onChangeIndex={(value) => setIndex(value)}
      />
    </MobileContainer>
  );
};

export default ListingCreateChooseAgent;
