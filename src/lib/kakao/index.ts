export function isKakaoSDKLoaded() {
  return typeof Kakao !== 'undefined';
}

export function initializeKakaoSDK() {
  const jsKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
  if (isKakaoSDKLoaded() && jsKey) {
    Kakao.init(jsKey);
  }
}

export { default as loginWithKakao } from './login';
export { default as searchKeyword } from './search_keyword';
