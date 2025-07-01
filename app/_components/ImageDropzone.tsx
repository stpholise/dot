import { useDropzone, DropzoneOptions } from "react-dropzone";
import { useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import { FormikHelpers } from 'formik'
import { IdentificationProps } from "../account/create-account/_components/Identification"; 
import { CustomerAddress } from '../account/create-account/_components/Address'

interface ImageDropzoneProps { 
     setFieldValue: FormikHelpers<IdentificationProps | CustomerAddress >["setFieldValue"];
     fieldName: string;
}

const ImageDropzone = ({ setFieldValue, fieldName}: ImageDropzoneProps) => {
  const [itemFiles, setItemFiles] = useState<File[]>([]); 
  const [isFile, setIsFile] = useState<boolean>(false);

  const onDropItem = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setIsFile(true);
      setItemFiles(acceptedFiles); 
        setTimeout(() => {
            setFieldValue(fieldName, itemFiles[0])
        }, 500)
    }
  };

  const dropzoneOptions: DropzoneOptions = {
    onDrop: onDropItem,
    accept: {
      "image/jpeg": [".jpg", "jpeg"],
      "image/png": [".png"],
    },
    maxFiles: 1,
    maxSize: 4145728,
  };

  const { getRootProps, getInputProps } = useDropzone(dropzoneOptions);
  
  const resetFiles = () => {
   setItemFiles([])
   setIsFile(false)
  }

  return (
    <div
      className={clsx(
        "w-[520px] h-[130px] bg-[#F7F7F7] rounded-3xl px-6 py-6 "
      )}
    >
      {
        <div
          className={clsx("flex ", {
            "justify-center": isFile,
          })}
        >
          <div
            {...getRootProps()}
            className={clsx(
              "flex  w-full h-full items-center justify-center gap-6"
            )}
          >
            <input
              className="cursor-pointer hidden w-full h-full"
              type="file"
              {...getInputProps()}
            />
            <div className="bg-white rounded-full h-14 w-14 flex items-center justify-center ">
              <Image
                src={"/icons/gallery.png"}
                alt={"gallery icon"}
                width={40}
                height={40}
                className=""
              />
            </div>
            <div className="">
              <p className="text-black font-medium flex gap-2">
                Upload ID Image (Front){" "}
                {isFile && (
                  <Image
                    src={"/icons/good.png"}
                    alt="good"
                    width={20}
                    height={20}
                    className="w-5 h-5 rounded-full"
                  />
                )}
              </p>
              <p className="text-gray-400 text-sm">
                {itemFiles.length > 0
                  ? itemFiles[0].name
                  : "JPEG or PNG format only, 3mb max"}
              </p>
            </div>
          </div>
          {itemFiles.length > 0 &&
          <button onClick={resetFiles}>
            <Image
              src={"/icons/remove_red.png"}
              alt={"remove"}
              width={20}
              height={20}
              className=""
            />
          </button>}
        </div>
      }
    </div>
  );
};

export default ImageDropzone;
