import { toast } from 'react-toastify';

import ToastErrorIconContained from '@/assets/icons/toast_icon_error_contained.svg';
import ToastCheckboxIcon from '@/assets/icons/toast_icon_checkbox.svg';
import ToastErrorIconOutlined from '@/assets/icons/toast_icon_error.svg';

export function toastSuccess({ message, id }: { message: string; id?: string }) {
  return id
    ? toast.success(message, {
        toastId: id,
        icon: (
          <ToastCheckboxIcon
            style={{
              width: '1.25rem',
              height: '1.25rem',
            }}
          />
        ),
      })
    : toast.success(message, {
        icon: (
          <ToastCheckboxIcon
            style={{
              width: '1.25rem',
              height: '1.25rem',
            }}
          />
        ),
      });
}

export function toastError({ message, id }: { message: string; id?: string }) {
  return toast.error(message, {
    toastId: id,
    className: 'Toastify__toast--error--black',
    icon: (
      <ToastErrorIconOutlined
        style={{
          width: '1.25rem',
          height: '1.25rem',
        }}
      />
    ),
  });
}

export function toastErrorRed({ message, id }: { message: string; id?: string }) {
  return toast.error(message, {
    toastId: id,
    className: 'Toastify__toast--error--red',
    icon: (
      <ToastErrorIconContained
        style={{
          width: '1.25rem',
          height: '1.25rem',
        }}
      />
    ),
  });
}
