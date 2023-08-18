import React from 'react';
import Modal from 'react-modal';

const DynamicModal = ({ isOpen, onRequestClose, contentLabel, title, description, buttonText, onButtonClick }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel={contentLabel}
            className="modal"
            overlayClassName="overlay"
            appElement={document.getElementById('root')} // Set app element for modal
        >
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">{title}</h2>
                <p className="text-gray-700">{description}</p>
                <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md" onClick={onButtonClick}>
                    {buttonText}
                </button>
            </div>
        </Modal>
    );
};

export default DynamicModal;
