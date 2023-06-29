import React, { createContext, useContext, useState } from 'react';

const InfoModalContext = createContext();
export const useInfoModal = () => useContext(InfoModalContext);

export function InfoModalProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState(null);

    const handleOpen = (content) => {
        setContent(content);
        setIsOpen(true);
    };

    const handleClose = () => {
        setContent(null);
        setIsOpen(false);
    };

    return (
        <InfoModalContext.Provider value={{ isOpen, content, handleOpen, handleClose }}>
            {children}
        </InfoModalContext.Provider>
    );
}

// Prompt Modal context
const PromptModalContext = createContext();
export const usePromptModal = () => useContext(PromptModalContext);

export function PromptModalProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState(null);
    const [onConfirm, setOnConfirm] = useState(() => {});
    const [onCancel, setOnCancel] = useState(() => {});

    const handleOpen = (content, onConfirm, onCancel) => {
        setContent(content);
        setOnConfirm(() => onConfirm);
        setOnCancel(() => onCancel);
        setIsOpen(true);
    };

    const handleClose = () => {
        setContent(null);
        setIsOpen(false);
    };

    return (
        <PromptModalContext.Provider value={{ isOpen, content, onConfirm, onCancel, handleOpen, handleClose }}>
            {children}
        </PromptModalContext.Provider>
    );
}
