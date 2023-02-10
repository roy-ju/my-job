import tw, { css } from 'twin.macro';

export default css`
  body {
    ${tw`antialiased`}
  }

  * {
    outline: none;
  }

  html,
  body,
  #__next,
  #root {
    height: 100%;
  }
`;
