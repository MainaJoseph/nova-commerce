import { ReactNode, useEffect } from "react";
import Container from "../Container";
import { IoIosCloseCircle } from "react-icons/io";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <Container>
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center z-50">
        <div
          className="bg-white rounded-lg p-4 shadow-md absolute left-4 "
          onClick={handleClickOutside}
        >
          {children}
          <button
            className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <IoIosCloseCircle size={25} className="text-rose-500 font-bold" />
          </button>
        </div>
      </div>
    </Container>
  );
};

export default Modal;
