import tw, { styled } from 'twin.macro';

const Li = styled.li<{ hiddenVerticalLine: boolean; isLast: boolean }>`
  ${tw`relative`}

  ::after {
    content: '';
    position: absolute;
    left: 12px;
    top: 37px;
    bottom: 0;
    width: 1px;
    background-color: ${tw`bg-gray-200`};
    height: calc(100% - 48px);
  }

  &:last-child::after {
    ${({ hiddenVerticalLine }) => hiddenVerticalLine && tw`[display: none] [height: calc(100% - 47px - 44px)]`}
    ${({ isLast }) => isLast && tw`[height: calc(100% - 37px - 40px - 30px)]`}
  }
`;

export default Li;
