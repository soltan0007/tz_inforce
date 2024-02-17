import React from "react";

const Modal = ({ isOpen, onClose, onConfirm, title, content }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg">
                <h2 className="text-xl font-bold mt-4">{title}</h2>
                <p className="mb-2">{content}</p>
                <div className="flex justify-end ">
                    <button
                        className="btn btn-outline-primary mr-2 my-2"
                        onClick={onConfirm}
                    >
                        Confirm
                    </button>
                    <button
                        className="btn btn-outline-primary my-2"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
