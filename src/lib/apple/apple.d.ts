declare namespace AppleID {
  namespace auth {
    function init(params: {
      clientId: string;
      scope: string;
      redirectURI: string;
      state?: string;
      nonce?: string;
      usePopup?: boolean;
    }): void;
    function signIn(): Promise<AppleSignInResponse & AppleSignInError>;
  }
}
