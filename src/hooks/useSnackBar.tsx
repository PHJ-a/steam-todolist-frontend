import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import SnackBar from '../components/snackBar/SnackBar';
import icon from '../assets/SnackBarIcon.png';

const SNACKBAR_DURATION = 3000;
export type SnackBarStatus = 'open' | 'close' | null;

const useSnackBar = () => {
  const timeoutId = useRef<number | null>(null);
  const [status, setStatus] = useState<SnackBarStatus>(null);
  const [content, setContent] = useState<React.ReactNode>(null);

  const openSnackBar = (message: React.ReactNode) => {
    setContent(
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <img src={icon} width={50} height={50} />
        {message}
      </div>,
    );
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
              {content}
            </SnackBar>,
            document.querySelector('#snackbarRoot')!,
          )
        : null,
    open: openSnackBar,
  };
};

export default useSnackBar;
