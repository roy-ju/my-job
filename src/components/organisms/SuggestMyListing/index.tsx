import { ReactNode } from 'react';
import BasicInfo from './BasicInfo';
import GuideInfo from './GuideInfo';
import SuggestForm from './SuggestForm';

interface Props {
  children: ReactNode;
}

function SuggestMyListing({ children }: Props) {
  return <>{children}</>;
}

export default Object.assign(SuggestMyListing, {
  Info: BasicInfo,
  Guide: GuideInfo,
  Form: SuggestForm,
});
