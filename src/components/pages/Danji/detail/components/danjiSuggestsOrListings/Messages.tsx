import React, { useMemo } from 'react';

import useCheckListsExisted from '../../hooks/useCheckListsExisted';

import useCheckSuggestsOrListings from '../../hooks/useCheckSuggestsOrListings';

function Messages() {
  const { type } = useCheckSuggestsOrListings();

  const { isExistedListings, isExistedSuggest } = useCheckListsExisted();

  const isRender = useMemo(
    () => (type === 'suggest' ? isExistedSuggest : isExistedListings),
    [type, isExistedListings, isExistedSuggest],
  );

  if (!isRender) return null;

  return type === 'suggest' ? (
    <h2 tw="text-info text-gray-700 whitespace-pre-wrap">{`중개사와 집주인의 연락을\n기다리고 있는 요청이에요.`}</h2>
  ) : (
    <h2 tw="text-info text-gray-700 whitespace-pre-wrap">{`매수인, 임차인의 가격 제안을\n기다리고 있는 매물이에요.`}</h2>
  );
}

export default Messages;
