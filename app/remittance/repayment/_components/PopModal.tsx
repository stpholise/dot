"use client";
import React, { useEffect, useState } from "react";
import { LoanRowData } from ".././page";
import clsx from "clsx";
import Image from "next/image";
import PrimaryButtons from "@/app/_components/ui/units/buttons/PrimaryButtons";

interface ModalProp {
  setIsModalOpen: (state: boolean) => void;
  selectedRowsItems?: LoanRowData[];
  setSelectedRowsItems: React.Dispatch<React.SetStateAction<LoanRowData[]>>;
}

const PopModal = ({
  setIsModalOpen,
  selectedRowsItems,
  setSelectedRowsItems,
}: ModalProp) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  useEffect(() => {
    setIsVisible(true);
    setButtonValidation(false);
  }, []);

  const [rawValue, setRawValue] = useState<Record<string, string>>({});
  const [buttonValidation, setButtonValidation] = useState<boolean>(false);
  const [currentModal, setCurrentModal] = useState<number>(0);

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

  const cancelRemittanceCreattion = () => {
    setSelectedRowsItems([]);
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className={clsx(
          "w-full bg-[#F9F9F9] lg:w-[468px] z-80 fixed bottom-0 top-0 right-0 left-0 lg:left-auto bg-red overflow-y-auto ",
          {
            " transition-opacity transform  opacity-100 ease-in-out duration-500":
              isVisible,
            " transition-opacity transform   opacity-0 ease-in-out duration-500":
              !isVisible,
            "h-fit  top-1/2 right-1/2  transition-opacity translate-x-1/2 rounded-3xl  -translate-y-1/2 opacity-100 ease-in-out duration-500":
              selectedRowsItems,
          }
        )}
      >
        {currentModal === 0 && (
          <div className="">
            <div className="relative border border-[#EAEAEA] bg-white px-8 py-6">
              <div className=" flex gap-2 items-center">
                <p className="text-lg text-black">
                  {" "}
                  Add Customer to Remittance{" "}
                </p>
              </div>
              <button
                className="absolute top-4 bottom-4 right-4  px-4 py-2"
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
            <div
              className={clsx(
                "h-[calc(100vh-180px)] overflow-y-auto bg-white",
                {
                  "h-fit ": selectedRowsItems?.length === 1,
                  "h-[calc(100vh-180px)] ": selectedRowsItems?.length !== 1,
                }
              )}
            >
              <div className="lg:py-6  md:px-6 pt-4 pb-12">
                {selectedRowsItems && selectedRowsItems?.length !== 0 ? (
                  selectedRowsItems.map((item) => (
                    <div
                      className="bg-[#F9F9F9] h-40  w-full lg:min-96 xl:px-8 px-4 sm:py-3 xl:py-6 mb-4 rounded-2xl"
                      key={item.id}
                    >
                      <p className="text-black text-base font-medium">
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
                        <div
                          className={
                            "border border-[#D2D5E1] bg-white w-full px-4 h-12 rounded-lg py-2 text-black flex items-center gap-1"
                          }
                        >
                          ₦
                          <input
                            maxLength={7}
                            type="text"
                            value={rawValue[item.id]}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => handleChange(item.id, e.target.value)}
                            inputMode="numeric"
                            className="outline-none border-none w-full h-full border-red-400"
                          />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className=" flex flex-col text-center items-center justify-center h-full lg:mt-12 xl:px-8 xl:py-6 md:px-6 py-4 ">
                    <Image
                      src="/image/Frame 48.png"
                      alt="frame"
                      width={80}
                      height={80}
                      className="rounded-xl mb-6"
                    />

                    <h3 className="font-medium text-2xl text-black mb-2">
                      No Customer Added
                    </h3>
                    <p className="max-w-86 text-base font-medium text-[#667085]">
                      Click on the more &quot;i&quot; icon to add a customer to
                      the remittance
                    </p>
                  </div>
                )}
              </div>
            </div>
            d
            <div className="sticky bottom-0 right-0 left-0 border border-[#EAEAEA]  px-8 py-6 flex justify-between bg-[#F9F9F9]">
              <div
                className={clsx("flex gap-4 ", {
                  "gap-4  ": selectedRowsItems?.length === 1,
                })}
              >
                <PrimaryButtons
                  text={`Cancel`}
                  className={clsx(
                    "bg-white border border-[#D0D5DD] font-medium text-[#344054] lg:w-42  px-5 py-3 rounded-lg flex item-center justify-center  "
                  )}
                  onClick={cancelRemittanceCreattion}
                />
                <PrimaryButtons
                  disabled={!buttonValidation}
                  text={"Add Customer"}
                  className={clsx(
                    "  px-5 py-3 rounded-lg text-white lg:min-w-56 lg:w-full",
                    {
                      "lg:w-80 flex item-center justify-center  ":
                        selectedRowsItems?.length === 1,
                    },
                    buttonValidation ? "bg-black" : "bg-[#9A9A9A]"
                  )}
                  onClick={() => setCurrentModal(1)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div
        onClick={() => setIsModalOpen(false)}
        className="fixed top-0 left-0 right-0 bottom-0 w-full z-60 bg-[rgba(0,0,0,0.5)]"
      ></div>
    </>
  );
};

export default PopModal;
