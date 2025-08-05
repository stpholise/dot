"use client";
import React, { useEffect, useState } from "react";
import { LoanRowData } from "../page";
import clsx from "clsx";
import Image from "next/image";

interface ModalProp {
  setIsModalOpen: (state: boolean) => void;
  selectedRowsItems?: LoanRowData[];
  setSelectedRowsItems: React.Dispatch<React.SetStateAction<LoanRowData[]>>;
}

const Modal = ({
  setIsModalOpen,
  selectedRowsItems,
  setSelectedRowsItems,
}: ModalProp) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const removeItemFromList = (id: string) => {
    if (selectedRowsItems) {
      const newArray = selectedRowsItems.filter((items) => items.id !== id);
      setSelectedRowsItems(newArray);
    }
  };

  return (
    <>
      <div
        className={clsx(
          "w-full bg-[#F9F9F9] lg:w-[600px]  h-fit z-80 fixed bottom-0 top-0 right-0 left-0 lg:left-auto bg-red overflow-y-scroll pb-6",
          {
            " transition transform translate-x-5 opacity-100 ease-in-out duration-500":
              isVisible,
            " transition transform -translate-x-100 opacity-0 ease-in-out duration-500":
              !isVisible,
            "h-fit ": selectedRowsItems?.length === 1,
            "h-full": selectedRowsItems?.length !== 1,
          }
        )}
      >
        <div className="relative border border-[#EAEAEA] bg-white px-8 py-6">
          <div className=" flex gap-2 items-center">
            <Image
              src="/icons/table_checked.png"
              alt="/checked"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <p className="text-2xl text-black"> Selected Customers </p>
          </div>
          <button
            className="absolute top-4 bottom-4 right-8  px-4 py-2"
            onClick={() => setIsModalOpen(false)}
          >
            <Image
              src={"/icons/close.svg"}
              alt={"close modal"}
              width={24}
              height={24}
            />
          </button>
        </div>
        {selectedRowsItems &&
          selectedRowsItems.map((item) => (
            <div
              className="border border-red-400 w-48 p-2 mb-4 rounded"
              key={item.id}
            >
              {Object.entries(item).map(([key, value]) => (
                <div className="text-black text-sm" key={key}>
                  <strong>{key}</strong>: {String(value)}
                </div>
              ))}

              <div className="">
                <div className="border border-[#fefefe]">
                  ₦
                  <input type="text" className="outline-none border-none" />
                </div>
                <div
                  className="text-red-400"
                  onClick={() => removeItemFromList(item.id)}
                >
                  {" "}
                  Remove
                </div>
              </div>
            </div>
          ))}
      </div>
      <div
        onClick={() => setIsModalOpen(false)}
        className="fixed top-0 left-0 right-0 bottom-0 w-full z-60 bg-[rgba(0,0,0,0.5)]"
      ></div>
    </>
  );
};

export default Modal;
