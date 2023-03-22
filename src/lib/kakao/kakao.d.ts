declare namespace Kakao {
  // type AuthorizeOptions = {
  //   redirectUri?: string;
  //   state?: string;
  //   scope?: string;
  //   prompts?: string;
  //   nonce?: string;
  //   throughTalk?: boolean;
  // };

  type AuthSuccessCallback = (statusObj: { status: string; user: object }) => void;

  type AuthFailCallback = () => void;

  type LoginOptions = {
    success?: AuthSuccessCallback;
    fail?: AuthFailCallback;
    always?: AuthSuccessCallback | AuthFailCallback;
    scope?: string;
    nonce?: string;
    persistAccessToken?: boolean;
    throughTalk?: boolean;
  };

  function init(jsKey: string): void;

  namespace Auth {
    // function authorize(options: AuthorizeOptions): void;
    // function setAccessToken(token: string): void;
    // function getAccessToken(): string | null;
    function login(options?: LoginOptions): void;
  }
}
