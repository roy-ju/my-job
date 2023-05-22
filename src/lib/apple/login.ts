export function initializeAppleAuth() {
  if (typeof window !== 'undefined' && typeof window.AppleID !== 'undefined') {
    window.AppleID.auth.init({
      clientId: 'kr.co.negocio.service',
      scope: 'email name',
      redirectURI: `${window.location.origin}/callback/appleLogin`,
      state: '',
      usePopup: true,
    });
  }
}

export async function loginWithApple() {
  try {
    const res = await window.AppleID.auth.signIn();
    return res;
  } catch (e) {
    return null;
  }
}
