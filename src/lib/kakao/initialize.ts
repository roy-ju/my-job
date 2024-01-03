import { isKakaoSDKLoaded } from '.';

export default function initializeKakaoSDK() {
  const jsKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
  if (isKakaoSDKLoaded() && jsKey) {
    Kakao.init(jsKey);
  }
}
