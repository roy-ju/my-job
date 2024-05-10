import { useCallback, useState } from 'react';

import { theme } from 'twin.macro';

import ButtonV2 from '@/components/atoms/ButtonV2';

import TextButton from '@/components/atoms/TextButton';

import ChatIcon from '@/assets/icons/chat.svg';

import {
  PassedAgentCardTitle,
  PassedAgentCardWrraper,
  CardWrraper,
  InfosWrraper,
  Info,
  AgentInfoWrraper,
  AgentInfo,
  PassedAgentCardButtonWrraper,
} from './widget/ListingDetailPassedWidget';

type PassedAgentCardProps = {
  agentName?: string;
  agentOfficeName?: string;
  agentOfficePhone?: string;
  agentOfficeAddress?: string;
  agentRegistrationNumber?: string;
  handleNavigateToChatRoom: () => void;
};

export default function PassedAgentCard({
  agentName,
  agentOfficeName,
  agentOfficePhone,
  agentOfficeAddress,
  agentRegistrationNumber,
  handleNavigateToChatRoom,
}: PassedAgentCardProps) {
  const [open, setOpen] = useState(true);

  const handleOpen = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return (
    <PassedAgentCardWrraper>
      <PassedAgentCardTitle>중개사 정보</PassedAgentCardTitle>

      <CardWrraper>
        <AgentInfoWrraper>
          <AgentInfo>
            <span tw="truncate text-subhead_03">{agentOfficeName}</span>
            <span tw="text-info text-gray-700">{agentName}</span>
          </AgentInfo>

          <ButtonV2 variant="ghost" tw="[height: 44px] bg-nego-100 rounded-lg p-2.5" onClick={handleNavigateToChatRoom}>
            <ChatIcon color={theme`colors.nego.800`} />
          </ButtonV2>
        </AgentInfoWrraper>

        {open && (
          <InfosWrraper>
            {agentOfficePhone && (
              <Info>
                <span>전화번호</span>
                <span>{agentOfficePhone}</span>
              </Info>
            )}

            {agentOfficeAddress && (
              <Info>
                <span>주소</span>
                <span>{agentOfficeAddress}</span>
              </Info>
            )}

            {agentRegistrationNumber && (
              <Info>
                <span>등록번호</span>
                <span>{agentRegistrationNumber}</span>
              </Info>
            )}
          </InfosWrraper>
        )}
      </CardWrraper>

      <PassedAgentCardButtonWrraper onClick={handleOpen}>
        <TextButton variant="underline" size="small" color="gray1000" title="접어두기" tw="leading-4 mx-auto" />
      </PassedAgentCardButtonWrraper>
    </PassedAgentCardWrraper>
  );
}
