import { useState, useRef, useCallback } from 'react';

import { useRouter as useNextRouter } from 'next/router';

import { usePopper } from 'react-popper';

import useAuthPopup from '@/states/hooks/useAuhPopup';

import useReturnUrl from '@/states/hooks/useReturnUrl';

import useOutsideClick from '@/hooks/useOutsideClick';

import useAuth from '@/hooks/services/useAuth';

import { apiService } from '@/services';

import Routes from '@/router/routes';

export default function useGlobalHamberMenu() {
  const { user } = useAuth();

  const { openAuthPopup } = useAuthPopup();

  const { handleUpdateReturnUrl } = useReturnUrl();

  const [isOpen, setIsOpen] = useState(false);

  const [openVerificationAddressPopup, setOpenVerificationAddressPopup] = useState(false);

  const [openNeedMoreVerificationAddressPopup, setOpenNeedMoreVerificationAddressPopup] = useState(false);

  const router = useNextRouter();

  const outsideRef = useRef<HTMLDivElement | null>(null);

  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null);

  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'right-start',
    modifiers: [{ name: 'offset', options: { offset: [-30, 8] } }],
  });

  useOutsideClick({ ref: outsideRef, handler: () => setIsOpen(false) });

  const handleHambergerButtonClick = useCallback(() => setIsOpen((prev) => !prev), []);

  const handleClickQna = useCallback(() => {
    setIsOpen(false);
    router.push(`/${Routes.Qna}`);
  }, [router]);

  const handleClickListingCreateAddress = useCallback(async () => {
    setIsOpen(false);

    if (!user) {
      openAuthPopup('needVerify');
      handleUpdateReturnUrl(`/${Routes.My}?default=2`);
      return;
    }

    if (!user.isVerified) {
      router.push(`/${Routes.VerifyCi}`);
      handleUpdateReturnUrl(`/${Routes.My}?default=2`);
      return;
    }

    if (!user?.hasAddress) {
      setOpenVerificationAddressPopup(true);
    }

    if (user?.hasAddress) {
      const res = await apiService.listingEligibilityCheck({ id: null });

      if (res && !res?.is_eligible) {
        setOpenNeedMoreVerificationAddressPopup(true);
        return;
      }

      if (res && res?.is_eligible) {
        router.push({ pathname: `/${Routes.ListingSelectAddress}`, query: { origin: router.asPath } });
      }
    }
  }, [handleUpdateReturnUrl, openAuthPopup, router, user]);

  const handleClickAgentSite = useCallback(() => {
    setIsOpen(false);
    window.open(process.env.NEXT_PUBLIC_NEGOCIO_AGENT_CLIENT_URL, '_blank');
  }, []);

  const handleConfirmVerificationAddressPopup = useCallback(() => {
    setOpenVerificationAddressPopup(false);
    router.push({ pathname: `/${Routes.MyAddress}`, query: { origin: router.asPath } });
  }, [router]);

  const handleCloseVerificationAddressPopup = useCallback(() => {
    setOpenVerificationAddressPopup(false);
  }, []);

  const handleConfirmNeedMoreVerificationAddressPopup = useCallback(() => {
    setOpenNeedMoreVerificationAddressPopup(false);
    router.push({ pathname: `/${Routes.MyAddress}`, query: { origin: router.asPath } });
  }, [router]);

  const handleCloseNeedMoreVerificationAddressPopup = useCallback(() => {
    setOpenNeedMoreVerificationAddressPopup(false);
  }, []);

  return {
    styles,
    attributes,
    outsideRef,
    isOpen,
    openVerificationAddressPopup,
    openNeedMoreVerificationAddressPopup,
    handleHambergerButtonClick,
    setReferenceElement,
    setPopperElement,
    handleClickQna,
    handleClickListingCreateAddress,
    handleClickAgentSite,
    handleConfirmVerificationAddressPopup,
    handleConfirmNeedMoreVerificationAddressPopup,
    handleCloseVerificationAddressPopup,
    handleCloseNeedMoreVerificationAddressPopup,
  };
}
