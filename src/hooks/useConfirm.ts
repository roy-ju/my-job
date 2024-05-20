export default function useConfirm({
  onCancel,
  onConfirm,
  message,
}: {
  message: string;
  onConfirm?: () => {};
  onCancel?: () => {};
}) {
  if (!onConfirm || typeof onConfirm !== 'function') {
    return;
  }
  if (onCancel && typeof onCancel !== 'function') {
    return;
  }

  const confirmAction = () => {
    if (window.confirm(message)) {
      onConfirm?.();
    } else {
      onCancel?.();
    }
  };

  return confirmAction;
}
