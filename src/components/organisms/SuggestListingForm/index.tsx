import { ReactNode } from 'react';
import BasicInfo from './BasicInfo';
import GuideInfo from './GuideInfo';
import SuggestForm from './SuggestForm';

interface Props {
  children: ReactNode;
}

function SuggestListingForm({ children }: Props) {
  return <>{children}</>;
}

export default Object.assign(SuggestListingForm, {
  Info: BasicInfo,
  Guide: GuideInfo,
  Form: SuggestForm,
});
