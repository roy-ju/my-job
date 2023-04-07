// import { Button } from '@/components/atoms';
// import { NavigationHeader } from '@/components/molecules';
// import { useControlled } from '@/hooks/utils';
// import { useCallback, useState } from 'react';
// import FormRenderer from './FormRenderer';

// export interface ListingCreateFormProps {
//   isOwner?: boolean;
//   ownerName?: boolean;
//   ownerPhone?: boolean;
//   buyOrRent?: boolean;
// }

// export default function ListingCreateForm() {
//   const [isOwner, setIsOwner] = useControlled({ controlled: undefined, default: true });

//   const [forms, setForms] = useState<string[]>([]);

//   const handleClickNext = useCallback(() => {}, []);

//   return (
//     <div tw="flex flex-col h-full">
//       <NavigationHeader>
//         <NavigationHeader.Title>매물등록 신청</NavigationHeader.Title>
//       </NavigationHeader>

//       <div tw="px-5 pt-5">
//         <Button onClick={handleClickNext} tw="w-full" size="bigger">
//           다음
//         </Button>
//       </div>
//     </div>
//   );
// }
export {};
