import React, { useEffect, useState } from "react";
import ad from "../assets/ad.jpg"

const VisitModal = () => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const modalClosed = sessionStorage.getItem("modalClosed");

        if (!modalClosed) {
            const timer = setTimeout(() => {
                setShowModal(true);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setShowModal(false);
        sessionStorage.setItem("modalClosed", "true");
    };

    return (
        <>
            {showModal && (
                <div
                    className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50"
                    style={{ backdropFilter: "blur(4px)" }}
                >
                    <div className="relative bg-white rounded-lg p-1 max-w-md mx-4">
                        <button
                            onClick={handleClose}
                            className="absolute top-0 right-2 text-white hover:text-gray-900 text-3xl font-bold cursor-pointer"
                            aria-label="Close modal"
                        >
                            &times;
                        </button>
                        <img
                            src={ad}
                            alt="Welcome"
                            className="w-full h-auto rounded"
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default VisitModal;
