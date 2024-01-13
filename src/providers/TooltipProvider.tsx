import { OverlayPresenter, Popup } from '@/components/molecules';

import useTooltip from '@/states/hooks/useTooltip';

import Tooltips from '@/constants/tooltips';

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
