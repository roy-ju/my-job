export default async function loginWithApple(state?: string) {
  window.AppleID.auth.init({
    clientId: 'kr.co.negocio.service',
    scope: 'email name',
    redirectURI: `${window.location.origin}/callback/appleLogin`,
    state: state ?? '',
    usePopup: true,
  });

  try {
    const res = await window.AppleID.auth.signIn();
    return res;
  } catch (e) {
    return null;
  }
}
