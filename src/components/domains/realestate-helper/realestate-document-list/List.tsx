import { useCallback } from 'react';

import { useRouter } from 'next/router';

import { RealestateDocumentListItem } from '@/services/sub-home/types';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

import ListItem from './ListItem';

import { ListContainer } from './widget/RealestateDocumentListWidget';

import makeTitle from './utils/makeSubTitle';

type ListProps = { list: RealestateDocumentListItem[] };

export default function List({ list }: ListProps) {
  const router = useRouter();

  const { platform } = useCheckPlatform();

  const handleClickListItem = useCallback(
    (id: number) => {
      console.log(id);
      if (!id) return null;

      if (platform === 'pc') {
        const depth1 = router?.query?.depth1 ?? '';
        const depth2 = router?.query?.depth2 ?? '';
        const query = router.query;

        delete query.depth1;
        delete query.depth2;
        delete query.addressData;
        delete query.dong;
        delete query.ho;

        if (depth1 && depth2) {
          if (depth1 === Routes.RealestateDocumentList) {
            router.replace({
              pathname: `/${Routes.RealestateDocumentDetail}/${depth2}`,
              query: {
                ...query,
                realestatedDocumentID: `${id}`,
              },
            });
          } else {
            router.replace({
              pathname: `/${depth1}/${Routes.RealestateDocumentDetail}`,
              query: {
                ...query,
                realestatedDocumentID: `${id}`,
              },
            });
          }
        } else if (depth1 && !depth2) {
          router.replace({
            pathname: `/${Routes.RealestateDocumentDetail}`,
            query: {
              ...query,
              realestatedDocumentID: `${id}`,
            },
          });
        }
      }

      if (platform === 'mobile') {
        router.push({
          pathname: `/${Routes.EntryMobile}/${Routes.RealestateDocumentDetail}?realestatedDocumentID=${id}`,
        });
      }
    },
    [platform, router],
  );

  return (
    <ListContainer>
      {list.map((item) => (
        <ListItem
          key={item.id}
          lookupText="2024.01.01 조회"
          title={makeTitle({ item }).firstLine}
          subTitle={makeTitle({ item }).secondLine}
          handleClickItem={() => handleClickListItem(item.id)}
        />
      ))}
    </ListContainer>
  );
}
