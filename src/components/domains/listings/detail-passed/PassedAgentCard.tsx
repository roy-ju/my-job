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

export default function PassedAgentCard() {
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
            <span tw="truncate text-subhead_03">네고시오 공인중개사 사무송너라니렁나리ㅓ니ㄹㄴㄴㄹㄴㄹ</span>
            <span tw="text-info text-gray-700">공인중개사 김네고</span>
          </AgentInfo>

          <ButtonV2 variant="ghost" tw="[height: 44px] bg-nego-100 rounded-lg p-2.5">
            <ChatIcon color={theme`colors.nego.800`} />
          </ButtonV2>
        </AgentInfoWrraper>

        {open && (
          <InfosWrraper>
            <Info>
              <span>전화번호</span>
              <span>02-2222-2222</span>
            </Info>

            <Info>
              <span>주소</span>
              <span>경기도 성남시 분당구 백현동 645-12</span>
            </Info>

            <Info>
              <span>등록번호</span>
              <span>12345-8219-71734</span>
            </Info>
          </InfosWrraper>
        )}
      </CardWrraper>

      <PassedAgentCardButtonWrraper onClick={handleOpen}>
        <TextButton variant="underline" size="small" color="gray1000" title="접어두기" tw="leading-4 mx-auto" />
      </PassedAgentCardButtonWrraper>
    </PassedAgentCardWrraper>
  );
}
