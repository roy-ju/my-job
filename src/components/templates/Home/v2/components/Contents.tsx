import { Separator } from '@/components/atoms';

import SuggestForm from './SuggestForm';

import Guide from './Guide';

type ContentsProps = {
  handleOpenRegisterMyHomePopup: () => void;
  handleOpenDanjiListPopup: () => void;
};

export default function Contents({ handleOpenRegisterMyHomePopup, handleOpenDanjiListPopup }: ContentsProps) {
  return (
    <>
      <SuggestForm />
      <Guide
        handleOpenRegisterMyHomePopup={handleOpenRegisterMyHomePopup}
        handleOpenDanjiListPopup={handleOpenDanjiListPopup}
      />
      <Separator tw="bg-gray-200 h-2" />
    </>
  );
}
