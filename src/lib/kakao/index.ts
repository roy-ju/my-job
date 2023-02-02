export function isKakaoSDKLoaded() {
  return typeof Kakao !== 'undefined';
}

export function initializeKakaoSDK() {
  if (isKakaoSDKLoaded()) {
    Kakao.init('be0771795b03472e82b6e48281084c04');
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
