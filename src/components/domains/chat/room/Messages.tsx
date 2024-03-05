import { VariableSizeList as List } from 'react-window';

import AutoSizer from 'react-virtualized-auto-sizer';

import { Loading } from '@/components/atoms';

import useChatMessages from './hooks/useChatMessages';

export default function Messages() {
  const { isLoading, chatMessages, lists, scrolled, setLists, getItemSize, renderRow } = useChatMessages();

  return (
    <div tw="flex flex-col flex-1 min-h-0 overflow-y-hidden bg-white">
      {isLoading ? (
        <Loading tw="text-center mt-10" />
      ) : (
        <div tw="flex-1 min-h-0" style={{ opacity: scrolled ? 1 : 0 }}>
          <AutoSizer>
            {({ width, height }) => (
              <List
                ref={setLists}
                height={height ?? 0}
                width={width ?? 0}
                itemCount={chatMessages.length}
                itemSize={getItemSize}
                onItemsRendered={({ overscanStartIndex }) => {
                  lists?.resetAfterIndex(overscanStartIndex);
                }}
              >
                {renderRow}
              </List>
            )}
          </AutoSizer>
        </div>
      )}
    </div>
  );
}
