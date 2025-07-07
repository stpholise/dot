import { useRef, useState } from "react";

const FrontCamera = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  // Start the front camera
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
        setStream(mediaStream);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  // Stop the camera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.srcObject = null;
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <video
        ref={videoRef}
        className="w-full max-w-md border rounded"
        autoPlay
        muted
        playsInline
      />
      <div className="flex gap-2">
        <button
          onClick={startCamera}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Start Camera
        </button>
        <button
          onClick={stopCamera}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Stop Camera
        </button>
      </div>
    </div>
  );
};

export default FrontCamera;
