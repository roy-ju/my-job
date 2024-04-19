import { ReactNode, useEffect, useMemo } from 'react';

import { mutate } from 'swr';

import { toast } from 'react-toastify';

import useSyncronizer from '@/states/hooks/useSyncronizer';

import useAuth from '@/hooks/services/useAuth';

import useWebSocket from '@/hooks/useWebSocket';

import usePageVisibility from '@/hooks/usePageVisibility';

import axios from '@/lib/axios';

import { isClient } from '@/utils/is';

import Keys from '@/constants/storage_keys';

// import previousDomState from '@/states/atom/previousDomState';

// import { useRecoilState } from 'recoil';

// import { useRouter } from 'next/router';

export default function NegocioProvider({ children }: { children?: ReactNode }) {
  const pageVisible = usePageVisibility();

  const { user } = useAuth();

  const { setUnreadChatCount, setUnreadNotificationCount } = useSyncronizer();

  // const [pushToStack, setPushToStack] = useRecoilState(previousDomState);

  // const router = useRouter();

  // useEffect(() => {
  //   const handleRouteChange = () => {
  //     const currentDom = document.documentElement.innerHTML;
  //     setPushToStack((stack) => [...stack, currentDom]);
  //   };

  //   router.events.on('routeChangeStart', handleRouteChange);

  //   return () => {
  //     router.events.off('routeChangeStart', handleRouteChange);
  //   };
  // }, [pushToStack, router.events, setPushToStack]);

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
    onMessage: async (e) => {
      const data = JSON.parse(e.data);
      if (data && data.key) {
        switch (data.key) {
          case 'new_chat':
            if (window.location.pathname.indexOf('/chatRoom') === -1) {
              toast.success('새로운 채팅메시지가 있습니다.');
            }
            mutate('/chat/room/list');
            setUnreadChatCount(1);
            break;

          case 'no_chat':
            mutate('/chat/room/list');
            setUnreadChatCount(0);
            break;

          case 'new_notification':
            toast.success('새로운 알림이 있습니다.');
            setUnreadNotificationCount(Number(data.value) ?? 0);
            break;

          default:
            break;
        }
      }
    },
    onError: () => {},
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

      axios.post('/notification/unread/total').then(({ data }) => {
        if (data.total_unread_count) {
          setUnreadNotificationCount(data.total_unread_count);
        }
      });
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
