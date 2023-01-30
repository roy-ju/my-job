import dynamic from 'next/dynamic';
import { ParsedUrlQuery } from 'querystring';

function LoadingPanel() {
  return <div>loading...</div>;
}

const Listings = dynamic(() => import('@/components/pages/Listings'), {
  loading: () => <LoadingPanel />,
});

const ListingDetail = dynamic(
  () => import('@/components/pages/ListingDetail'),
  {
    loading: () => <LoadingPanel />,
  },
);

const ChatRoom = dynamic(() => import('@/components/pages/ChatRoom'), {
  loading: () => <LoadingPanel />,
});

type Props = {
  route: string;
  query: ParsedUrlQuery;
  depth: number;
};

export default function Router({ route, query, depth }: Props) {
  switch (route) {
    case 'listings': {
      return <Listings depth={depth} />;
    }
    case 'listingDetail': {
      return (
        <ListingDetail depth={depth} listingID={Number(query.listingID)} />
      );
    }
    case 'chatRoom': {
      return <ChatRoom depth={depth} />;
    }
    default: {
      return (
        <div>
          depth: {depth} <br />
          unknown: {route}
        </div>
      );
    }
  }
}
