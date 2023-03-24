import { Panel } from '@/components/atoms';
import dynamic from 'next/dynamic';
import { ParsedUrlQuery } from 'querystring';
import Routes from './routes';

const My = dynamic(() => import('@/components/pages/My'), { ssr: false, loading: () => <Panel /> });
const NotificationList = dynamic(() => import('@/components/pages/NotificationList'), {
  ssr: false,
  loading: () => <Panel />,
});
const NotificationSettings = dynamic(() => import('@/components/pages/NotificationSettings'), {
  ssr: false,
  loading: () => <Panel />,
});
const Listings = dynamic(() => import('@/components/pages/Listings'), { loading: () => <Panel /> });
const ListingDetail = dynamic(() => import('@/components/pages/ListingDetail'), { loading: () => <Panel /> });
const ChatRoom = dynamic(() => import('@/components/pages/ChatRoom'), { ssr: false, loading: () => <Panel /> });
const DanjiDetail = dynamic(() => import('@/components/pages/DanjiDetail'), { loading: () => <Panel /> });
const ChatRoomList = dynamic(() => import('@/components/pages/ChatRoomList'), { ssr: false, loading: () => <Panel /> });
const Developer = dynamic(() => import('@/components/pages/Developer'), { ssr: false, loading: () => <Panel /> });
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
    case Routes.My: {
      return <My depth={depth} {...commonProps} />;
    }

    case Routes.NotificationList: {
      return <NotificationList depth={depth} {...commonProps} />;
    }

    case Routes.NotificationSettings: {
      return <NotificationSettings depth={depth} {...commonProps} />;
    }

    case Routes.ListingList: {
      return <Listings depth={depth} {...commonProps} />;
    }

    case Routes.ListingDetail: {
      return (
        <ListingDetail
          key={query.listingID as string}
          depth={depth}
          listingID={Number(query.listingID)}
          {...commonProps}
        />
      );
    }

    case Routes.ChatRoom: {
      return <ChatRoom key={query.chatRoomID as string} depth={depth} {...commonProps} />;
    }

    case Routes.ChatRoomList: {
      return <ChatRoomList depth={depth} {...commonProps} />;
    }

    case Routes.DanjiDetail: {
      return <DanjiDetail depth={depth} {...commonProps} />;
    }

    case Routes.Developer: {
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
