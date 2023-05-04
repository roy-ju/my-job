import { keyframes } from '@emotion/react';

export const ClickedAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(1rem);
  }
  100% {
    transform: translateY(0);
  }
`;

export const initialAnimation = keyframes`
  0% {
    opacity: 0.2;
    transform: scale(0.2);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;
