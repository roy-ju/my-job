/* eslint-disable react-hooks/exhaustive-deps */
import CloseIcon from '@/assets/icons/close_18.svg';
import { Button } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import useMobileDanjiInteraction from '@/states/hooks/useMobileDanjiInteraction';

import { useEffect } from 'react';
import DanjiSchoolMapCard from './DanjiSchoolMapCard';

export default function DanjiSchoolDetail({
  lng,
  lat,
  danjiID,
  rt,
}: {
  lng?: number;
  lat?: number;
  danjiID?: number;
  rt?: number;
}) {
  const { makeFalseSchool } = useMobileDanjiInteraction();

  useEffect(
    () => () => {
      sessionStorage.removeItem('danji-selected-school');
      makeFalseSchool();
    },
    [],
  );

  if (!lng || !lat) return null;

  return (
    <div tw="flex flex-col w-full h-full">
      <NavigationHeader>
        <NavigationHeader.Title>학구도</NavigationHeader.Title>
        <Button
          variant="ghost"
          tw="p-0"
          onClick={() => {
            makeFalseSchool();
          }}
        >
          <CloseIcon />
        </Button>
      </NavigationHeader>
      <DanjiSchoolMapCard lng={lng} lat={lat} danjiID={danjiID} rt={rt} />
    </div>
  );
}
