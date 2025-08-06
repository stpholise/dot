"use client";
import React, { useEffect, useState } from "react";
import { LoanRowData } from "../page";
import clsx from "clsx";
import Image from "next/image";
import PrimaryButtons from "@/app/_components/ui/units/buttons/PrimaryButtons";

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

  const [rawValue, setRawValue] = useState<Record<string, string>>({});
  const [totalRemittance, setTotalRemittance] = useState("");
  const [buttonValidation, setButtonValidation] = useState<boolean>(false);
  const removeItemFromList = (id: string) => {
    if (selectedRowsItems) {
      const newArray = selectedRowsItems.filter((items) => items.id !== id);
      setSelectedRowsItems(newArray);
      if (Object.keys(rawValue).some((key) => key === id)) {
        const rawArray = Object.entries(rawValue).filter(([key]) => key !== id);

        setRawValue(Object.fromEntries(rawArray));
      }
    }
  };

  const handleChange = (id: string, value: string) => {
    const raw = value.replace(/[^0-9]/g, "");

    const formatAmount = Number(raw).toLocaleString("en-NG", {
      minimumFractionDigits: 0,
    });
    setRawValue((prev) => ({
      ...prev,
      [id]: formatAmount,
    }));
  };

  useEffect(() => {
    const total = Object.values(rawValue).reduce(
      (sum, item) => sum + parseInt(item.replace(/,/g, "")),
      0
    );
    console.log(rawValue);
    setTotalRemittance(
      total.toLocaleString("en-NG", {
        minimumFractionDigits: 0,
      })
    );

    setButtonValidation(false);
  }, [rawValue]);

  const cancelRemittanceCreattion = () => {
    setSelectedRowsItems([]);
    setIsModalOpen(false);
  };

  const handleRemittance = () => {
    console.log("testing remittance");
  };

  return (
    <>
      <div
        className={clsx(
          "w-full bg-[#F9F9F9] lg:w-[600px]  h-fit z-80 fixed bottom-0 top-0 right-0 left-0 lg:left-auto bg-red overflow-y-scroll ",
          {
            " transition transform translate-x-5 opacity-100 ease-in-out duration-500":
              isVisible,
            " transition transform -translate-x-100 opacity-0 ease-in-out duration-500":
              !isVisible,
            "h-fit ": selectedRowsItems?.length === 1,
            "h-full": selectedRowsItems?.length !== 1 || !selectedRowsItems,
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
        <div className="xl:px-8 xl:py-6 md:px-6 py-4">
          {selectedRowsItems ? (
            selectedRowsItems.map((item) => (
              <div
                className="bg-white h-40  w-full lg:min-96 xl:px-8 px-4 sm:py-3 xl:py-6 mb-4 rounded-2xl"
                key={item.id}
              >
                <p className="text-black text-2xl font-medium">
                  {item.customerName}
                </p>
                <div className="flex gap-2 mt-1 text-xs text-[#667085]">
                  <span className="">
                    <Image
                      src={"/icons/offer_hand.png"}
                      alt={"instalment"}
                      width={10}
                      height={10}
                      className="inline mx-1"
                    />
                    Instalment: {item.instalment}
                  </span>
                  <span>
                    <Image
                      src={"/icons/calender.png"}
                      alt={"instalment"}
                      width={10}
                      height={10}
                      className="inline mx-1"
                    />
                    Repayment: {item.repayment}
                  </span>
                </div>

                <div className=" flex justify-between gap-8 mt-4">
                  <div className="border border-[#D2D5E1] w-full px-4 h-12 rounded-lg py-2 text-black flex items-center gap-1">
                    ₦
                    <input
                      maxLength={7}
                      type="text"
                      value={rawValue[item.id]}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange(item.id, e.target.value)
                      }
                      inputMode="numeric"
                      className="outline-none border-none w-full h-full border-red-400"
                    />
                  </div>
                  <div
                    className="text-[#F04438] rounded-lg w-40 bg-[#FEF3F2] h-12 flex items-center justify-center"
                    onClick={() => removeItemFromList(item.id)}
                  >
                    - Remove
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className=" flex items center justify-col h-full min-h-40 xl:px-8 xl:py-6 md:px-6 py-4 border-4 border-red-400">
              <Image
                src="/image/Frame 48.png"
                alt="frame"
                width={40}
                height={40}
              />
              <h3 className="">No Customer Added</h3>
              <p className="">
                Click on the more &quot;i&quot; icon to add a customer to the
                remittance
              </p>
            </div>
          )}
        </div>
        <div className="sticky mt-auto bottom-0 right-0 left-0 border border-[#EAEAEA] bg-white px-8 py-6 flex justify-between">
          <div className="">
            <h2 className="text-black">₦{totalRemittance}</h2>
            <p className="text-xs font-medium text-[#667085]">
              Total Remittance
            </p>
          </div>
          <div className=" flex gap-8 ">
            <PrimaryButtons
              text={`Cancel`}
              className="bg-white border border-[#D0D5DD] font-medium text-[#344054]  px-5 py-3 rounded-lg "
              onClick={cancelRemittanceCreattion}
            />
            <PrimaryButtons
              disabled={buttonValidation}
              text={`Submit for ${selectedRowsItems?.length} People`}
              className={clsx(
                "  px-5 py-3 rounded-lg text-white",
                buttonValidation ? "bg-[#9A9A9A]" : "bg-black"
              )}
              onClick={handleRemittance}
            />
          </div>
        </div>
      </div>
      <div
        onClick={() => setIsModalOpen(false)}
        className="fixed top-0 left-0 right-0 bottom-0 w-full z-60 bg-[rgba(0,0,0,0.5)]"
      ></div>
    </>
  );
};

export default Modal;
