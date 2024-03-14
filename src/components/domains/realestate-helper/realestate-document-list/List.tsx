import { useState, useCallback, useEffect } from 'react';

import { useRouter } from 'next/router';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import BottomFixedAnimationButton from '@/components/organisms/BottomFixedAnimationButton';

import ListItem from './ListItem';

import { ListContainer } from './widget/RealestateDocumentListWidget';

export default function List() {
  const [render, setRender] = useState(false);

  const { platform } = useCheckPlatform();

  const router = useRouter();

  const handleClickListItem = (item: number) => {
    console.log(item);
    console.log(router);
  };

  const handleClickRealestateDocumentCreate = useCallback(() => {}, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRender(true);
    }, 600);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <ListContainer>
      <ListItem
        lookupText="2024.01.01 조회"
        title="봇들마을9단지 금호어울림 아파트 101동 101호"
        subTitle="경기도 성남시 분당구 동판교로 156"
        handleClickItem={handleClickListItem}
      />
      {render && (
        <BottomFixedAnimationButton
          width={115}
          containerId="negocio-realestate-document-list"
          ctaTitle="신규조회"
          platform={platform}
          handleClick={handleClickRealestateDocumentCreate}
        />
      )}
    </ListContainer>
  );
}
