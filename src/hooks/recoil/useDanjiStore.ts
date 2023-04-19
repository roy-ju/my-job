import { danjiButtonState } from '@/states/danjiButton';
import { useRecoilState } from 'recoil';

export default function useDanjiStore() {
  const [buttonState, setButtonState] = useRecoilState(danjiButtonState);

  const handleSchoolButton = () => {
    setButtonState((prev) => ({ ...prev, school: !prev.school }));
  };

  const handleAroundButton = () => {
    setButtonState((prev) => ({ ...prev, around: !prev.around }));
  };

  return {
    buttonState,
    handleSchoolButton,
    handleAroundButton,
  };
}
