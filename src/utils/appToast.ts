import { toast } from 'react-toastify';

export const ErrorAlert = (desc:any) => {
  toast.error(`${desc}`, {
    toastId: 'error1',
    position: 'bottom-center',
    autoClose: 2000,
    closeOnClick: true,
    theme: 'light',
  });
};

export const SuccessAlert = (desc:any) => {
  toast.success(`${desc}`, {
    toastId: 'success1',
    position: 'bottom-center',
    autoClose: 2000,
    closeOnClick: true,
    theme: 'light',
  });
};

export const InfoAlert = (desc:any) => {
  toast.info(`${desc}`, {
    toastId: 'info1',
    position: 'bottom-center',
    autoClose: 2000,
    closeOnClick: true,
    theme: 'light',
  });
};
