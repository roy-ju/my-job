/* eslint-disable @typescript-eslint/no-unused-vars */
// import { useRouter as useNextRouter } from 'next/router';
import useAPI_GetLawQna from '@/apis/lawQna/getLawQna';
import { lawQnaDislike, lawQnaLike } from '@/apis/lawQna/lawQnaLike';
import { Panel } from '@/components/atoms';

import LegalCounselingSearch from '@/components/templates/LegalCounselingSearch';
import { useAuth } from '@/hooks/services';
import { useRouter } from '@/hooks/utils';

// import { useRouter } from '@/hooks/utils';

import Routes from '@/router/routes';
import { useRouter as useNextRouter } from 'next/router';

// import { useRouter as useNextRouter } from 'next/router';

import { memo, useCallback } from 'react';

interface Props {
  depth: number;
  panelWidth: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);

  const nextRouter = useNextRouter();

  const handleClickBack = () => {
    nextRouter.back();
  };

  const onSummit = (value: string) => {
    if (!value) {
      nextRouter.push(`/${Routes.LawQna}`);
    } else {
      nextRouter.push({
        pathname: `/${Routes.LawQna}`,
        query: {
          search: value,
        },
      });
    }
  };

  return (
    <Panel width={panelWidth}>
      <LegalCounselingSearch onClickBack={handleClickBack} onSubmit={onSummit} />
    </Panel>
  );
});
