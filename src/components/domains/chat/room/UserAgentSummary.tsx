import React from 'react';

import { Accordion } from '@/components/molecules';

import tw from 'twin.macro';
import { ListingItemCard, ListingItemCardHeader } from './ListingItemCard';

import { NegotiationItemCard, NegotiationItemCardHeader } from './NegotiationCard';

import { SuggestionItemCard, SuggestionItemCardHeader } from './SuggestionCard';

import useClientAccordionHandler from './hooks/useClientAccordionHandler';

export function UserAgentSummary() {
  const { open, subTab, accordionDetails, setOpen, setSubTab } = useClientAccordionHandler();

  return (
    <Accordion
      tw="absolute w-full top-14 z-10 border-b border-t border-gray-300"
      onChange={(v) => {
        if (v) {
          setOpen(v);
        } else {
          setSubTab(0);
          setOpen(v);
        }
      }}
    >
      <Accordion.Summary tw="text-subhead_02 px-5 py-4 hover:bg-transparent" isNewIconSmall>
        <div tw="flex flex-row justify-between">
          현재 진행 사항
          <p tw="text-body_01 text-gray-800 inline mr-0.5">상세정보 {open ? '접기' : '보기'}</p>
        </div>
      </Accordion.Summary>

      <Accordion.Details tw="mx-5 mb-5 [border-radius: 8px]">
        <div tw="bg-gray-100 px-4 [border-radius: 8px]">
          <Accordion
            tw="bg-transparent"
            onChange={(v) => {
              if (v) {
                setSubTab(1);
              } else {
                setSubTab(0);
              }
            }}
            expanded={subTab === 1}
          >
            <Accordion.Summary
              tw="text-body_01 py-3"
              isNewIconSmallV2
              css={[subTab !== 1 && tw`border-b border-gray-300 [transition: border 0.3s ease 0.4s]`]}
            >
              <ListingItemCardHeader count={accordionDetails?.listingItem1Count || 0} />
            </Accordion.Summary>

            {accordionDetails.listingItem1Count ? (
              <Accordion.Details
                tw="flex flex-col gap-3 max-h-[126px] overflow-y-auto"
                className="negocio-chat-room-scroll"
              >
                {accordionDetails?.listingItem1Arr?.map((item) => (
                  <ListingItemCard key={`listingItem1-${item.listing_id}`} item={item} />
                ))}
              </Accordion.Details>
            ) : (
              <Accordion.Details tw="pb-6 text-body_01 text-gray-600 text-center border-b border-b-gray-300">
                내역이 없습니다.
              </Accordion.Details>
            )}
          </Accordion>

          <Accordion
            tw="bg-transparent"
            onChange={(v) => {
              if (v) {
                setSubTab(2);
              } else {
                setSubTab(0);
              }
            }}
            expanded={subTab === 2}
          >
            <Accordion.Summary
              tw="text-body_01 py-3"
              isNewIconSmallV2
              css={[subTab !== 2 && tw`border-b border-gray-300 [transition: border 0.3s ease 0.4s]`]}
            >
              <NegotiationItemCardHeader count={accordionDetails?.listingItem2Count || 0} />
            </Accordion.Summary>

            {accordionDetails.listingItem2Count ? (
              <Accordion.Details
                tw="flex flex-col gap-3 max-h-[126px] overflow-y-auto"
                className="negocio-chat-room-scroll"
              >
                {accordionDetails?.listingItem2Arr?.map((item) => (
                  <NegotiationItemCard key={`listingItem2-${item.listing_id}`} item={item} />
                ))}
              </Accordion.Details>
            ) : (
              <Accordion.Details tw="pb-6 text-body_01 text-gray-600 text-center border-b border-b-gray-300">
                내역이 없습니다.
              </Accordion.Details>
            )}
          </Accordion>

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
            <Accordion.Summary tw="text-body_01 py-3" isNewIconSmallV2>
              <SuggestionItemCardHeader count={accordionDetails?.suggestCount || 0} />
            </Accordion.Summary>

            {accordionDetails.suggestCount ? (
              <Accordion.Details
                tw="flex flex-col gap-3 mb-4 max-h-[158px] overflow-y-auto"
                className="negocio-chat-room-scroll"
              >
                {accordionDetails?.suggestItemArr?.map((item) => (
                  <SuggestionItemCard key={`suggestItem-${item.suggest_id}`} item={item} />
                ))}
              </Accordion.Details>
            ) : (
              <Accordion.Details tw="pb-6 text-body_01 text-gray-600 text-center">내역이 없습니다.</Accordion.Details>
            )}
          </Accordion>
        </div>
      </Accordion.Details>
    </Accordion>
  );
}
