import { Fragment } from 'react';

import { GuideListItem } from '@/services/sub-home/types';

import Seperator from '../dictionary/widget/Seperator';

import useHandleDetailRouter from './hooks/useHandleDetailRouter';

import {
  BottomContainer,
  BottomContentsBody,
  BottomContentsDict,
  BottomContentsTitle,
  BottomContentsWrraper,
  GoListButton,
} from './widget/DetailBottomWidget';

import { contentsVariants, contentVariants } from './constants/animations';

type DetailBottomProps = {
  relatedTerms?: GuideListItem[];
};

export default function DetailBottom({ relatedTerms }: DetailBottomProps) {
  const totalCount = relatedTerms?.length ?? 0;

  const { handleGoDictList, handleGoDictDetail } = useHandleDetailRouter();

  return (
    <BottomContainer variants={contentVariants}>
      <BottomContentsWrraper>
        <BottomContentsTitle>
          <span>연관용어</span>
          <span>{totalCount}개</span>
        </BottomContentsTitle>

        <BottomContentsBody initial="hidden" animate="visible" variants={contentsVariants}>
          {relatedTerms?.map((item, idx) => (
            <Fragment key={item.id}>
              <BottomContentsDict variants={contentVariants} value={item.id} onClick={handleGoDictDetail}>
                <span>{item.name}</span>
                <p>{item.content}</p>
              </BottomContentsDict>
              {relatedTerms.length !== idx + 1 && <Seperator tw="my-0" />}
            </Fragment>
          ))}
        </BottomContentsBody>
      </BottomContentsWrraper>

      <GoListButton onClick={handleGoDictList}>목록으로 이동</GoListButton>
    </BottomContainer>
  );
}
