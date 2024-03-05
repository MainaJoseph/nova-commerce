import { ReactNode } from "react";

interface ModalProps {
  showModal: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  showModal,
  onMouseEnter,
  onMouseLeave,
  children,
}) => {
  return (
    <>
      {showModal && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center z-50"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div
            className="bg-white rounded-lg p-4 shadow-md absolute left-4"
            onMouseLeave={onMouseLeave}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
