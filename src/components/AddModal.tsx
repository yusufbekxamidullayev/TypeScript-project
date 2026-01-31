import React, { useState, type Dispatch, type SetStateAction } from 'react';
import { Button, Modal } from 'antd';

const AddModal = ({ text, children, open, setOpen }: { text: string, children: React.ReactNode, open: boolean, setOpen: Dispatch<SetStateAction<boolean>> }) => {
    const [confirmLoading, setConfirmLoading] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Add {text}
            </Button>
            <Modal
                footer={false}
                title="Title"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                {children}
            </Modal>
        </>
    );
};

export default AddModal;