export function isKakaoSDKLoaded() {
  return typeof Kakao !== 'undefined';
}

export function initializeKakaoSDK() {
  const jsKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
  if (isKakaoSDKLoaded() && jsKey) {
    Kakao.init(jsKey);
  }
}

export function loginWithKakao(returnURL: string) {
  if (isKakaoSDKLoaded()) {
    Kakao.Auth.authorize({
      redirectUri: 'http://localhost:3000/callback/kakaoLogin',
      state: JSON.stringify({
        returnURL,
      }),
    });
  }
}
