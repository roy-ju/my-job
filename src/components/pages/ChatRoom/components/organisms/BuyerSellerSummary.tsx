import React from 'react';

import { Accordion } from '@/components/molecules';

import { SuggestionItemCard, SuggestionItemCardHeader } from './SuggestionCard';

import { RecommendItemCard, RecommendItemCardHeader } from './RecommendItemCard';

import useClientAccordionHandler from '../../hooks/useClientAccordionHandler';

export function BuyerSellerSummary() {
  const { open, subTab, accordionDetails, setOpen, setSubTab } = useClientAccordionHandler();

  return (
    <Accordion
      tw="border-b border-t border-gray-300"
      onChange={(v) => {
        if (v) {
          setOpen(v);
        } else {
          setSubTab(0);
        }
      }}
    >
      <Accordion.Summary tw="text-subhead_02 px-5 py-4" isNewIconSmall>
        <div tw="flex flex-row justify-between">
          현재 진행 사항
          <p tw="text-body_01 text-gray-700 inline mr-0.5">상세정보 {open ? '접기' : '보기'}</p>
        </div>
      </Accordion.Summary>

      <Accordion.Details tw="bg-gray-100 mx-5 mb-5 [border-radius: 8px]">
        <Accordion
          tw="bg-transparent"
          onChange={(v) => {
            if (v) {
              setSubTab(3);
            } else {
              setSubTab(0);
            }
          }}
          expanded={subTab === 3}
        >
          <Accordion.Summary tw="text-body_01 px-4 py-3" isNewIconSmallV2>
            <SuggestionItemCardHeader count={accordionDetails?.suggestCount || 0} />
          </Accordion.Summary>

          {accordionDetails.suggestCount ? (
            <Accordion.Details
              tw="flex flex-col mx-5 gap-3 max-h-[158px] overflow-y-auto"
              className="negocio-chat-room-scroll"
            >
              {accordionDetails?.suggestItemArr?.map((item) => (
                <SuggestionItemCard key={`suggestItem-${item.suggest_id}`} item={item} />
              ))}
            </Accordion.Details>
          ) : (
            <Accordion.Details tw="mx-5 pb-6 text-body_01 text-gray-600 text-center border-b border-b-gray-300">
              내역이 없습니다.
            </Accordion.Details>
          )}
        </Accordion>

        <Accordion
          tw="bg-transparent"
          onChange={(v) => {
            if (v) {
              setSubTab(4);
            } else {
              setSubTab(0);
            }
          }}
          expanded={subTab === 4}
        >
          <Accordion.Summary tw="text-body_01 px-4 py-3" isNewIconSmallV2>
            <RecommendItemCardHeader count={accordionDetails?.recommendCount || 0} />
          </Accordion.Summary>
          {accordionDetails.recommendCount ? (
            <Accordion.Details
              tw="flex flex-col mx-5 gap-3 mb-4 max-h-[158px] overflow-y-auto"
              className="negocio-chat-room-scroll"
            >
              {accordionDetails?.recommendItemArr?.map((item) => (
                <RecommendItemCard key={`recommendItem-${item.suggest_id}`} item={item} />
              ))}
            </Accordion.Details>
          ) : (
            <Accordion.Details tw="mx-5 pb-6 text-body_01 text-gray-600 text-center">
              내역이 없습니다.
            </Accordion.Details>
          )}
        </Accordion>
      </Accordion.Details>
    </Accordion>
  );
}
