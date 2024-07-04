import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import SnackBar from '../components/snackBar/SnackBar';

const SNACKBAR_DURATION = 3000;
export type SnackBarStatus = 'open' | 'close' | null;

const useSnackBar = (children: React.ReactNode) => {
  const timeoutId = useRef<number | null>(null);
  const [status, setStatus] = useState<SnackBarStatus>(null);

  const openSnackBar = () => {
    setStatus('open');
    timeoutId.current = window.setTimeout(() => {
      setStatus('close');
    }, SNACKBAR_DURATION);
  };

  return {
    snackbar:
      status !== null
        ? createPortal(
            <SnackBar status={status} setStatus={setStatus}>
              {children}
            </SnackBar>,
            document.querySelector('#snackbarRoot')!,
          )
        : null,
    open: openSnackBar,
  };
};

export default useSnackBar;
