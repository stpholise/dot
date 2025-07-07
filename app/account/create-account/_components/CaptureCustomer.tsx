import Image from "next/image";
import PrimaryButtons from "@/app/_components/ui/units/buttons/PrimaryButtons";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentStep,
  setCustomerImage,
} from "@/app/store/slices/UserAccountSlice";
import { useState, useEffect, useRef } from "react";
import { RootState } from "@/app/store";

const CaptureCustomer = () => {
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
    setIsValid(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const newStep = currentStep - 1;
      dispatch(setCurrentStep(newStep));
    }, 500);
  };

  const handleVideo = async () => {
    await navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        devices.forEach((device) => {
          console.log(`${device.kind}: ${device.label} id=${device.deviceId}`);
        });
      })
      .catch((err) => {
        console.error(`${err.name}: ${err.message}`);
      });
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
        video.play();
      })
      .catch((error) => {
        console.error("Error accessing camera:", error);
      });
  };

  const handleStopCamera = () => {
    const video = videoRef.current;
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
      if (video && video.srcObject) {
        streamRef.current = null;
        video.srcObject = null;
      }
    }
    if (video) {
      video.pause();
      video.srcObject = null;
    }
  };

  const handleTakePicture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    if (video && canvas) {
      const context = canvas.getContext("2d");
      if (!context) {
        return;
      }
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (blob) {
          const photoUrl = URL.createObjectURL(blob);
          setCustomerPhoto(photoUrl);
        }
      }, "image.png");
      setIsValid(true);
      handleStopCamera();
    }
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
  }, []);

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
                    width={336}
                    height={300}
                    src={customerPhoto}
                    className={clsx(
                      "w-[336px] h-[408px] rounded-[50%]  object-cover shadow-lg object-center-top "
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
                className="w-72 h-96 rounded-full hidden"
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

        <footer className="flex gap-4 px-8 py-4 mt-auto">
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
              " h-[48px] font-medium rounded-lg w-96 justify-center items-center",
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
