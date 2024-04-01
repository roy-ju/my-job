import { memo } from 'react';

import { TitlesWrraper } from './widget/SpecialTermsWidget';

function Titles() {
  return (
    <TitlesWrraper>
      <p>특약사항 예시</p>
      <p>상황과 조건에 맞게 특약 사항 예시를 활용해보세요.</p>
    </TitlesWrraper>
  );
}

export default memo(Titles);
