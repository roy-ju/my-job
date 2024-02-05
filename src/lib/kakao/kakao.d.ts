declare namespace Kakao {
  type AuthorizeOptions = {
    redirectUri?: string;
    state?: string;
    scope?: string;
    prompt?: string;
    nonce?: string;
    throughTalk?: boolean;
  };

  type ShareOptions = {
    objectType: string;
    installTalk: boolean;
    content: {
      title: string;
      description: string;
      imageUrl: string;
      link: {
        mobileWebUrl: string;
        webUrl: string;
      };
      imageWidth: number;
      imageHeight: number;
    };
    buttons: {
      title: string;
      link: {
        mobileWebUrl: string;
        webUrl: string;
      };
    }[];
  };

  function init(jsKey: string): void;

  namespace Auth {
    function authorize(options: AuthorizeOptions): void;
    function setAccessToken(token: string): void;
    function getAccessToken(): string | null;
  }

  namespace Share {
    function sendDefault(options: ShareOptions): void;
  }
}
