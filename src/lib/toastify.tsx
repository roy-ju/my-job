import styled from '@emotion/styled';
import { IconProps, ToastContainer as RToastContainer } from 'react-toastify';
import tw from 'twin.macro';

import CheckboxIcon from '@/assets/icons/toast_icon_checkbox.svg';
import ErrorContainedIcon from '@/assets/icons/toast_icon_error_contained.svg';
import ErrorIcon from '@/assets/icons/toast_icon_error.svg';
import { memo } from 'react';

const CustomStyled = styled(RToastContainer)`
  --toastify-toast-min-height: 48px;

  .Toastify__toast {
    ${tw`rounded-lg bg-gray-1000/90`}
  }
  .Toastify__toast-body {
    ${tw`text-white text-b2`}
  }
  .Toastify__toast.Toastify__toast--default {
  }
  .Toastify__toast.Toastify__toast--info {
  }
  .Toastify__toast.Toastify__toast--success {
    ${tw`bg-green-900/90`}
  }
  .Toastify__toast.Toastify__toast--warning {
  }
  .Toastify__toast.Toastify__toast--error {
    ${tw`bg-red/90`}
  }
`;

function ToastIcon({ type }: IconProps) {
  switch (type) {
    case 'default':
      return null;
    case 'info':
      return <CheckboxIcon />;
    case 'success':
      return <CheckboxIcon />;
    case 'error':
      return <ErrorContainedIcon />;
    case 'warning':
      return <ErrorIcon />;
    default:
      return null;
  }
}

interface ToastContainerProps {
  platform: 'mobile' | 'pc';
}

const ToastContainer = memo(({ platform }: ToastContainerProps) =>
  platform === 'mobile' ? (
    <CustomStyled
      draggable={false}
      autoClose={2000}
      closeButton={false}
      hideProgressBar
      newestOnTop
      position="top-center"
      icon={ToastIcon}
    />
  ) : (
    <CustomStyled
      draggable={false}
      autoClose={2000}
      closeButton={false}
      hideProgressBar
      newestOnTop
      position="top-left"
      icon={ToastIcon}
    />
  ),
);

export default ToastContainer;
