"use client";
import Image from "next/image";
import { useState } from "react";
const Searchbar = () => {
  const [value, setValue] = useState<string>("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(value);
  };
  return (
    <div>
      <div className=" hidden xs:flex items-center border-[#D2D5E1] xs:w-48 sm:w-80 md:w-[459px] h-10 border rounded-lg px-4 gap-4  ">
        <Image
          alt="search"
          src={"/icons/search.svg"}
          height={10}
          width={10}
          className="w-6 h-6"
          onClick={handleSubmit}
        />

        <>
          <input
            onChange={(e) => setValue(e.target.value)}
            value={value}
            type="text"
            name="search"
            placeholder="Search"
            className="outline-none w-11/12"
          />
        </>
      </div>
    </div>
  );
};

export default Searchbar;
