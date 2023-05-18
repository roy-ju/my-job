import { Loading, MobileContainer } from '@/components/atoms';
import { NotificationLinkType } from '@/constants/enums';
import Routes from '@/router/routes';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// 네이티브 앱에서 푸시알림 클릭후 리디렉트 핸들링
const Page: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    const { data } = router.query;
    if (typeof data === 'string') {
      const parsed = JSON.parse(data as string);

      if (parsed.chat_room_id) {
        router.replace(`/${Routes.EntryMobile}/${Routes.ChatRoom}?chatRoomID=${parsed.chat_room_id}`);
        return;
      }

      if (parsed.type) {
        const notificationType = Number(parsed.type);
        const listingID = Number(parsed.listing_id) ?? 0;
        const chatRoomID = Number(parsed.chat_room_id) ?? 0;

        switch (notificationType) {
          case NotificationLinkType.ServiceHome:
            // Handle ServiceHome case
            router.replace(`/${Routes.EntryMobile}`);
            break;
          case NotificationLinkType.ListingRegister:
            // Handle ListingRegister case
            router.replace(`/${Routes.EntryMobile}/${Routes.ListingCreateAddress}`);
            break;
          case NotificationLinkType.MyTempListingDetail:
            // Handle MyTempListingDetail case
            if (!listingID) {
              router.replace(`/${Routes.EntryMobile}`);
            } else {
              router.replace(`/${Routes.EntryMobile}/${Routes.ListingDetail}?listingID=${parsed.listing_id}`);
            }
            break;
          case NotificationLinkType.ListingDetail:
            // Handle ListingDetail case
            if (!listingID) {
              router.replace(`/${Routes.EntryMobile}`);
            } else {
              router.replace(`/${Routes.EntryMobile}/${Routes.ListingDetail}?listingID=${parsed.listing_id}`);
            }
            break;
          case NotificationLinkType.ChatList:
            // Handle ChatList case
            router.replace(`/${Routes.EntryMobile}/${Routes.ChatRoomList}`);
            break;
          case NotificationLinkType.MyRegisterd:
            // Handle MyRegisterd case
            router.replace(`/${Routes.EntryMobile}/${Routes.MyRegisteredListingList}?tab=1`);
            break;
          case NotificationLinkType.MyParticipated:
            // Handle MyParticipated case
            router.replace(`/${Routes.EntryMobile}/${Routes.MyParticipatingListings}?tab=1`);
            break;
          case NotificationLinkType.SuggestRegional:
            // Handle SuggestRegional case
            router.replace(`/${Routes.EntryMobile}/${Routes.SuggestRegionalForm}`);
            break;
          case NotificationLinkType.ChatRoom:
            // Handle ChatRoom case
            if (!chatRoomID) {
              router.replace(`/${Routes.EntryMobile}`);
            }
            router.replace(`/${Routes.EntryMobile}/${Routes.ChatRoom}?chatRoomID=${chatRoomID}`);
            break;
          case NotificationLinkType.MyProfile:
            // Handle MyProfile case
            router.replace(`/${Routes.EntryMobile}`);
            break;
          case NotificationLinkType.MyPrivacyPolicy:
            // Handle MyPrivacyPolicy case
            router.replace(`/${Routes.EntryMobile}`);
            break;
          case NotificationLinkType.MyTerms:
            // Handle MyTerms case
            router.replace(`/${Routes.EntryMobile}`);
            break;
          case NotificationLinkType.MyNegoMoney:
            // Handle MyNegoMoney case
            router.replace(`/${Routes.EntryMobile}`);
            break;
          case NotificationLinkType.MyVisitSchedules:
            // Handle MyVisitSchedules case
            router.replace(`/${Routes.EntryMobile}`);
            break;
          case NotificationLinkType.MyServiceQna:
            // Handle MyServiceQna case
            router.replace(`/${Routes.EntryMobile}`);
            break;
          case NotificationLinkType.MyReport:
            // Handle MyReport case
            router.replace(`/${Routes.EntryMobile}`);
            break;
          case NotificationLinkType.MyReportDetail:
            // Handle MyReportDetail case
            router.replace(`/${Routes.EntryMobile}`);
            break;
          case NotificationLinkType.VisitSurvey:
            // Handle VisitSurvey case
            router.replace(`/${Routes.EntryMobile}`);
            break;
          case NotificationLinkType.MyParticipatingTradesPast:
            // Handle MyParticipatingTradesPast case
            router.replace(`/${Routes.EntryMobile}`);
            break;
          case NotificationLinkType.MyParticipatingTrades:
            // Handle MyParticipatingTrades case
            router.replace(`/${Routes.EntryMobile}`);
            break;
          case NotificationLinkType.ListingRegisterCompleted:
            // Handle ListingRegisterCompleted case
            router.replace(`/${Routes.EntryMobile}`);
            break;
          case NotificationLinkType.PhoneUpdate:
            // Handle PhoneUpdate case
            router.replace(`/${Routes.EntryMobile}`);
            break;
          case NotificationLinkType.PenaltyPayment:
            // Handle PenaltyPayment case
            router.replace(`/${Routes.EntryMobile}`);
            break;
          case NotificationLinkType.RegisterMyHomeNoticePage:
            // Handle RegisterMyHomeNoticePage case
            router.replace(`/${Routes.EntryMobile}`);
            break;
          case NotificationLinkType.OpinionHistory:
            // Handle OpinionHistory case
            router.replace(`/${Routes.EntryMobile}`);
            break;
          case NotificationLinkType.OpinionResultComplete:
            // Handle OpinionResultComplete case
            router.replace(`/${Routes.EntryMobile}`);
            break;
          case NotificationLinkType.ListingDetailQna:
            // Handle ListingDetailQna case
            router.replace(`/${Routes.EntryMobile}`);
            break;
          case NotificationLinkType.OpinionResultCancelled:
            // Handle OpinionResultCancelled case
            router.replace(`/${Routes.EntryMobile}`);
            break;
          case NotificationLinkType.MyRealPrice:
            // Handle MyRealPrice case
            router.replace(`/${Routes.EntryMobile}`);
            break;
          case NotificationLinkType.SuggestList:
            // Handle SuggestList case
            router.replace(`/${Routes.EntryMobile}/${Routes.My}`);
            break;
          case NotificationLinkType.MyRegisteredPastDetail:
            // Handle MyRegisteredPastDetail case
            router.replace(`/${Routes.EntryMobile}`);
            break;
          case NotificationLinkType.SuggestRecommendList:
            // Handle SuggestRecommendList case
            router.replace(`/${Routes.EntryMobile}/${Routes.My}`);
            break;
          default:
            // Handle default case
            router.replace(`/${Routes.EntryMobile}`);
            break;
        }
      } else {
        router.replace(`/${Routes.EntryMobile}`);
      }
    }
  }, [router]);

  return (
    <MobileContainer>
      <div tw="py-20">
        <Loading />
      </div>
    </MobileContainer>
  );
};

export default Page;
