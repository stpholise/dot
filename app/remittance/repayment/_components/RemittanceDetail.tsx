import { LoanRowData } from ".././page";
import Image from "next/image";

const RemittanceDetail = ({
  customerSummary,
  total,
}: {
  customerSummary: LoanRowData[];
  total: string;
}) => {
  return (
    <div className="rounded-3xl border max-w-[529px] rounded-t-3xl overflow-hidden mx-auto ">
      <div className="bg-[#F9F9F9] px-4 sm:px-8 py-3 sm:py-6 flex  sm:flex-row  gap-8 justify-between rounded-t-3xl ">
        <div className="">
          <h4 className="text-sm text-[#667085] font-medium">Total Customers</h4>
          <p className="text-black text-xl  sm:text-3xl font-semibold">
            {customerSummary.length} Customers
          </p>
        </div>
        <div className="">
          <h4 className="text-sm text-[#667085] font-medium">
            Total Remittance Amount
          </h4>
          <p className="text-black text-xl   sm:text-3xl font-semibold">
            ₦{total}
          </p>
        </div>
      </div>
      <div className=" px-4 sm:px-8  py-3 sm:py-4 bg-white">
        <h4 className="text-xs text-[#667085] font-medium flex items-center">
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
              className="flex gap-4 border-b py-2 sm:py-4 border-[#EAEAEA]  justify-between items-center last:border-0"
              key={item.id}
            >
              <div className="">
                <h5 className=" text-black text-base font-medium mb-1">
                  {item.customerName}
                </h5>
                <div className="flex gap-2 text-xs">
                  <span className="text-[#667085]">
                    <Image
                      src={"/icons/offer_hand.png"}
                      alt={"instalment"}
                      width={10}
                      height={10}
                      className="inline mx-1"
                    />
                    Instalment: {item.instalment}
                  </span>
                  <span className="text-[#667085]">
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
              <p className="text-black text-lg sm:text-2xl font-medium">
                ₦{item.currentPayment}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RemittanceDetail;
