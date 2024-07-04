import { useCallback, useState } from 'react';

const useModal = () => {
  const [open, toggleModal] = useState(false);
  const openModal = useCallback(() => {
    toggleModal(true);
  }, []);
  const closeModal = useCallback(() => {
    toggleModal(false);
  }, []);

  return {
    open,
    openModal,
    closeModal,
  };
};

export default useModal;
