export default function loginWithKakao(state?: string, isNativeApp?: boolean) {
  if (typeof Kakao !== 'undefined') {
    Kakao.Auth.authorize({
      redirectUri: `${window.location.origin}/callback/kakaoLogin`,
      state: state ?? '',
      throughTalk: !!isNativeApp,
    });
  }
}
