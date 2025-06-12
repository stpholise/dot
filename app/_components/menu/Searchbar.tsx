"use client";
import { Formik, Form, Field } from "formik";
import Image from "next/image";
const Searchbar = () => {
  return (
    <Formik
      initialValues={{ search: "" }}
      onSubmit={(values) => {
        console.log(values.search); // Replace with your search logic
      }}
    >
      <Form className=" flex items-center border-[#D2D5E1] w-[459px] h-10 border rounded-lg px-4 gap-4 ">
        <Image
          alt="search"
          src={"/icons/search.svg"}
          height={10}
          width={10}
          className="w-6 h-6"
        />

        <>
          <Field type="text" name="search" placeholder="Search" className='outline-none w-11/12' />
        </>
      </Form>
    </Formik>
  );
};

export default Searchbar;
