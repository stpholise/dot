'use client'
import { useEffect, useState } from "react";
import clsx from "clsx";

interface ModalProp {
  setIsModalOpen: (state: boolean) => void;
}

const Modal = ({ setIsModalOpen }: ModalProp) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  useEffect(() => {
    setIsVisible(true) 
     

  },[])
 
  return (
    <>
      <div className={clsx("w-full bg-white lg:w-[600px] min-h-96 h-full z-80 fixed bottom-0 top-0 right-0 left-0 lg:left-auto bg-red overflow-y-scroll pb-6",{
 ' transition transform translate-x-5 opacity-100 ease-in-out duration-500': isVisible,
 ' transition transform -translate-x-100 opacity-0 ease-in-out duration-500': !isVisible
      })}>
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
