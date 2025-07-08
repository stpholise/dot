import Image from "next/image";
import PrimaryButtons from "@/app/_components/ui/units/buttons/PrimaryButtons";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentStep,
  setCustomerImage,
} from "@/app/store/slices/UserAccountSlice";
import { useState, useEffect, useRef, useCallback } from "react";
import { RootState } from "@/app/store";

interface CaptureCustomerProp {
  setPicture: (picture: File) => void;
}

const CaptureCustomer = ({ setPicture }: CaptureCustomerProp) => {
  const dispatch = useDispatch();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [customerPhoto, setCustomerPhoto] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isValid, setIsValid] = useState(false);
  const [canTakePhoto, setCanTakePhoto] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentStep = useSelector(
    (state: RootState) => state.userAccount.initialStepState.currentStep
  );

  const customerFName = useSelector(
    (state: RootState) =>
      state.userAccount.userAccountInitialState.customerDetails.fname
  );

  const incrementStep = () => {
    handleStopCamera();
    setIsSubmitting(true);
    setTimeout(() => {
      dispatch(setCustomerImage({ url: customerPhoto }));
      const newStep = currentStep + 1;
      dispatch(setCurrentStep(newStep));
      setIsSubmitting(false);
    }, 1000);
  };

  const decrementStep = () => {
    handleStopCamera();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const newStep = currentStep - 1;
      dispatch(setCurrentStep(newStep));
    }, 500);
  };

  const handleVideo = async () => {
    await navigator.mediaDevices
      .getUserMedia({
        video: {
          facingMode: "user",
          height: 500,
          width: 500,
        },
        audio: false,
      })
      .then((stream) => {
        const video = videoRef.current;

        if (!video) {
          console.error("Video element not found");
          return;
        }
        streamRef.current = stream;
        video.srcObject = stream;
        const handleCanPlay = () => {
          video.play().catch((err) => {
            console.error("Error playing video:", err);
          });
          video.removeEventListener("canplay", handleCanPlay);
        };

        video.addEventListener("canplay", handleCanPlay);
      })
      .catch((error) => {
        console.error("Error accessing camera:", error);
      });
  };

  const handleStopCamera = useCallback(() => {
    const videoElement = videoRef.current;
    const mediaStream = streamRef.current;

    // 1. Stop all tracks in the media stream
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => {
        track.stop(); // Releases camera/mic resources
      });
      streamRef.current = null; // Clear the ref to indicate no active stream
    }

    // 2. Disconnect video element from the stream and pause
    if (videoElement) {
      videoElement.srcObject = null;
      videoElement.pause();
    }
  }, []);

  const handleTakePicture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    if (video && canvas) {
      const context = canvas.getContext("2d");
      if (!context) return;

      const videoAspectRatio = video.videoWidth / video.videoHeight;
      const canvasAspectRatio = canvas.width / canvas.height;

      let sx = 0;
      let sy = 0;
      let sWidth = video.videoWidth;
      let sHeight = video.videoHeight;

      const dx = 0;
      const dy = 0;
      const dWidth = canvas.width;
      const dHeight = canvas.height;

      // Calculate source and destination dimensions to achieve "cover" effect
      if (videoAspectRatio > canvasAspectRatio) {
        // Crop video horizontally
        sHeight = video.videoHeight;
        sWidth = sHeight * canvasAspectRatio;
        sx = (video.videoWidth - sWidth) / 2;
      } else {
        // Crop video vertically
        sWidth = video.videoWidth;
        sHeight = sWidth / canvasAspectRatio;
        sy = (video.videoHeight - sHeight) / 2;
      }

      context.clearRect(0, 0, canvas.width, canvas.height);

      context.drawImage(
        video,
        sx,
        sy,
        sWidth,
        sHeight,
        dx,
        dy,
        dWidth,
        dHeight
      );

      canvas.toBlob((blob) => {
        if (blob) {
          const photoUrl = URL.createObjectURL(blob);
          const filename = `${
            customerFName || "customer"
          }_photo_${Date.now()}.png`;
          const photoFile = blobToFile(blob, filename);
          setPicture(photoFile);
          setCustomerPhoto(photoUrl);
        }
      }, "image/png");

      setIsValid(true);
      handleStopCamera();
    }
  };

  const blobToFile = (
    blob: Blob,
    filename: string,
    lastModified: number = Date.now()
  ): File => {
    return new File([blob], filename, { type: blob.type, lastModified });
  };

  const removePhoto = () => {
    setCustomerPhoto(null);
    setIsValid(false);
    handleVideo();
  };

  useEffect(() => {
    setTimeout(() => {
      setCanTakePhoto(false);
    }, 500);
    handleVideo();
    return () => {
      handleStopCamera();
    };
  });

  return (
    <div>
      <div className=" hidden lg:flex gap-2 items-center font-medium w-full border-b-gray-300 border-b-2 py-4 px-6">
        <Image
          alt="user"
          src="/icons/security.png"
          height={14}
          width={14}
          className=""
        />
        <p className="">
          <span className="text-black">Capture Customer Photo</span>
          <span className="text-gray-400"> - Required for verification</span>
        </p>
      </div>

      <div className="flex flex-col gap-8 ">
        <div className=" flex flex-col gap-8">
          <div className="flex flex-col items-center justify-center gap-8 mt-8">
            <div className="w-[336px] h-[408px] p-0 rounded-[50%] overflow-hidden flex items-center justify-center">
              {customerPhoto ? (
                <div className="flex items-center justify-center w-[336px] h-[408px]">
                  <Image
                    alt="user Snapshot"
                    width={600}
                    height={700}
                    src={customerPhoto}
                    className={clsx(
                      "w-full min-w-full h-full min-h-full rounded-[50%] object-contain shadow-lg"
                    )}
                  />
                </div>
              ) : (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className={clsx("w-full h-full rounded-[50%]  object-cover")}
                />
              )}
              <canvas
                ref={canvasRef}
                width={336}
                height={408}
                className="w-[336px] h-[408px] rounded-full hidden"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="w-80">
                {customerPhoto ? (
                  <div className="flex flex-col gap-8 justify-center items-center">
                    <div className="text-center flex flex-col gap-4">
                      <h4 className="text-3xl font-medium text-black">
                        Selfie taken!{" "}
                      </h4>
                      <p className="text-center">
                        If everything looks good, please proceed to complete the
                        registration.
                      </p>
                    </div>
                    <PrimaryButtons
                      text={"Take another photo"}
                      className="bg-[#F3F3F4]  text-black h-[52px] rounded-lg w-80 justify-center items-center"
                      onClick={removePhoto}
                    />
                  </div>
                ) : (
                  <div className="flex flex-col gap-8 justify-center items-center">
                    <div className=" text-center flex flex-col gap-4">
                      <h4 className="text-3xl font-medium text-black">
                        Selfie capture frame
                      </h4>
                      <p>
                        {" "}
                        Ensure the customer’s face and neck region fit into the
                        frame above.
                      </p>
                    </div>
                    <div className=" border-2 border-black rounded-full h-[72px] w-[72px] flex items-center justify-center px-1 py-1">
                      <button
                        disabled={canTakePhoto}
                        className="bg-black h-[60px] rounded-full w-[60px] "
                        onClick={handleTakePicture}
                      ></button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <footer className="flex gap-4 px-8 py-4 mt-auto sm:flex-row flex-col-reverse">
          <PrimaryButtons
            text={"Go Back"}
            className="flex-row-reverse font-medium border-[#D0D5DD] border text-black h-[48px] rounded-lg  justify-center items-center"
            icon="/icons/arrow_back.png"
            onClick={decrementStep}
          />
          <PrimaryButtons
            text={"Proceed - Passport Capture"}
            disabled={!isValid || isSubmitting}
            className={clsx(
              " h-[48px] font-medium rounded-lg sm:w-96 justify-center items-center",
              {
                "bg-black text-white": isValid && !isSubmitting,
                "bg-[#9A9A9A] text-white": !isValid || isSubmitting,
              }
            )}
            onClick={incrementStep}
          />
        </footer>
      </div>
    </div>
  );
};

export default CaptureCustomer;
