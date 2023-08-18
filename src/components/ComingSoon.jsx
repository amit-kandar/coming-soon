import React, { useState } from 'react';
import { sendNotification } from './api';
import './ComingSoon.model.css';
import DynamicModal from './DynamicModal';

const ComingSoon = () => {
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [emailTouched, setEmailTouched] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleEmailChange = (event) => {
        const newEmail = event.target.value;
        setEmail(newEmail);
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        setIsValidEmail(emailPattern.test(newEmail));
    };

    const handleEmailBlur = () => {
        setEmailTouched(true);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEmail('');
        setTitle('');
        setDescription('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setEmailTouched(true);

        if (isValidEmail) {
            try {
                setLoading(true);
                const res = await sendNotification(email);
                setTitle(res.title);
                setDescription(res.message);
                openModal();
            } catch (error) {

                console.error('Error sending API request:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    const backgroundGradient = {
        background: '#2c3e50',
        // eslint-disable-next-line
        background: '-webkit-linear-gradient(to right, #3498db, #2c3e50)',
        // eslint-disable-next-line
        background: 'linear-gradient(to right, #3498db, #2c3e50)',
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center" style={backgroundGradient}>
            {/* Navbar */}
            <nav className="bg-transparent p-4 shadow absolute top-0 left-0 w-full">
                <div className="max-w-screen-xl mx-auto">
                    <div className="flex items-center justify-center">
                        <a
                            href="/"
                            className="text-4xl font-bold text-white"
                        >
                            Placefy
                        </a>
                    </div>
                </div>
            </nav>

            {/* Content */}
            <div className="w-full max-w-xl px-4 text-center">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
                    Unleash Your Imagination with Us!
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-gray-100 mb-4 md:mb-6">
                    🚀 Join us on this epic adventure. Be the first to know when we launch and experience something extraordinary!
                </p>
                {(!isValidEmail && emailTouched) && (
                    <p className="text-[#f96565] text-sm text-left mb-2 md:mb-0 md:mr-2">Please enter a valid email address.</p>
                )}
                <form className="flex flex-col justify-center items-center md:flex-row md:justify-between gap-3 w-full md:w-full">
                    <input
                        className={`w-full py-2 px-4 border ${(!isValidEmail && emailTouched) ? 'border-red-500' : 'border-gray-200'} bg-white outline-none rounded-md mb-2 md:mb-0 md:mr-2`}
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={handleEmailChange}
                        onBlur={handleEmailBlur}
                        required
                    />
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md w-28 md:w-36"
                        disabled={!isValidEmail || loading || !email} // Disable button while loading
                    >
                        {loading ? 'Submitting...' : 'Notify Me'}
                    </button>



                </form>
            </div>

            {/* Modal */}
            <DynamicModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Modal"
                title={title}
                description={description}
                buttonText="Close"
                onButtonClick={closeModal}
            />
        </div>
    );
};

export default ComingSoon;
