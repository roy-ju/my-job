import tw, { styled } from 'twin.macro';

const Ul = styled.ul`
  ${tw`leading-5 text-gray-700 text-info`}
  padding-left: 0.6ch;
  li {
    list-style-type: '-';
    padding-inline-start: 2px;
    &:not(:last-of-type) {
      padding-bottom: 0.5em;
    }
  }
`;

export default Ul;
