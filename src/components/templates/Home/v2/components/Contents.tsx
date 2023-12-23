import { Separator } from '@/components/atoms';

import SuggestForm from './SuggestForm';

import Guide from './Guide';

type ContentsProps = {
  handleOpenDanjiListPopup: () => void;
};

export default function Contents({ handleOpenDanjiListPopup }: ContentsProps) {
  return (
    <>
      <SuggestForm />
      <Guide handleOpenDanjiListPopup={handleOpenDanjiListPopup} />
      <Separator tw="bg-gray-200 h-2" />
    </>
  );
}
