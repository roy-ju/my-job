import { OverlayPresenter, Popup } from '@/components/molecules';
import Tooltips from '@/constants/tooltips';
import useTooltip from '@/states/tooltip';

export default function TooltipProvider() {
  const { activeTooltip, closeTooltip } = useTooltip();

  if (activeTooltip !== '') {
    return (
      <OverlayPresenter>
        <Popup>
          <Popup.ContentGroup>
            <Popup.Title>{Tooltips[activeTooltip]?.title}</Popup.Title>
            <Popup.Body>
              <p tw="whitespace-pre-wrap">{Tooltips[activeTooltip]?.body}</p>
            </Popup.Body>
          </Popup.ContentGroup>
          <Popup.ButtonGroup>
            <Popup.ActionButton onClick={closeTooltip}>확인</Popup.ActionButton>
          </Popup.ButtonGroup>
        </Popup>
      </OverlayPresenter>
    );
  }

  return null;
}
