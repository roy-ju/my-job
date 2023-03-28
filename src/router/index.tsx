import { Panel } from '@/components/atoms';
import dynamic from 'next/dynamic';
import { ParsedUrlQuery } from 'querystring';
import Routes from './routes';

const My = dynamic(() => import('@/components/pages/My'), { ssr: false, loading: () => <Panel /> });
const MyDetail = dynamic(() => import('@/components/pages/MyDetail'), { ssr: false, loading: () => <Panel /> });
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
const Deregister = dynamic(() => import('@/components/pages/Deregister'), { ssr: false, loading: () => <Panel /> });

const DEFAULT_PANEL_WIDTH = '380px';

interface Props {
  route: string; // url segments 에서 가장 우측에 위치한 segment
  query: ParsedUrlQuery; // 쿼리 파라미터
  depth: number; // route segment 의 depth
}

export default function Router({ route, query, depth }: Props) {
  const props = {
    panelWidth: DEFAULT_PANEL_WIDTH,
    depth,
  };

  switch (route) {
    case Routes.My: {
      return <My {...props} />;
    }

    case Routes.MyDetail: {
      return <MyDetail {...props} />;
    }

    case Routes.NotificationList: {
      return <NotificationList {...props} />;
    }

    case Routes.NotificationSettings: {
      return <NotificationSettings {...props} />;
    }

    case Routes.Deregister: {
      return <Deregister {...props} />;
    }

    case Routes.ListingList: {
      return <Listings {...props} />;
    }

    case Routes.ListingDetail: {
      return <ListingDetail key={query.listingID as string} listingID={Number(query.listingID)} {...props} />;
    }

    case Routes.ChatRoom: {
      return <ChatRoom key={query.chatRoomID as string} {...props} />;
    }

    case Routes.ChatRoomList: {
      return <ChatRoomList {...props} />;
    }

    case Routes.DanjiDetail: {
      return <DanjiDetail {...props} />;
    }

    case Routes.Developer: {
      if (process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test') {
        return <Developer {...props} />;
      }
      return <NotFound {...props} />;
    }

    default: {
      return <NotFound {...props} />;
    }
  }
}
