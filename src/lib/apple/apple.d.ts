declare namespace AppleID {
  interface AppleSignInResponse {
    user: {
      email?: string;
      name?: string;
    };
    authorization: {
      code: string;
      id_token: string;
      state: string;
    };
  }

  interface AppleSignInError {
    error: string;
  }

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
