import React from "react";

interface ModalProp {
  setIsModalOpen: (state: boolean) => void;
}

const Modal = ({ setIsModalOpen }: ModalProp) => {
  return (
    <>
      <div className="w-full  lg:w-[600px] min-h-96 h-full z-80 fixed bottom-0 top-0 right-0 left-0 lg:left-auto bg-red overflow-y-scroll pb-6">
        Modal
      </div>
      <div
        onClick={() => setIsModalOpen(false)}
        className="fixed top-0 left-0 right-0 bottom-0 w-full z-60 bg-[rgba(0,0,0,0.5)]"
      ></div>
    </>
  );
};

export default Modal;
