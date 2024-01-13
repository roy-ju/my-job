import SuggestDetail from './suggest-detail/SuggestDetail';

import MySuggestDetailProvider from './suggest-detail/provider';

interface MySuggestDetailProps {
  depth?: number;
}

export default function MySuggestDetail({ depth }: MySuggestDetailProps) {
  return (
    <MySuggestDetailProvider>
      <SuggestDetail depth={depth} />
    </MySuggestDetailProvider>
  );
}
