/**
 * PC에서 사용되는 라우터
 * Mobile에서는 src/pages 디렉토리를 사용한다.
 */

import { Panel } from '@/components/atoms';
import dynamic from 'next/dynamic';
import { ParsedUrlQuery } from 'querystring';
import Routes from './routes';

const My = dynamic(() => import('@/components/pages/pc/My'), { ssr: false, loading: () => <Panel /> });
const MyAddress = dynamic(() => import('@/components/pages/pc/MyAddress'), { ssr: false, loading: () => <Panel /> });
const MyAddressDetail = dynamic(() => import('@/components/pages/pc/MyAddressDetail'), {
  ssr: false,
  loading: () => <Panel />,
});
const MyAddressDetailVerifying = dynamic(() => import('@/components/pages/pc/MyAddressVerifying'), {
  ssr: false,
  loading: () => <Panel />,
});
const MyDetail = dynamic(() => import('@/components/pages/pc/MyDetail'), { ssr: false, loading: () => <Panel /> });
const NotificationList = dynamic(() => import('@/components/pages/pc/NotificationList'), {
  ssr: false,
  loading: () => <Panel />,
});
const NotificationSettings = dynamic(() => import('@/components/pages/pc/NotificationSettings'), {
  ssr: false,
  loading: () => <Panel />,
});
const NoticeList = dynamic(() => import('@/components/pages/pc/NoticeList'), { ssr: false, loading: () => <Panel /> });
const NoticeDetail = dynamic(() => import('@/components/pages/pc/NoticeDetail'), {
  ssr: false,
  loading: () => <Panel />,
});
const ServiceContact = dynamic(() => import('@/components/pages/pc/ServiceContact'), {
  ssr: false,
  loading: () => <Panel />,
});
const Login = dynamic(() => import('@/components/pages/pc/Login'), { ssr: false, loading: () => <Panel /> });
const Listings = dynamic(() => import('@/components/pages/pc/Listings'), { loading: () => <Panel /> });
const ListingDetail = dynamic(() => import('@/components/pages/pc/ListingDetail'), { loading: () => <Panel /> });
const ChatRoom = dynamic(() => import('@/components/pages/pc/ChatRoom'), { ssr: false, loading: () => <Panel /> });
const DanjiDetail = dynamic(() => import('@/components/pages/pc/DanjiDetail'), { loading: () => <Panel /> });
const ChatRoomList = dynamic(() => import('@/components/pages/pc/ChatRoomList'), {
  ssr: false,
  loading: () => <Panel />,
});
const Developer = dynamic(() => import('@/components/pages/pc/Developer'), { ssr: false, loading: () => <Panel /> });
const NotFound = dynamic(() => import('@/components/pages/pc/NotFound'), { loading: () => <Panel /> });
const Deregister = dynamic(() => import('@/components/pages/pc/Deregister'), { ssr: false, loading: () => <Panel /> });

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

    case Routes.MyAddress: {
      return <MyAddress {...props} />;
    }

    case Routes.MyAddressDetail: {
      return <MyAddressDetail {...props} />;
    }

    case Routes.MyAddressVerifying: {
      return <MyAddressDetailVerifying {...props} />;
    }

    case Routes.NotificationList: {
      return <NotificationList {...props} />;
    }

    case Routes.NotificationSettings: {
      return <NotificationSettings {...props} />;
    }

    case Routes.NoticeList: {
      return <NoticeList {...props} />;
    }

    case Routes.NoticeDetail: {
      return <NoticeDetail {...props} />;
    }

    case Routes.ServiceContact: {
      return <ServiceContact {...props} />;
    }

    case Routes.Deregister: {
      return <Deregister {...props} />;
    }

    case Routes.Login: {
      return <Login {...props} />;
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
