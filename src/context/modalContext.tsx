// context/ModalContext.tsx
import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext({
    isModalVisible: false,
    showModal: () => { },
    hideModal: () => { },
    toggleModal: () => { },
});

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    const [isModalVisible, setModalVisible] = useState(false);

    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);
    const toggleModal = () => setModalVisible((prev) => !prev);

    return (
        <ModalContext.Provider value={{ isModalVisible, showModal, hideModal, toggleModal }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => useContext(ModalContext);
