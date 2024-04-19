import { MarginTopFourty } from '@/components/atoms/Margin';

import useFetchHomeSuggestInfo from '@/services/home/useFetchHomeSuggestInfo';

import SuggestDashboard from './SuggestDashboard';

import SuggestForm from './SuggestForm';

import RealestateHelper from './RealestateHelper';

import LawQna from './LawQna';

export default function Contents() {
  const { data } = useFetchHomeSuggestInfo();

  return (
    <main>
      {data?.suggest_sent_count ? <SuggestDashboard data={data} /> : <SuggestForm />}
      <MarginTopFourty />
      <RealestateHelper />
      <MarginTopFourty />
      <LawQna />
      <MarginTopFourty />
    </main>
  );
}
