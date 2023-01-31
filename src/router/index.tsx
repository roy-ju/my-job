import dynamic from 'next/dynamic';
import { ParsedUrlQuery } from 'querystring';

const Listings = dynamic(() => import('@/components/pages/Listings'));
const ListingDetail = dynamic(() => import('@/components/pages/ListingDetail'));
const ChatRoom = dynamic(() => import('@/components/pages/ChatRoom'));

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
