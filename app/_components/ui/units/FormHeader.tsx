import Image from "next/image";

interface FormHeaderProps {
  primaryText?: string;
  secondaryText?: string;
  icon?: {
    src: string;
    alt: string;
  };
}

const FormHeader = ({ icon, primaryText, secondaryText }: FormHeaderProps) => {
  return (
    <div className="hidden lg:flex gap-2 items-center font-medium w-full border-b-gray-300 border-b-2 py-4 px-6">
      {icon && (
        <Image
          alt={icon.alt || "user"}
          src={icon.src || "/icons/security.png"}
          height={14}
          width={14}
          className=""
        />
      )}
      <p className="">
        <span className="text-black">{primaryText}</span>
        <span className="text-gray-400"> {secondaryText}</span>
      </p>
    </div>
  );
};

export default FormHeader;
