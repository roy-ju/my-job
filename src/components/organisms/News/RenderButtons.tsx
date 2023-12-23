import ChevronLeftIcon from '@/assets/icons/chevron_left_24.svg';

export function renderLeftButton(props: any) {
  return (
    <button
      type="button"
      {...props}
      tw="absolute top-1/2 left-0 -translate-y-1/2 bg-white z-10 px-1.5 py-1 rounded-r-[32px] border-r border-b border-t border-gray-300"
      style={{
        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.14)',
      }}
    >
      <ChevronLeftIcon />
    </button>
  );
}

export function renderRightButton(props: any) {
  return (
    <button
      type="button"
      {...props}
      tw="absolute top-1/2 right-0 -translate-y-1/2 bg-white z-10 px-1.5 py-1 rounded-l-[32px] border-l border-b border-t border-gray-300"
      style={{
        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.14)',
      }}
    >
      <ChevronLeftIcon tw="rotate-180" />
    </button>
  );
}
