import { useDropzone, DropzoneOptions, FileRejection } from "react-dropzone";
import { useState, useCallback, useEffect } from "react";
import clsx from "clsx";
import Image from "next/image";
import { FormikHelpers } from "formik";
import { IdentificationProps } from "../account/create-account/_components/Identification";
import { CustomerAddress } from "../account/create-account/_components/Address";
import { PersonalDetailsType } from "../hmo/buy-hmo/_components/PersonalDetailsForm";

interface ImageDropzoneProps {
  setFieldValue: FormikHelpers<
    IdentificationProps | CustomerAddress | PersonalDetailsType
  >["setFieldValue"];
  setFile?: (state: File | undefined) => void;
  fieldName: string;
  text: string;
  file?: File | undefined;
  className?: string;
}

const ImageDropzone = ({
  setFieldValue,
  fieldName,
  text,
  file,
  setFile,
  className,
}: ImageDropzoneProps) => {
  const [itemFiles, setItemFiles] = useState<File[]>([]);
  const [isFile, setIsFile] = useState<boolean>(false);
  const [error, setError] = useState<string | null>();

  useEffect(() => {
    if (file) {
      setItemFiles([file]);
      setIsFile(true);
    } else {
      setItemFiles([]);
      setIsFile(false);
    }
  }, [file]);

  const maxFileSize = 3 * 1024 * 1024;

  const onDropItem = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setError(null);
      setIsFile(true);
      setItemFiles(acceptedFiles);
      if (setFile) setFile(acceptedFiles[0]);
      setTimeout(() => {
        setFieldValue(fieldName, acceptedFiles[0]);
      }, 500);
    }
  }, []);
  const onDropRejected = (fileRejections: FileRejection[]) => {
    const firstError = fileRejections[0]?.errors[0];
    const fileRejected = fileRejections[0];
    if (!fileRejected) return;
    const filesizeInMb = fileRejected.file?.size / (1024 * 1024);

    if (firstError) {
      switch (firstError.code) {
        case "file-too-large":
          setError(
            `File too large (${filesizeInMb.toFixed(2)}MB). Max size is 3MB.`
          );
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
    setFieldValue(fieldName, undefined);

    if (setFile) {
      setFile(undefined);
    }
  };

  return (
    <div
      {...getRootProps()}
      className={clsx(
        " bg-[#F7F7F7]  flex rounded-3xl relative cursor-pointer sm:h-[130px] items-center   w-full h-full gap-4 py-6 px-4",
        {
          "sm:w-[520px] lg:w-[339px] xl:w-[520px]   justify-center ": !isFile,
          "  justify-start": isFile,
        },
        className
      )}
    >
      <input
        className="cursor-pointer hidden w-full h-full"
        type="file"
        {...getInputProps()}
      />
      <div
        className={clsx(
          " max-w-14 max-h-14 min-h-14 min-w-14 size-14 flex items-center justify-center   ",
          {
            "rounded-full bg-white": !isFile,
            "rounded-sm": isFile,
          }
        )}
      >
        {isFile ? (
          <Image
            src={"/icons/document.png"}
            alt={"gallery icon"}
            width={40}
            height={40}
            className="w-full h-full size-10"
          />
        ) : (
          <Image
            src={"/icons/gallery.png"}
            alt={"gallery icon"}
            width={40}
            height={40}
            className="size-10 max-w-10 max-h-10 "
          />
        )}
      </div>
      <div className="">
        <p className="text-black font-medium  whitespace-nowrap ">
          {text}
          {isFile && (
            <Image
              src={"/icons/good.png"}
              alt="good"
              width={20}
              height={20}
              className="max-w-5  max-h-5 size-4 rounded-full inline ml-2"
            />
          )}
        </p>
        <p className="text-gray-400 text-xs">
          {itemFiles.length > 0
            ? itemFiles[0].name
            : "JPEG or PNG format only, 3mb max"}
        </p>
      </div>
      {itemFiles.length > 0 && (
        <button onClick={resetFiles}>
          <Image
            src={"/icons/remove_red.png"}
            alt={"remove"}
            width={20}
            height={20}
            className="absolute top-4 right-4"
          />
        </button>
      )}

      {error && (
        <div className="text-xs text-red-400 absolute bottom-1 text-center">
          {error}{" "}
        </div>
      )}
    </div>
  );
};

export default ImageDropzone;
