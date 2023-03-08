export default function loginWithKakao(returnURL: string) {
  if (typeof Kakao !== 'undefined') {
    Kakao.Auth.authorize({
      redirectUri: 'http://localhost:3000/callback/kakaoLogin',
      state: JSON.stringify({
        returnURL,
      }),
    });
  }
}
