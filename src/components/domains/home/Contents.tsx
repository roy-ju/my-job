import { MarginTopFourty } from '@/components/atoms/Margin';

import SuggestForm from './SuggestForm';

import RealestateHelper from './RealestateHelper';

import LawQna from './LawQna';

export default function Contents() {
  return (
    <main>
      <SuggestForm />
      <MarginTopFourty />
      <RealestateHelper />
      <MarginTopFourty />
      <LawQna />
      <MarginTopFourty />
    </main>
  );
}
