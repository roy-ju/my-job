import { useState, useCallback, useEffect } from 'react';

import { useRecoilValue } from 'recoil';

import useDanjiInteraction from '@/states/hooks/useDanjiInteraction';

import danjiInteractionAtom from '@/states/atom/danjiInteraction';

import { SchoolType } from '@/constants/enums';

import { DanjiDetailResponse } from '@/services/danji/types';

export default function useSchoolInfoHandler({
  danji,
  preselectedSchoolType,
}: {
  danji: DanjiDetailResponse;
  preselectedSchoolType: number;
}) {
  const interactionStore = useDanjiInteraction({ danjiData: danji });

  const interactionState = useRecoilValue(danjiInteractionAtom);

  const [selectedSchoolID, setSelectedSchoolID] = useState<string>();

  const [selectedIndex, setSelctedIndex] = useState<number>();

  const [selectedSchoolType, setSelectedSchoolType] = useState(preselectedSchoolType);

  const [disabled, setDiasbled] = useState<boolean>(false);

  const [processingMap, setProcessingMap] = useState<boolean>(false);

  const [isClickMore, setIsClickMore] = useState<boolean>(false);

  const handleChangeSelectedSchoolType = useCallback((val: number) => {
    setSelectedSchoolID('');
    setSelectedSchoolType(val);
    setIsClickMore(false);
  }, []);

  const handleClickHakgudo = useCallback(async () => {
    if (disabled) return;

    setSelectedSchoolID('');
    setDiasbled(true);

    try {
      if (interactionState.school) {
        interactionStore.makeSchoolOff();
      } else {
        await interactionStore.makeSchoolOn();
        interactionStore.makeAroundOff();
        interactionStore.makeAroundMarkerDefault();
        interactionStore.makeSelectedAroundDefault();
        interactionStore.makeDanjiAroundPlaceName('');
      }
    } catch (error) {
      console.log(error);
    }

    setDiasbled(false);
  }, [disabled, interactionState.school, interactionStore]);

  const handleSchoolItem = async (id: string) => {
    if (processingMap) return;

    setProcessingMap(true);

    try {
      if (!interactionState.school) {
        await interactionStore.makeSchoolOn(() =>
          setTimeout(() => interactionStore.makeSelectedSchool(`schoolMarker:${id}`), 200),
        );

        interactionStore.makeAroundOff();
        interactionStore.makeAroundMarkerDefault();
        interactionStore.makeSelectedAroundDefault();
        interactionStore.makeDanjiAroundPlaceName('');
      } else {
        setTimeout(() => interactionStore.makeSelectedSchool(`schoolMarker:${id}`), 200);
      }
    } catch (error) {
      //
    }

    setProcessingMap(false);
  };

  const handleClickListItem = (id: string) => {
    setSelectedSchoolID(id);
    handleSchoolItem(id);
  };

  const handleUpdateMoreButtonState = useCallback(() => {
    if (!isClickMore) {
      setIsClickMore(true);
    } else {
      setIsClickMore(false);
    }
  }, [isClickMore]);

  useEffect(() => {
    if (interactionState.selectedSchoolMarker) {
      if (interactionState.selectedSchoolMarker.type === 'elementary') {
        setSelectedSchoolType(SchoolType.ElementarySchool);
      }
      if (interactionState.selectedSchoolMarker.type === 'middle') {
        setSelectedSchoolType(SchoolType.MiddleSchool);
      }
      if (interactionState.selectedSchoolMarker.type === 'high') {
        setSelectedSchoolType(SchoolType.HighSchool);
      }
    }
  }, [interactionState.selectedSchoolMarker]);

  useEffect(() => {
    if (typeof selectedIndex === 'number' && selectedIndex > 2) {
      setIsClickMore(true);
    }
  }, [selectedIndex]);

  useEffect(() => {
    if (!interactionState.school) {
      setSelectedSchoolID('');
    }
  }, [interactionState.school]);

  return {
    interactionState,
    interactionStore,

    selectedSchoolID,

    selectedSchoolType,
    setSelectedSchoolType,

    setSelctedIndex,

    isClickMore,

    handleChangeSelectedSchoolType,
    handleUpdateMoreButtonState,

    handleClickHakgudo,
    handleClickListItem,
  };
}
