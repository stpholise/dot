"use client";
import Image from "next/image";
import { DummyRemittance } from "@/app/_data/RemittanceData";
type ModalProp = {
  setIsModalOpen: (state: boolean) => void;
  selectedRowData?: DummyRemittance | undefined;
};

const Modal = ({ setIsModalOpen, selectedRowData }: ModalProp) => {
  const copyRemittance = async () => {
    try {
      if (!selectedRowData?.remittanceName) {
        throw new Error("No remittance name to copy.");
      }
      await navigator.clipboard.writeText(selectedRowData?.remittanceName);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="w-full  lg:w-[600px] min-h-96 h-full z-80 fixed bottom-0 top-0 right-0 left-0 lg:left-auto bg-white overflow-y-scroll pb-6">
        <div className="px-8 py-8  border-b font-medium text-2xl border-b-[#EAEAEA] flex justify-between text-black">
          <div className="flex items-center justify-start gap-3">
            <div className=" size-9 rounded-lg bg-black flex items-center justify-center">
              <Image
                src={"/icons/remitance.svg"}
                alt={"customer"}
                width={16}
                height={16}
                className=" "
              />
            </div>{" "}
            {selectedRowData?.remittanceName}
          </div>
          <button
            type="button"
            className=""
            onClick={() => setIsModalOpen(false)}
          >
            <Image
              src={"/icons/close.svg"}
              alt={"close"}
              height={20}
              width={20}
            />
          </button>
        </div>
        <div className="px-8 py-4 flex items-center gap-8 justify-between ">
          <div>
            <h4 className="text-black">
              <Image
                src={"/icons/lock.png"}
                alt={"customer"}
                width={16}
                height={16}
                className="inline mx-1"
              />
              Remittance Code:
            </h4>
          </div>
          <div className="bg-[#f9f9f9] rounded-lg px-2 py-2 flex flex-col sm:flex-row items-end  lg:items-center justify-between w-80">
            <p className="font-medium  text-black px-2">
              {selectedRowData?.remittanceName}
            </p>
            <button
              disabled={selectedRowData ? false : true}
              onClick={copyRemittance}
              type="button"
              className="border border-[#eaeaea] bg-white rounded-lg text-[#344054] w-fit px-1 py-1 flex- items-center gap-4"
            >
              Copy
              <Image
                src={"/icons/copy.png"}
                alt={"customer"}
                width={16}
                height={15}
                className="inline-block mx-1"
              />
            </button>
          </div>
        </div>
        <div className="px-8 py-4 ">
          <h3 className="text-black font-medium text-lg my-4">
            Remittance Details
          </h3>
          <div className="rounded-3xl border">
            <div className="bg-[#F9F9F9] px-8 py-6 flex flex-col sm:flex-row  gap-8 justify-between rounded-t-3xl">
              <div className="">
                <h4 className="text-sm text-#667085 font-medium">
                  Total Customers
                </h4>
                <p className="text-black text-3xl font-semibold">4 Customers</p>
              </div>
              <div className="">
                <h4 className="text-sm text-#667085 font-medium">
                  Total Remittance Amount
                </h4>
                <p className="text-black text-3xl font-semibold">₦24,500</p>
              </div>
            </div>
            <div className="px-8 py-4">
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
                {customerSummary.map((item) => (
                  <div
                    className="flex gap-4 border-b border-[#EAEAEA] py-4 justify-between items-center last:border-0"
                    key={item.id}
                  >
                    <div className="">
                      <h5 className=" text-black font-medium my-1">
                        {item.name}
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
                          Repayment: {item.repaymentTime}
                        </span>
                      </div>
                    </div>
                    <p className="text-black text-2xl font-medium">
                      {item.remittanceAmount}
                    </p>
                  </div>
                ))}
              </div>
            </div>
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

const customerSummary = [
  {
    id: "1",
    name: "Detola Funsho",
    instalment: "₦7,500",
    repaymentTime: "Week 4",
    remittanceAmount: "₦5,000",
  },
  {
    id: "2",
    name: "Detola Funsho",
    instalment: "₦7,500",
    repaymentTime: "Week 4",
    remittanceAmount: "₦5,000",
  },
  {
    id: "3",
    name: "Detola Funsho",
    instalment: "₦7,500",
    repaymentTime: "Week 4",
    remittanceAmount: "₦5,000",
  },
];

export default Modal;
