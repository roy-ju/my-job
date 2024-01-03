export async function loginWithApple() {
  try {
    const res = await window.AppleID.auth.signIn();
    return res;
  } catch (e) {
    return null;
  }
}
