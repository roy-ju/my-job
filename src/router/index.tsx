import { Panel } from '@/components/atoms';
import dynamic from 'next/dynamic';
import { ParsedUrlQuery } from 'querystring';

const Listings = dynamic(() => import('@/components/pages/Listings'), { loading: () => <Panel /> });
const ListingDetail = dynamic(() => import('@/components/pages/ListingDetail'), { loading: () => <Panel /> });
const ChatRoom = dynamic(() => import('@/components/pages/ChatRoom'), { ssr: false, loading: () => <Panel /> });
const DanjiDetail = dynamic(() => import('@/components/pages/DanjiDetail'), { loading: () => <Panel /> });
const ReportListing = dynamic(() => import('@/components/pages/ReportListing'), { loading: () => <Panel /> });
const ChatRoomList = dynamic(() => import('@/components/pages/ChatRoomList'), { ssr: false, loading: () => <Panel /> });
const Developer = dynamic(() => import('@/components/pages/Developer'), { loading: () => <Panel /> });
const NotFound = dynamic(() => import('@/components/pages/NotFound'), { loading: () => <Panel /> });

const DEFAULT_PANEL_WIDTH = '380px';

const commonProps = {
  panelWidth: DEFAULT_PANEL_WIDTH,
};

interface Props {
  route: string; // url segments 에서 가장 우측에 위치한 segment
  query: ParsedUrlQuery; // 쿼리 파라미터
  depth: number; // route segment 의 depth
}

export default function Router({ route, query, depth }: Props) {
  switch (route) {
    case 'listings': {
      return <Listings depth={depth} {...commonProps} />;
    }
    case 'listingDetail': {
      return (
        <ListingDetail
          key={query.listingID as string}
          depth={depth}
          listingID={Number(query.listingID)}
          {...commonProps}
        />
      );
    }
    case 'chatRoom': {
      return <ChatRoom key={query.chatRoomID as string} depth={depth} {...commonProps} />;
    }
    case 'chatRoomList': {
      return <ChatRoomList depth={depth} {...commonProps} />;
    }
    case 'danjiDetail': {
      return <DanjiDetail depth={depth} {...commonProps} />;
    }
    case 'reportListing': {
      return <ReportListing depth={depth} {...commonProps} />;
    }
    case 'developer': {
      if (process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test') {
        return <Developer depth={depth} {...commonProps} />;
      }
      return <NotFound depth={depth} {...commonProps} />;
    }
    default: {
      return <NotFound depth={depth} {...commonProps} />;
    }
  }
}
