import Image from "next/image";
import PrimaryButtons from "@/app/_components/ui/units/buttons/PrimaryButtons";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { setCurrentStep } from "@/app/store/slices/UserAccountSlice";
import { useState, useEffect, useRef } from "react";

const CaptureCustomer = () => {
  const dispatch = useDispatch();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [customerPhoto, setCustomerPhoto] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isValid, setIsValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const incrementStep = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      dispatch(setCurrentStep(2));
      setIsSubmitting(false);
    }, 1000);
  };

  const handleVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          facingMode: "user",
          height: 1000,
          width: 1000,
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
        console.log("Video stream started successfully");
      })
      .catch((error) => {
        console.error("Error accessing camera:", error);
      });
  };

  const handleStopCamera = () => {
    if (streamRef.current) {
      const video = videoRef.current;
      if (video && video.srcObject) {
        streamRef.current.getTracks().forEach((track) => {
          track.stop();
        });
        streamRef.current = null;
        video.srcObject = null;
      }
    }
  };

  const handleTakePicture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) {
      console.error("Video or canvas element not found");
      return;
    }
    if (video && canvas) {
      const context = canvas.getContext("2d");
      if (!context) {
        console.error("Failed to get canvas context");
        return;
      }
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/png");
      setCustomerPhoto(dataUrl);
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
    handleVideo();

    return () => {
      handleStopCamera();
    };
  }, []);

  return (
    <div>
      <div className=" flex gap-2 items-center font-medium w-full border-b-gray-300 border-b-2 py-4 px-6">
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

      <div className=" border-2 border-red-200">
        <div className=" border border-green-400 flex flex-col">
          <div className="flex flex-col items-center justify-center gap-8 mt-8">
            <div className="w-[336px] h-[408px] p-0 rounded-full ] flex items-center justify-center">
              {customerPhoto ? (
                <Image
                  alt="user Snapshot"
                  width={1000}
                  height={1000}
                  src={customerPhoto || "/icons/user_placeholder.png"}
                  className={clsx(
                    "w-[400px] h-[500px] rounded-full  object-cover"
                  )}
                />
              ) : (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className={clsx("w-full h-full rounded-full  object-cover")}
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
                      <h4 className="text-3xl font-medium text-black">Selfie capture frame</h4>
                      <p className="text-center">
                        Ensure the customer’s face and neck region fit into the
                        frame above.
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
                      <h4 className="text-3xl font-medium text-black">Selfie taken!</h4>
                      <p>
                        If everything looks good, please proceed to complete the
                        registration.
                      </p>
                    </div>
                    <div className=" border-2 border-black rounded-full h-[72px] w-[72px] flex items-center justify-center px-1 py-1">
                      <button
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
            className="flex-row-reverse font-medium border-[#D0D5DD] border text-black h-[52px] rounded-lg  justify-center items-center"
            icon="/icons/arrow_back.png"
          />
          <PrimaryButtons
            text={"Proceed - Passport Capture"}
            className={clsx(
              " h-[52px] font-medium rounded-lg w-96 justify-center items-center",
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
