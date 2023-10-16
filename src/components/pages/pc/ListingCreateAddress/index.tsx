// import { useRouter as useNextRouter } from 'next/router';
// import { AuthRequired, Panel } from '@/components/atoms';
// import { ListingCreateAddress } from '@/components/templates';
// import { KakaoAddressAutocompleteResponseItem } from '@/hooks/services/useKakaoAddressAutocomplete';
// import { useRouter } from '@/hooks/utils';
// import Routes from '@/router/routes';
// import { memo, useCallback, useState, useRef } from 'react';
// import { OverlayPresenter } from '@/components/molecules';

// import useOutsideClick from '@/hooks/utils/useOutsideClick';
// import { ListingCreateGuidePopup } from '@/components/organisms';

// interface Props {
//   depth: number;
//   panelWidth: string;
// }

// export default memo(({ depth, panelWidth }: Props) => {
//   const router = useRouter(depth);
//   const nextRouter = useNextRouter();
//   const [isPopupOpen, setIsPopupOpen] = useState(true);

//   const outsideRef = useRef<HTMLDivElement | null>(null);

//   const handleSubmit = useCallback(
//     (value: KakaoAddressAutocompleteResponseItem) => {
//       router.replace(Routes.ListingCreateAddressDetail, {
//         searchParams: {
//           danjiID: router?.query?.danjiID ? (router.query.danjiID as string) : '',
//           redirect: router?.query?.redirect ? (router.query.redirect as string) : '',
//         },
//         state: {
//           addressData: JSON.stringify(value),
//           ...(router.query.origin
//             ? {
//                 origin: router.query.origin as string,
//               }
//             : {}),
//         },
//       });
//     },
//     [router],
//   );

//   const handleClickBack = useCallback(() => {
//     if (nextRouter.query.origin) {
//       nextRouter.replace(nextRouter.query.origin as string);
//     }
//   }, [nextRouter]);

//   useOutsideClick({ ref: outsideRef, handler: () => setIsPopupOpen(false) });

//   return (
//     <AuthRequired ciRequired depth={depth}>
//       <Panel width={panelWidth}>
//         <ListingCreateAddress onSubmit={handleSubmit} onClickBack={router.query.origin ? handleClickBack : undefined} />
//         {isPopupOpen && (
//           <OverlayPresenter>
//             <ListingCreateGuidePopup
//               ref={outsideRef}
//               isPopupOpen={isPopupOpen}
//               onClickClosePopup={() => setIsPopupOpen(false)}
//             />
//           </OverlayPresenter>
//         )}
//       </Panel>
//     </AuthRequired>
//   );
// });

function Index() {
  return null;
}

export default Index;
