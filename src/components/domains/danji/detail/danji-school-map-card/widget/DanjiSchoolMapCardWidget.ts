import styled from '@emotion/styled';

export const Stack = styled('div')({});

export const Typography = styled('p')({});

export const BottomSheetContent = styled(Stack)({
  overflowY: 'auto',
  overflowX: 'hidden',
  WebkitOverflowScrolling: 'touch',
  minHeight: '105px',

  '&::-webkit-scrollbar': {
    width: '16px',
  },

  '&::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',
  },

  '&::-webkit-scrollbar-thumb': {
    borderRadius: '11px',
    border: '6px solid transparent',
    background: '#999999',
    backgroundClip: 'padding-box',
    minHeight: '50%',
  },
});

export const SchoolInfoTableContainer = styled(Stack)({
  paddingTop: '16px',
  paddingLeft: '20px',
  paddingRight: '20px',
  width: '100%',
  backgroundColor: 'white',
  zIndex: 150,
  borderTopLeftRadius: '2rem',
  borderTopRightRadius: '2rem',
});

export const FirstSelectedStyle = {
  borderTop: '1px solid  #E4E4EF',
  borderBottom: '1px solid  #E4E4EF',
  paddingTop: '8px',
  paddingBottom: '8px',
  paddingLeft: '16px',
  paddingRight: '16px',
  background: '#F1EEFF',
  cursor: 'pointer',
};

export const FirstNoneSelectedStyle = {
  borderTop: '1px solid  #E4E4EF',
  borderBottom: '1px solid  #E4E4EF',
  paddingTop: '8px',
  paddingBottom: '8px',
  paddingLeft: '16px',
  paddingRight: '16px',
  cursor: 'pointer',
};

export const NotFirstSelectedStyle = {
  borderBottom: '1px solid #E4E4EF',
  paddingTop: '8px',
  paddingBottom: '8px',
  paddingLeft: '16px',
  paddingRight: '16px',
  background: '#F1EEFF',
  cursor: 'pointer',
};

export const NotFirstNoneSelectedStyle = {
  borderBottom: '1px solid #E4E4EF',
  paddingTop: '8px',
  paddingBottom: '8px',
  paddingLeft: '16px',
  paddingRight: '16px',
  cursor: 'pointer',
};
