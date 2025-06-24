import Image from 'next/image'
import { ButtonHTMLAttributes } from 'react';
interface LongButtonProp extends ButtonHTMLAttributes<HTMLButtonElement>{
  icon?: string;
  text: string;
}

const LongButton = ({ icon, text }: LongButtonProp) => {
  return (
      <button className="py-3 cursor-pointer px-5 lg:w-60 lg:h-12 bg-black text-white rounded-lg flex items-center gap-2 justify-center">
        {icon && <Image alt={text} src={icon} height={20} width={20} />}
        <p className="text-white whitespace-nowrap">{text}</p>
      </button>
  );
};

export default LongButton;
