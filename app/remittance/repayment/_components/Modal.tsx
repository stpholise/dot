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
    setButtonValidation(false);
  }, []);

  const [rawValue, setRawValue] = useState<Record<string, string>>({});
  const [totalRemittance, setTotalRemittance] = useState("");
  const [buttonValidation, setButtonValidation] = useState<boolean>(false);
  const [currentModal, setCurrentModal] = useState<number>(0);
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

  const handleButtonValidation = () => {
    if (
      !selectedRowsItems ||
      selectedRowsItems.length === 0 ||
      selectedRowsItems?.length !== Object.keys(rawValue).length ||
      Object.values(rawValue).some((val) => val === "" || val == "0")
    ) {
      setButtonValidation(false);
    } else {
      setButtonValidation(true);
    }
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
    handleButtonValidation();
  }, [rawValue]);

  const cancelRemittanceCreattion = () => {
    setSelectedRowsItems([]);
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className={clsx(
          "w-full bg-[#F9F9F9] lg:w-[600px] z-80 fixed bottom-0 top-0 right-0 left-0 lg:left-auto bg-red overflow-y-auto ",
          {
            " transition-transform transform -translate-x-1 opacity-100 ease-in-out duration-500":
              isVisible,
            " transition transform translate-x-100 opacity-0 ease-in-out duration-500":
              !isVisible,
            "h-fit  top-1/2 right-1/2  transition-opacity translate-x-1/2 rounded-3xl  -translate-y-1/2 opacity-100 ease-in-out duration-500":
              selectedRowsItems?.length === 1,
            "h-screen min-h-screen":
              selectedRowsItems?.length !== 1 || !selectedRowsItems,
          }
        )}
      >
        {currentModal === 0 && (
          <div className="">
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
            <div
              className={clsx("h-[calc(100vh-180px)] overflow-y-auto", {
                "h-fit ": selectedRowsItems?.length === 1,
                "h-[calc(100vh-180px)] ": selectedRowsItems?.length !== 1,
              })}
            >
              <div className="xl:px-8 xl:py-6 md:px-6 pt-4 pb-12">
                {selectedRowsItems && selectedRowsItems?.length !== 0 ? (
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
                        <div
                          className={
                            "border border-[#D2D5E1] w-full px-4 h-12 rounded-lg py-2 text-black flex items-center gap-1"
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
            <div className="sticky bottom-0 right-0 left-0 border border-[#EAEAEA] bg-white px-8 py-6 flex justify-between">
              <div
                className={clsx("", {
                  "hidden ": selectedRowsItems?.length === 1,
                  "block ": selectedRowsItems?.length !== 1,
                })}
              >
                <h2 className="text-black">₦{totalRemittance}</h2>
                <p className="text-xs font-medium text-[#667085]">
                  Total Remittance
                </p>
              </div>
              <div
                className={clsx("flex gap-8", {
                  "gap-4  ": selectedRowsItems?.length === 1,
                })}
              >
                <PrimaryButtons
                  text={`Cancel`}
                  className={clsx(
                    "bg-white border border-[#D0D5DD] font-medium text-[#344054]  px-5 py-3 rounded-lg ",
                    {
                      "lg:w-50 flex item-center justify-center  ":
                        selectedRowsItems?.length === 1,
                    }
                  )}
                  onClick={cancelRemittanceCreattion}
                />
                <PrimaryButtons
                  disabled={!buttonValidation}
                  text={
                    buttonValidation
                      ? `Submit for ${selectedRowsItems?.length} People`
                      : "Submit Remittance"
                  }
                  className={clsx(
                    "  px-5 py-3 rounded-lg text-white",
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
        {currentModal === 1 && (
          <div className="">
            <div className="relative border border-[#EAEAEA] bg-white px-8 py-6">
              <div className=" flex gap-2 items-center">
                <button
                  onClick={() => setCurrentModal(0)}
                  className=" size-8 rounded-lg bg-white p-2 border border-[#D0D5DD] "
                >
                  <Image
                    src={"/icons/arrow_back.png"}
                    alt={"prev"}
                    width={20}
                    height={16}
                  />
                </button>
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
            <div className="h-[calc(100vh-180px)] ">
              {
                <div className="rounded-2xl border border-[#EAEAEA] ">
                  <div className="  bg-[#F9F9F9] px-8 py-6 flex flex-col sm:flex-row  gap-8 justify-between rounded-t-3xl">
                    <div className="text-black text-3xl font-semibold">
                      <p className="text-sm text-#667085 font-medium">
                        {" "}
                        Total Customers
                      </p>
                      <div className="">
                        {selectedRowsItems?.length} Customers
                      </div>
                    </div>
                    <div className="">
                      <p className="">Total Remittance Amount</p>
                      <div className="">{totalRemittance}</div>
                    </div>
                  </div>
                  <div className="">
                    <h4 className="text-xs font-medium flex items-center">
                      {" "}
                      <Image
                        src={"/icons/user.png"}
                        alt={"customer"}
                        width={8}
                        height={10}
                        className="inline mx-1"
                      />
                      CUSTOMER SUMMARY
                    </h4>
                    <div className="py-2">
                      {selectedRowsItems &&
                        selectedRowsItems.map((item) => (
                          <div
                            className="flex gap-4 border-b border-[#EAEAEA] py-4 justify-between items-center last:border-0"
                            key={item.id}
                          >
                            <div className="">
                              <h5 className=" text-black font-medium my-1">
                                {item.customerName}
                              </h5>
                              <div className="flex gap-2 text-xs">
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
                            </div>
                            <p className="text-black text-2xl font-medium">
                              ₦{rawValue[item.id]}
                            </p>
                          </div>
                          // <div
                          //   className="bg-white h-40  w-full lg:min-96 xl:px-8 px-4 sm:py-3 xl:py-6 mb-4 rounded-2xl"
                          //   key={item.id}
                          // >
                          //   <p className="text-black text-2xl font-medium">
                          //     {item.customerName}
                          //   </p>
                          //   <div className="flex gap-2 mt-1 text-xs text-[#667085]">
                          //     <span className="">
                          //       <Image
                          //         src={"/icons/offer_hand.png"}
                          //         alt={"instalment"}
                          //         width={10}
                          //         height={10}
                          //         className="inline mx-1"
                          //       />
                          //       Instalment: {item.instalment}
                          //     </span>
                          //     <span>
                          //       <Image
                          //         src={"/icons/calender.png"}
                          //         alt={"instalment"}
                          //         width={10}
                          //         height={10}
                          //         className="inline mx-1"
                          //       />
                          //       Repayment: {item.repayment}
                          //     </span>
                          //   </div>
                          //   <div className=" flex justify-between gap-8 mt-4">
                          //     <div>₦{rawValue[item.id]}</div>
                          //   </div>
                          // </div>
                        ))}
                    </div>
                  </div>
                </div>
              }
            </div>
            <div className="relative mt-auto bottom-0 right-0 left-0 border border-[#EAEAEA] bg-white px-8 py-6 flex justify-between lg:gap-8">
              <PrimaryButtons
                text={`Cancel`}
                className="bg-white border border-[#D0D5DD] font-medium text-[#344054]  px-5 lg:px-8 py-3 rounded-lg "
                onClick={cancelRemittanceCreattion}
              />
              <PrimaryButtons
                disabled={!buttonValidation}
                text={"Confirm Submission"}
                className={clsx(
                  " w-10/12 px-5 py-3 rounded-lg text-white flex items-center justify-center",
                  buttonValidation ? "bg-black" : "bg-[#9A9A9A]"
                )}
                onClick={() => setCurrentModal(2)}
              />
            </div>
          </div>
        )}
        {currentModal === 2 && (
          <div className="">
            <div className="relative border border-[#EAEAEA] bg-white px-8 py-6">
              <div className=" flex gap-2 items-center">
                <button className=" size-8 rounded-lg bg-white p-2 border border-[#D0D5DD] ">
                  <Image
                    src={"/icons/arrow_back.png"}
                    alt={"prev"}
                    width={20}
                    height={16}
                  />
                </button>
                <p className="text-2xl text-black"> Selected Customers </p>
              </div>
              <button
                className="absolute top-4 bottom-4 right-8  px-4 py-2"
                onClick={() => setIsModalOpen(false)}
              >
                <Image
                  src={"/icons/close.svg"}
                  alt={"close modal"}
                  width={14}
                  height={14}
                />
              </button>
            </div>
            <div className="relative mt-auto bottom-0 right-0 left-0 border border-[#EAEAEA] bg-white px-8 py-6 flex justify-between lg:gap-8">
              <PrimaryButtons
                text={`Cancel`}
                className="bg-white border border-[#D0D5DD] font-medium text-[#344054]  px-5 lg:px-8 py-3 rounded-lg "
                onClick={cancelRemittanceCreattion}
              />
              <PrimaryButtons
                disabled={!buttonValidation}
                text={"Confirm Submission"}
                className={clsx(
                  " w-10/12 px-5 py-3 rounded-lg text-white flex items-center justify-center",
                  buttonValidation ? "bg-black" : "bg-[#9A9A9A]"
                )}
                onClick={() => setCurrentModal(0)}
              />
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

export default Modal;
