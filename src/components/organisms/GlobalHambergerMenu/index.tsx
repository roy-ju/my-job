import React, { useCallback, useRef, useState } from 'react';

import { usePopper } from 'react-popper';

import { useRouter } from '@/hooks/utils';

import useOutsideClick from '@/hooks/useOutsideClick';

import Routes from '@/router/routes';

import Paths from '@/constants/paths';

import RefreshOrangeIcon from '@/assets/icons/refresh_orange.svg';

import HouseGreenCheckIcon from '@/assets/icons/house_green_check.svg';

import AppleStoreIcon from '@/assets/icons/apple_store.svg';

import GoogleStoreIcon from '@/assets/icons/google_store.svg';

import QuestionFlagIcon from '@/assets/icons/question_flag.svg';

import Menu from '@/assets/icons/menu.svg';

export default function GlobalHambergerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter(1);

  const outsideRef = useRef<HTMLDivElement | null>(null);
  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'right-start',
    modifiers: [{ name: 'offset', options: { offset: [-30, 8] } }],
  });

  useOutsideClick({ ref: outsideRef, handler: () => setIsOpen(false) });

  const handleHambergerButtonClick = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <>
      <button
        type="button"
        onClick={handleHambergerButtonClick}
        ref={setReferenceElement}
        tw="w-full h-[5.25rem] flex justify-center items-center py-5 mb-5 relative"
      >
        <Menu />
      </button>
      {isOpen && (
        <div ref={setPopperElement} style={styles.popper} {...attributes.popper} tw="z-50">
          <div ref={outsideRef} tw="bg-white rounded-lg py-1 flex flex-col shadow">
            <button
              type="button"
              tw="text-left  font-bold flex gap-2 py-4 px-4 text-b2 text-gray-1000 leading-4 hover:bg-gray-100"
              onClick={() => {
                setIsOpen(false);
                window.open(process.env.NEXT_PUBLIC_NEGOCIO_AGENT_CLIENT_URL, '_blank');
              }}
            >
              <RefreshOrangeIcon /> 중개사 사이트
            </button>
            <button
              type="button"
              tw="py-4 text-left flex gap-2 font-bold px-4 text-b2 text-gray-1000 leading-4 hover:bg-gray-100"
              onClick={() => {
                setIsOpen(false);
                router.replace(Routes.ListingSelectAddress);
              }}
            >
              <HouseGreenCheckIcon /> 집 내놓기
            </button>
            <button
              type="button"
              tw="py-4 px-4 text-left flex gap-2 text-b2 font-bold text-gray-1000 leading-4 hover:bg-gray-100"
              onClick={() => {
                setIsOpen(false);
                router.replace(Routes.Qna);
              }}
            >
              <QuestionFlagIcon /> 1:1 문의
            </button>
            <button
              type="button"
              tw="py-4 px-4 text-b2 text-left font-bold flex gap-2 text-gray-1000 leading-4 hover:bg-gray-100"
              onClick={() => {
                setIsOpen(false);
                window.open(Paths.APP_STORE);
              }}
            >
              <AppleStoreIcon /> 앱스토어 다운로드
            </button>
            <button
              type="button"
              tw="py-4 px-4 text-b2 text-left flex font-bold gap-2 text-gray-1000 leading-4 hover:bg-gray-100"
              onClick={() => {
                setIsOpen(false);
                window.open(Paths.GOOGLE_PLAY_STORE);
              }}
            >
              <GoogleStoreIcon /> 구글스토어 다운로드
            </button>
          </div>
        </div>
      )}
    </>
  );
}
