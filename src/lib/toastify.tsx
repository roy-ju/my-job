import { ToastContainer as RToastContainer } from 'react-toastify';

// {/* <Toast autoClose={2000} position="top-center" closeButton={false} hideProgressBar newestOnTop limit={1} /> */}

function ToastIcon() {
  return null;
}

function ToastContainer() {
  return <RToastContainer position="top-center" icon={ToastIcon} />;
}

export default ToastContainer;
