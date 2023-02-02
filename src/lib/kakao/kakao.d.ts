declare namespace Kakao {
  type AuthorizeOptions = {
    redirectUri?: string;
    state?: string;
    scope?: string;
    prompts?: string;
    nonce?: string;
    throughTalk?: boolean;
  };

  function init(jsKey: string): void;

  namespace Auth {
    function authorize(options: AuthorizeOptions): void;
    function setAccessToken(token: string): void;
    function getAccessToken(): string | null;
  }
}
