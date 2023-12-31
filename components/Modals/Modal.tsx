import { MouseEvent, useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  title?: string;
  body?: React.ReactElement;
  disabled: boolean;
}

export const Modal = ({ isOpen, onClose, title, body }: ModalProps) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const closeModalClickingOutside = useCallback(
    (e: MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  const handleClose = useCallback(() => {
    setShowModal(false);
    onClose();

    setTimeout(() => {
      setShowModal(isOpen);
    }, 300);
  }, [onClose, isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        onClick={closeModalClickingOutside}
        className="fixed justify-center items-center flex overflow-x-hidden inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70"
        id="modal"
      >
        <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto lg:h-auto md:h-auto">
          {/*content*/}

          <div
            className={` translate duration-300 h-full ${
              showModal ? "translate-y-0" : "translate-y-full"
            } ${showModal ? "opacity-100" : "opacity-0"}
          `}
          >
            <div className=" translate lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-neutral-900 outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-center p-6 rounded-t justify-center relative ">
                <button
                  onClick={handleClose}
                  className="p-1 border-0 hover:opacity-70 transition absolute left-9"
                >
                  <IoMdClose size={18} />
                </button>
                <div className="text-lg font-semibold">
                  {title || "Hello World"}
                </div>
              </div>
              <div className="relative p-6 flex-auto">{body}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
