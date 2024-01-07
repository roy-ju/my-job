// import { Panel } from '@/components/atoms';

// import { memo, useState } from 'react';

// import { RecommendationForm as RecommendationFormTemplate } from '@/components/templates';

// import { OverlayPresenter } from '@/components/molecules';

// import { useRouter } from '@/hooks/utils';

// import { DanjiList } from '@/components/organisms';

// import Routes from '@/router/routes';

// import { useRouter as useNextRouter } from 'next/router';

// import RegionForm from '../SuggestRegionalForm/RegionForm';

// interface Props {
//   depth: number;
//   panelWidth?: string;
// }

// export default memo(({ depth, panelWidth }: Props) => {
//   const [selectedButton, setSelectedButton] = useState<'region' | 'danji' | 'none'>('none');
//   const router = useRouter(depth);
//   const nextRouter = useNextRouter();

//   const handleOpenRegionList = () => {
//     setSelectedButton('region');
//   };
//   const handleCloseModal = () => {
//     setSelectedButton('none');
//   };

//   const handleOpenDanjiList = () => {
//     setSelectedButton('danji');
//   };

//   return (
//     <Panel width={panelWidth}>
//       <RecommendationFormTemplate
//         selectedButton={selectedButton}
//         handleOpenRegionList={handleOpenRegionList}
//         handleOpenDanjiList={handleOpenDanjiList}
//         onClickBack={
//           router.query.back
//             ? () => {
//                 nextRouter.replace(router.query.back as string);
//               }
//             : () => {
//                 nextRouter.replace('/');
//               }
//         }
//       />
//       {selectedButton === 'region' && (
//         <OverlayPresenter>
//           <div tw="bg-white w-[380px] h-[600px] rounded-lg shadow">
//             <RegionForm
//               onClickClose={handleCloseModal}
//               onSubmit={(item) => {
//                 handleCloseModal();

//                 router.replace(Routes.SuggestRegionalForm, {
//                   searchParams: {
//                     address: item.name,
//                     back: router.asPath as string,
//                   },
//                 });
//               }}
//             />
//           </div>
//         </OverlayPresenter>
//       )}
//       {selectedButton === 'danji' && (
//         <OverlayPresenter>
//           <div tw="bg-white w-[380px] h-[600px] rounded-lg shadow">
//             <DanjiList tw="h-full">
//               <DanjiList.Header onClickClose={handleCloseModal} />
//               <DanjiList.AddressSearchForm
//                 onSubmit={(danjiID) => {
//                   handleCloseModal();

//                   router.replace(Routes.DanjiRecommendation, {
//                     searchParams: {
//                       danjiID: `${danjiID}`,
//                       redirect: router.asPath as string,
//                       back: 'true',
//                     },
//                   });
//                 }}
//               />
//             </DanjiList>
//           </div>
//         </OverlayPresenter>
//       )}
//     </Panel>
//   );
// });

import { memo } from 'react';

import Panel from '@/components/atoms/Panel';

import SuggestForm from '@/components/suggest/SuggestForm';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => (
  <Panel width={panelWidth}>
    <SuggestForm depth={depth} />
  </Panel>
));
