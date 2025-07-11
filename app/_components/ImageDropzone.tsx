import { useDropzone, DropzoneOptions, FileRejection } from "react-dropzone";
import { useState, useCallback } from "react";
import clsx from "clsx";
import Image from "next/image";
import { FormikHelpers } from "formik";
import { IdentificationProps } from "../account/create-account/_components/Identification";
import { CustomerAddress } from "../account/create-account/_components/Address";

interface ImageDropzoneProps {
  setFieldValue: FormikHelpers<
    IdentificationProps | CustomerAddress
  >["setFieldValue"];
  setFile?: (state: File) => void;
  fieldName: string;
  text: string;
}

const ImageDropzone = ({
  setFieldValue,
  fieldName,
  text,
  setFile,
}: ImageDropzoneProps) => {
  const [itemFiles, setItemFiles] = useState<File[]>([]);
  const [isFile, setIsFile] = useState<boolean>(false);
  const [error, setError] = useState<string | null>();
 
  const maxFileSize = 3 * 1024 * 1024;

  const onDropItem = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setError(null);
      setIsFile(true);
      setItemFiles(acceptedFiles);
      if (setFile) setFile(acceptedFiles[0]);
      setTimeout(() => {
        // const imageUrl = URL.createObjectURL(acceptedFiles[0]);
        setFieldValue(fieldName, acceptedFiles[0]);
      }, 500);
    }
  }, []); 
  const onDropRejected = (fileRejections: FileRejection[]) => {
    const firstError = fileRejections[0]?.errors[0];
    const fileRejected = fileRejections[0]
    if (!fileRejected) return;
    const filesizeInMb = fileRejected.file?.size / (1024 * 1024);

    if (firstError) {
      switch (firstError.code) {
        case "file-too-large":
          setError(`File too large (${filesizeInMb.toFixed(2)}MB). Max size is 3MB.`); 
          break;
        case "file-invalid-type":
          setError("Unsupported file type. Only JPEG and PNG are allowed.");
          break;
        default:
          setError("File upload error.");
      }
    }
  };

  const dropzoneOptions: DropzoneOptions = {
    onDrop: onDropItem,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
    onDropRejected,
    maxFiles: 1,
    maxSize: maxFileSize,
  };

  const { getRootProps, getInputProps } = useDropzone(dropzoneOptions);

  const resetFiles = () => {
    setItemFiles([]);
    setIsFile(false);
  };

  return (
    <div
      className={clsx(" bg-[#F7F7F7] flex rounded-3xl relative ", {
        "sm:w-[520px] sm:h-[130px] px-6 py-6 justify-center ": !isFile,
        "px-4 py-4  justify-start": isFile,
      })}
    >
      {
        <div className={clsx("flex items-center justify-between w-full", {})}>
          <div
            {...getRootProps()}
            className={clsx("flex  w-full h-full items-center  gap-6", {
              "justify-center": !isFile,

              "justify-start ": isFile,
            })}
          >
            <input
              className="cursor-pointer hidden w-full h-full"
              type="file"
              {...getInputProps()}
            />
            <div
              className={clsx("  h-14 w-14 flex items-center justify-center ", {
                "rounded-full bg-white": !isFile,
                "rounded-sm": isFile,
              })}
            >
              {isFile ? (
                <Image
                  src={"/icons/document.png"}
                  alt={"gallery icon"}
                  width={40}
                  height={40}
                  className="w-full h-full "
                />
              ) : (
                <Image
                  src={"/icons/gallery.png"}
                  alt={"gallery icon"}
                  width={40}
                  height={40}
                  className=""
                />
              )}
            </div>
            <div className=" ">
              <p className="text-black font-medium flex gap-2 ">
                {text}
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
          {itemFiles.length > 0 && (
            <button onClick={resetFiles}>
              <Image
                src={"/icons/remove_red.png"}
                alt={"remove"}
                width={20}
                height={20}
                className=""
              />
            </button>
          )}
        </div>
      }

      {error && (
        <div className="text-xs text-red-400 absolute bottom-1 text-center">
          {error}{" "}
        </div>
      )}
    </div>
  );
};

export default ImageDropzone;
