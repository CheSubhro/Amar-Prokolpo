
import React from 'react';
import { Dialog } from '@chakra-ui/react';

const Modal = ({ isOpen, onClose, title, children, footer, ...props }) => {
    return (
        <Dialog.Root 
            open={isOpen} // এটি নিশ্চিত করবে যে বাইরের isOpen ভ্যালু দিয়ে মডাল কন্ট্রোল হচ্ছে
            onOpenChange={(e) => {
                if (!e.open) onClose();
            }}
            {...props}
        >
            <Dialog.Backdrop />
            <Dialog.Positioner>
                <Dialog.Content>
                    {title && (
                        <Dialog.Header>
                            <Dialog.Title>{title}</Dialog.Title>
                        </Dialog.Header>
                    )}
                    <Dialog.CloseTrigger />
                    <Dialog.Body>{children}</Dialog.Body>
                    {footer && <Dialog.Footer>{footer}</Dialog.Footer>}
                </Dialog.Content>
            </Dialog.Positioner>
        </Dialog.Root>
    );
};

export default Modal;