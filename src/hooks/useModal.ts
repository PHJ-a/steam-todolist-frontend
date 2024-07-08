import { useCallback, useState } from 'react';
import axiosInstance from '../api/axios';

const useModal = () => {
  const [open, toggleModal] = useState(false);
  const openModal = useCallback(() => {
    toggleModal(true);
  }, []);
  const closeModal = useCallback(() => {
    toggleModal(false);
  }, []);

  const getModalData = async (id: number) => {
    const res = await axiosInstance.get(`/todo/${id}`);
    const data = res.data;
    return data;
  };

  return {
    open,
    openModal,
    closeModal,
    getModalData,
  };
};

export default useModal;
