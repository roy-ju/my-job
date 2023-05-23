import Keys from '@/constants/storage_keys';
import { useAuth } from '@/hooks/services';
import { useWebSocket } from '@/hooks/utils';
import usePageVisibility from '@/hooks/utils/usePageVisibility';
import axios from '@/lib/axios';
import useSyncronizer from '@/states/syncronizer';
import { isClient } from '@/utils/is';
import { ReactNode, useEffect, useMemo } from 'react';
import { mutate } from 'swr';

export default function NegocioProvider({ children }: { children?: ReactNode }) {
  const pageVisible = usePageVisibility();

  const { user } = useAuth();

  const { setUnreadChatCount, setUnreadNotificationCount } = useSyncronizer();

  const wsUrl = useMemo(() => {
    if (typeof window === 'undefined') return '';

    const accessToken = localStorage.getItem(Keys.ACCESS_TOKEN);

    if (!accessToken) return '';

    if (!user || !accessToken) return '';
    const baseUrl = process.env.NEXT_PUBLIC_NEGOCIO_WEBSOCKET_BASE_URL;
    return `${baseUrl}/synchronizer/ws/1/${user.id}/${JSON.parse(accessToken)}`;
  }, [user]);

  const { connect, disconnect } = useWebSocket(wsUrl, {
    onOpen: () => {},
    onClose: () => {},
    onMessage: (e) => {
      const data = JSON.parse(e.data);
      console.log(data);
      if (data && data.key) {
        switch (data.key) {
          case 'new_chat':
            mutate('/chat/room/list');
            setUnreadChatCount(1);
            break;
          case 'no_chat':
            mutate('/chat/room/list');
            setUnreadChatCount(0);
            break;
          default:
            break;
        }
      }
    },
    onError: () => {
      console.error('error');
    },
  });

  useEffect(() => {
    if (wsUrl && pageVisible) connect();
    return () => disconnect();
  }, [connect, disconnect, pageVisible, wsUrl]);

  useEffect(() => {
    const accessToken = localStorage.getItem(Keys.ACCESS_TOKEN);
    if (accessToken && user && pageVisible) {
      axios.post('/chat/unread/total').then(({ data }) => {
        if (data.total_unread_count) {
          setUnreadChatCount(data.total_unread_count);
        }
      });

      // axios.post('/notification/unread/total').then(({ data }) => {
      //   if (data.total_unread_count) {
      //     setUnreadNotificationCount(data.total_unread_count);
      //   }
      // });
    }
  }, [user, setUnreadChatCount, setUnreadNotificationCount, pageVisible]);

  if (isClient && typeof window.Negocio === 'undefined') {
    window.Negocio = {
      callbacks: {},
      mapEventListeners: {
        filter: {},
        bounds: {},
        toggle: {},
      },
    };
  }

  return children as JSX.Element;
}
