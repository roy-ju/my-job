import dynamic from 'next/dynamic';
import { ParsedUrlQuery } from 'querystring';

const Listings = dynamic(() => import('@/components/pages/Listings'));
const ListingDetail = dynamic(() => import('@/components/pages/ListingDetail'));
const ChatRoom = dynamic(() => import('@/components/pages/ChatRoom'));
const DanjiDetail = dynamic(() => import('@/components/pages/DanjiDetail'));
const ReportListing = dynamic(() => import('@/components/pages/ReportListing'));

const DEFAULT_PANEL_WIDTH = '375px';
const DEFAULT_PANEL_ANIMATION_DURATION = 0.3;

const commonProps = {
  panelWidth: DEFAULT_PANEL_WIDTH,
  panelAnimationDuration: DEFAULT_PANEL_ANIMATION_DURATION,
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
      return <ChatRoom depth={depth} {...commonProps} />;
    }
    case 'danjiDetail': {
      return <DanjiDetail depth={depth} {...commonProps} />;
    }
    case 'reportListing': {
      return <ReportListing depth={depth} {...commonProps} />;
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
