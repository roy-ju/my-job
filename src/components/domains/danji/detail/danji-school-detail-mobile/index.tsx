import { useEffect } from 'react';

import Button from '@/components/atoms/Button';

import Container from '@/components/atoms/Container';

import { NavigationHeader } from '@/components/molecules';

import useMobileDanjiInteraction from '@/states/hooks/useMobileDanjiInteraction';

import CloseIcon from '@/assets/icons/close_18.svg';

import DanjiSchoolMapCard from '../danji-school-map-card';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  if (!lng || !lat) return null;

  return (
    <Container>
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
    </Container>
  );
}
