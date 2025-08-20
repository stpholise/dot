import Image from "next/image";

const Successfull = ({ id }: { id?: string }) => {
  const copyRemittance = async () => {
    try {
    
      await navigator.clipboard.writeText(`DLTE-${id}`);
      console.log(`DLTE-${id} copied to clipboard`);
      alert("Remittance ID copied to clipboard!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-white rounded-lg  max-w-md ">
      <Image src="/icons/success.png" alt="Success" width={100} height={100} />
      <h2 className="xs:text-3xl text-xl font-medium text-black">
        Submitted Successfully!
      </h2>
      <p className="text-[#667085] text-base font-medium text-center w-full xs:w-99">
        Use the unique id below to complete repayment at any DotPay agent store
        closest to you.
      </p>
      <div className="bg-gray-100 px-4 py-2.5 mt-4 rounded-md text-black w-full gap-4 xs:w-82 flex justify-between items-center">
        <p className="xs:text-lg whitespace-nowrap text-sm font-medium">DLTE-{id}</p>
        <button
          disabled={id ? false : true}
          onClick={copyRemittance}
          type="button"
          className="border flex-nowrap whitespace-nowrap border-[#eaeaea] bg-white rounded-lg text-[#344054] w-fit px-1 py-1 flex- items-center gap-4"
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
  );
};

export default Successfull;
